import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaSoundcloud, FaSpotify, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const NAVIGATE = [
  { href: "/events",  label: "Events"      },
  { href: "/tickets", label: "Tickets"     },
  { href: "/lineup",  label: "Line-up"     },
  { href: "/gallery", label: "Gallery"     },
  { href: "/merch",   label: "Merch"       },
];

const INFO = [
  { href: "/faq",             label: "FAQ & House Rules"   },
  { href: "/faq#rules",       label: "Entry Policy"        },
  { href: "/faq#faq",         label: "Ticket FAQ"          },
  { href: "/contact",         label: "Contact"             },
  { href: "mailto:contact@hellgateproject.com", label: "contact@hellgateproject.com", external: true },
];

const SOCIALS = [
  { icon: FaInstagram, href: "https://www.instagram.com/hellgate.project/", label: "Instagram" },
  { icon: FaSoundcloud, href: "https://soundcloud.com/hellgate",            label: "SoundCloud" },
  { icon: FaSpotify,    href: "https://spotify.com",                        label: "Spotify" },
  { icon: FaYoutube,    href: "https://youtube.com",                        label: "YouTube" },
  { icon: FaXTwitter,   href: "https://twitter.com",                        label: "X / Twitter" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [nlOk, setNlOk] = useState(false);

  return (
    <footer className="footer">
      {/* ═══ NEWSLETTER STRIP ═══ */}
      <div className="footer-nl">
        <div className="container">
          <div className="footer-nl__inner">
            <div>
              <p className="footer-nl__title">Join the Cult</p>
              <p className="footer-nl__sub">Line-ups, location drops and pre-sale access — directly to your inbox.</p>
            </div>
            {nlOk ? (
              <p className="footer-nl__ok">✓ You're in the loop</p>
            ) : (
              <form
                className="footer-nl__form"
                onSubmit={(e) => { e.preventDefault(); if (email) setNlOk(true); }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="btn btn--primary">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ═══ MAIN FOOTER ═══ */}
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div>
            <img
              src="/logo.png"
              alt="Hellgate Project"
              style={{ height: 44, marginBottom: 16, filter: "drop-shadow(0 0 10px rgba(255,0,51,.5))" }}
            />
            <p style={{ fontSize: 13, color: "var(--muted-2)", lineHeight: 1.75, maxWidth: 240, marginBottom: 20 }}>
              Underground rave &amp; techno events.<br />
              Istanbul &amp; Ankara.
            </p>
            {/* Social icons */}
            <div className="footer__social">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer__social-btn"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="footer__col-title">Navigate</p>
            <ul className="footer__links">
              {NAVIGATE.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="footer__col-title">Information</p>
            <ul className="footer__links">
              {INFO.map(({ href, label, external }) => (
                <li key={href}>
                  {external ? (
                    <a href={href} style={{ wordBreak: "break-all" }}>{label}</a>
                  ) : (
                    <Link href={href}>{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Next event */}
          <div>
            <p className="footer__col-title">Next Event</p>
            <Link href="/events/gate02" className="footer-event-card">
              <div className="footer-event-card__date">
                <span>19</span>
                <span>SEP</span>
              </div>
              <div>
                <p className="footer-event-card__name">GATE:02</p>
                <p className="footer-event-card__city">Istanbul — TBA</p>
              </div>
            </Link>
            <Link href="/tickets" className="btn btn--primary btn--sm" style={{ marginTop: 14, display: "inline-flex" }}>
              Get Tickets →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} HELLGATE PROJECT — ALL RIGHTS RESERVED
          </p>
          <nav className="footer__legal" aria-label="Legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </nav>
        </div>
      </div>

      <style jsx>{`
        /* Newsletter strip */
        .footer-nl {
          background: linear-gradient(135deg, rgba(255,0,51,.07) 0%, rgba(136,0,255,.05) 100%);
          border-top: 1px solid rgba(255,0,51,.15);
          border-bottom: 1px solid var(--border);
          padding: 40px 0;
        }
        .footer-nl__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .footer-nl__title {
          font-family: var(--font-display);
          font-size: clamp(22px, 3vw, 32px);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .footer-nl__sub {
          font-size: 13px;
          color: var(--muted-2);
          letter-spacing: .5px;
          max-width: 380px;
        }
        .footer-nl__form {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }
        .footer-nl__form input {
          height: 48px;
          min-width: 240px;
          padding: 0 16px;
          background: var(--bg-raised);
          border: 1px solid var(--border-2);
          border-radius: 8px;
          color: #fff;
          font-family: var(--font-body);
          font-size: 14px;
          transition: border-color .2s;
        }
        .footer-nl__form input:focus { outline: none; border-color: var(--brand); }
        .footer-nl__form input::placeholder { color: var(--muted); }
        .footer-nl__ok {
          font-family: var(--font-display);
          font-size: 20px;
          letter-spacing: 3px;
          color: var(--green);
          flex-shrink: 0;
        }

        /* Social buttons */
        .footer__social-btn {
          width: 38px; height: 38px;
          border-radius: 8px;
          background: var(--bg-raised);
          border: 1px solid var(--border-2);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
          color: var(--muted-2);
          transition: background .2s, color .2s, border-color .2s, transform .2s;
        }
        .footer__social-btn:hover {
          background: var(--brand-dim);
          color: #fff;
          border-color: var(--brand);
          transform: translateY(-2px);
        }

        /* Next event card */
        .footer-event-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: border-color .2s;
        }
        .footer-event-card:hover { border-color: rgba(255,0,51,.3); }
        .footer-event-card__date {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border-2);
          border-radius: 8px;
          padding: 6px 10px;
          text-align: center;
          flex-shrink: 0;
        }
        .footer-event-card__date span:first-child {
          font-family: var(--font-display);
          font-size: 24px;
          line-height: 1;
          color: var(--brand);
        }
        .footer-event-card__date span:last-child {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-top: 2px;
        }
        .footer-event-card__name {
          font-family: var(--font-display);
          font-size: 16px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #fff;
        }
        .footer-event-card__city {
          font-size: 11px;
          color: var(--muted-2);
          margin-top: 2px;
          letter-spacing: .5px;
        }

        /* Responsive */
        @media (max-width: 960px) {
          .footer__top { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer__top { grid-template-columns: 1fr; }
          .footer-nl__inner { flex-direction: column; align-items: flex-start; }
          .footer-nl__form { flex-direction: column; width: 100%; }
          .footer-nl__form input { min-width: unset; width: 100%; }
        }
      `}</style>
    </footer>
  );
}
