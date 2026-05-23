import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const EVENTS_DATA = {
  "gate02": {
    id: "gate02",
    code: "GATE:02",
    title: "Hellgate Project // Gate:02",
    date: "Saturday, 19 September 2026",
    startTime: "22:00",
    endTime: "06:00+",
    city: "Istanbul",
    venue: "Location TBA — revealed 48h before",
    img: "/hero.png",
    tags: ["Techno", "Industrial", "Hard Techno"],
    soldOut: false,
    capacity: "500",
    description: `Gate:02 is the second chapter of the Hellgate saga. After the overwhelming response to Gate:01, we return with a bigger sound, a deeper darkness, and a lineup that will push every boundary.

Expect a journey through raw, industrial techno from sundown to sunrise. No genre clichés. No compromise.

This is not a party. This is a ritual.`,
    lineup: [
      { name: "DJ Inferno", time: "22:00–23:30", genre: "Techno", headliner: false },
      { name: "Dark Pulse", time: "23:30–01:00", genre: "Industrial", headliner: false },
      { name: "Hellraiser", time: "01:00–02:30", genre: "Hard Techno", headliner: true },
      { name: "Acid Queen", time: "02:30–06:00", genre: "Acid", headliner: false },
    ],
    info: [
      { label: "Age", value: "18+ strictly enforced. Valid ID required." },
      { label: "Capacity", value: "500 people. Ticket-only. No door entry." },
      { label: "Location", value: "Revealed 48 hours before the event via email & Instagram." },
      { label: "Dress Code", value: "None. Comfortable clothing for extended dancing." },
      { label: "Photography", value: "Phone-free dancefloor. Professional cameras require written permission." },
    ],
  },
  "afterhours": {
    id: "afterhours",
    code: "AFTERHOURS",
    title: "Hellgate // Afterhours",
    date: "Saturday, 03 October 2026",
    startTime: "23:00",
    endTime: "10:00+",
    city: "Istanbul",
    venue: "Warehouse 13",
    img: "/hero.png",
    tags: ["Acid", "EBM", "Minimal"],
    soldOut: false,
    capacity: "200",
    description: `An intimate afterhours edition. Smaller capacity, deeper sound, closer community.

Warehouse 13 is one of Istanbul's most unique underground spaces — raw concrete, industrial acoustics, and a sound system built for bass heads.

This is where the real night begins.`,
    lineup: [
      { name: "TBA", time: "23:00–02:00", genre: "Acid", headliner: false },
      { name: "TBA", time: "02:00–06:00", genre: "EBM", headliner: true },
      { name: "TBA", time: "06:00–10:00", genre: "Minimal", headliner: false },
    ],
    info: [
      { label: "Age", value: "18+ strictly enforced." },
      { label: "Capacity", value: "200 people. Very limited." },
      { label: "Location", value: "Warehouse 13, Kasımpaşa, Istanbul." },
      { label: "Dress Code", value: "None." },
    ],
  },
  "winter": {
    id: "winter",
    code: "WINTER SPECIAL",
    title: "Hellgate // Winter Special",
    date: "Saturday, 12 December 2026",
    startTime: "22:00",
    endTime: "06:00+",
    city: "Ankara",
    venue: "Bunker",
    img: "/hero.png",
    tags: ["Techno", "Industrial"],
    soldOut: false,
    capacity: "350",
    description: `Hellgate heads to Ankara for a one-night winter special.

Bunker is the capital's most underground venue — literally underground. A brutalist space carved out for maximum resonance and zero daylight.

One night. One chance. Don't sleep.`,
    lineup: [
      { name: "TBA", time: "22:00+", genre: "Techno", headliner: true },
    ],
    info: [
      { label: "Age", value: "18+ strictly enforced." },
      { label: "Capacity", value: "350 people." },
      { label: "Location", value: "Bunker, Ankara." },
    ],
  },
};

