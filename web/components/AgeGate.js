import { useEffect, useState } from "react";

const KEY = "hg_age_ok";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(KEY)) setVisible(true);
    } catch {
      // sessionStorage blocked (SSR / privacy mode) — skip gate
    }
  }, []);

  function allow() {
    try { sessionStorage.setItem(KEY, "1"); } catch {}
    setVisible(false);
  }

  function deny() {
    setDenied(true);
    setTimeout(() => { window.location.href = "https://www.google.com"; }, 1800);
  }

  if (!visible) return null;

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-label="Age verification">
      <div className="age-gate__card">
        {/* Background glitch text */}
        <div className="age-gate__bg-text" aria-hidden>18+</div>

        <div className="age-gate__logo">
          <img src="/logo.png" alt="Hellgate Project" />
        </div>

        {denied ? (
          <div className="age-gate__denied">
            <p className="age-gate__heading">Access Denied</p>
            <p className="age-gate__sub">You must be 18 or older to enter.</p>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 16, letterSpacing: 2 }}>
              Redirecting…
            </p>
          </div>
        ) : (
          <>
            <p className="age-gate__heading">Are you 18 or older?</p>
            <p className="age-gate__sub">
              This site contains content related to events with an 18+ age restriction.
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
              By entering you confirm you are of legal age and agree to our terms.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
