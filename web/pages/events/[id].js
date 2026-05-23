import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const GENRE_CONFIG = {
  "Techno":      { color: "#ff0033" },
  "Industrial":  { color: "#8800ff" },
  "Hard Techno": { color: "#ff6600" },
  "Acid":        { color: "#00ddff" },
  "Minimal":     { color: "#00ff88" },
  "EBM":         { color: "#ffcc00" },
};

const EVENTS_DATA = {
  gate02: {
    id: "gate02",
    code: "GATE:02",
    title: "Hellgate Project // Gate:02",
    date: "Saturday, 19 September 2026",
    isoDate: "2026-09-19T22:00:00+03:00",
    startTime: "22:00",
    endTime: "06:00+",
    city: "Istanbul",
    venue: "Location TBA — revealed 48h before",
    img: "/hero.png",
    tags: ["Techno", "Industrial", "Hard Techno"],
    soldOut: false,
    capacity: "500",
    ticketPriceFrom: 25,
    description: [
      "Gate:02 is the second chapter of the Hellgate saga. After the overwhelming response to Gate:01, we return with a bigger sound, a deeper darkness, and a lineup that will push every boundary.",
      "Expect a journey through raw, industrial techno from sundown to sunrise. No genre clichés. No compromise. No headliner ego.",
      "This is not a party. This is a ritual.",
    ],
    lineup: [
      { name: "DJ Inferno",  time: "22:00–23:30", genre: "Techno",      headliner: false },
      { name: "Dark Pulse",  time: "23:30–01:00", genre: "Industrial",  headliner: false },
      { name: "Hellraiser",  time: "01:00–02:30", genre: "Hard Techno", headliner: true  },
      { name: "Acid Queen",  time: "02:30–06:00", genre: "Acid",        headliner: false },
    ],
    info: [
      { icon: "🪪", label: "Age Policy",    value: "18+ strictly enforced. Valid government-issued ID required." },
      { icon: "🎫", label: "Capacity",      value: "500 people. Ticket-only. No door entry." },
      { icon: "📍", label: "Location",      value: "Revealed 48 hours before the event via email & Instagram @hellgate.project." },
      { icon: "👗", label: "Dress Code",    value: "None. Comfortable clothing for extended dancing recommended." },
      { icon: "📷", label: "Photography",   value: "Phone-free dancefloor. Professional cameras require written permission." },
      { icon: "🚪", label: "Re-entry",      value: "No re-entry after leaving unless explicitly permitted by staff." },
    ],
  },
  afterhours: {
    id: "afterhours",
    code: "AFTERHOURS",
    title: "Hellgate // Afterhours",
    date: "Saturday, 03 October 2026",
    isoDate: "2026-10-03T23:00:00+03:00",
    startTime: "23:00",
    endTime: "10:00+",
    city: "Istanbul",
    venue: "Warehouse 13",
    img: "/hero.png",
    tags: ["Acid", "EBM", "Minimal"],
    soldOut: false,
    capacity: "200",
    ticketPriceFrom: 25,
    description: [
      "An intimate afterhours edition. Smaller capacity, deeper sound, closer community.",
      "Warehouse 13 is one of Istanbul's most unique underground spaces — raw concrete, industrial acoustics, and a sound system built for bass heads.",
      "This is where the real night begins.",
    ],
    lineup: [
      { name: "TBA", time: "23:00–02:00", genre: "Acid",    headliner: false },
      { name: "TBA", time: "02:00–06:00", genre: "EBM",     headliner: true  },
      { name: "TBA", time: "06:00–10:00", genre: "Minimal", headliner: false },
    ],
    info: [
      { icon: "🪪", label: "Age Policy",  value: "18+ strictly enforced." },
      { icon: "🎫", label: "Capacity",    value: "200 people. Very limited." },
      { icon: "📍", label: "Location",    value: "Warehouse 13, Kasımpaşa, Istanbul." },
      { icon: "👗", label: "Dress Code",  value: "None." },
    ],
  },
  winter: {
    id: "winter",
    code: "WINTER SPECIAL",
    title: "Hellgate // Winter Special",
    date: "Saturday, 12 December 2026",
    isoDate: "2026-12-12T22:00:00+03:00",
    startTime: "22:00",
    endTime: "06:00+",
    city: "Ankara",
    venue: "Bunker",
    img: "/hero.png",
    tags: ["Techno", "Industrial"],
    soldOut: false,
    capacity: "350",
    ticketPriceFrom: 25,
    description: [
      "Hellgate heads to Ankara for a one-night winter special.",
      "Bunker is the capital's most underground venue — literally underground. A brutalist space carved out for maximum resonance and zero daylight.",
      "One night. One chance. Don't sleep.",
    ],
    lineup: [
      { name: "TBA", time: "22:00+", genre: "Techno", headliner: true },
    ],
    info: [
      { icon: "🪪", label: "Age Policy",  value: "18+ strictly enforced." },
      { icon: "🎫", label: "Capacity",    value: "350 people." },
      { icon: "📍", label: "Location",    value: "Bunker, Ankara." },
    ],
  },
};

