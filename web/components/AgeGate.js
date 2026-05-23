import { useEffect, useState } from "react";

const KEY = "hg_age_ok";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);
  const [denied, setDenied] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(KEY)) setVisible(true);
    } catch {
      // sessionStorage blocked (SSR / privacy mode) — skip gate
    }
  }, []);

  function allow() {
    setLeaving(true);
    setTimeout(() => {
      try { sessionStorage.setItem(KEY, "1"); } catch {}
      setVisible(false);
    }, 350);
  }

  function deny() {
    setDenied(true);
    setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 2200);
  }

  if (!visible) return null;

  return (
    <div className={`age-gate${leaving ? " age-gate--leaving" : ""}`} role="dialog" aria-modal="true" aria-label="Age verification">
      {/* Scanlines */}
      <div className="age-gate__scanlines" aria-hidden />

      {/* Ambient glow */}
      <div className="age-gate__glow" aria-hidden />

      <div className="age-gate__card">
        {/* Giant bg text */}
        <div className="age-gate__bg-text" aria-hidden>18+</div>

        {/* Logo */}
        <div className="age-gate__logo">
          <img src="/logo.png" alt="Hellgate Project" />
        </div>

        {denied ? (
          <div className="age-gate__denied">
            <div className="age-gate__denied-icon">✕</div>
            <p className="age-gate__heading">Access Denied</p>
            <p className="age-gate__sub">You must be 18 or older to enter this site.</p>
            <div className="age-gate__leaving-bar">
              <div className="age-gate__leaving-bar-fill" />
            </div>
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 12, letterSpacing: 2, textTransform: "uppercase" }}>
              Redirecting…
            </p>
          </div>
        ) : (
          <>
            <div className="age-gate__divider" aria-hidden />
            <p className="age-gate__heading">Are you 18 or older?</p>
            <p className="age-gate__sub">
              This site contains content related to events with a strict 18+ age restriction.
              You must confirm your age to enter.
            </p>
            <div className="age-gate__actions">
              <button className="btn btn--primary btn--lg" onClick={allow}>
                Yes, I am 18+
              </button>
              <button className="btn btn--ghost" onClick={deny}>
                No, I'm under 18
              </button>
            </div>
            <p className="age-gate__legal">
              By entering you confirm you are of legal age in your jurisdiction and agree to our terms.
            </p>
          </>
        )}
      </div>

      <style jsx>{`
        .age-gate {
          position: fixed; inset: 0;
          z-index: 9000;
          background: rgba(3,3,3,.98);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          backdrop-filter: blur(12px);
          animation: age-fade-in .4s ease both;
        }
        .age-gate--leaving {
          animation: age-fade-out .35s ease forwards;
        }
        @keyframes age-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes age-fade-out {
          from { opacity: 1; transform: none; }
          to   { opacity: 0; transform: scale(1.02); }
        }

        /* Scanlines overlay */
        .age-gate__scanlines {
          position: absolute; inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px, transparent 3px,
            rgba(0,0,0,.12) 3px, rgba(0,0,0,.12) 4px
          );
          z-index: 0;
        }
        /* Ambient glow */
        .age-gate__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,0,51,.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .age-gate__card {
          max-width: 520px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 1;
          animation: age-card-in .5s ease .1s both;
        }
        @keyframes age-card-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }

        .age-gate__bg-text {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -55%);
          font-family: var(--font-display);
          font-size: clamp(160px, 28vw, 260px);
          letter-spacing: 16px;
          color: rgba(255,0,51,.035);
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
          z-index: 0;
        }

        .age-gate__logo {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
        .age-gate__logo img {
          height: 56px;
          filter: drop-shadow(0 0 16px rgba(255,0,51,.6));
          animation: logo-pulse 3s ease-in-out infinite;
        }
        @keyframes logo-pulse {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(255,0,51,.5)); }
          50%       { filter: drop-shadow(0 0 24px rgba(255,0,51,.8)); }
        }

        .age-gate__divider {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--brand), transparent);
          margin: 0 auto 24px;
          position: relative;
          z-index: 1;
        }

        .age-gate__heading {
          font-family: var(--font-display);
          font-size: clamp(28px, 5vw, 52px);
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 14px;
          line-height: 1.1;
          position: relative;
          z-index: 1;
        }
        .age-gate__sub {
          font-size: 14px;
          color: var(--muted-2);
          line-height: 1.75;
          max-width: 380px;
          margin: 0 auto 32px;
          position: relative;
          z-index: 1;
        }
        .age-gate__actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 300px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .age-gate__legal {
          font-size: 11px;
          color: var(--muted);
          margin-top: 24px;
          letter-spacing: .5px;
          line-height: 1.65;
          max-width: 360px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        /* Denied state */
        .age-gate__denied {
          animation: fade-in .3s ease;
          position: relative;
          z-index: 1;
        }
        .age-gate__denied-icon {
          width: 72px; height: 72px;
          border-radius: 50%;
          border: 2px solid rgba(255,0,51,.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px;
          color: var(--brand);
          margin: 0 auto 20px;
          box-shadow: 0 0 24px rgba(255,0,51,.15);
        }
        .age-gate__leaving-bar {
          height: 2px;
          background: var(--border);
          border-radius: 1px;
          max-width: 200px;
          margin: 16px auto 0;
          overflow: hidden;
        }
        .age-gate__leaving-bar-fill {
          height: 100%;
          background: var(--brand);
          border-radius: 1px;
          animation: leaving-bar 2.2s linear forwards;
          box-shadow: 0 0 8px var(--brand-glow);
        }
        @keyframes leaving-bar {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
