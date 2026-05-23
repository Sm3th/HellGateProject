import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const CATEGORIES = ["All", "Apparel", "Accessories"];

const PRODUCTS = [
  {
    id: 1,
    name: "HELLGATE T-Shirt // Core",
    price: 30,
    image: "/tshirt.jpg",
    badge: "NEW",
    badgeColor: "#ff0033",
    category: "Apparel",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "100% organic cotton. Screen-printed logo. Heavyweight 220g. Pre-shrunk, ring-spun.",
    featured: true,
  },
  {
    id: 2,
    name: "HELLGATE Hoodie // Ember",
    price: 60,
    image: "/tshirt.jpg",
    badge: "HOT",
    badgeColor: "linear-gradient(135deg,#ff0033,#ff6600)",
    category: "Apparel",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    description: "Brushed fleece interior. Embroidered front logo. Oversized silhouette. 450g.",
    featured: false,
  },
  {
    id: 3,
    name: "Sticker Pack // Gate",
    price: 10,
    image: "/tshirt.jpg",
    badge: null,
    badgeColor: null,
    category: "Accessories",
    colors: ["Mixed"],
    sizes: ["One Size"],
    description: "6x UV-resistant vinyl stickers. Various sizes. Waterproof and scratch-proof.",
    featured: false,
  },
  {
    id: 4,
    name: "Cap // Inferno",
    price: 25,
    image: "/tshirt.jpg",
    badge: "DROP",
    badgeColor: "#8800ff",
    category: "Accessories",
    colors: ["Black"],
    sizes: ["One Size"],
    description: "6-panel structured cap. 3D embroidered gate symbol. Adjustable clasp back.",
    featured: false,
  },
];

const COLOR_MAP = {
  Black: { bg: "#111", label: "Black" },
  White: { bg: "#f0f0f0", label: "White" },
  Mixed: { bg: "conic-gradient(#ff0033 0deg, #8800ff 120deg, #00ddff 240deg, #ff0033 360deg)", label: "Mixed" },
};

function ProductCard({ p }) {
  const { addItem } = useCart();
  const toast = useToast();
  const [sel, setSel] = useState({ color: p.colors[0], size: p.sizes[0], qty: 1 });
  const [hovered, setHovered] = useState(false);

  function handleAdd() {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.image, ...sel });
    toast(`${p.name} added to cart`, { type: "success" });
  }

  const lineTotal = (p.price * sel.qty).toFixed(0);

  return (
    <article
      className="merch-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Media */}
      <div className="merch-card__media">
        <img src={p.image} alt={p.name} loading="lazy" />
        {p.badge && (
          <span
            className="merch-card__badge"
            style={{ background: p.badgeColor || "var(--brand)" }}
          >
            {p.badge}
          </span>
        )}
        {/* Quick-add overlay */}
        <div
          className="merch-card__quickadd"
          style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? "auto" : "none" }}
        >
          <button
            className="btn btn--primary"
            onClick={handleAdd}
            style={{
              transform: hovered ? "translateY(0)" : "translateY(12px)",
              transition: "transform .3s ease",
            }}
          >
            Quick Add →
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="merch-card__body">
        <div className="merch-card__header">
          <h3 className="merch-card__name">{p.name}</h3>
          <span className="merch-card__price">{p.price} €</span>
        </div>
        <p className="merch-card__desc">{p.description}</p>

        {/* Color */}
        {p.colors.length > 0 && (
          <div className="merch-card__opt-row">
            <span className="merch-card__opt-label">Color</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {p.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  title={COLOR_MAP[c]?.label || c}
                  onClick={() => setSel((s) => ({ ...s, color: c }))}
                  aria-label={c}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: COLOR_MAP[c]?.bg || "#444",
                    border: sel.color === c ? "2px solid #fff" : "2px solid transparent",
                    boxShadow: sel.color === c ? "0 0 0 1px var(--brand), 0 0 8px var(--brand-glow)" : "none",
                    cursor: "pointer",
                    transition: "box-shadow .15s, border-color .15s, transform .15s",
                    transform: sel.color === c ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
              <span style={{ fontSize: 12, color: "var(--muted-2)", marginLeft: 4 }}>{sel.color}</span>
            </div>
          </div>
        )}

        {/* Size */}
        <div className="merch-card__opt-row">
          <span className="merch-card__opt-label">Size</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {p.sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSel((s) => ({ ...s, size: sz }))}
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  background: sel.size === sz ? "var(--brand)" : "var(--bg-raised)",
                  border: `1px solid ${sel.size === sz ? "var(--brand)" : "var(--border-2)"}`,
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  cursor: "pointer",
                  transition: "background .15s, border-color .15s",
                }}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Qty + Add */}
        <div className="merch-card__actions">
          <div className="merch-card__qty">
            <button onClick={() => setSel((s) => ({ ...s, qty: Math.max(1, s.qty - 1) }))} aria-label="Decrease">−</button>
            <span>{sel.qty}</span>
            <button onClick={() => setSel((s) => ({ ...s, qty: Math.min(10, s.qty + 1) }))} aria-label="Increase">+</button>
          </div>
          <button
            className="btn btn--primary"
            style={{ flex: 1 }}
            onClick={handleAdd}
          >
            Add — {lineTotal} €
          </button>
        </div>
      </div>
    </article>
  );
}

