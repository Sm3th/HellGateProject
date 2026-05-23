import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

const SERVICE_FEE_RATE = 0.05; // %5 servis ücreti

function Step({ num, label, active, done }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        background: done ? "var(--green)" : active ? "var(--brand)" : "var(--bg-raised)",
        border: `1px solid ${done ? "var(--green)" : active ? "var(--brand)" : "var(--border-2)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 800, color: done || active ? "#fff" : "var(--muted-2)",
        flexShrink: 0, transition: "all .3s",
      }}>
        {done ? "✓" : num}
      </div>
      <span style={{
        fontSize: 12, fontWeight: 700, letterSpacing: 2,
        textTransform: "uppercase",
        color: active ? "#fff" : done ? "var(--green)" : "var(--muted)",
        transition: "color .3s",
      }}>{label}</span>
    </div>
  );
}

function CartRow({ item, onRemove, onInc, onDec }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "56px 1fr auto",
      gap: 14, padding: "14px 0",
      borderBottom: "1px solid var(--border)",
    }}>
      <img src={item.image || "/hero.png"} alt={item.name}
        style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8, background: "#111" }} />
      <div>
        <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{item.name}</p>
        <p style={{ fontSize: 12, color: "var(--muted-2)", marginBottom: 8 }}>
          {[item.event, item.color, item.size].filter(Boolean).join(" · ")}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={onDec}
            style={{ width: 26, height: 26, borderRadius: 6, background: "var(--bg-raised)", border: "1px solid var(--border-2)", color: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
          >−</button>
          <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
          <button
            onClick={onInc}
            style={{ width: 26, height: 26, borderRadius: 6, background: "var(--bg-raised)", border: "1px solid var(--border-2)", color: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
          >+</button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <p style={{ fontWeight: 800, fontSize: 16 }}>{(item.price * item.qty).toFixed(2)} €</p>
        <button
          onClick={onRemove}
          style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 13, transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--brand)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
        >Remove</button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { cart, inc, dec, removeItem, clearCart, subtotal, totalItems } = useCart();
  const [step, setStep] = useState(1); // 1: details, 2: review
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const serviceFee = +(subtotal * SERVICE_FEE_RATE).toFixed(2);
  const total = +(subtotal + serviceFee).toFixed(2);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: undefined }));
  };

  function validateStep1() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function toStep2() {
    if (validateStep1()) setStep(2);
  }

  async function handlePayment() {
    if (!cart.length || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          customer: { name: form.name, email: form.email, phone: form.phone },
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.id) {
        const { loadStripe } = await import("@stripe/stripe-js");
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        await stripe.redirectToCheckout({ sessionId: data.id });
        return;
      }
      alert("Payment system unavailable. Please try again shortly.");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const isEmpty = cart.length === 0;

  return (
    <>
      <Head>
        <title>Checkout • Hellgate Project</title>
      </Head>

      <div style={{ paddingTop: 72, minHeight: "100vh", background: "var(--bg)" }}>

        {/* Header */}
        <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-2)", padding: "20px 0" }}>
          <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <Step num={1} label="Your Details" active={step === 1} done={step > 1} />
              <div style={{ width: 32, height: 1, background: "var(--border-2)" }} />
              <Step num={2} label="Review & Pay"  active={step === 2} done={false} />
            </div>
            <Link href="/tickets" style={{ fontSize: 12, color: "var(--muted-2)", letterSpacing: 2, textTransform: "uppercase", transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--muted-2)"}
            >
              ← Back to Tickets
            </Link>
          </div>
        </div>

        {/* Empty state */}
        {isEmpty ? (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,6vw,60px)", letterSpacing: 4, textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>
              Cart is Empty
            </p>
            <p style={{ color: "var(--muted-2)", marginBottom: 32 }}>Add tickets or merch to your cart first.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/tickets" className="btn btn--primary">Browse Tickets</Link>
              <Link href="/merch" className="btn btn--ghost">Browse Merch</Link>
            </div>
          </div>
        ) : (
          <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 48, padding: "48px 24px", alignItems: "start" }}>

            {/* ── LEFT ── */}
            <div>
              {/* STEP 1 — Details */}
              {step === 1 && (
                <section>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 3, textTransform: "uppercase", marginBottom: 28 }}>
                    Your Details
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div className="form__field">
                      <label className="form__label" htmlFor="co-name">Full Name *</label>
                      <input id="co-name" name="name" className="form__input" value={form.name} onChange={onChange} placeholder="Jane Doe" />
                      {errors.name && <p style={{ color: "var(--brand)", fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
                    </div>
                    <div className="form__field">
                      <label className="form__label" htmlFor="co-email">Email Address *</label>
                      <input id="co-email" name="email" type="email" className="form__input" value={form.email} onChange={onChange} placeholder="jane@example.com" />
                      {errors.email && <p style={{ color: "var(--brand)", fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
                      <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, letterSpacing: .5 }}>Your ticket(s) will be sent to this address.</p>
                    </div>
                    <div className="form__field">
                      <label className="form__label" htmlFor="co-phone">Phone (optional)</label>
                      <input id="co-phone" name="phone" type="tel" className="form__input" value={form.phone} onChange={onChange} placeholder="+90 555 000 00 00" />
                    </div>
                  </div>

                  <button className="btn btn--primary btn--lg" onClick={toStep2} style={{ marginTop: 32 }}>
                    Continue to Review →
                  </button>
                </section>
              )}

              {/* STEP 2 — Review */}
              {step === 2 && (
                <section>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 3, textTransform: "uppercase" }}>
                      Review Order
                    </h2>
                    <button className="btn-link" onClick={() => setStep(1)} style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>
                      ← Edit Details
                    </button>
                  </div>

                  {/* Buyer summary */}
                  <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", marginBottom: 28, display: "flex", gap: 32, flexWrap: "wrap" }}>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--brand)", marginBottom: 4 }}>Name</p>
                      <p style={{ fontSize: 14 }}>{form.name}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--brand)", marginBottom: 4 }}>Email</p>
                      <p style={{ fontSize: 14 }}>{form.email}</p>
                    </div>
                    {form.phone && (
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--brand)", marginBottom: 4 }}>Phone</p>
                        <p style={{ fontSize: 14 }}>{form.phone}</p>
                      </div>
                    )}
                  </div>

                  {/* Cart items */}
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                    Items ({totalItems})
                  </h3>
                  <div>
                    {cart.map((item, i) => (
                      <CartRow
                        key={`${item.id}-${i}`}
                        item={item}
                        onInc={() => inc(i)}
                        onDec={() => dec(i)}
                        onRemove={() => removeItem(i)}
                      />
                    ))}
                  </div>

                  <button
                    className="btn btn--primary btn--lg btn--block"
                    onClick={handlePayment}
                    disabled={loading || isEmpty}
                    style={{ marginTop: 28 }}
                  >
                    {loading ? "Redirecting to Stripe…" : "Pay Securely →"}
                  </button>

                  <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", marginTop: 12, letterSpacing: 1 }}>
                    🔒 Payments processed securely by Stripe. We never store card details.
                  </p>
                </section>
              )}
            </div>

            {/* ── RIGHT — Order Summary (sticky) ── */}
            <aside style={{ position: "sticky", top: 88 }}>
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ background: "var(--bg-raised)", padding: "18px 20px", borderBottom: "1px solid var(--border)" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: 2, textTransform: "uppercase" }}>
                    Order Summary
                  </p>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  {/* Item rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                    {cart.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 13 }}>
                        <span style={{ color: "var(--muted-2)", flex: 1 }}>
                          {item.name} {item.qty > 1 && <span style={{ color: "var(--brand)" }}>×{item.qty}</span>}
                        </span>
                        <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{(item.price * item.qty).toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "var(--muted-2)" }}>Subtotal</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "var(--muted-2)" }}>Service fee (5%)</span>
                      <span>{serviceFee.toFixed(2)} €</span>
                    </div>
                    <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontWeight: 700 }}>Total</span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 2, color: "var(--brand)" }}>
                        {total.toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                    {["🔒 SSL encrypted payment", "📧 Ticket delivered by email", "🎫 Instant confirmation"].map((t) => (
                      <div key={t} style={{ fontSize: 12, color: "var(--muted-2)", display: "flex", alignItems: "center", gap: 6 }}>{t}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Need help */}
              <div style={{ marginTop: 14, padding: "14px 16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "var(--muted-2)" }}>
                  Need help?{" "}
                  <a href="mailto:contact@hellgateproject.com" style={{ color: "var(--brand)" }}>
                    contact@hellgateproject.com
                  </a>
                </p>
              </div>
            </aside>

          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
