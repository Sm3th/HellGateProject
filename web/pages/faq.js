import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const HOUSE_RULES = [
  { icon: "🪪", text: "18+ only. Valid government-issued photo ID is mandatory at the door. No exceptions, ever." },
  { icon: "🚫", text: "Zero tolerance for harassment, violence, or discriminatory behaviour of any kind." },
  { icon: "🤝", text: "Respect the music, the space, and each other. This is a safe space for everyone." },
  { icon: "📷", text: "Professional cameras and recording equipment require prior written permission." },
  { icon: "📍", text: "The exact venue location is revealed 48 hours before the event via email and Instagram." },
  { icon: "🚪", text: "No re-entry after leaving the venue unless explicitly permitted by staff." },
  { icon: "🛡️", text: "Security reserves the right to refuse entry or remove guests without refund." },
  { icon: "💳", text: "All ticket sales are final. Refunds only if the event is cancelled by the organiser." },
];

const FAQ_CATS = ["All", "General", "Venue", "Tickets", "Accessibility"];

const STATIC_FAQS = [
  { id: "s1", cat: "General",       q: "What is Hellgate Project?",        a: "Hellgate Project is an underground rave collective organising raw, unfiltered techno events across Istanbul and Ankara. We prioritise music, community, and safe spaces over mainstream culture." },
  { id: "s2", cat: "Venue",         q: "How do I find out the venue?",      a: "The exact location is shared 48 hours before the event via email (if you have a ticket) and through our Instagram story @hellgate.project. Do not share the address publicly." },
  { id: "s3", cat: "Tickets",       q: "Can I buy tickets at the door?",    a: "Occasionally a limited number of door tickets are available, but we strongly recommend buying in advance. Sold-out events will have no door sales." },
  { id: "s4", cat: "General",       q: "What's the dress code?",            a: "There is no strict dress code. Dark, comfortable clothing suitable for dancing all night is recommended. Dress for movement, not for Instagram." },
  { id: "s5", cat: "Venue",         q: "Are phones allowed?",               a: "Phones are permitted but we encourage you to put them away and be present. Photography of other attendees without consent is not tolerated. The dancefloor is a phone-free zone." },
  { id: "s6", cat: "Accessibility", q: "Is the venue accessible?",          a: "Accessibility varies by venue. We include accessibility information in the 48h location announcement. Contact us in advance if you have specific requirements." },
  { id: "s7", cat: "Tickets",       q: "Can I get a refund?",               a: "All ticket sales are final unless the event is cancelled. In the event of cancellation, a full refund will be processed automatically within 5–10 business days." },
  { id: "s8", cat: "General",       q: "How long does the event run?",      a: "Events typically run from 22:00 to 06:00+. The afterhours edition runs until approximately 10:00. Always check the specific event listing for exact times." },
  { id: "s9", cat: "Tickets",       q: "Can I transfer my ticket?",         a: "Ticket name changes are subject to approval and require a minimum of 24h notice. Contact us via the contact form with your order ID." },
  { id: "s10", cat: "Venue",        q: "Is there a cloakroom?",             a: "Yes — most events have a cloakroom. It is included with General and VIP tickets. Check your specific event listing for confirmation." },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className={`faq-item${open ? " faq-item--open" : ""}`} id={`faq-${item.id}`}>
      <button
        className="faq-item__q"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span>{item.q}</span>
        <span className={`faq-item__icon${open ? " faq-item__icon--open" : ""}`}>+</span>
      </button>
      <div className={`faq-item__a${open ? " faq-item__a--open" : ""}`}>
        <p style={{ padding: "0 20px 18px", fontSize: 14, color: "var(--muted-2)", lineHeight: 1.75 }}>
          {item.a ?? item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [apiFaqs, setApiFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  useEffect(() => {
    fetch("/api/faq")
      .then((r) => r.json())
      .then((d) => setApiFaqs(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  const allFaqs = useMemo(() => [...STATIC_FAQS, ...apiFaqs], [apiFaqs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allFaqs.filter((f) => {
      const matchesCat = cat === "All" || f.cat === cat;
      const matchesQ = !q || (f.q ?? f.question ?? "").toLowerCase().includes(q) || (f.a ?? f.answer ?? "").toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [allFaqs, cat, search]);

  const faqLD = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q ?? f.question,
      acceptedAnswer: { "@type": "Answer", text: f.a ?? f.answer },
    })),
  }), [allFaqs]);

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <Head>
        <title>Info & FAQ • Hellgate Project</title>
        <meta name="description" content="House rules, entry policy, FAQ and all information for Hellgate Project events." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      </Head>

      {/* ═══ PAGE HERO ═══ */}
      <div className="faq-page-hero">
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,0,51,.08) 0%, transparent 70%)
          `,
        }} aria-hidden />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow">// Everything You Need to Know</span>
          <h1>Info &amp; FAQ</h1>
          <p>House rules, entry policy and general information</p>
        </div>
      </div>

      {/* ═══ SUBNAV ═══ */}
      <nav className="faq-subnav" aria-label="FAQ sections">
        <div className="container faq-subnav__inner">
          <a href="#rules">House Rules</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* ═══ HOUSE RULES ═══ */}
      <section className="section section--dark" id="rules">
        <div className="container--narrow">
          <span className="eyebrow">// Non-Negotiable</span>
          <h2 className="section-title">House Rules</h2>
          <ul className="rules-list-enhanced">
            {HOUSE_RULES.map((rule, i) => (
              <li key={i} className="rule-item">
                <span className="rule-item__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="rule-item__icon">{rule.icon}</span>
                <span className="rule-item__text">{rule.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section" id="faq">
        <div className="container--narrow">
          <span className="eyebrow">// Common Questions</span>
          <h2 className="section-title">Frequently Asked</h2>

          {/* Search */}
          <div className="faq-search-wrap">
            <span className="faq-search-icon">⌕</span>
            <input
              className="faq-search"
              type="search"
              placeholder="Search questions…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setOpenId(null); }}
              aria-label="Search FAQ"
            />
            {search && (
              <button
                className="faq-search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="faq-cats">
            {FAQ_CATS.map((c) => (
              <button
                key={c}
                onClick={() => { setCat(c); setOpenId(null); }}
                className={`faq-cat-btn${cat === c ? " faq-cat-btn--active" : ""}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Results count */}
          {(search || cat !== "All") && (
            <p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 1, marginBottom: 16 }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              {search ? ` for "${search}"` : ""}
              {cat !== "All" ? ` in ${cat}` : ""}
            </p>
          )}

          {/* Accordion */}
          {filtered.length > 0 ? (
            <div className="faq-accordion">
              {filtered.map((item) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  open={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: 3, color: "var(--muted)", marginBottom: 8 }}>
                NO RESULTS
              </p>
              <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>
                Try a different search or category.
              </p>
              <button
                onClick={() => { setSearch(""); setCat("All"); }}
                className="btn btn--ghost btn--sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ CONTACT CTA ═══ */}
      <section className="section section--dark" id="contact">
        <div className="container--narrow">
          <div className="faq-contact-grid">
            <div>
              <span className="eyebrow" style={{ textAlign: "left", display: "block" }}>// Get in Touch</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,48px)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, lineHeight: 1 }}>
                Still have questions?
              </h2>
              <p style={{ color: "var(--muted-2)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
                For press, booking, partnerships and artist inquiries — or if you just can't find your answer above.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn--primary">Contact Us →</Link>
                <a href="mailto:contact@hellgateproject.com" className="btn btn--ghost">Email Us</a>
              </div>
            </div>
            <div className="faq-contact-links">
              {[
                { label: "General",  email: "contact@hellgateproject.com"  },
                { label: "Bookings", email: "booking@hellgateproject.com"  },
                { label: "Press",    email: "press@hellgateproject.com"    },
              ].map((c) => (
                <a key={c.label} href={`mailto:${c.email}`} className="faq-contact-item">
                  <span className="faq-contact-item__label">{c.label}</span>
                  <span className="faq-contact-item__email">{c.email}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Hero */
        .faq-page-hero {
          position: relative;
          overflow: hidden;
        }

        /* Enhanced rules list */
        .rules-list-enhanced {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .rule-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: border-color .2s, transform .2s;
        }
        .rule-item:hover {
          border-color: rgba(255,0,51,.25);
          transform: translateX(4px);
        }
        .rule-item__num {
          font-family: var(--font-display);
          font-size: 28px;
          color: rgba(255,0,51,.2);
          line-height: 1;
          flex-shrink: 0;
          min-width: 36px;
        }
        .rule-item__icon {
          font-size: 20px;
          flex-shrink: 0;
        }
        .rule-item__text {
          font-size: 14px;
          line-height: 1.55;
          color: rgba(255,255,255,.85);
        }

        /* Search */
        .faq-search-wrap {
          position: relative;
          margin-bottom: 16px;
        }
        .faq-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          color: var(--muted-2);
          pointer-events: none;
          line-height: 1;
        }
        .faq-search {
          width: 100%;
          height: 52px;
          padding: 0 48px 0 48px;
          background: var(--bg-raised);
          border: 1px solid var(--border-2);
          border-radius: 10px;
          color: #fff;
          font-family: var(--font-body);
          font-size: 15px;
          transition: border-color .2s, box-shadow .2s;
        }
        .faq-search:focus {
          outline: none;
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(255,0,51,.1);
        }
        .faq-search::placeholder { color: var(--muted); }
        .faq-search::-webkit-search-cancel-button { display: none; }
        .faq-search-clear {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--bg-card);
          border: 1px solid var(--border-2);
          border-radius: 6px;
          color: var(--muted-2);
          font-size: 12px;
          width: 26px; height: 26px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: color .2s, border-color .2s;
        }
        .faq-search-clear:hover { color: #fff; border-color: var(--brand); }

        /* Category filter */
        .faq-cats {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .faq-cat-btn {
          padding: 6px 16px;
          border-radius: 999px;
          border: 1px solid var(--border-2);
          background: transparent;
          color: var(--muted-2);
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background .2s, color .2s, border-color .2s;
          white-space: nowrap;
        }
        .faq-cat-btn:hover { color: #fff; border-color: rgba(255,255,255,.3); }
        .faq-cat-btn--active {
          background: var(--brand-dim);
          border-color: rgba(255,0,51,.4);
          color: var(--brand);
        }

        /* Accordion open state border */
        .faq-item--open {
          border-color: rgba(255,0,51,.25);
        }
        .faq-item--open .faq-item__q {
          color: var(--brand);
        }

        /* Contact section */
        .faq-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .faq-contact-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .faq-contact-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 16px 18px;
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: border-color .2s, transform .2s;
        }
        .faq-contact-item:hover {
          border-color: rgba(255,0,51,.3);
          transform: translateX(4px);
        }
        .faq-contact-item__label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--brand);
        }
        .faq-contact-item__email {
          font-size: 14px;
          color: var(--muted-2);
          transition: color .2s;
        }
        .faq-contact-item:hover .faq-contact-item__email { color: #fff; }

        @media (max-width: 700px) {
          .faq-contact-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </>
  );
}
