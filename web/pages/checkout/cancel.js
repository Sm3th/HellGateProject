import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutCancel() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Head>
        <title>Payment Cancelled — Hellgate Project</title>
      </Head>

      <div className="cancel-page">
        <div className="cancel-page__bg" aria-hidden />

        <div className={`cancel-page__inner${visible ? " cancel-page__inner--visible" : ""}`}>
          {/* X mark */}
          <div className={`cancel-icon${visible ? " cancel-icon--visible" : ""}`}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M10 10 L30 30 M30 10 L10 30"
                stroke="var(--brand)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="60"
                strokeDashoffset={visible ? 0 : 60}
                style={{ transition: "stroke-dashoffset .5s ease .2s" }}
              />
            </svg>
          </div>

          {/* Text */}
          <span className="cancel-eyebrow">// Payment Cancelled</span>
          <h1 className="cancel-title">Aborted</h1>
          <p className="cancel-sub">
            Your payment was not processed and you have not been charged.
            Your cart items are still saved — pick up where you left off.
          </p>

          {/* Reason chips */}
          <div className="cancel-reasons">
            <p className="cancel-reasons__label">What went wrong?</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {["Changed my mind", "Payment issue", "Wrong items", "Just browsing"].map((r) => (
                <span key={r} className="cancel-reason-chip">{r}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="cancel-actions">
            <Link href="/tickets" className="btn btn--primary btn--lg">Try Again →</Link>
            <Link href="/merch" className="btn btn--outline-brand btn--lg">Browse Merch</Link>
            <Link href="/" className="btn btn--ghost btn--lg">Back Home</Link>
          </div>

          {/* Help */}
          <div className="cancel-help">
            <p>Having trouble checking out?</p>
            <a href="mailto:contact@hellgateproject.com" style={{ color: "var(--brand)", fontWeight: 700 }}>
              contact@hellgateproject.com →
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cancel-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 60px;
          position: relative;
          overflow: hidden;
        }
        .cancel-page__bg {
          position: fixed; inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,0,51,.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .cancel-page__inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 560px;
          width: 100%;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .5s ease, transform .5s ease;
        }
        .cancel-page__inner--visible { opacity: 1; transform: none; }
        .cancel-icon {
          width: 90px; height: 90px;
          border-radius: 50%;
          border: 2px solid rgba(255,0,51,.2);
          background: rgba(255,0,51,.04);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 28px;
          transition: box-shadow .5s ease .3s;
        }
        .cancel-icon--visible {
          box-shadow: 0 0 24px rgba(255,0,51,.12), 0 0 60px rgba(255,0,51,.04);
        }
        .cancel-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--brand);
          margin-bottom: 12px;
        }
        .cancel-title {
          font-family: var(--font-display);
          font-size: clamp(56px, 10vw, 100px);
          letter-spacing: 6px;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 20px;
        }
        .cancel-sub {
          font-size: 15px;
          color: var(--muted-2);
          line-height: 1.75;
          max-width: 420px;
          margin-bottom: 32px;
        }
        .cancel-reasons {
          width: 100%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 20px 24px;
          margin-bottom: 28px;
        }
        .cancel-reasons__label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-bottom: 14px;
        }
        .cancel-reason-chip {
          display: inline-block;
          padding: 6px 14px;
          background: var(--bg-raised);
          border: 1px solid var(--border-2);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: var(--muted-2);
          cursor: default;
          letter-spacing: .5px;
        }
        .cancel-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 36px;
        }
        .cancel-help {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--muted);
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