function CartSidebar() {
  const { cart, inc, dec, removeItem, clearCart, subtotal, totalItems } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  const serviceFee = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + serviceFee).toFixed(2);
  const freeShippingThreshold = 100;
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const unlocked = subtotal >= freeShippingThreshold;

  async function goCheckout() {
    if (!cart.length || checkingOut) return;
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; return; }
      if (data.id) {
        const { loadStripe } = await import("@stripe/stripe-js");
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        await stripe.redirectToCheckout({ sessionId: data.id });
        return;
      }
      alert("Checkout unavailable — please try again later.");
    } catch {
      alert("Something went wrong.");
    } finally {
      setCheckingOut(false);
    }
  }

  return (
    <aside className="merch-cart">
      {/* Free shipping bar */}
      <div className="merch-cart__shipping">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: unlocked ? "var(--green)" : "var(--muted-2)" }}>
            {unlocked ? "✓ Free shipping unlocked!" : `Free shipping over €${freeShippingThreshold}`}
          </span>
          {!unlocked && (
            <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}>
              {(freeShippingThreshold - subtotal).toFixed(0)} € away
            </span>
          )}
        </div>
        <div style={{ height: 4, background: "var(--bg-raised)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${freeShippingProgress}%`,
            background: unlocked ? "var(--green)" : "var(--brand)",
            borderRadius: 2,
            transition: "width .4s ease",
            boxShadow: unlocked ? "0 0 8px rgba(0,255,136,.5)" : "0 0 8px var(--brand-glow)",
          }} />
        </div>
      </div>

      {/* Header */}
      <div className="cart__head">
        <h2 className="cart__title">
          Cart
          {totalItems > 0 && (
            <span style={{ marginLeft: 8, fontSize: 14, color: "var(--brand)", fontWeight: 800 }}>({totalItems})</span>
          )}
        </h2>
        {cart.length > 0 && (
          <button className="btn-link" onClick={clearCart}>Clear all</button>
        )}
      </div>

      {/* Items */}
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "36px 0" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: 3, color: "var(--muted)", marginBottom: 8 }}>EMPTY</p>
          <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>Your cart is empty.</p>
          <Link href="/tickets" className="btn btn--ghost btn--sm">Browse Tickets →</Link>
        </div>
      ) : (
        <ul className="cart__list">
          {cart.map((item, idx) => (
            <li key={`${item.id}-${idx}`} className="cart__row">
              <div className="cart__thumb">
                <img src={item.image || "/hero.png"} alt={item.name} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="cart__item-name">{item.name}</p>
                <p className="cart__meta">{[item.color, item.size].filter(Boolean).join(" · ")}</p>
                <div className="cart__qty">
                  <button onClick={() => dec(idx)} aria-label="Decrease">−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => inc(idx)} aria-label="Increase">+</button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                <span className="cart__price">{(item.price * item.qty).toFixed(2)} €</span>
                <button className="cart__remove" onClick={() => removeItem(idx)} aria-label="Remove item">✕</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Totals */}
      <hr className="cart__divider" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted-2)" }}>
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)} €</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted-2)" }}>
          <span>Service fee (5%)</span>
          <span>{serviceFee.toFixed(2)} €</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted-2)" }}>
          <span>Shipping</span>
          <span style={{ color: unlocked ? "var(--green)" : undefined }}>{unlocked ? "FREE" : "at checkout"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 8, borderTop: "1px solid var(--border)" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted-2)" }}>Total</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 30, letterSpacing: 2, color: "var(--brand)" }}>{total.toFixed(2)} €</span>
        </div>
      </div>

      <button
        className="btn btn--primary btn--block"
        onClick={goCheckout}
        disabled={!cart.length || checkingOut}
        style={{ marginBottom: 8 }}
      >
        {checkingOut ? "Redirecting…" : "Checkout →"}
      </button>
      <Link href="/checkout" className="btn btn--ghost btn--block btn--sm">
        View Full Cart
      </Link>
      <p className="cart__note">Secure checkout · SSL encrypted · Stripe payments</p>
    </aside>
  );
}

