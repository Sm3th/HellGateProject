import Head from "next/head";
import { useState, useCallback, useEffect } from "react";

const CATEGORIES = ["All", "Gate:01", "Backstage", "Crowd"];

const IMAGES = [
  { src: "/hero.png", alt: "Main stage — Gate:01 opening",       event: "Gate:01",  category: "Gate:01",   span: "tall"   },
  { src: "/hero.png", alt: "DJ Inferno opening set",              event: "Gate:01",  category: "Gate:01",   span: "normal" },
  { src: "/hero.png", alt: "Crowd surging at Hellraiser set",     event: "Gate:01",  category: "Crowd",     span: "wide"   },
  { src: "/hero.png", alt: "Industrial light rig overhead",       event: "Gate:01",  category: "Gate:01",   span: "normal" },
  { src: "/hero.png", alt: "Dark Pulse behind the decks",         event: "Gate:01",  category: "Backstage", span: "normal" },
  { src: "/hero.png", alt: "Strobe corridor towards the stage",   event: "Gate:01",  category: "Gate:01",   span: "tall"   },
  { src: "/hero.png", alt: "Pre-dawn crowd still moving",        event: "Gate:01",  category: "Crowd",     span: "normal" },
  { src: "/hero.png", alt: "Acid Queen 4 AM set",                event: "Gate:01",  category: "Gate:01",   span: "normal" },
  { src: "/hero.png", alt: "Backstage handshake",                event: "Gate:01",  category: "Backstage", span: "wide"   },
  { src: "/hero.png", alt: "Hellraiser headliner moment",        event: "Gate:01",  category: "Gate:01",   span: "normal" },
  { src: "/hero.png", alt: "Floor packed — 2 AM",                event: "Gate:01",  category: "Crowd",     span: "normal" },
  { src: "/hero.png", alt: "Sound system close-up",              event: "Gate:01",  category: "Backstage", span: "tall"   },
];

