import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const NEXT_EVENT_ISO = "2026-09-19T22:00:00+03:00";

const UPCOMING = [
  {
    id: "gate02",
    code: "GATE:02",
    title: "Hellgate Project // Gate:02",
    date: "19 Sep 2026",
    day: "19", month: "SEP",
    city: "Istanbul",
    venue: "Location TBA — revealed 48h before",
    description: "The second chapter of the Hellgate saga. A night of raw, relentless techno — darker, louder, deeper than Gate:01.",
    img: "/hero.png",
    tags: ["Techno", "Industrial", "Hard Techno"],
    soldOut: false,
    capacity: 500,
    isNext: true,
  },
  {
    id: "afterhours",
    code: "AFTERHOURS",
    title: "Hellgate // Afterhours",
    date: "03 Oct 2026",
    day: "03", month: "OCT",
    city: "Istanbul",
    venue: "Warehouse 13",
    description: "An intimate afterhours edition. Smaller capacity, deeper sound, closer community.",
    img: "/hero.png",
    tags: ["Acid", "EBM", "Minimal"],
    soldOut: false,
    capacity: 200,
    isNext: false,
  },
  {
    id: "winter",
    code: "WINTER SPECIAL",
    title: "Hellgate // Winter Special",
    date: "12 Dec 2026",
    day: "12", month: "DEC",
    city: "Ankara",
    venue: "Bunker",
    description: "Hellgate goes to Ankara. A one-night special in the city's most underground venue — literally underground.",
    img: "/hero.png",
    tags: ["Techno", "Industrial"],
    soldOut: false,
    capacity: 350,
    isNext: false,
  },
];

const PAST = [
  {
    id: "gate01",
    code: "GATE:01",
    title: "Hellgate Project // Gate:01",
    date: "15 Sep 2025",
    day: "15", month: "SEP",
    year: "2025",
    city: "Istanbul",
    venue: "Secret Location, Beyoğlu",
    img: "/hero.png",
    tags: ["Techno"],
    attendees: "~480",
  },
];

const CITIES = ["All", "Istanbul", "Ankara"];