export default function Merch() {
  const [category, setCategory] = useState("All");

  const filtered = category === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === category);

  return (
    <>
      <Head>
        <title>Merch • Hellgate Project</title>
        <meta name="description" content="Official Hellgate Project merchandise — t-shirts, hoodies, caps and more. Wear the gate." />
      </Head>

      {/* ═══ PAGE HERO ═══ */}
      <div className="page-hero" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 90% at 80% 50%, rgba(136,0,255,.06) 0%, transparent 70%)",
        }} />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow">// Official Store</span>
          <h1>Merch</h1>
          <p>Wear the gate — {PRODUCTS.length} items available</p>
        </div>
      </div>

      {/* ═══ CATEGORY FILTER ═══ */}
      <div style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", position: "sticky", top: 72, zIndex: 20 }}>
        <div className="container">
          <div style={{ display: "flex", gap: 0 }}>
            {CATEGORIES.map((cat) => {
              const count = cat === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "16px 24px",
                    background: "transparent",
                    border: "none",
                    borderBottom: `2px solid ${category === cat ? "var(--brand)" : "transparent"}`,
                    color: category === cat ? "#fff" : "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "color .2s, border-color .2s",
                    marginBottom: -1,
                  }}
                >
                  {cat}
                  <span style={{
                    background: category === cat ? "var(--brand-dim)" : "var(--bg-raised)",
                    border: `1px solid ${category === cat ? "rgba(255,0,51,.3)" : "var(--border-2)"}`,
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 800,
                    color: category === cat ? "var(--brand)" : "var(--muted)",
                    padding: "2px 7px",
                    minWidth: 22,
                    textAlign: "center",
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ PRODUCTS + CART ═══ */}
      <section className="section section--dark">
        <div className="container merch-layout">
          <div>
            <div className="merch-grid">
              {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
            {filtered.length === 0 && (
              <p style={{ color: "var(--muted-2)", textAlign: "center", padding: "80px 0", fontSize: 14, letterSpacing: 2 }}>
                NO PRODUCTS IN THIS CATEGORY
              </p>
            )}
          </div>
          <CartSidebar />
        </div>
      </section>

      <style jsx>{`
        /* Merch card */
        .merch-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color .25s, transform .25s, box-shadow .25s;
        }
        .merch-card:hover {
          border-color: rgba(255,0,51,.35);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,.6), 0 0 0 1px rgba(255,0,51,.08);
        }
        .merch-card__media {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #080808;
        }
        .merch-card__media img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform .45s ease, filter .45s ease;
          filter: saturate(80%) contrast(108%);
        }
        .merch-card:hover .merch-card__media img {
          transform: scale(1.07);
          filter: saturate(105%) contrast(110%);
        }
        .merch-card__badge {
          position: absolute; top: 10px; left: 10px;
          font-size: 10px; font-weight: 800; letter-spacing: 2px;
          text-transform: uppercase; padding: 5px 10px;
          border-radius: 4px; color: #fff;
        }
        .merch-card__quickadd {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.55);
          backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          transition: opacity .25s;
        }
        .merch-card__body {
          padding: 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .merch-card__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }
        .merch-card__name {
          font-family: var(--font-display);
          font-size: 19px;
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height: 1.1;
        }
        .merch-card__price {
          font-family: var(--font-display);
          font-size: 22px;
          letter-spacing: 1px;
          color: var(--brand);
          white-space: nowrap;
        }
        .merch-card__desc {
          font-size: 12px;
          color: var(--muted-2);
          line-height: 1.6;
        }
        .merch-card__opt-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .merch-card__opt-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted-2);
        }
        .merch-card__actions {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: auto;
        }
        .merch-card__qty {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-raised);
          border: 1px solid var(--border-2);
          border-radius: 8px;
          padding: 0 10px;
          height: 48px;
        }
        .merch-card__qty button {
          background: none;
          border: none;
          color: var(--muted-2);
          font-size: 18px;
          cursor: pointer;
          padding: 0 2px;
          transition: color .15s;
          line-height: 1;
        }
        .merch-card__qty button:hover { color: #fff; }
        .merch-card__qty span {
          font-family: var(--font-display);
          font-size: 20px;
          min-width: 22px;
          text-align: center;
          letter-spacing: 1px;
        }

        /* Cart sidebar overrides */
        .merch-cart {
          position: sticky;
          top: calc(72px + 53px);
          height: fit-content;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .merch-cart__shipping {
          background: rgba(0,255,136,.04);
          border: 1px solid rgba(0,255,136,.12);
          border-radius: 10px;
          padding: 12px 14px;
          margin-bottom: 16px;
        }
      `}</style>
    </>
  );
}
