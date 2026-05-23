import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const EVENTS = [
  { id: "gate02",     label: "Gate:02 — 19 Sep 2026 — Istanbul" },
  { id: "afterhours", label: "Afterhours — 03 Oct 2026 — Istanbul" },
  { id: "winter",     label: "Winter Special — 12 Dec 2026 — Ankara" },
];

const TIERS = [
  {
    id: "early-bird",
    name: "Early Bird",
    price: 25,
    currency: "EUR",
    badge: null,
    featured: false,
    available: true,
    note: "Limited quantity — first come, first served",
    perks: [
      { text: "General admission",      included: true  },
      { text: "Fast-track entry lane",  included: true  },
      { text: "18+ • Valid ID required",included: true  },
      { text: "Cloakroom included",     included: false },
      { text: "Artist lounge access",   included: false },
      { text: "Complimentary drinks",   included: false },
    ],
  },
  {
    id: "general",
    name: "General",
    price: 35,
    currency: "EUR",
    badge: "Most Popular",
    featured: true,
    available: true,
    note: null,
    perks: [
      { text: "General admission",      included: true  },
      { text: "Fast-track entry lane",  included: true  },
      { text: "18+ • Valid ID required",included: true  },
      { text: "Cloakroom included",     included: true  },
      { text: "Artist lounge access",   included: false },
      { text: "Complimentary drinks",   included: false },
    ],
  },
  {
    id: "backstage",
    name: "Backstage VIP",
    price: 60,
    currency: "EUR",
    badge: "VIP",
    featured: false,
    available: true,
    note: "Extremely limited",
    perks: [
      { text: "Priority VIP entry",     included: true  },
      { text: "Fast-track entry lane",  included: true  },
      { text: "18+ • Valid ID required",included: true  },
      { text: "Cloakroom included",     included: true  },
      { text: "Artist lounge access",   included: true  },
      { text: "2 complimentary drinks", included: true  },
    ],
  },
];

