import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CheckoutSuccess() {
  const { query } = useRouter();
  const [tick, setTick] = useState(0);

  // Animated checkmark appearance
  useEffect(() => {
    const t = setTimeout(() => setTick(1), 100);
    return () => clearTimeout(t);
  }, []);

  // Clear cart from localStorage on success
  useEffect(() => {
    try { localStorage.removeItem("hg_cart"); } catch {}
  }, []);

  return (
    <>
      <Head>
        <title>Payment Successful • Hellgate Project</title>
      </Head>

      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "72px 24px 48px",
        background: "radial-gradient(ellipse at center, rgba(0,255,136,.04) 0%, transparent 70%)",
      }}>
        {/* Animated circle */}
        <div style={{
          width: 96, height: 96,
          borderRadius: "50%",
          border: "2px solid rgba(0,255,136,.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 32,
          boxShadow: tick ? "0 0 32px rgba(0,255,136,.2)" : "none",
          transition: "box-shadow .6s ease",
          position: "relative",
        }}>
          <span style={{
            fontSize: 40,
            color: "var(--green)",
            opacity: tick ? 1 : 0,
            transform: tick ? "scale(1)" : "scale(.5)",
            transition: "opacity .4s ease .2s, transform .4s ease .2s",
            display: "block",
          }}>✓</span>
        </div>

        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "var(--green)", marginBottom: 12 }}>
          // Payment Confirmed
        </span>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(40px, 8vw, 80px)",
          letterSpacing: 4,
          textTransform: "uppercase",
          lineHeight: 1,
          marginBottom: 16,
        }}>
          You're In
        </h1>
        <p style={{ color: "var(--muted-2)", fontSize: 15, lineHeight: 1.7, maxWidth: 440, margin: "0 auto 12px" }}>
          Your ticket has been confirmed. A receipt has been sent to your email.
          The venue location will be revealed 48 hours before the event.
        </p>

        {query.session_id && (
          <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1, marginBottom: 36 }}>
            Order ID: {query.session_id.slice(-12).toUpperCase()}
          </p>
        )}

        {/* Info cards */}
        <div style={{ display: "flex", gap: 14, margin: "20px 0 36px", flexWrap: "wrap", justifyContent: "center", maxWidth: 560 }}>
          {[
            { icon: "📧", title: "Check Your Email", text: "Ticket + receipt sent within minutes" },
            { icon: "📍", title: "Location Drop", text: "Venue revealed 48h before the event" },
            { icon: "🪪", title: "Bring Your ID", text: "18+ strict — no exceptions at the door" },
          ].map((c) => (
            <div key={c.title} style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "16px 18px", flex: "1 1 140px", textAlign: "left",
            }}>
              <p style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</p>
              <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.title}</p>
              <p style={{ fontSize: 12, color: "var(--muted-2)" }}>{c.text}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/lineup" className="btn btn--outline-brand">View Line-up</Link>
          <Link href="/" className="btn btn--ghost">Back to Home</Link>
        </div>

        {/* Follow CTA */}
        <p style={{ marginTop: 40, fontSize: 13, color: "var(--muted)" }}>
          Follow{" "}
          <a href="https://www.instagram.com/hellgate.project/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand)" }}>
            @hellgate.project
          </a>
          {" "}for the venue drop &amp; updates
        </p>
      </div>
    </>
  );
}