export default function EventDetail() {
  const { query } = useRouter();
  const ev = EVENTS_DATA[query.id];

  if (!ev) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: 4, color: "var(--brand)" }}>EVENT NOT FOUND</p>
        <Link href="/events" className="btn btn--ghost">← Back to Events</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{ev.code} • Hellgate Project</title>
        <meta name="description" content={`${ev.title} — ${ev.date} — ${ev.city}`} />
      </Head>

      {/* HERO */}
      <div style={{ position: "relative", height: "60vh", minHeight: 400, overflow: "hidden", paddingTop: 72 }}>
        <img src={ev.img} alt={ev.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .45 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,5,.3), rgba(5,5,5,.9))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end" }}>
          <div className="container" style={{ paddingBottom: 48 }}>
            <Link href="/events" style={{ fontSize: 12, color: "var(--muted-2)", letterSpacing: 2, textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20, transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--muted-2)"}
            >
              ← Events
            </Link>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              {ev.tags.map(t => <span key={t} className="tl__tag">{t}</span>)}
              {ev.soldOut && <span className="badge badge--sold">Sold Out</span>}
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 6vw, 72px)", letterSpacing: 4, textTransform: "uppercase", lineHeight: 1, marginBottom: 12 }}>
              {ev.title}
            </h1>
            <p style={{ color: "var(--muted-2)", fontSize: 14, letterSpacing: 2 }}>
              {ev.date} • {ev.startTime}–{ev.endTime} • {ev.city}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="section section--dark">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 48, alignItems: "start" }}>

          {/* Left */}
          <div>
            {/* Description */}
            <section style={{ marginBottom: 48 }}>
              <span className="eyebrow">// About the Night</span>
              <h2 className="section-title" style={{ textAlign: "left", fontSize: "clamp(22px,4vw,36px)" }}>
                The Night
                <span style={{ display: "block", width: 40, height: 2, background: "var(--brand)", boxShadow: "0 0 8px var(--brand)", marginTop: 12 }} />
              </h2>
              {ev.description.split("\n\n").map((p, i) => (
                <p key={i} style={{ fontSize: 15, color: "var(--muted-2)", lineHeight: 1.85, marginBottom: 16 }}>{p}</p>
              ))}
            </section>

            {/* Lineup */}
            <section style={{ marginBottom: 48 }}>
              <span className="eyebrow">// Artists</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>
                Line-up
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ev.lineup.map((a) => (
                  <div key={a.name} style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "16px 20px",
                    background: "var(--bg-raised)", border: "1px solid var(--border)",
                    borderLeft: a.headliner ? "3px solid var(--brand)" : "3px solid var(--border-2)",
                    borderRadius: 10,
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: 2, textTransform: "uppercase" }}>{a.name}</span>
                        {a.headliner && <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", background: "var(--brand)", color: "#fff", padding: "3px 8px", borderRadius: 4 }}>Headliner</span>}
                      </div>
                      <span className="tl__tag">{a.genre}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--brand)", letterSpacing: 1 }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Event Info */}
            <section>
              <span className="eyebrow">// What to Know</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>
                Event Info
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ev.info.map((item) => (
                  <div key={item.label} style={{ display: "flex", gap: 16, padding: "14px 16px", background: "var(--bg-raised)", border: "1px solid var(--border)", borderRadius: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--brand)", minWidth: 80, paddingTop: 2 }}>{item.label}</span>
                    <span style={{ fontSize: 14, color: "var(--muted-2)", lineHeight: 1.5 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right — sticky ticket card */}
          <aside style={{ position: "sticky", top: 88 }}>
            <div style={{ background: "var(--bg-card)", border: ev.soldOut ? "1px solid var(--border)" : "1px solid var(--brand)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "24px", background: "var(--bg-raised)", borderBottom: "1px solid var(--border)" }}>
                <span className="eyebrow" style={{ textAlign: "left", display: "block", marginBottom: 8 }}>// Get Your Ticket</span>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: 2, color: "var(--muted-2)", textTransform: "uppercase" }}>{ev.date}</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: 2, color: "var(--muted-2)", textTransform: "uppercase", marginTop: 4 }}>{ev.city} — {ev.venue}</p>
                <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, letterSpacing: 1 }}>Capacity: {ev.capacity}</p>
              </div>
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "var(--muted-2)" }}>From</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "var(--brand)", letterSpacing: 2 }}>€25</span>
                </div>
                <Link
                  href="/tickets"
                  className={`btn btn--block btn--lg ${ev.soldOut ? "btn--disabled btn--ghost" : "btn--primary"}`}
                >
                  {ev.soldOut ? "Sold Out" : "Get Tickets →"}
                </Link>
                <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", letterSpacing: 1 }}>
                  Secure checkout • Tickets sent by email
                </p>
              </div>
            </div>

            {/* Share */}
            <div style={{ marginTop: 16, padding: "16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "var(--muted-2)", letterSpacing: 1, marginBottom: 10 }}>SPREAD THE WORD</p>
              <a
                href={`https://www.instagram.com/hellgate.project/`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn--ghost btn--sm btn--block"
              >
                @hellgate.project
              </a>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
