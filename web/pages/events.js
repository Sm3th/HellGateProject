import Head from "next/head";
import Link from "next/link";

const UPCOMING = [
  {
    id: "gate02",
    code: "GATE:02",
    title: "Hellgate Project // Gate:02",
    date: "19 Sep 2026",
    day: "19", month: "SEP",
    city: "Istanbul",
    venue: "Location TBA — revealed 48h before",
    description: "The second chapter of the Hellgate saga. Expect a night of raw, relentless techno from sunrise to sunrise.",
    img: "/hero.png",
    tags: ["Techno", "Industrial", "Hard Techno"],
    soldOut: false,
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
  },
  {
    id: "winter",
    code: "WINTER SPECIAL",
    title: "Hellgate // Winter Special",
    date: "12 Dec 2026",
    day: "12", month: "DEC",
    city: "Ankara",
    venue: "Bunker",
    description: "Hellgate goes to Ankara. A one-night special in the city's most underground venue.",
    img: "/hero.png",
    tags: ["Techno", "Industrial"],
    soldOut: false,
  },
];

const PAST = [
  {
    id: "gate01",
    code: "GATE:01",
    title: "Hellgate Project // Gate:01",
    date: "15 Sep 2025",
    day: "15", month: "SEP 2025",
    city: "Istanbul",
    venue: "Secret Location, Beyoğlu",
    img: "/hero.png",
    tags: ["Techno"],
  },
];

export default function Events() {
  return (
    <>
      <Head>
        <title>Events • Hellgate Project</title>
        <meta name="description" content="All upcoming and past Hellgate Project rave events in Istanbul and Ankara." />
      </Head>

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">// All Dates</span>
          <h1>Events</h1>
          <p>Underground techno events — Istanbul &amp; Ankara</p>
        </div>
      </div>

      {/* UPCOMING */}
      <section className="section section--dark">
        <div className="container">
          <span className="eyebrow">// 2026 Season</span>
          <h2 className="section-title">Upcoming</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {UPCOMING.map((ev) => (
              <article key={ev.id} style={{
                display: "grid",
                gridTemplateColumns: "320px 1fr",
                gap: 0,
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                overflow: "hidden",
                transition: "border-color .25s, transform .25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,0,51,.35)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img src={ev.img} alt={ev.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(85%)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0), rgba(15,15,15,.6))" }} />
                  {/* Date badge */}
                  <div style={{
                    position: "absolute", top: 16, left: 16,
                    background: "rgba(5,5,5,.88)", border: "1px solid var(--border-2)",
                    borderRadius: 10, padding: "10px 14px", textAlign: "center",
                    backdropFilter: "blur(8px)",
                  }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 34, lineHeight: 1, color: "var(--brand)" }}>{ev.day}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted-2)", marginTop: 2 }}>{ev.month}</div>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--brand)" }}>{ev.code}</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,3vw,34px)", letterSpacing: 3, textTransform: "uppercase", lineHeight: 1, color: "#fff" }}>{ev.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--muted-2)" }}>{ev.city} — {ev.venue}</p>
                  <p style={{ fontSize: 14, color: "var(--muted-2)", lineHeight: 1.7, marginTop: 4 }}>{ev.description}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                    {ev.tags.map(t => <span key={t} className="tl__tag">{t}</span>)}
                  </div>
                  <div style={{ marginTop: "auto", paddingTop: 16, display: "flex", gap: 10 }}>
                    <Link href={`/events/${ev.id}`} className="btn btn--ghost">Details</Link>
                    <Link
                      href="/tickets"
                      className={`btn ${ev.soldOut ? "btn--disabled btn--ghost" : "btn--primary"}`}
                    >
                      {ev.soldOut ? "Sold Out" : "Tickets →"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PAST */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">// Archive</span>
          <h2 className="section-title">Past Events</h2>
          <div className="grid-3">
            {PAST.map((ev) => (
              <article key={ev.id} className="card" style={{ opacity: .7 }}>
                <div className="card__media">
                  <img src={ev.img} alt={ev.title} style={{ filter: "grayscale(60%) saturate(70%)" }} />
                  <span className="badge badge--sold badge--pill-pos">Past Event</span>
                </div>
                <div className="card__body">
                  <span className="card__label">{ev.date}</span>
                  <h3 className="card__title">{ev.code}</h3>
                  <p className="card__meta">{ev.city} — {ev.venue}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {ev.tags.map(t => <span key={t} className="tl__tag">{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 700px) {
          article { grid-template-columns: 1fr !important; }
          article > div:first-child { height: 200px; }
        }
      `}</style>
    </>
  );
}
