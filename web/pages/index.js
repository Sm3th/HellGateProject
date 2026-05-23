import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useInView from "../hooks/useInView";

const NEXT_EVENT_ISO = "2026-09-19T22:00:00+03:00";

const EVENTS = [
  { id: "gate02",    title: "GATE:02",       date: "19 SEP 2026", day: "19", month: "SEP", city: "Istanbul", venue: "TBA — revealed 48h before", img: "/hero.png", soldOut: false },
  { id: "afterhours",title: "AFTERHOURS",    date: "03 OCT 2026", day: "03", month: "OCT", city: "Istanbul", venue: "Warehouse 13",               img: "/hero.png", soldOut: false },
  { id: "winter",    title: "WINTER SPECIAL",date: "12 DEC 2026", day: "12", month: "DEC", city: "Ankara",   venue: "Bunker",                     img: "/hero.png", soldOut: false },
];

const ARTISTS = [
  { name: "DJ Inferno", time: "22:00", genre: "Techno" },
  { name: "Dark Pulse", time: "23:30", genre: "Industrial" },
  { name: "Hellraiser", time: "01:00", genre: "Hard Techno" },
  { name: "Acid Queen", time: "02:30", genre: "Acid" },
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

  return (
    <>
      <Head>
        <title>Hellgate Project — Underground Rave & Techno</title>
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
            19 Sep 2026 • Istanbul
          </div>

          {left.over ? (
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,4vw,48px)", letterSpacing: 6, color: "var(--brand)", marginBottom: 28 }}>
              THE GATE IS OPEN
            </p>
          ) : (
            <div className="countdown" role="timer" aria-live="polite">
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
            <Link href="/lineup" className="btn btn--ghost btn--lg">Line-up</Link>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <div className="about-strip">
        <div className="about-strip__item">
          <div className="about-strip__num">03</div>
          <div className="about-strip__label">Upcoming Events</div>
        </div>
        <div className="about-strip__item">
          <div className="about-strip__num">08+</div>
          <div className="about-strip__label">Artists</div>
        </div>
        <div className="about-strip__item">
          <div className="about-strip__num">500+</div>
          <div className="about-strip__label">Capacity</div>
        </div>
        <div className="about-strip__item">
          <div className="about-strip__num">18+</div>
          <div className="about-strip__label">Age Policy</div>
        </div>
      </div>

      {/* ═══ UPCOMING EVENTS ═══ */}
      <section className="section section--dark" id="events" ref={eventsRef}>
        <div className="container">
          <span className="eyebrow">// Schedule</span>
          <h2 className={`section-title reveal${eventsInView ? " is-visible" : ""}`}>Upcoming Events</h2>

          <div className="grid-3">
            {EVENTS.map((ev, i) => (
              <article key={ev.id} className={`card event-card reveal reveal--delay-${i + 1}${eventsInView ? " is-visible" : ""}`}>
                <div className="card__media">
                  <img src={ev.img} alt={ev.title} />
                  {ev.soldOut && (
                    <span className="badge badge--sold badge--pill-pos">Sold Out</span>
                  )}
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
        </div>
      </section>

      {/* ═══ ABOUT / MANIFESTO ═══ */}
      <section className="section" id="about">
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <span className="eyebrow">// About</span>
          <h2 className="section-title">Enter the Gate</h2>
          <p style={{ fontSize: 16, color: "var(--muted-2)", lineHeight: 1.9, maxWidth: 600, margin: "0 auto 32px" }}>
            Hellgate Project is an underground collective bringing raw, unfiltered techno to secret venues across Istanbul and Ankara.
            No headliners. No ego. Just sound, darkness, and community.
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px,3vw,28px)", letterSpacing: 4, color: "var(--brand)" }}>
            SOUND IS THE WEAPON. DARKNESS IS THE STAGE.
          </p>
        </div>
      </section>

      {/* ═══ LINE-UP PREVIEW ═══ */}
      <section className="section section--dark section--brand" id="lineup-preview">
        <div className="container">
          <span className="eyebrow">// Gate:02 — 19 Sep 2026</span>
          <h2 className="section-title">Line-up Preview</h2>

          <div className="grid-4" style={{ marginBottom: 36 }}>
            {ARTISTS.map((a, i) => (
              <div key={a.name} className="artist-card">
                <span className="artist-card__number">{String(i + 1).padStart(2, "0")}</span>
                <div className="artist-card__time">{a.time}</div>
                <div className="artist-card__name">{a.name}</div>
                <div className="artist-card__stage">Main Stage</div>
                <div className="artist-card__tags">
                  <span className="tl__tag">{a.genre}</span>
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
          <div className="video-embed">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Hellgate Project — Gate:01 Aftermovie"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="section section--dark" id="newsletter">
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <span className="eyebrow">// Stay Connected</span>
          <h2 className="section-title">Join the Cult</h2>
          <p style={{ color: "var(--muted-2)", marginBottom: 28, fontSize: 14, letterSpacing: 1 }}>
            Line-ups, location drops, and pre-sale access — directly to your inbox.
          </p>
          {newsletterOk ? (
            <p style={{ color: "var(--green)", fontWeight: 700, letterSpacing: 2 }}>✓ YOU'RE IN THE LOOP</p>
          ) : (
            <form
              className="newsletter-form"
              onSubmit={(e) => { e.preventDefault(); setNewsletterOk(true); }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn--primary">Subscribe</button>
            </form>
          )}
        </div>
      </section>

      <style jsx>{`
        .video-embed {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: #000;
        }
        .video-embed iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}