export default function Gallery() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filtered = filter === "All"
    ? IMAGES
    : IMAGES.filter((img) => img.category === filter);

  const prev = useCallback(() => setActive((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next = useCallback(() => setActive((i) => (i + 1) % filtered.length), [filtered.length]);

  const onKey = useCallback((e) => {
    if (active === null) return;
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setActive(null);
  }, [active, prev, next]);

  useEffect(() => {
    if (active !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  const counts = {
    All: IMAGES.length,
    "Gate:01": IMAGES.filter(i => i.category === "Gate:01").length,
    Backstage: IMAGES.filter(i => i.category === "Backstage").length,
    Crowd: IMAGES.filter(i => i.category === "Crowd").length,
  };

  return (
    <>
      <Head>
        <title>Gallery • Hellgate Project</title>
        <meta name="description" content="Photo archive from Hellgate Project rave events — Gate:01 recap, backstage moments and crowd shots." />
      </Head>

      {/* ═══ PAGE HERO ═══ */}
      <div className="page-hero" style={{ position: "relative", overflow: "hidden" }}>
        <div className="gallery-hero-bg" aria-hidden />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow">// Gate:01 Archive</span>
          <h1>Gallery</h1>
          <p>Captured in the darkness — {IMAGES.length} photographs</p>
        </div>
      </div>

      {/* ═══ FILTER TABS ═══ */}
      <div className="gallery-filter-bar">
        <div className="container">
          <div className="gallery-filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setActive(null); }}
                className={`gallery-filter-tab${filter === cat ? " gallery-filter-tab--active" : ""}`}
              >
                {cat}
                <span className="gallery-filter-tab__count">{counts[cat]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ MASONRY GRID ═══ */}
      <section className="section section--dark">
        <div className="container">
          {mounted && (
            <div className="gallery-masonry">
              {filtered.map((img, i) => (
                <button
                  key={`${filter}-${i}`}
                  className={`gallery-cell gallery-cell--${img.span}`}
                  onClick={() => setActive(i)}
                  onKeyDown={onKey}
                  aria-label={`Open photo: ${img.alt}`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <div className="gallery-cell__overlay">
                    <div className="gallery-cell__info">
                      <span className="gallery-cell__tag">{img.category}</span>
                      <span className="gallery-cell__caption">{img.alt}</span>
                    </div>
                    <span className="gallery-cell__zoom">⊕</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--muted-2)", padding: "80px 0", fontSize: 14, letterSpacing: 2 }}>
              NO PHOTOS IN THIS CATEGORY YET
            </p>
          )}

          {/* ═══ INSTAGRAM CTA ═══ */}
          <div className="gallery-ig-cta">
            <div className="gallery-ig-cta__left">
              <p className="gallery-ig-cta__label">// Share Your Night</p>
              <p className="gallery-ig-cta__title">Were you there?</p>
              <p className="gallery-ig-cta__sub">
                Tag <strong style={{ color: "#fff" }}>@hellgate.project</strong> — the best shots get featured here after every event.
              </p>
            </div>
            <div className="gallery-ig-cta__right">
              <a
                href="https://www.instagram.com/hellgate.project/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline-brand btn--lg"
              >
                Follow on Instagram →
              </a>
              <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, letterSpacing: 1 }}>
                More photos uploaded after each event
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LIGHTBOX ═══ */}
      {active !== null && (
        <div
          className="lightbox lightbox--enhanced"
          onClick={() => setActive(null)}
          onKeyDown={onKey}
          tabIndex={0}
          role="dialog"
          aria-label="Photo viewer"
          aria-modal
        >
          {/* Image wrapper — stops click propagation */}
          <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
            <img
              className="lightbox__img"
              src={filtered[active].src}
              alt={filtered[active].alt}
            />
            {/* Caption bar */}
            <div className="lightbox-caption">
              <div>
                <p className="lightbox-caption__main">{filtered[active].alt}</p>
                <p className="lightbox-caption__sub">{filtered[active].event} · {filtered[active].category}</p>
              </div>
              <span className="lightbox-caption__counter">
                {active + 1} / {filtered.length}
              </span>
            </div>
          </div>

          <button className="lightbox__close" onClick={() => setActive(null)} aria-label="Close">✕</button>

          {filtered.length > 1 && (
            <>
              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous photo"
              >‹</button>
              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next photo"
              >›</button>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        /* Hero glow bg */
        .gallery-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 80% at 20% 100%, rgba(255,0,51,.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 80% 0%, rgba(136,0,255,.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Filter bar */
        .gallery-filter-bar {
          background: var(--bg-2);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 72px;
          z-index: 20;
          backdrop-filter: blur(12px);
        }
        .gallery-filter-tabs {
          display: flex;
          gap: 0;
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .gallery-filter-tabs::-webkit-scrollbar { display: none; }
        .gallery-filter-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 22px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: var(--muted-2);
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: color .2s, border-color .2s;
          white-space: nowrap;
          margin-bottom: -1px;
        }
        .gallery-filter-tab:hover { color: #fff; }
        .gallery-filter-tab--active {
          color: #fff;
          border-bottom-color: var(--brand);
        }
        .gallery-filter-tab__count {
          background: var(--bg-raised);
          border: 1px solid var(--border-2);
          border-radius: 999px;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          color: var(--muted-2);
          min-width: 22px;
          text-align: center;
        }
        .gallery-filter-tab--active .gallery-filter-tab__count {
          background: var(--brand-dim);
          border-color: rgba(255,0,51,.3);
          color: var(--brand);
        }

        /* Masonry grid */
        .gallery-masonry {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          grid-auto-rows: 220px;
        }

        /* Grid cells */
        .gallery-cell {
          display: block;
          border: none;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          grid-row: span 1;
          transition: border-color .25s, transform .25s;
        }
        .gallery-cell:hover {
          border-color: rgba(255,0,51,.4);
          transform: scale(1.01);
          z-index: 1;
        }
        .gallery-cell--tall  { grid-row: span 2; }
        .gallery-cell--wide  { grid-column: span 2; }

        .gallery-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .45s ease, filter .45s ease;
          filter: saturate(80%) contrast(105%) brightness(.95);
        }
        .gallery-cell:hover img {
          transform: scale(1.06);
          filter: saturate(115%) contrast(108%) brightness(1);
        }

        /* Overlay */
        .gallery-cell__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.15) 50%, transparent 100%);
          opacity: 0;
          transition: opacity .3s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 14px;
        }
        .gallery-cell:hover .gallery-cell__overlay { opacity: 1; }

        .gallery-cell__zoom {
          align-self: flex-end;
          font-size: 22px;
          color: rgba(255,255,255,.7);
          line-height: 1;
        }
        .gallery-cell__info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .gallery-cell__tag {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--brand);
        }
        .gallery-cell__caption {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
        }

        /* Instagram CTA */
        .gallery-ig-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          margin-top: 60px;
          padding: 36px 40px;
          background: linear-gradient(135deg, rgba(255,0,51,.06) 0%, rgba(136,0,255,.04) 100%);
          border: 1px solid var(--border);
          border-radius: 16px;
        }
        .gallery-ig-cta__label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--brand);
          margin-bottom: 8px;
        }
        .gallery-ig-cta__title {
          font-family: var(--font-display);
          font-size: clamp(24px, 3vw, 40px);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .gallery-ig-cta__sub {
          font-size: 14px;
          color: var(--muted-2);
          line-height: 1.7;
          max-width: 400px;
        }
        .gallery-ig-cta__right {
          text-align: center;
          flex-shrink: 0;
        }

        /* Enhanced lightbox */
        .lightbox--enhanced {
          cursor: default;
        }
        .lightbox-frame {
          position: relative;
          max-width: min(90vw, 1100px);
          max-height: 85vh;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 80px rgba(0,0,0,.9);
        }
        .lightbox-frame .lightbox__img {
          max-width: 100%;
          max-height: 85vh;
          border-radius: 0;
        }
        .lightbox-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 24px;
          background: linear-gradient(to top, rgba(0,0,0,.95), transparent);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
        }
        .lightbox-caption__main {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }
        .lightbox-caption__sub {
          font-size: 11px;
          color: var(--brand);
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 700;
        }
        .lightbox-caption__counter {
          font-family: var(--font-display);
          font-size: 20px;
          color: rgba(255,255,255,.4);
          letter-spacing: 2px;
          flex-shrink: 0;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .gallery-masonry { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; }
          .gallery-cell--wide { grid-column: span 1; }
          .gallery-ig-cta { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 600px) {
          .gallery-masonry { grid-template-columns: 1fr; grid-auto-rows: 200px; }
          .gallery-cell--tall, .gallery-cell--wide { grid-row: span 1; grid-column: span 1; }
          .gallery-ig-cta { padding: 24px 20px; }
        }
      `}</style>
    </>
  );
}
