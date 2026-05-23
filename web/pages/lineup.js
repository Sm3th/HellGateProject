import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

const FALLBACK = [
  { id: "d1", time: "22:00", artist: "DJ Inferno",  stage: "Main",    genre: "Techno",      headliner: false, bio: "Istanbul-based techno pioneer. Industrial-tinged, relentless drive from the first beat to the last." },
  { id: "d2", time: "23:30", artist: "Dark Pulse",   stage: "Main",    genre: "Industrial",  headliner: false, bio: "Raw mechanical energy rooted in Berlin's underground — noise, rhythm, repetition." },
  { id: "d3", time: "01:00", artist: "Hellraiser",   stage: "Main",    genre: "Hard Techno", headliner: true,  bio: "Headliner. Uncompromising hard techno from the depths of the Bosphorus. Zero mercy." },
  { id: "d4", time: "02:30", artist: "Acid Queen",   stage: "Main",    genre: "Acid",        headliner: false, bio: "303-driven acid journeys stretching through dawn. The closer. The ritual end." },
];

const GENRE_CONFIG = {
  "Techno":      { color: "#ff0033", glow: "rgba(255,0,51,.3)"     },
  "Industrial":  { color: "#8800ff", glow: "rgba(136,0,255,.3)"    },
  "Hard Techno": { color: "#ff6600", glow: "rgba(255,102,0,.3)"    },
  "Acid":        { color: "#00ddff", glow: "rgba(0,221,255,.3)"    },
  "Minimal":     { color: "#00ff88", glow: "rgba(0,255,136,.3)"    },
  "EBM":         { color: "#ffcc00", glow: "rgba(255,204,0,.3)"    },
};

function toMinutes(hhmm = "") {
  const [h, m] = hhmm.split(":").map(Number);
  const hr = Number.isFinite(h) ? h : 0;
  const mn = Number.isFinite(m) ? m : 0;
  return (hr < 6 ? hr + 24 : hr) * 60 + mn;
}

const ALL_GENRES = ["All", "Techno", "Industrial", "Hard Techno", "Acid", "Minimal", "EBM"];