export default function TicketsPage() {
  const { addItem, totalItems } = useCart();
  const toast = useToast();

  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0].id);
  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(TIERS.map((t) => [t.id, 1]))
  );
  const [apiTiers, setApiTiers] = useState([]);

  useEffect(() => {
    fetch("/api/tickets")
      .then((r) => r.json())
      .then((d) => setApiTiers(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  // Merge API data into tiers (availability overrides)
  const tiers = TIERS.map((t, i) => {
    const api = apiTiers[i];
    return api ? { ...t, available: api.available ?? t.available, price: api.price ?? t.price } : t;
  });

  const selectedEventLabel = EVENTS.find((e) => e.id === selectedEvent)?.label ?? "";

  function setQty(tierId, val) {
    setQuantities((q) => ({ ...q, [tierId]: Math.max(1, Math.min(10, Number(val) || 1)) }));
  }

  function handleAddToCart(tier) {
    if (!tier.available) return;
    addItem({
      id: `ticket-${tier.id}-${selectedEvent}`,
      name: `${tier.name} Ticket`,
      event: selectedEventLabel,
      price: tier.price,
      qty: quantities[tier.id],
      image: "/hero.png",
      color: null,
      size: null,
    });
    toast(`${tier.name} ticket added to cart`, { type: "success" });
  }

  function handleBuyNow(tier) {
    if (!tier.available) return;
    addItem({
      id: `ticket-${tier.id}-${selectedEvent}`,
      name: `${tier.name} Ticket`,
      event: selectedEventLabel,
      price: tier.price,
      qty: quantities[tier.id],
      image: "/hero.png",
      color: null,
      size: null,
    });
    window.location.href = "/checkout";
  }

  return (
    <>
      <Head>
        <title>Tickets • Hellgate Project</title>
        <meta name="description" content="Buy tickets for Hellgate Project events." />
      </Head>

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">// Secure Your Spot</span>
          <h1>Tickets</h1>
          <p>Limited capacity — no door sales</p>
        </div>
      </div>

      {/* EVENT SELECTOR */}
      <div style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "20px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--muted-2)", whiteSpace: "nowrap" }}>
              Select Event:
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {EVENTS.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev.id)}
                  className="btn btn--sm"
                  style={{
                    background: selectedEvent === ev.id ? "var(--brand)" : "transparent",
                    border: `1px solid ${selectedEvent === ev.id ? "var(--brand)" : "var(--border-2)"}`,
                    color: "#fff",
                  }}
                >
                  {ev.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TICKET TIERS */}
      <section className="section section--dark">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="ticket-grid">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`ticket-tier ${tier.featured ? "ticket-tier--featured" : ""} ${!tier.available ? "ticket-tier--unavailable" : ""}`}
              >
                <div className="ticket-tier__header">
                  {tier.badge && <div className="ticket-tier__featured-badge">{tier.badge}</div>}
                  <div className="ticket-tier__name">{tier.name}</div>
                  <div className="ticket-tier__price-row">
                    <div className="ticket-tier__price">{tier.price}</div>
                    <div className="ticket-tier__currency">{tier.currency}</div>
                  </div>
                  {tier.note && (
                    <p style={{ fontSize: 11, color: "var(--muted-2)", marginTop: 8, letterSpacing: 1 }}>{tier.note}</p>
                  )}
                </div>

                <div className="ticket-tier__body">
                  {/* Perks */}
                  <ul className="ticket-tier__perks">
                    {tier.perks.map((p) => (
                      <li key={p.text} className={`ticket-tier__perk ${p.included ? "" : "ticket-tier__perk--muted"}`}>
                        {p.text}
                      </li>
                    ))}
                  </ul>

                  {tier.available && (
                    <>
                      {/* Quantity selector */}
                      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg-raised)", border: "1px solid var(--border-2)", borderRadius: 10, padding: "10px 14px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted-2)", flex: 1 }}>Qty</span>
                        <button
                          onClick={() => setQty(tier.id, quantities[tier.id] - 1)}
                          style={{ width: 30, height: 30, borderRadius: 6, background: "var(--bg-card)", border: "1px solid var(--border-2)", color: "#fff", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
                        >−</button>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: 22, minWidth: 32, textAlign: "center", letterSpacing: 2 }}>
                          {quantities[tier.id]}
                        </span>
                        <button
                          onClick={() => setQty(tier.id, quantities[tier.id] + 1)}
                          style={{ width: 30, height: 30, borderRadius: 6, background: "var(--bg-card)", border: "1px solid var(--border-2)", color: "#fff", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
                        >+</button>
                      </div>

                      {/* Total for this tier */}
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted-2)", paddingBottom: 4 }}>
                        <span>{quantities[tier.id]} × {tier.price} €</span>
                        <span style={{ fontWeight: 700, color: "#fff" }}>{(tier.price * quantities[tier.id]).toFixed(2)} €</span>
                      </div>
                    </>
                  )}

                  {/* Action buttons */}
                  {tier.available ? (
                    <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                      <button
                        className={`btn btn--block btn--lg ${tier.featured ? "btn--primary" : "btn--outline-brand"}`}
                        onClick={() => handleBuyNow(tier)}
                      >
                        Buy Now →
                      </button>
                      <button
                        className="btn btn--block btn--ghost"
                        onClick={() => handleAddToCart(tier)}
                        style={{ fontSize: 12 }}
                      >
                        + Add to Cart
                      </button>
                    </div>
                  ) : (
                    <button className="btn btn--block btn--disabled btn--ghost">Sold Out</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart bar — göster eğer sepette bir şey varsa */}
      {totalItems > 0 && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 500,
          background: "rgba(5,5,5,.95)", backdropFilter: "blur(12px)",
          borderTop: "1px solid var(--border)",
          padding: "14px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          animation: "slide-up .3s ease",
        }}>
          <p style={{ fontSize: 14, color: "var(--muted-2)" }}>
            <span style={{ color: "#fff", fontWeight: 700 }}>{totalItems} item{totalItems !== 1 ? "s" : ""}</span> in your cart
          </p>
          <Link href="/checkout" className="btn btn--primary">
            Checkout →
          </Link>
        </div>
      )}

      {/* INFO BOXES */}
      <section className="section" style={{ paddingBottom: totalItems > 0 ? 100 : undefined }}>
        <div className="container--narrow">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { title: "Entry Policy",    icon: "🪪", text: "18+ strictly enforced. Bring a valid government-issued photo ID. No exceptions at the door." },
              { title: "Location",        icon: "📍", text: "Venue revealed 48 hours before the event via email and @hellgate.project on Instagram." },
              { title: "Refund Policy",   icon: "💳", text: "All sales final unless the event is cancelled. Name changes at door are subject to approval." },
              { title: "What to Bring",   icon: "🎒", text: "Valid ID, your ticket (digital accepted), comfortable clothing for a full-night experience." },
            ].map((item) => (
              <div key={item.title} style={{ padding: "20px 22px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12 }}>
                <p style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, color: "var(--brand)" }}>{item.title}</p>
                <p style={{ fontSize: 13, color: "var(--muted-2)", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .ticket-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        .ticket-tier--unavailable { opacity: .55; }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}
