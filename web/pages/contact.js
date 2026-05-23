import Head from "next/head";
import { useState } from "react";
import { FaInstagram, FaSoundcloud } from "react-icons/fa";

const SUBJECTS = [
  { value: "general",     label: "General Enquiry" },
  { value: "booking",     label: "Artist Booking"  },
  { value: "press",       label: "Press / Media"   },
  { value: "partnership", label: "Partnership"     },
  { value: "ticket",      label: "Ticket Issue"    },
  { value: "other",       label: "Other"           },
];

const CONTACT_LINKS = [
  { label: "General",       email: "contact@hellgateproject.com" },
  { label: "Bookings",      email: "booking@hellgateproject.com" },
  { label: "Press & Media", email: "press@hellgateproject.com"  },
];

const SOCIALS = [
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/hellgate.project/", handle: "@hellgate.project" },
  { icon: FaSoundcloud, label: "SoundCloud", href: "https://soundcloud.com/hellgate", handle: "hellgate" },
];

const MAX_MSG = 1000;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });
  const [status, setStatus] = useState("idle");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const msgLen = form.message.length;

  return (
    <>
      <Head>
        <title>Contact • Hellgate Project</title>
        <meta name="description" content="Contact Hellgate Project for bookings, press, partnerships and general enquiries." />
      </Head>

      <div className="contact-page">
        <div className="container">
          <div className="contact-grid">

            {/* ═══ LEFT — INFO ═══ */}
            <div>
              <span className="eyebrow" style={{ textAlign: "left", display: "block", marginBottom: 16 }}>// Reach Out</span>
              <h1 className="contact-info__title">Contact<br />Us</h1>
              <p className="contact-info__text">
                Whether you're an artist, promoter, journalist, or just a raver with a question — we're here.
                Response time is typically 24–48 hours.
              </p>

              {/* Response time indicator */}
              <div className="contact-response-indicator">
                <span className="contact-response-dot" />
                <span style={{ fontSize: 12, color: "var(--muted-2)", letterSpacing: 1 }}>
                  Typically responds within <strong style={{ color: "#fff" }}>48 hours</strong>
                </span>
              </div>

              {/* Email links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {CONTACT_LINKS.map((c) => (
                  <a key={c.label} href={`mailto:${c.email}`} className="contact-email-card">
                    <span className="contact-email-card__label">{c.label}</span>
                    <span className="contact-email-card__email">{c.email}</span>
                    <span className="contact-email-card__arrow">→</span>
                  </a>
                ))}
              </div>

              {/* Social icons */}
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--muted-2)", marginBottom: 12 }}>
                Follow
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {SOCIALS.map(({ icon: Icon, label, href, handle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label={label}
                  >
                    <Icon size={18} />
                    <span>{handle}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* ═══ RIGHT — FORM ═══ */}
            <div>
              {status === "success" ? (
                <div className="contact-success">
                  <div className="contact-success__check">
                    <span>✓</span>
                  </div>
                  <p className="contact-success__title">Message Sent</p>
                  <p className="contact-success__sub">
                    We'll get back to you within 24–48 hours.
                  </p>
                  <button
                    onClick={() => { setForm({ name: "", email: "", subject: "general", message: "" }); setStatus("idle"); }}
                    className="btn btn--ghost btn--sm"
                    style={{ marginTop: 24 }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={onSubmit} noValidate>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form__field">
                      <label className="form__label" htmlFor="name">Your Name</label>
                      <input
                        id="name"
                        name="name"
                        className="form__input"
                        value={form.name}
                        onChange={onChange}
                        required
                        placeholder="Full name"
                        autoComplete="name"
                      />
                    </div>
                    <div className="form__field">
                      <label className="form__label" htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form__input"
                        value={form.email}
                        onChange={onChange}
                        required
                        placeholder="your@email.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="form__field">
                    <label className="form__label" htmlFor="subject">Subject</label>
                    <div style={{ position: "relative" }}>
                      <select
                        id="subject"
                        name="subject"
                        className="form__input contact-select"
                        value={form.subject}
                        onChange={onChange}
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "var(--muted-2)", pointerEvents: "none", fontSize: 12 }}>▾</span>
                    </div>
                  </div>

                  <div className="form__field">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <label className="form__label" htmlFor="message" style={{ marginBottom: 0 }}>Message</label>
                      <span style={{
                        fontSize: 11,
                        color: msgLen > MAX_MSG * 0.9 ? "var(--brand)" : "var(--muted)",
                        letterSpacing: 1,
                        fontWeight: 700,
                      }}>
                        {msgLen}/{MAX_MSG}
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      className="form__textarea"
                      value={form.message}
                      onChange={(e) => {
                        if (e.target.value.length <= MAX_MSG) onChange(e);
                      }}
                      required
                      placeholder="Tell us what's on your mind…"
                      rows={6}
                    />
                  </div>

                  {status === "error" && (
                    <div className="contact-error">
                      <span>⚠</span>
                      Something went wrong. Please try again or email us directly at{" "}
                      <a href="mailto:contact@hellgateproject.com" style={{ color: "var(--brand)" }}>
                        contact@hellgateproject.com
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn--primary btn--block btn--lg"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="contact-spinner" />
                        Sending…
                      </span>
                    ) : (
                      "Send Message →"
                    )}
                  </button>

                  <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 12, letterSpacing: 1 }}>
                    We do not share your data with third parties.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          padding-top: calc(72px + 60px);
          padding-bottom: 80px;
          min-height: 100vh;
          background: radial-gradient(ellipse 80% 60% at 0% 0%, rgba(255,0,51,.04) 0%, transparent 60%);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .contact-response-indicator {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }
        .contact-response-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px rgba(0,255,136,.5);
          animation: pulse-dot 2s infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .6; transform: scale(.85); }
        }
        .contact-email-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: border-color .2s, transform .2s, background .2s;
        }
        .contact-email-card:hover {
          border-color: rgba(255,0,51,.3);
          background: var(--bg-raised);
          transform: translateX(4px);
        }
        .contact-email-card__label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--brand);
          min-width: 90px;
          flex-shrink: 0;
        }
        .contact-email-card__email {
          font-size: 13px;
          color: var(--muted-2);
          flex: 1;
          transition: color .2s;
        }
        .contact-email-card:hover .contact-email-card__email { color: #fff; }
        .contact-email-card__arrow {
          color: var(--muted);
          font-size: 14px;
          transition: color .2s, transform .2s;
        }
        .contact-email-card:hover .contact-email-card__arrow {
          color: var(--brand);
          transform: translateX(3px);
        }
        .contact-social-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: var(--bg-raised);
          border: 1px solid var(--border-2);
          border-radius: 10px;
          color: var(--muted-2);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          transition: color .2s, border-color .2s, background .2s;
        }
        .contact-social-btn:hover {
          color: #fff;
          border-color: var(--brand);
          background: var(--brand-dim);
        }
        .contact-form {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .contact-select {
          appearance: none;
          -webkit-appearance: none;
          padding-right: 40px;
          cursor: pointer;
        }
        .contact-error {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(255,0,51,.08);
          border: 1px solid rgba(255,0,51,.25);
          border-radius: 8px;
          font-size: 13px;
          color: var(--muted-2);
          line-height: 1.6;
        }
        .contact-error span { color: var(--brand); flex-shrink: 0; font-size: 15px; }
        .contact-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 32px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          min-height: 400px;
          justify-content: center;
        }
        .contact-success__check {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid rgba(0,255,136,.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 0 24px rgba(0,255,136,.15);
          animation: fade-in .5s ease;
        }
        .contact-success__check span {
          font-size: 32px;
          color: var(--green);
          animation: fade-in .4s ease .2s both;
        }
        .contact-success__title {
          font-family: var(--font-display);
          font-size: 40px;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 12px;
          animation: slide-up .4s ease .1s both;
        }
        .contact-success__sub {
          font-size: 15px;
          color: var(--muted-2);
          line-height: 1.7;
          animation: slide-up .4s ease .2s both;
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; gap: 48px; }
          .contact-form { padding: 24px; }
        }
        @media (max-width: 600px) {
          .contact-grid > div:first-child > .form\\:field { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