export default function LineupPage() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState("grid");
  const [genreFilter, setGenreFilter] = useState("All");

  useEffect(() => {
    fetch("/api/lineup")
      .then((r) => r.json())
      .then((d) => setItems(Array.isArray(d) && d.length ? d : FALLBACK))
      .catch(() => setItems(FALLBACK));
  }, []);

  const sorted = useMemo(
    () => [...items].sort((a, b) => toMinutes(a.time) - toMinutes(b.time)),
    [items]
  );

  const filtered = useMemo(
    () => genreFilter === "All"
      ? sorted
      : sorted.filter((a) => (a.genre ?? "Techno") === genreFilter),
    [sorted, genreFilter]
  );

  const headliner = sorted.find((a) => a.headliner);
  const genres = useMemo(() => {
    const seen = new Set(sorted.map((a) => a.genre ?? "Techno"));
    return ALL_GENRES.filter((g) => g === "All" || seen.has(g));
  }, [sorted]);

  return (
    <>
      <Head>
        <title>Line-up • Hellgate Project</title>
        <meta name="description" content="Full artist lineup and schedule for Hellgate Project Gate:02 — 19 Sep 2026." />
      </Head>

      {/* ═══ PAGE HERO ═══ */}
      <div className="page-hero" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 50% 80% at 0% 100%, rgba(255,0,51,.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 100% 0%, rgba(136,0,255,.06) 0%, transparent 70%)
          `,
        }} />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow">// Gate:02 — 19 Sep 2026</span>
          <h1>Line-up</h1>
          <p>Night schedule — subject to change</p>
        </div>
      </div>

      {/* ═══ HEADLINER CARD ═══ */}
      {headliner && (
        <section style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "40px 0" }}>
          <div className="container">
            <span className="eyebrow" style={{ marginBottom: 20, display: "block" }}>// Headliner</span>
            <div className="headliner-card">
              <div className="headliner-card__number">01</div>
              <div className="headliner-card__body">
                <div className="headliner-card__meta">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: 3, color: GENRE_CONFIG[headliner.genre]?.color || "var(--brand)" }}>
                    {headliner.time} — Main Stage
                  </span>
                  <span className="headliner-badge">HEADLINER</span>
                </div>
                <h2 className="headliner-card__name">{headliner.artist ?? headliner.name}</h2>
                {headliner.bio && (
                  <p className="headliner-card__bio">{headliner.bio}</p>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <span
                    className="tl__tag"
                    style={{
                      background: `${GENRE_CONFIG[headliner.genre]?.color}18` || "var(--brand-dim)",
                      color: GENRE_CONFIG[headliner.genre]?.color || "var(--brand)",
                      borderColor: `${GENRE_CONFIG[headliner.genre]?.color}33` || "rgba(255,0,51,.25)",
                    }}
                  >
                    {headliner.genre ?? "Techno"}
                  </span>
                </div>
              </div>
              <div
                className="headliner-card__glow"
                style={{
                  background: `radial-gradient(ellipse at 100% 50%, ${GENRE_CONFIG[headliner.genre]?.glow || "rgba(255,0,51,.3)"} 0%, transparent 70%)`,
                }}
                aria-hidden
              />
            </div>
          </div>
        </section>
      )}

      {/* ═══ CONTROLS ═══ */}
      <div className="lineup-controls">
        <div className="container">
          <div className="lineup-controls__inner">
            {/* View toggle */}
            <div className="lineup-view-toggle">
              {[
                { id: "grid",     label: "Cards" },
                { id: "timeline", label: "Schedule" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setView(id)}
                  className={`lineup-view-btn${view === id ? " lineup-view-btn--active" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Genre filter */}
            <div className="lineup-genre-filter">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenreFilter(g)}
                  className={`genre-chip${genreFilter === g ? " genre-chip--active" : ""}`}
                  style={genreFilter === g && GENRE_CONFIG[g] ? {
                    background: `${GENRE_CONFIG[g].color}18`,
                    borderColor: `${GENRE_CONFIG[g].color}44`,
                    color: GENRE_CONFIG[g].color,
                  } : {}}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ GRID VIEW ═══ */}
      {view === "grid" && (
        <section className="section section--dark">
          <div className="container">
            {filtered.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--muted-2)", padding: "60px 0" }}>No artists match this filter.</p>
            ) : (
              <div className="grid-4">
                {filtered.map((a, i) => {
                  const name  = a.artist ?? a.name;
                  const genre = a.genre ?? "Techno";
                  const cfg   = GENRE_CONFIG[genre] || GENRE_CONFIG["Techno"];
                  return (
                    <div
                      key={a.id ?? i}
                      className={`artist-card${a.headliner ? " artist-card--hl" : ""}`}
                      style={{ "--accent": cfg.color, "--accent-glow": cfg.glow }}
                    >
                      <div className="artist-card__top-bar" style={{ background: `linear-gradient(90deg, ${cfg.color}, transparent)` }} />
                      <span className="artist-card__number">{String(i + 1).padStart(2, "0")}</span>
                      <div className="artist-card__time" style={{ color: cfg.color }}>{a.time}</div>
                      <div className="artist-card__name">{name}</div>
                      <div className="artist-card__stage">Stage: {a.stage ?? "Main"}</div>
                      {a.bio && (
                        <p style={{ fontSize: 12, color: "var(--muted-2)", lineHeight: 1.65, marginTop: 4 }}>{a.bio}</p>
                      )}
                      <div className="artist-card__tags">
                        <span
                          className="tl__tag"
                          style={{
                            background: `${cfg.color}18`,
                            color: cfg.color,
                            borderColor: `${cfg.color}33`,
                          }}
                        >
                          {genre}
                        </span>
                        {a.headliner && (
                          <span className="headliner-badge headliner-badge--sm">HL</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══ TIMELINE VIEW ═══ */}
      {view === "timeline" && (
        <section className="section section--dark">
          <div className="container--narrow">
            {filtered.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--muted-2)", padding: "60px 0" }}>No artists match this filter.</p>
            ) : (
              <div className="tl">
                <div className="tl__rail" aria-hidden />
                <ul className="tl__list" role="list">
                  {filtered.map((a, i) => {
                    const name  = a.artist ?? a.name;
                    const genre = a.genre ?? "Techno";
                    const cfg   = GENRE_CONFIG[genre] || GENRE_CONFIG["Techno"];
                    return (
                      <li key={a.id ?? i} className="tl__item">
                        <span
                          className="tl__dot"
                          style={{
                            background: cfg.color,
                            boxShadow: `0 0 10px ${cfg.glow}, 0 0 20px ${cfg.glow}`,
                          }}
                          aria-hidden
                        />
                        <div className="tl__time" style={{ color: cfg.color }}>{a.time}</div>
                        <div
                          className="tl__card"
                          style={{
                            borderLeftColor: cfg.color,
                            boxShadow: a.headliner ? `0 0 20px ${cfg.glow}` : undefined,
                            borderColor: a.headliner ? cfg.color : undefined,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                            <span className="tl__artist">{name}</span>
                            {a.headliner && (
                              <span className="headliner-badge headliner-badge--sm">HL</span>
                            )}
                          </div>
                          <p className="tl__meta">Stage: {a.stage ?? "Main"}</p>
                          <span
                            className="tl__tag"
                            style={{
                              background: `${cfg.color}15`,
                              color: cfg.color,
                              borderColor: `${cfg.color}30`,
                            }}
                          >
                            {genre}
                          </span>
                          {a.bio && (
                            <p style={{ fontSize: 13, color: "var(--muted-2)", lineHeight: 1.65, marginTop: 10 }}>{a.bio}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══ DISCLAIMER ═══ */}
      <div style={{ borderTop: "1px solid var(--border)", background: "var(--bg-2)", padding: "20px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 2, textTransform: "uppercase" }}>
            All times approximate · Schedule subject to change
          </p>
          <a
            href="https://www.instagram.com/hellgate.project/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 11, color: "var(--brand)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}
          >
            @hellgate.project
          </a>
        </div>
      </div>

      <style jsx>{`
        /* Headliner card */
        .headliner-card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid rgba(255,0,51,.3);
          border-radius: 16px;
          padding: 32px 36px;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .headliner-card__number {
          font-family: var(--font-display);
          font-size: 100px;
          line-height: 1;
          color: rgba(255,0,51,.06);
          flex-shrink: 0;
          user-select: none;
          pointer-events: none;
        }
        .headliner-card__body {
          flex: 1;
          position: relative;
          z-index: 1;
        }
        .headliner-card__meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .headliner-card__name {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 72px);
          letter-spacing: 4px;
          text-transform: uppercase;
          line-height: 1;
          color: #fff;
          margin-bottom: 12px;
        }
        .headliner-card__bio {
          font-size: 14px;
          color: var(--muted-2);
          line-height: 1.7;
          max-width: 560px;
        }
        .headliner-card__glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .headliner-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          background: var(--brand);
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 4px;
          box-shadow: 0 0 12px var(--brand-glow);
        }
        .headliner-badge--sm { padding: 3px 8px; font-size: 9px; }

        /* Controls bar */
        .lineup-controls {
          background: var(--bg-2);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 72px;
          z-index: 20;
          backdrop-filter: blur(12px);
        }
        .lineup-controls__inner {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 14px 0;
          flex-wrap: wrap;
        }
        .lineup-view-toggle {
          display: flex;
          background: var(--bg-raised);
          border: 1px solid var(--border-2);
          border-radius: 8px;
          padding: 3px;
          gap: 2px;
          flex-shrink: 0;
        }
        .lineup-view-btn {
          padding: 6px 16px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: var(--muted-2);
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background .2s, color .2s;
        }
        .lineup-view-btn--active {
          background: var(--brand);
          color: #fff;
          box-shadow: 0 0 8px var(--brand-glow);
        }
        .lineup-genre-filter {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .genre-chip {
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid var(--border-2);
          background: transparent;
          color: var(--muted-2);
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background .2s, color .2s, border-color .2s;
          white-space: nowrap;
        }
        .genre-chip:hover { color: #fff; border-color: rgba(255,255,255,.3); }
        .genre-chip--active { color: #fff; }

        /* Artist card top bar */
        .artist-card__top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          opacity: 0;
          transition: opacity .25s;
        }
        .artist-card:hover .artist-card__top-bar { opacity: 1; }
        .artist-card--hl {
          border-color: var(--brand);
          box-shadow: 0 0 0 1px rgba(255,0,51,.12), 0 8px 32px rgba(0,0,0,.4);
        }

        @media (max-width: 768px) {
          .headliner-card { flex-direction: column; align-items: flex-start; padding: 24px; }
          .headliner-card__number { display: none; }
          .lineup-controls__inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}
