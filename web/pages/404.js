import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — Hellgate Project</title>
      </Head>

      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "0 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255,0,51,.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Big 404 */}
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(120px, 25vw, 260px)",
          lineHeight: .85,
          color: "rgba(255,0,51,.08)",
          position: "absolute",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: 10,
        }}>
          404
        </p>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "var(--brand)", display: "block", marginBottom: 16 }}>
            // Error 404
          </span>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 7vw, 80px)",
            letterSpacing: 4,
            textTransform: "uppercase",
            lineHeight: 1,
            marginBottom: 16,
          }}>
            Wrong Gate
          </h1>
          <p style={{ color: "var(--muted-2)", fontSize: 15, marginBottom: 36, maxWidth: 360, margin: "0 auto 36px" }}>
            This page doesn't exist or was moved. The real gates are below.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn--primary">Back to Home</Link>
            <Link href="/events" className="btn btn--ghost">View Events</Link>
            <Link href="/tickets" className="btn btn--outline-brand">Get Tickets</Link>
          </div>
        </div>
      </div>
    </>
  );
}
