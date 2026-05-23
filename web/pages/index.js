import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useInView from "../hooks/useInView";

const NEXT_EVENT_ISO = "2026-09-19T22:00:00+03:00";

const EVENTS = [
  { id: "gate02",     title: "GATE:02",        date: "19 SEP 2026", day: "19", month: "SEP", city: "Istanbul", venue: "TBA — revealed 48h before", img: "/hero.png", soldOut: false },
  { id: "afterhours", title: "AFTERHOURS",     date: "03 OCT 2026", day: "03", month: "OCT", city: "Istanbul", venue: "Warehouse 13",               img: "/hero.png", soldOut: false },
  { id: "winter",     title: "WINTER SPECIAL", date: "12 DEC 2026", day: "12", month: "DEC", city: "Ankara",   venue: "Bunker",                     img: "/hero.png", soldOut: false },
];

const ARTISTS = [
  { name: "DJ Inferno", time: "22:00", genre: "Techno",      color: "#ff0033" },
  { name: "Dark Pulse",  time: "23:30", genre: "Industrial",  color: "#8800ff" },
  { name: "Hellraiser",  time: "01:00", genre: "Hard Techno", color: "#ff6600" },
  { name: "Acid Queen",  time: "02:30", genre: "Acid",        color: "#00ddff" },
];

const MANIFESTO = [
  { num: "01", text: "No compromise on sound quality." },
  { num: "02", text: "No headliner egos. Just music." },
  { num: "03", text: "No photo policy on the dancefloor." },
  { num: "04", text: "Safe space. Zero tolerance." },
];

