import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useInView from "../hooks/useInView";

const NEXT_EVENT_ISO = "2026-09-19T22:00:00+03:00";

const EVENTS = [
  { id: "gate02",      title: "GATE:02",        date: "19 SEP 2026", day: "19", month: "SEP", city: "Istanbul", venue: "TBA — revealed 48h before", img: "/hero.png", soldOut: false },
  { id: "afterhours",  title: "AFTERHOURS",     date: "03 OCT 2026", day: "03", month: "OCT", city: "Istanbul", venue: "Warehouse 13",               img: "/hero.png", soldOut: false },
  { id: "winter",      title: "WINTER SPECIAL", date: "12 DEC 2026", day: "12", month: "DEC", city: "Ankara",   venue: "Bunker",                     img: "/hero.png", soldOut: false },
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

const TICKER = "GATE:02 · 19 SEP 2026 · ISTANBUL · UNDERGROUND TECHNO · 18+ ONLY · HELLGATE PROJECT · SOUND IS THE WEAPON · DARKNESS IS THE STAGE · ";

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

  const [nlEmail, setNlEmail] = useState("");
  const [nlOk, setNlOk] = useState(false);

  const [eventsRef,   eventsInView]   = useInView();
  const [manifestoRef, manifestoInView] = useInView();
  const [lineupRef,   lineupInView]   = useInView();

  return (
    <>
      <Head>
        <title>Hellgate Project — Underground Rave &amp; Techno</title>
        <meta name="description" content="Hellgate Project — underground rave and techno events in Istanbul and Ankara. Tickets, lineup, gallery and more." />
      </Head>

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <img className="hero__bg" src="/hero.png" alt="" aria-hidden="true" />
        <div className="hero__overlay" aria-hidden />
        <div className="hero__scanlines" aria-hidden />
        <div className="hero__glow-1" aria-hidden />
        <div className="hero__glow-2" aria-hidden />

        <div className="hero__stage">
          {/* Left — Title */}
          <div className="hero__title-col">
            <p className="hero__eyebrow">Underground Rave &amp; Techno</p>
            <h1 className="hero__title" data-text="HELLGATE PROJECT">
              HELLGATE<br />PROJECT
            </h1>
            <p className="hero__since">Est. 2026 — Istanbul &amp; Ankara</p>
          </div>

          {/* Vertical divider */}
          <div className="hero__vdivider" aria-hidden />

          {/* Right — Event info */}
          <div className="hero__info-col">
            <div className="hero__next-badge">
              <span className="hero__live-dot" />
              <span>Next Event</span>
            </div>

            <div className="hero__event-name">GATE:02</div>
            <div className="hero__event-meta">19 September 2026 · Istanbul</div>
            <div className="hero__event-venue">Venue TBA — revealed 48h before the event</div>

            <div className="hero__rule" aria-hidden />

            {left.over ? (
              <p className="hero__open">THE GATE IS OPEN</p>
            ) : (
              <div className="countdown" role="timer" aria-live="polite" aria-label="Countdown to Gate:02">
                {[["d","days"],["h","hrs"],["m","min"],["s","sec"]].map(([k, label]) => (
                  <div key={k} className="countdown__unit countdown__unit--sm">
                    <span className="countdown__num">{String(left[k]).padStart(2,"0")}</span>
                    <span className="countdown__label">{label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="hero__ctas">
              <Link href="/tickets" className="btn btn--primary btn--lg">Get Tickets</Link>
              <Link href="/lineup"  className="btn btn--ghost">Line-up →</Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll" aria-hidden>
          <span className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll</span>
        </div>
      </section>

      {/* ═══ TICKER TAPE ═══ */}
      <div className="ticker" aria-hidden>
        <div className="ticker__track">
          {[TICKER, TICKER, TICKER].map((t, i) => (
            <span key={i} className="ticker__seg">{t}</span>
          ))}
        </div>
      </div>

      {/* ═══ STATS STRIP ═══ */}
      <div className="stats-strip">
        <div className="container">
          <div className="stats-grid">
            {[
              { num: "03",   label: "Upcoming Events" },
              { num: "08+",  label: "Artists Booked"  },
              { num: "500+", label: "Max Capacity"     },
              { num: "18+",  label: "Age Policy"       },
            ].map(({ num, label }) => (
              <div key={label} className="stats-item">
                <div className="stats-num">{num}</div>
                <div className="stats-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ UPCOMING EVENTS ═══ */}
      <section className="section section--dark" id="events" ref={eventsRef}>
        <div className="container">
          <span className="eyebrow">// Schedule</span>
          <h2 className={`section-title reveal${eventsInView ? " is-visible" : ""}`}>Upcoming Events</h2>

          {/* Featured next event */}
          <article className={`feat-event reveal reveal--delay-1${eventsInView ? " is-visible" : ""}`}>
            <div className="feat-event__img">
              <img src="/hero.png" alt="GATE:02" />
              <div className="feat-event__img-overlay" aria-hidden />
              <span className="feat-event__pill">Next Up</span>
            </div>
            <div className="feat-event__body">
              <div className="feat-event__head">
                <div>
                  <span className="card__label">Hellgate Project</span>
                  <h3 className="feat-event__title">GATE:02</h3>
                  <p className="feat-event__meta">19 September 2026 · Istanbul · Venue TBA</p>
                </div>
                <div className="feat-event__date">
                  <span className="feat-event__date-day">19</span>
                  <span className="feat-event__date-mon">SEP</span>
                </div>
              </div>

              <div className="feat-event__countdown">
                {[["d","days"],["h","hrs"],["m","min"],["s","sec"]].map(([k, label]) => (
                  <div key={k} className="countdown__unit countdown__unit--sm">
                    <span className="countdown__num">{String(left[k]).padStart(2,"0")}</span>
                    <span className="countdown__label">{label}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <Link href="/events/gate02" className="btn btn--ghost btn--sm">Details</Link>
                <Link href="/tickets" className="btn btn--primary">Get Tickets →</Link>
              </div>
            </div>
          </article>

          {/* Other events */}
          <div className="grid-2" style={{ marginTop: 20 }}>
            {EVENTS.slice(1).map((ev, i) => (
              <article
                key={ev.id}
                className={`card event-card reveal reveal--delay-${i + 2}${eventsInView ? " is-visible" : ""}`}
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
                    <Link href="/tickets" className={`btn btn--sm ${ev.soldOut ? "btn--disabled btn--ghost" : "btn--outline-brand"}`} style={{ flex: 2 }}>
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
            <div>
              <span className="eyebrow" style={{ textAlign: "left", display: "block" }}>// About</span>
              <h2 className={`section-title reveal reveal--left${manifestoInView ? " is-visible" : ""}`} style={{ textAlign: "left" }}>
                Enter<br />the Gate
              </h2>
              <p className={`reveal reveal--left reveal--delay-1${manifestoInView ? " is-visible" : ""}`}
                style={{ fontSize: 15, color: "var(--muted-2)", lineHeight: 1.9, maxWidth: 480, marginBottom: 24 }}>
                Hellgate Project is an underground collective bringing raw, unfiltered techno to secret venues across Istanbul and Ankara.
                No headliners. No ego. Just sound, darkness, and community.
              </p>
              <p className={`reveal reveal--left reveal--delay-2${manifestoInView ? " is-visible" : ""}`}
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px,2.5vw,24px)", letterSpacing: 4, color: "var(--brand)", marginBottom: 32 }}>
                SOUND IS THE WEAPON.<br />DARKNESS IS THE STAGE.
              </p>
              <Link href="/events" className="btn btn--outline-brand">Next Event →</Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {MANIFESTO.map(({ num, text }, i) => (
                <div key={num} className={`home-manifesto-item reveal reveal--right reveal--delay-${i + 1}${manifestoInView ? " is-visible" : ""}`}>
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
                  <span className="tl__tag" style={{ background: `${a.color}18`, color: a.color, borderColor: `${a.color}33` }}>
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
          {nlOk ? (
            <div className="newsletter-success">
              <span>✓</span>
              <p>YOU'RE IN THE LOOP</p>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (nlEmail) setNlOk(true); }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" className="btn btn--primary">Subscribe</button>
            </form>
          )}
          <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 20, letterSpacing: 1 }}>
            Or follow{" "}
            <a href="https://www.instagram.com/hellgate.project/" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--brand)", fontWeight: 700 }}>
              @hellgate.project
            </a>
            {" "}on Instagram
          </p>
        </div>
      </section>

      <style jsx>{`
        /* ══════════════════════════════════════
           HERO — 2-column layout
        ══════════════════════════════════════ */
        .hero__stage {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 0;
          width: 100%;
          max-width: 1200px;
          padding: 0 48px;
        }

        /* Left column */
        .hero__title-col {
          display: flex;
          flex-direction: column;
        }

        .hero__eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(255,255,255,.4);
          margin-bottom: 20px;
        }

        .hero__since {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,.22);
          margin-top: 24px;
        }

        /* Vertical red divider */
        .hero__vdivider {
          width: 1px;
          height: 290px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255,0,51,.5) 20%,
            rgba(255,0,51,.5) 80%,
            transparent
          );
          margin: 0 52px;
          flex-shrink: 0;
          position: relative;
        }
        .hero__vdivider::before {
          content: "";
          position: absolute;
          top: 50%; left: -3px;
          width: 7px; height: 7px;
          background: var(--brand);
          border-radius: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 14px var(--brand), 0 0 28px rgba(255,0,51,.3);
        }

        /* Right info column */
        .hero__info-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .hero__next-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--brand);
        }

        .hero__live-dot {
          display: inline-block;
          width: 6px; height: 6px;
          background: var(--brand);
          border-radius: 50%;
          animation: live-blink 1.5s ease-in-out infinite;
          box-shadow: 0 0 8px var(--brand);
          flex-shrink: 0;
        }
        @keyframes live-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: .2; }
        }

        .hero__event-name {
          font-family: var(--font-display);
          font-size: clamp(40px, 5vw, 68px);
          letter-spacing: 8px;
          color: #fff;
          line-height: 1;
          text-transform: uppercase;
        }

        .hero__event-meta {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,.48);
        }

        .hero__event-venue {
          font-size: 11px;
          letter-spacing: 1px;
          color: rgba(255,255,255,.25);
          margin-top: -6px;
        }

        .hero__rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,0,51,.45), transparent);
          margin: 2px 0;
        }

        .hero__open {
          font-family: var(--font-display);
          font-size: clamp(22px, 4vw, 44px);
          letter-spacing: 6px;
          color: var(--brand);
          text-shadow: 0 0 24px var(--brand-glow);
        }

        .hero__ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        /* Ambient glows behind hero */
        .hero__glow-1 {
          position: absolute;
          top: 15%; left: 5%;
          width: 45vw; height: 45vw;
          background: radial-gradient(circle, rgba(255,0,51,.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
          animation: glow-drift 14s ease-in-out infinite alternate;
        }
        .hero__glow-2 {
          position: absolute;
          bottom: 5%; right: 0;
          width: 32vw; height: 32vw;
          background: radial-gradient(circle, rgba(136,0,255,.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
          animation: glow-drift 20s ease-in-out infinite alternate-reverse;
        }
        @keyframes glow-drift {
          from { transform: translate(0, 0); }
          to   { transform: translate(24px, -16px); }
        }

        /* Compact countdown (smaller unit boxes) */
        .countdown__unit--sm { padding: 10px 12px; min-width: 62px; }
        .countdown__unit--sm .countdown__num { font-size: 30px; }

        /* ══════════════════════════════════════
           TICKER TAPE
        ══════════════════════════════════════ */
        .ticker {
          background: var(--brand);
          overflow: hidden;
          white-space: nowrap;
          padding: 10px 0;
          position: relative;
          z-index: 2;
        }
        .ticker__track {
          display: inline-flex;
          animation: ticker-scroll 38s linear infinite;
          will-change: transform;
        }
        .ticker__seg {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,.9);
        }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }

        /* ══════════════════════════════════════
           STATS STRIP
        ══════════════════════════════════════ */
        .stats-strip {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-left: 1px solid var(--border);
        }
        .stats-item {
          padding: 32px 24px;
          border-right: 1px solid var(--border);
          text-align: center;
          transition: background .2s;
        }
        .stats-item:hover { background: rgba(255,0,51,.04); }
        .stats-num {
          font-family: var(--font-display);
          font-size: 52px;
          letter-spacing: 2px;
          color: var(--brand);
          line-height: 1;
        }
        .stats-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-top: 6px;
        }

        /* ══════════════════════════════════════
           FEATURED EVENT CARD
        ══════════════════════════════════════ */
        .feat-event {
          display: grid;
          grid-template-columns: 42% 1fr;
          background: var(--bg-card);
          border: 1px solid rgba(255,0,51,.2);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(255,0,51,.07), 0 12px 56px rgba(0,0,0,.5);
        }
        .feat-event__img {
          position: relative;
          overflow: hidden;
          min-height: 280px;
        }
        .feat-event__img img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: saturate(80%);
          transition: transform .5s ease, filter .5s ease;
        }
        .feat-event:hover .feat-event__img img {
          transform: scale(1.05);
          filter: saturate(100%);
        }
        .feat-event__img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, transparent 50%, var(--bg-card));
        }
        .feat-event__pill {
          position: absolute; top: 14px; left: 14px;
          background: var(--brand);
          color: #fff;
          font-size: 10px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 5px 12px; border-radius: 4px;
          box-shadow: 0 0 12px var(--brand-glow);
        }
        .feat-event__body {
          padding: 32px;
          display: flex; flex-direction: column; gap: 20px;
          justify-content: center;
        }
        .feat-event__head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }
        .feat-event__title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 60px);
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #fff;
          line-height: 1;
          margin: 6px 0 8px;
        }
        .feat-event__meta {
          font-size: 13px;
          color: var(--muted-2);
          letter-spacing: 1px;
        }
        .feat-event__date {
          display: flex; flex-direction: column; align-items: center;
          background: rgba(255,0,51,.1);
          border: 1px solid rgba(255,0,51,.22);
          border-radius: 10px;
          padding: 10px 16px;
          text-align: center; flex-shrink: 0;
        }
        .feat-event__date-day {
          font-family: var(--font-display);
          font-size: 42px; color: var(--brand); line-height: 1;
        }
        .feat-event__date-mon {
          font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--muted-2); margin-top: 2px;
        }
        .feat-event__countdown { display: flex; gap: 8px; flex-wrap: wrap; }

        /* ══════════════════════════════════════
           ABOUT / MANIFESTO
        ══════════════════════════════════════ */
        .home-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .home-manifesto-item {
          display: flex; align-items: center; gap: 20px;
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
          line-height: 1; flex-shrink: 0; min-width: 48px;
        }
        .home-manifesto-item__text {
          font-size: 14px; font-weight: 600;
          color: rgba(255,255,255,.8);
          line-height: 1.5; letter-spacing: .5px;
        }

        /* ══════════════════════════════════════
           ARTIST CARD (lineup preview)
        ══════════════════════════════════════ */
        .artist-card__top-accent {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px; opacity: 0;
          transition: opacity .25s;
        }
        .artist-card:hover .artist-card__top-accent { opacity: 1; }

        /* ══════════════════════════════════════
           VIDEO
        ══════════════════════════════════════ */
        .home-video-wrap {
          position: relative; border-radius: 14px; overflow: hidden;
        }
        .home-video-glow {
          position: absolute; inset: -1px; border-radius: 15px;
          background: linear-gradient(135deg, rgba(255,0,51,.2), rgba(136,0,255,.15));
          z-index: 0; pointer-events: none;
        }
        .home-video-embed {
          position: relative; padding-bottom: 56.25%; height: 0;
          border-radius: 13px; overflow: hidden;
          border: 1px solid var(--border); background: #000; z-index: 1;
        }
        .home-video-embed iframe { position: absolute; inset: 0; width: 100%; height: 100%; }

        /* ══════════════════════════════════════
           NEWSLETTER
        ══════════════════════════════════════ */
        .newsletter-success {
          display: flex; align-items: center; gap: 12px;
          justify-content: center; color: var(--green);
        }
        .newsletter-success span { font-size: 24px; font-weight: 800; }
        .newsletter-success p { font-family: var(--font-display); font-size: 22px; letter-spacing: 4px; }

        /* ══════════════════════════════════════
           SCROLL INDICATOR
        ══════════════════════════════════════ */
        .hero__scroll {
          position: absolute; bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          z-index: 3;
        }
        .hero__scroll-line {
          width: 1px; height: 40px;
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
          font-size: 9px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; color: var(--muted);
        }

        /* ══════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════ */
        @media (max-width: 960px) {
          .hero__stage {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 40px 24px;
            gap: 36px;
          }
          .hero__vdivider { display: none; }
          .hero__title-col { align-items: center; }
          .hero__info-col  { align-items: center; }
          .hero__rule { background: linear-gradient(90deg, transparent, rgba(255,0,51,.4), transparent); }
          .hero__ctas { justify-content: center; }
          .hero__next-badge { justify-content: center; }
          .feat-event { grid-template-columns: 1fr; }
          .feat-event__img { min-height: 220px; }
          .feat-event__img-overlay { background: linear-gradient(to bottom, transparent 50%, var(--bg-card)); }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hero__scroll { display: none; }
          .home-about-grid { grid-template-columns: 1fr; gap: 40px; }
          .feat-event__body { padding: 20px; }
          .feat-event__countdown { flex-wrap: wrap; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .feat-event__head { flex-direction: column-reverse; }
          .feat-event__date { flex-direction: row; gap: 8px; padding: 8px 14px; }
          .feat-event__date-day { font-size: 28px; }
        }
      `}</style>
    </>
  );
}