function Countdown({ targetISO }) {
  const ts = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
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

  if (left.over) return <span style={{ color: "var(--brand)", fontFamily: "var(--font-display)", letterSpacing: 3 }}>NOW OPEN</span>;

  return (
    <div className="events-countdown">
      {[["d","days"],["h","hrs"],["m","min"],["s","sec"]].map(([k, label]) => (
        <div key={k} className="events-countdown__unit">
          <span className="events-countdown__num">{String(left[k]).padStart(2,"0")}</span>
          <span className="events-countdown__label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Events() {
  const [cityFilter, setCityFilter] = useState("All");

  const filtered = cityFilter === "All"
    ? UPCOMING
    : UPCOMING.filter((ev) => ev.city === cityFilter);

  const nextEvent = UPCOMING.find((ev) => ev.isNext);

  return (
    <>
      <Head>
        <title>Events • Hellgate Project</title>
        <meta name="description" content="All upcoming and past Hellgate Project rave events in Istanbul and Ankara." />
      </Head>

      {/* ═══ PAGE HERO ═══ */}
      <div className="page-hero" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 60% 80% at 30% 100%, rgba(255,0,51,.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 90% 10%, rgba(136,0,255,.05) 0%, transparent 70%)
          `,
        }} aria-hidden />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow">// 2026 Season</span>
          <h1>Events</h1>
          <p>Underground techno — Istanbul &amp; Ankara</p>
        </div>
      </div>

      {/* ═══ NEXT EVENT FEATURED ═══ */}
      {nextEvent && (
        <section style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "48px 0" }}>
          <div className="container">
            <div className="next-event-card">
              {/* Image side */}
              <div className="next-event-card__img">
                <img src={nextEvent.img} alt={nextEvent.title} />
                <div className="next-event-card__img-overlay" />
                <div className="next-event-card__date-badge">
                  <span className="next-event-card__date-day">{nextEvent.day}</span>
                  <span className="next-event-card__date-month">{nextEvent.month}</span>
                  <span className="next-event-card__date-year">2026</span>
                </div>
              </div>

              {/* Info side */}
              <div className="next-event-card__body">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span className="eyebrow" style={{ textAlign: "left", marginBottom: 0 }}>// Next Event</span>
                  <span style={{
                    background: "var(--brand)",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 2,
                    padding: "3px 10px",
                    borderRadius: 4,
                    boxShadow: "0 0 10px var(--brand-glow)",
                    animation: "pulse-glow 2s infinite",
                  }}>UPCOMING</span>
                </div>
                <h2 className="next-event-card__title">{nextEvent.title}</h2>
                <p style={{ fontSize: 13, color: "var(--muted-2)", marginBottom: 4 }}>
                  {nextEvent.city} — {nextEvent.venue}
                </p>
                <p style={{ fontSize: 13, color: "var(--muted-2)", marginBottom: 16, lineHeight: 1.7 }}>
                  {nextEvent.description}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                  {nextEvent.tags.map((t) => <span key={t} className="tl__tag">{t}</span>)}
                </div>
                <Countdown targetISO={NEXT_EVENT_ISO} />
                <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                  <Link href={`/events/${nextEvent.id}`} className="btn btn--ghost">Details</Link>
                  <Link href="/tickets" className="btn btn--primary">Get Tickets →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ UPCOMING EVENTS ═══ */}
      <section className="section section--dark">
        <div className="container">
          {/* Filter + heading */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <div>
              <span className="eyebrow" style={{ textAlign: "left", display: "block" }}>// Schedule</span>
              <h2 className="section-title" style={{ textAlign: "left", marginBottom: 0 }}>Upcoming</h2>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCityFilter(c)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 999,
                    border: `1px solid ${cityFilter === c ? "var(--brand)" : "var(--border-2)"}`,
                    background: cityFilter === c ? "var(--brand-dim)" : "transparent",
                    color: cityFilter === c ? "var(--brand)" : "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Event cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {filtered.map((ev) => (
              <article key={ev.id} className="event-row-card">
                {/* Image */}
                <div className="event-row-card__img">
                  <img src={ev.img} alt={ev.title} />
                  <div className="event-row-card__img-grad" />
                  <div className="event-row-card__date">
                    <span className="event-row-card__date-d">{ev.day}</span>
                    <span className="event-row-card__date-m">{ev.month}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="event-row-card__body">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "var(--brand)" }}>
                      {ev.code}
                    </span>
                    {ev.isNext && (
                      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, background: "rgba(255,0,51,.12)", border: "1px solid rgba(255,0,51,.3)", color: "var(--brand)", padding: "2px 8px", borderRadius: 4 }}>
                        Next Up
                      </span>
                    )}
                  </div>
                  <h3 className="event-row-card__title">{ev.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--muted-2)", marginBottom: 4 }}>
                    📍 {ev.city} — {ev.venue}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--muted-2)", marginBottom: 14, lineHeight: 1.7 }}>
                    {ev.description}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                    {ev.tags.map((t) => <span key={t} className="tl__tag">{t}</span>)}
                  </div>
                  <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>
                    Capacity: {ev.capacity.toLocaleString()} · 18+ only
                  </p>
                </div>

                {/* Actions */}
                <div className="event-row-card__actions">
                  <Link href={`/events/${ev.id}`} className="btn btn--ghost">Details</Link>
                  <Link
                    href="/tickets"
                    className={`btn ${ev.soldOut ? "btn--disabled btn--ghost" : "btn--primary"}`}
                  >
                    {ev.soldOut ? "Sold Out" : "Tickets →"}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--muted-2)", padding: "60px 0", fontSize: 14, letterSpacing: 2 }}>
              NO UPCOMING EVENTS IN {cityFilter.toUpperCase()}
            </p>
          )}
        </div>
      </section>

      {/* ═══ PAST EVENTS ═══ */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">// Archive</span>
          <h2 className="section-title">Past Events</h2>
          <div className="grid-3">
            {PAST.map((ev) => (
              <article key={ev.id} className="card past-card">
                <div className="card__media">
                  <img src={ev.img} alt={ev.title} style={{ filter: "grayscale(70%) saturate(60%) brightness(.75)" }} />
                  <span className="badge badge--sold badge--pill-pos">Past Event</span>
                  <div className="event-card__date">
                    <div className="event-card__date-day">{ev.day}</div>
                    <div className="event-card__date-month">{ev.month} {ev.year}</div>
                  </div>
                </div>
                <div className="card__body">
                  <span className="card__label">{ev.code}</span>
                  <h3 className="card__title">{ev.title}</h3>
                  <p className="card__meta">📍 {ev.city} — {ev.venue}</p>
                  {ev.attendees && (
                    <p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 1 }}>
                      {ev.attendees} attendees
                    </p>
                  )}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {ev.tags.map((t) => <span key={t} className="tl__tag">{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Next event featured card */
        .next-event-card {
          display: grid;
          grid-template-columns: 420px 1fr;
          background: var(--bg-card);
          border: 1px solid rgba(255,0,51,.25);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(255,0,51,.06), 0 16px 64px rgba(0,0,0,.6);
        }
        .next-event-card__img {
          position: relative;
          overflow: hidden;
        }
        .next-event-card__img img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: saturate(80%) contrast(110%);
          transition: transform .6s ease;
        }
        .next-event-card:hover .next-event-card__img img { transform: scale(1.03); }
        .next-event-card__img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0), rgba(15,15,15,.5));
        }
        .next-event-card__date-badge {
          position: absolute;
          top: 20px; left: 20px;
          background: rgba(5,5,5,.88);
          border: 1px solid var(--border-2);
          border-radius: 12px;
          padding: 12px 16px;
          text-align: center;
          backdrop-filter: blur(8px);
        }
        .next-event-card__date-day {
          display: block;
          font-family: var(--font-display);
          font-size: 44px;
          line-height: 1;
          color: var(--brand);
        }
        .next-event-card__date-month {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-top: 2px;
        }
        .next-event-card__date-year {
          display: block;
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 1px;
          margin-top: 1px;
        }
        .next-event-card__body {
          padding: 36px 40px;
          display: flex;
          flex-direction: column;
        }
        .next-event-card__title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.5vw, 48px);
          letter-spacing: 3px;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 12px;
        }

        /* Countdown in events page */
        .events-countdown {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .events-countdown__unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-raised);
          border: 1px solid var(--border-2);
          border-radius: 8px;
          padding: 10px 14px;
          min-width: 64px;
        }
        .events-countdown__num {
          font-family: var(--font-display);
          font-size: 30px;
          letter-spacing: 2px;
          line-height: 1;
          color: #fff;
        }
        .events-countdown__label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-top: 3px;
        }

        /* Event row cards */
        .event-row-card {
          display: grid;
          grid-template-columns: 280px 1fr auto;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color .25s, transform .25s, box-shadow .25s;
          align-items: stretch;
        }
        .event-row-card:hover {
          border-color: rgba(255,0,51,.3);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,0,0,.5);
        }
        .event-row-card__img {
          position: relative;
          overflow: hidden;
        }
        .event-row-card__img img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: saturate(80%);
          transition: transform .4s ease, filter .4s ease;
        }
        .event-row-card:hover .event-row-card__img img {
          transform: scale(1.05);
          filter: saturate(100%);
        }
        .event-row-card__img-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0), rgba(10,10,10,.4));
        }
        .event-row-card__date {
          position: absolute; top: 14px; left: 14px;
          background: rgba(5,5,5,.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-2);
          border-radius: 10px;
          padding: 8px 12px;
          text-align: center;
        }
        .event-row-card__date-d {
          display: block;
          font-family: var(--font-display);
          font-size: 30px;
          line-height: 1;
          color: var(--brand);
        }
        .event-row-card__date-m {
          display: block;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-top: 2px;
        }
        .event-row-card__body {
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
        }
        .event-row-card__title {
          font-family: var(--font-display);
          font-size: clamp(18px, 2.5vw, 28px);
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #fff;
          line-height: 1;
          margin-bottom: 8px;
        }
        .event-row-card__actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 24px;
          justify-content: center;
          border-left: 1px solid var(--border);
        }
        .past-card { opacity: .65; }
        .past-card:hover { opacity: .85; }

        @media (max-width: 960px) {
          .next-event-card { grid-template-columns: 1fr; }
          .next-event-card__img { height: 220px; }
          .next-event-card__body { padding: 24px; }
        }
        @media (max-width: 768px) {
          .event-row-card { grid-template-columns: 1fr; }
          .event-row-card__img { height: 180px; }
          .event-row-card__actions { flex-direction: row; border-left: none; border-top: 1px solid var(--border); }
        }
      `}</style>
    </>
  );
}
