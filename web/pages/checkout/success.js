import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NEXT_STEPS = [
  { icon: "📧", title: "Check Your Email",  text: "Ticket + receipt sent to your inbox within minutes." },
  { icon: "📍", title: "Location Drop",     text: "Venue revealed 48h before the event via email & Instagram." },
  { icon: "🪪", title: "Bring Your ID",    text: "18+ strictly enforced — no exceptions at the door." },
  { icon: "📱", title: "Save the Date",    text: "Add to your calendar. Doors open at 22:00." },
];

export default function CheckoutSuccess() {
  const { query } = useRouter();
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTick(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    try { localStorage.removeItem("hg_cart"); } catch {}
  }, []);

  const orderId = query.session_id ? query.session_id.slice(-12).toUpperCase() : null;

  return (
    <>
      <Head>
        <title>You're In — Hellgate Project</title>
      </Head>

      <div className="success-page">
        {/* Ambient glow */}
        <div className="success-page__bg" aria-hidden />

        <div className="success-page__inner">
          {/* Check mark */}
          <div className={`success-check${tick ? " success-check--visible" : ""}`}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path
                d="M8 22 L18 32 L36 12"
                stroke="var(--green)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="50"
                strokeDashoffset={tick ? 0 : 50}
                style={{ transition: "stroke-dashoffset .6s ease .3s" }}
              />
            </svg>
          </div>

          {/* Label + title */}
          <span className="success-eyebrow">// Payment Confirmed</span>
          <h1 className="success-title">You're In</h1>
          <p className="success-sub">
            Your ticket has been confirmed. A receipt and your ticket have been sent to your email.
            The venue location will be revealed 48 hours before the event.
          </p>

          {orderId && (
            <div className="success-order-id">
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "var(--muted)" }}>ORDER</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: 3, color: "var(--muted-2)" }}>#{orderId}</span>
            </div>
          )}

          {/* Next steps */}
          <div className="success-steps">
            {NEXT_STEPS.map((s, i) => (
              <div
                key={s.title}
                className="success-step"
                style={{
                  animationDelay: `${0.2 + i * 0.1}s`,
                  opacity: tick ? 1 : 0,
                  transform: tick ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity .4s ease ${0.2 + i * 0.1}s, transform .4s ease ${0.2 + i * 0.1}s`,
                }}
              >
                <span className="success-step__icon">{s.icon}</span>
                <p className="success-step__title">{s.title}</p>
                <p className="success-step__text">{s.text}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }}>
            <Link href="/lineup" className="btn btn--outline-brand btn--lg">View Line-up</Link>
            <Link href="/" className="btn btn--ghost btn--lg">Back to Home</Link>
          </div>

          {/* Instagram follow */}
          <div className="success-instagram">
            <p>Follow us for the venue drop</p>
            <a
              href="https://www.instagram.com/hellgate.project/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--brand)", fontWeight: 700 }}
            >
              @hellgate.project →
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .success-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 60px;
          position: relative;
          overflow: hidden;
        }
        .success-page__bg {
          position: fixed; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,255,136,.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .success-page__inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 680px;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .success-check {
          width: 96px; height: 96px;
          border-radius: 50%;
          border: 2px solid rgba(0,255,136,.25);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 28px;
          background: rgba(0,255,136,.04);
          transition: box-shadow .6s ease;
        }
        .success-check--visible {
          box-shadow: 0 0 32px rgba(0,255,136,.2), 0 0 80px rgba(0,255,136,.05);
        }
        .success-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 12px;
        }
        .success-title {
          font-family: var(--font-display);
          font-size: clamp(56px, 10vw, 100px);
          letter-spacing: 6px;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 20px;
          animation: fade-in .5s ease .1s both;
        }
        .success-sub {
          font-size: 15px;
          color: var(--muted-2);
          line-height: 1.75;
          max-width: 480px;
          margin-bottom: 16px;
          animation: fade-in .5s ease .2s both;
        }
        .success-order-id {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
          padding: 12px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          margin-bottom: 36px;
        }
        .success-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          width: 100%;
        }
        .success-step {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px 14px;
          text-align: left;
        }
        .success-step__icon { font-size: 22px; display: block; margin-bottom: 10px; }
        .success-step__title { font-weight: 700; font-size: 13px; margin-bottom: 5px; color: #fff; }
        .success-step__text { font-size: 12px; color: var(--muted-2); line-height: 1.6; }
        .success-instagram {
          margin-top: 40px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--muted);
        }
        @media (max-width: 680px) {
          .success-steps { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 400px) {
          .success-steps { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
