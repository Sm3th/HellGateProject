import Head from "next/head";
import Link from "next/link";

export default function CheckoutCancel() {
  return (
    <>
      <Head>
        <title>Payment Cancelled • Hellgate Project</title>
      </Head>

      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "72px 24px 48px",
        background: "radial-gradient(ellipse at center, rgba(255,0,51,.04) 0%, transparent 70%)",
      }}>
        <div style={{
          width: 96, height: 96,
          borderRadius: "50%",
          border: "2px solid rgba(255,0,51,.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 32,
          boxShadow: "0 0 24px rgba(255,0,51,.1)",
        }}>
          <span style={{ fontSize: 36, color: "var(--brand)" }}>✕</span>
        </div>

        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "var(--brand)", marginBottom: 12 }}>
          // Payment Cancelled
        </span>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(40px, 8vw, 80px)",
          letterSpacing: 4,
          textTransform: "uppercase",
          lineHeight: 1,
          marginBottom: 16,
        }}>
          Aborted
        </h1>
        <p style={{ color: "var(--muted-2)", fontSize: 15, lineHeight: 1.7, maxWidth: 400, margin: "0 auto 36px" }}>
          Your payment was not processed and you have not been charged.
          Your cart is still waiting for you.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/tickets" className="btn btn--primary">Try Again</Link>
          <Link href="/merch" className="btn btn--outline-brand">Go to Merch</Link>
          <Link href="/" className="btn btn--ghost">Back to Home</Link>
        </div>

        <p style={{ marginTop: 32, fontSize: 13, color: "var(--muted)" }}>
          Having issues? Contact us at{" "}
          <a href="mailto:contact@hellgateproject.com" style={{ color: "var(--brand)" }}>
            contact@hellgateproject.com
          </a>
        </p>
      </div>
    </>
  );
}