function Countdown({ isoDate }) {
  const ts = useMemo(() => new Date(isoDate).getTime(), [isoDate]);
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0, over: false });

  useEffect(() => {
    const tick = () => {
      const dist = ts - Date.now();
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
  }, [ts]);

  if (left.over) return null;
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {[["d","days"],["h","hrs"],["m","min"],["s","sec"]].map(([k, lbl]) => (
        <div key={k} style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          background: "var(--bg-raised)", border: "1px solid var(--border-2)",
          borderRadius: 8, padding: "8px 12px", minWidth: 54,
        }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: 1, lineHeight: 1 }}>
            {String(left[k]).padStart(2,"0")}
          </span>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted-2)", marginTop: 3 }}>
            {lbl}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function EventDetail() {
  const { query } = useRouter();
  const ev = EVENTS_DATA[query.id];

  if (query.id && !ev) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20, padding: 24, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,8vw,80px)", letterSpacing: 4, color: "var(--brand)", lineHeight: 1 }}>
          EVENT NOT FOUND
        </p>
        <p style={{ color: "var(--muted-2)", fontSize: 14 }}>This event doesn't exist or has been removed.</p>
        <Link href="/events" className="btn btn--ghost">← Back to Events</Link>
      </div>
    );
  }

  if (!ev) return null;

  return (
    <>
      <Head>
        <title>{ev.code} • Hellgate Project</title>
        <meta name="description" content={`${ev.title} — ${ev.date} — ${ev.city}`} />
      </Head>

      {/* ═══ CINEMATIC HERO ═══ */}
      <div className="ev-hero">
        <img className="ev-hero__bg" src={ev.img} alt={ev.title} />
        <div className="ev-hero__overlay" />
        <div className="ev-hero__scanlines" aria-hidden />
        <div className="ev-hero__content">
          <div className="container">
            <Link href="/events" className="ev-hero__back">← Events</Link>
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              {ev.tags.map((t) => <span key={t} className="tl__tag">{t}</span>)}
              {ev.soldOut && <span className="badge badge--sold">Sold Out</span>}
            </div>
            <h1 className="ev-hero__title">{ev.title}</h1>
            <p className="ev-hero__meta">
              {ev.date} &nbsp;·&nbsp; {ev.startTime}–{ev.endTime} &nbsp;·&nbsp; {ev.city}
            </p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="section section--dark">
        <div className="container ev-layout">

          {/* ── LEFT COLUMN ── */}
          <div className="ev-main">

            {/* Description */}
            <section className="ev-section">
              <span className="eyebrow" style={{ textAlign: "left", display: "block" }}>// About the Night</span>
              <h2 className="ev-section-title">The Night</h2>
              {ev.description.map((p, i) => (
                <p key={i} className="ev-section-text">{p}</p>
              ))}
            </section>

            {/* Lineup */}
            <section className="ev-section">
              <span className="eyebrow" style={{ textAlign: "left", display: "block" }}>// Artists</span>
              <h2 className="ev-section-title">Line-up</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ev.lineup.map((a, i) => {
                  const cfg = GENRE_CONFIG[a.genre] || { color: "var(--brand)" };
                  return (
                    <div
                      key={i}
                      className={`ev-artist${a.headliner ? " ev-artist--hl" : ""}`}
                      style={{ "--accent": cfg.color }}
                    >
                      <div className="ev-artist__left-bar" style={{ background: cfg.color }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                          <span className="ev-artist__name">{a.name}</span>
                          {a.headliner && (
                            <span style={{
                              fontSize: 9,
                              fontWeight: 800,
                              letterSpacing: 2,
                              textTransform: "uppercase",
                              background: "var(--brand)",
                              color: "#fff",
                              padding: "3px 8px",
                              borderRadius: 4,
                              boxShadow: "0 0 8px var(--brand-glow)",
                            }}>
                              Headliner
                            </span>
                          )}
                        </div>
                        <span
                          className="tl__tag"
                          style={{
                            background: `${cfg.color}15`,
                            color: cfg.color,
                            borderColor: `${cfg.color}30`,
                          }}
                        >
                          {a.genre}
                        </span>
                      </div>
                      <span className="ev-artist__time" style={{ color: cfg.color }}>{a.time}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Event Info */}
            <section className="ev-section">
              <span className="eyebrow" style={{ textAlign: "left", display: "block" }}>// What to Know</span>
              <h2 className="ev-section-title">Event Info</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {ev.info.map((item) => (
                  <div key={item.label} className="ev-info-card">
                    <span className="ev-info-card__icon">{item.icon}</span>
                    <div>
                      <p className="ev-info-card__label">{item.label}</p>
                      <p className="ev-info-card__value">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="ev-sidebar">
            {/* Ticket card */}
            <div className={`ev-ticket-card${ev.soldOut ? "" : " ev-ticket-card--active"}`}>
              <div className="ev-ticket-card__head">
                <span className="eyebrow" style={{ textAlign: "left", display: "block", marginBottom: 10 }}>// Get Your Ticket</span>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: 2, color: "var(--muted-2)", textTransform: "uppercase" }}>
                  {ev.date}
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: 2, color: "var(--muted-2)", textTransform: "uppercase", marginTop: 3 }}>
                  {ev.city} — {ev.venue}
                </p>
                <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 6, letterSpacing: 1 }}>
                  Capacity: {ev.capacity} people · 18+
                </p>
              </div>
              <div className="ev-ticket-card__body">
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 13, color: "var(--muted-2)" }}>Tickets from</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "var(--brand)", letterSpacing: 2 }}>
                    €{ev.ticketPriceFrom}
                  </span>
                </div>
                <Countdown isoDate={ev.isoDate} />
                <div style={{ marginTop: 16 }}>
                  <Link
                    href="/tickets"
                    className={`btn btn--block btn--lg ${ev.soldOut ? "btn--disabled btn--ghost" : "btn--primary"}`}
                    style={{ marginBottom: 10 }}
                  >
                    {ev.soldOut ? "Sold Out" : "Get Tickets →"}
                  </Link>
                  <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", letterSpacing: 1 }}>
                    Secure checkout · Tickets by email
                  </p>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="ev-share-card">
              <p className="ev-share-card__label">Spread the word</p>
              <a
                href="https://www.instagram.com/hellgate.project/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost btn--block btn--sm"
                style={{ marginBottom: 8 }}
              >
                @hellgate.project
              </a>
              <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", letterSpacing: 1 }}>
                Location drop via Instagram stories 48h before
              </p>
            </div>

            {/* Other events */}
            <div className="ev-other-card">
              <p className="ev-other-card__label">Other Events</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {Object.values(EVENTS_DATA)
                  .filter((e) => e.id !== ev.id)
                  .map((e) => (
                    <Link key={e.id} href={`/events/${e.id}`} className="ev-other-item">
                      <span className="ev-other-item__code">{e.code}</span>
                      <span className="ev-other-item__city">{e.city}</span>
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        /* Hero */
        .ev-hero {
          position: relative;
          height: 65vh;
          min-height: 440px;
          overflow: hidden;
          padding-top: 72px;
          display: flex;
          align-items: flex-end;
        }
        .ev-hero__bg {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: .5;
          filter: saturate(70%) contrast(110%);
          transform: scale(1.05);
        }
        .ev-hero__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(5,5,5,.15) 0%,
            rgba(5,5,5,.1) 40%,
            rgba(5,5,5,.92) 100%
          );
        }
        .ev-hero__scanlines {
          position: absolute; inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px, transparent 3px,
            rgba(0,0,0,.05) 3px, rgba(0,0,0,.05) 4px
          );
        }
        .ev-hero__content {
          position: relative;
          z-index: 2;
          width: 100%;
          padding-bottom: 48px;
        }
        .ev-hero__back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--muted-2);
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 20px;
          transition: color .2s;
        }
        .ev-hero__back:hover { color: #fff; }
        .ev-hero__title {
          font-family: var(--font-display);
          font-size: clamp(32px, 6vw, 80px);
          letter-spacing: 4px;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 12px;
          text-shadow: 0 0 40px rgba(255,0,51,.2);
        }
        .ev-hero__meta {
          color: var(--muted-2);
          font-size: 13px;
          letter-spacing: 2px;
        }

        /* Layout */
        .ev-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 48px;
          align-items: start;
        }
        .ev-main { display: flex; flex-direction: column; gap: 48px; }
        .ev-section { display: flex; flex-direction: column; gap: 16px; }
        .ev-section-title {
          font-family: var(--font-display);
          font-size: clamp(22px, 3vw, 36px);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 4px;
          position: relative;
          display: inline-block;
        }
        .ev-section-title::after {
          content: "";
          display: block;
          width: 32px;
          height: 2px;
          background: var(--brand);
          box-shadow: 0 0 8px var(--brand-glow);
          margin-top: 10px;
        }
        .ev-section-text {
          font-size: 15px;
          color: var(--muted-2);
          line-height: 1.85;
        }

        /* Artist rows */
        .ev-artist {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 18px;
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          transition: border-color .2s, transform .2s;
        }
        .ev-artist:hover { border-color: var(--accent, var(--border-2)); transform: translateX(3px); }
        .ev-artist--hl {
          border-color: var(--brand);
          background: rgba(255,0,51,.04);
          box-shadow: 0 0 0 1px rgba(255,0,51,.08);
        }
        .ev-artist__left-bar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
        }
        .ev-artist__name {
          font-family: var(--font-display);
          font-size: 22px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .ev-artist__time {
          font-family: var(--font-display);
          font-size: 17px;
          letter-spacing: 1px;
          flex-shrink: 0;
        }

        /* Info cards */
        .ev-info-card {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 16px 18px;
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: border-color .2s;
        }
        .ev-info-card:hover { border-color: rgba(255,0,51,.2); }
        .ev-info-card__icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
        .ev-info-card__label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--brand);
          margin-bottom: 4px;
        }
        .ev-info-card__value {
          font-size: 13px;
          color: var(--muted-2);
          line-height: 1.55;
        }

        /* Sidebar */
        .ev-sidebar {
          position: sticky;
          top: 88px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ev-ticket-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
        }
        .ev-ticket-card--active { border-color: var(--brand); box-shadow: 0 0 0 1px rgba(255,0,51,.12), 0 8px 40px rgba(255,0,51,.08); }
        .ev-ticket-card__head {
          padding: 22px 24px;
          background: var(--bg-raised);
          border-bottom: 1px solid var(--border);
        }
        .ev-ticket-card__body { padding: 22px 24px; }

        .ev-share-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px;
          text-align: center;
        }
        .ev-share-card__label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-bottom: 12px;
        }

        .ev-other-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px;
        }
        .ev-other-card__label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-bottom: 12px;
        }
        .ev-other-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: 8px;
          transition: border-color .2s, transform .2s;
        }
        .ev-other-item:hover { border-color: rgba(255,0,51,.3); transform: translateX(3px); }
        .ev-other-item__code {
          font-family: var(--font-display);
          font-size: 15px;
          letter-spacing: 2px;
          color: #fff;
        }
        .ev-other-item__city {
          font-size: 11px;
          color: var(--muted-2);
          font-weight: 600;
          letter-spacing: 1px;
        }

        /* Responsive */
        @media (max-width: 960px) {
          .ev-layout { grid-template-columns: 1fr; }
          .ev-sidebar { position: static; }
          .ev-info-card { flex-direction: row; }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