export default function Home() {
  const eventTs = useMemo(() => new Date(NEXT_EVENT_ISO).getTime(), []);
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0, over: false });

  useEffect(() => {
    const tick = () => {
      const dist = eventTs - Date.now();
      if (dist <= 0) return setLeft({ d: 0, h: 0, m: 0, s: 0, over: true });
      setLeft({
        d: Math.floor(dist / 86400000),
        h: Math.floor((dist % 86400000) / 3600000),
        m: Math.floor((dist % 3600000) / 60000),
        s: Math.floor((dist % 60000) / 1000),
        over: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [eventTs]);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterOk, setNewsletterOk] = useState(false);

  const [eventsRef, eventsInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [lineupRef, lineupInView] = useInView();
  const [manifestoRef, manifestoInView] = useInView();

  return (
    <>
      <Head>
        <title>Hellgate Project — Underground Rave &amp; Techno</title>
        <meta name="description" content="Hellgate Project — underground rave and techno events in Istanbul and Ankara. Tickets, lineup, gallery and more." />
      </Head>

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <img className="hero__bg" src="/hero.png" alt="" aria-hidden="true" />
        <div className="hero__overlay" />
        <div className="hero__scanlines" aria-hidden="true" />

        <div className="hero__content">
          <p className="hero__sub">Underground Rave &amp; Techno — Istanbul</p>
          <h1 className="hero__title" data-text="HELLGATE PROJECT">
            HELLGATE<br />PROJECT
          </h1>

          <div className="hero__date-pill">
            <span>Gate:02</span>
            19 Sep 2026 · Istanbul
          </div>

          {left.over ? (
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px,4vw,48px)",
              letterSpacing: 6, color: "var(--brand)", marginBottom: 28,
              textShadow: "0 0 24px var(--brand-glow)",
            }}>
              THE GATE IS OPEN
            </p>
          ) : (
            <div className="countdown" role="timer" aria-live="polite" aria-label="Countdown to Gate:02">
              {[["d","days"],["h","hrs"],["m","min"],["s","sec"]].map(([k, label]) => (
                <div key={k} className="countdown__unit">
                  <span className="countdown__num">{String(left[k]).padStart(2,"0")}</span>
                  <span className="countdown__label">{label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="hero__ctas">
            <Link href="/tickets" className="btn btn--primary btn--lg">Get Tickets</Link>
            <Link href="/lineup" className="btn btn--ghost btn--lg">Line-up →</Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll" aria-hidden>
          <span className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll</span>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <div className="about-strip">
        {[
          { num: "03", label: "Upcoming Events" },
          { num: "08+", label: "Artists" },
          { num: "500+", label: "Max Capacity" },
          { num: "18+", label: "Age Policy" },
        ].map(({ num, label }) => (
          <div key={label} className="about-strip__item">
            <div className="about-strip__num">{num}</div>
            <div className="about-strip__label">{label}</div>
          </div>
        ))}
      </div>

      {/* ═══ UPCOMING EVENTS ═══ */}
      <section className="section section--dark" id="events" ref={eventsRef}>
        <div className="container">
          <span className="eyebrow">// Schedule</span>
          <h2 className={`section-title reveal${eventsInView ? " is-visible" : ""}`}>Upcoming Events</h2>

          <div className="grid-3">
            {EVENTS.map((ev, i) => (
              <article
                key={ev.id}
                className={`card event-card reveal reveal--delay-${i + 1}${eventsInView ? " is-visible" : ""}`}
              >
                <div className="card__media">
                  <img src={ev.img} alt={ev.title} loading="lazy" />
                  {ev.soldOut && <span className="badge badge--sold badge--pill-pos">Sold Out</span>}
                  <div className="event-card__date">
                    <div className="event-card__date-day">{ev.day}</div>
                    <div className="event-card__date-month">{ev.month}</div>
                  </div>
                </div>
                <div className="card__body">
                  <span className="card__label">Hellgate Project</span>
                  <h3 className="card__title">{ev.title}</h3>
                  <p className="card__meta">{ev.city} — {ev.venue}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                    <Link href={`/events/${ev.id}`} className="btn btn--ghost btn--sm" style={{ flex: 1 }}>Details</Link>
                    <Link
                      href="/tickets"
                      className={`btn btn--sm ${ev.soldOut ? "btn--disabled btn--ghost" : "btn--outline-brand"}`}
                      style={{ flex: 2 }}
                    >
                      {ev.soldOut ? "Sold Out" : "Tickets →"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link href="/events" className="btn btn--ghost">All Events →</Link>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / MANIFESTO ═══ */}
      <section className="section" id="about" ref={manifestoRef}>
        <div className="container">
          <div className="home-about-grid">
            {/* Left — text */}
            <div>
              <span className="eyebrow" style={{ textAlign: "left", display: "block" }}>// About</span>
              <h2 className={`section-title reveal reveal--left${manifestoInView ? " is-visible" : ""}`} style={{ textAlign: "left" }}>
                Enter<br />the Gate
              </h2>
              <p className={`reveal reveal--left reveal--delay-1${manifestoInView ? " is-visible" : ""}`} style={{ fontSize: 15, color: "var(--muted-2)", lineHeight: 1.9, maxWidth: 480, marginBottom: 24 }}>
                Hellgate Project is an underground collective bringing raw, unfiltered techno to secret venues across Istanbul and Ankara.
                No headliners. No ego. Just sound, darkness, and community.
              </p>
              <p className={`reveal reveal--left reveal--delay-2${manifestoInView ? " is-visible" : ""}`} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px,2.5vw,24px)", letterSpacing: 4, color: "var(--brand)", marginBottom: 32 }}>
                SOUND IS THE WEAPON.<br />DARKNESS IS THE STAGE.
              </p>
              <Link href="/events" className="btn btn--outline-brand">Next Event →</Link>
            </div>
            {/* Right — manifesto list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {MANIFESTO.map(({ num, text }, i) => (
                <div
                  key={num}
                  className={`home-manifesto-item reveal reveal--right reveal--delay-${i + 1}${manifestoInView ? " is-visible" : ""}`}
                >
                  <span className="home-manifesto-item__num">{num}</span>
                  <span className="home-manifesto-item__text">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LINE-UP PREVIEW ═══ */}
      <section className="section section--dark section--brand" id="lineup-preview" ref={lineupRef}>
        <div className="container">
          <span className="eyebrow">// Gate:02 — 19 Sep 2026</span>
          <h2 className={`section-title reveal${lineupInView ? " is-visible" : ""}`}>Line-up Preview</h2>

          <div className="grid-4" style={{ marginBottom: 36 }}>
            {ARTISTS.map((a, i) => (
              <div
                key={a.name}
                className={`artist-card reveal reveal--delay-${i + 1}${lineupInView ? " is-visible" : ""}`}
                style={{ "--accent": a.color }}
              >
                <div className="artist-card__top-accent" style={{ background: `linear-gradient(90deg, ${a.color}, transparent)` }} aria-hidden />
                <span className="artist-card__number">{String(i + 1).padStart(2, "0")}</span>
                <div className="artist-card__time" style={{ color: a.color }}>{a.time}</div>
                <div className="artist-card__name">{a.name}</div>
                <div className="artist-card__stage">Main Stage</div>
                <div className="artist-card__tags">
                  <span
                    className="tl__tag"
                    style={{ background: `${a.color}18`, color: a.color, borderColor: `${a.color}33` }}
                  >
                    {a.genre}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/lineup" className="btn btn--ghost">Full Line-up &amp; Schedule →</Link>
          </div>
        </div>
      </section>

      {/* ═══ AFTERMOVIE ═══ */}
      <section className="section" id="aftermovie">
        <div className="container--narrow">
          <span className="eyebrow">// Gate:01 Recap</span>
          <h2 className="section-title">Aftermovie</h2>
          <div className="home-video-wrap">
            <div className="home-video-glow" aria-hidden />
            <div className="home-video-embed">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Hellgate Project — Gate:01 Aftermovie"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="section section--dark" id="newsletter">
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <span className="eyebrow">// Stay Connected</span>
          <h2 className="section-title">Join the Cult</h2>
          <p style={{ color: "var(--muted-2)", marginBottom: 32, fontSize: 14, letterSpacing: 1, lineHeight: 1.8 }}>
            Line-ups, location drops, and pre-sale access — directly to your inbox.<br />
            No spam. Unsubscribe anytime.
          </p>
          {newsletterOk ? (
            <div className="newsletter-success">
              <span>✓</span>
              <p>YOU'RE IN THE LOOP</p>
            </div>
          ) : (
            <form
              className="newsletter-form"
              onSubmit={(e) => { e.preventDefault(); if (newsletterEmail) setNewsletterOk(true); }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" className="btn btn--primary">Subscribe</button>
            </form>
          )}
          <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 20, letterSpacing: 1 }}>
            Or follow{" "}
            <a href="https://www.instagram.com/hellgate.project/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand)", fontWeight: 700 }}>
              @hellgate.project
            </a>
            {" "}on Instagram
          </p>
        </div>
      </section>

      <style jsx>{`
        /* Hero scroll indicator */
        .hero__scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 3;
        }
        .hero__scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, var(--brand));
          display: block;
          animation: scroll-line 1.8s ease-in-out infinite;
        }
        @keyframes scroll-line {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        .hero__scroll-text {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* About grid */
        .home-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* Manifesto items */
        .home-manifesto-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 18px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: border-color .2s, transform .2s;
        }
        .home-manifesto-item:hover {
          border-color: rgba(255,0,51,.25);
          transform: translateX(4px);
        }
        .home-manifesto-item__num {
          font-family: var(--font-display);
          font-size: 36px;
          color: rgba(255,0,51,.15);
          line-height: 1;
          flex-shrink: 0;
          min-width: 48px;
        }
        .home-manifesto-item__text {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,.8);
          line-height: 1.5;
          letter-spacing: .5px;
        }

        /* Artist card top accent */
        .artist-card__top-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          opacity: 0;
          transition: opacity .25s;
        }
        .artist-card:hover .artist-card__top-accent { opacity: 1; }

        /* Video */
        .home-video-wrap {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
        }
        .home-video-glow {
          position: absolute;
          inset: -1px;
          border-radius: 15px;
          background: linear-gradient(135deg, rgba(255,0,51,.2), rgba(136,0,255,.15));
          z-index: 0;
          pointer-events: none;
        }
        .home-video-embed {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          border-radius: 13px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: #000;
          z-index: 1;
        }
        .home-video-embed iframe {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
        }

        /* Newsletter success */
        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          color: var(--green);
        }
        .newsletter-success span {
          font-size: 24px;
          font-weight: 800;
        }
        .newsletter-success p {
          font-family: var(--font-display);
          font-size: 22px;
          letter-spacing: 4px;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .home-about-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 768px) {
          .hero__scroll { display: none; }
        }
      `}</style>
    </>
  );
}
