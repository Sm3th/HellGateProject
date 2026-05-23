import Head from "next/head";
import { useState, useCallback, useEffect } from "react";

const CATEGORIES = ["All", "Gate:01", "Backstage", "Crowd"];

const MEDIA = [
  // ── Triptych: Exilion ──
  { type: "img", src: "/gallery/1.jpg", alt: "Exilion — I",                    category: "Gate:01",   span: "normal" },
  { type: "img", src: "/gallery/2.jpg", alt: "Exilion — The Exiled Spirit",    category: "Gate:01",   span: "normal" },
  { type: "img", src: "/gallery/3.jpg", alt: "Exilion — II",                   category: "Gate:01",   span: "normal" },
  // ── Triptych: Giveaway ──
  { type: "img", src: "/gallery/4.jpg", alt: "Giveaway — Location",            category: "Gate:01",   span: "normal" },
  { type: "img", src: "/gallery/5.jpg", alt: "Giveaway — Crew",                category: "Gate:01",   span: "normal" },
  { type: "img", src: "/gallery/6.jpg", alt: "Giveaway — Scene",               category: "Gate:01",   span: "normal" },
  // ── Triptych: We Are Everywhere ──
  { type: "img", src: "/gallery/7.jpg", alt: "We Are Everywhere",              category: "Gate:01",   span: "normal" },
  { type: "img", src: "/gallery/8.jpg", alt: "HHG — Graffiti Wall",            category: "Gate:01",   span: "normal" },
  { type: "img", src: "/gallery/9.jpg", alt: "Join Us",                        category: "Gate:01",   span: "normal" },
  // ── Portrait / merch series ──
  { type: "img", src: "/gallery/10.jpg", alt: "Editorial — Gate:01 Fit",       category: "Backstage", span: "normal" },
  { type: "img", src: "/gallery/11.jpg", alt: "Hellgate Tee — Front",          category: "Backstage", span: "normal" },
  { type: "img", src: "/gallery/12.jpg", alt: "HHG Crop Top",                  category: "Backstage", span: "normal" },
  { type: "img", src: "/gallery/13.jpg", alt: "Editorial — HHG Fit",           category: "Backstage", span: "normal" },
  { type: "img", src: "/gallery/14.jpg", alt: "Hellgate Tee — Back",           category: "Backstage", span: "normal" },
  { type: "img", src: "/gallery/15.jpg", alt: "HHG Crop — Close",              category: "Backstage", span: "normal" },
  // ── Triptych: Echt oder Fake ──
  { type: "img", src: "/gallery/16.jpg", alt: "Crowd — Gate:01",               category: "Crowd",     span: "normal" },
  { type: "img", src: "/gallery/17.jpg", alt: "Echt oder Fake? — Who Are You?",category: "Gate:01",   span: "normal" },
  { type: "img", src: "/gallery/18.jpg", alt: "Crowd — Gate:01",               category: "Crowd",     span: "normal" },
  // ── Other ──
  { type: "img", src: "/gallery/berceste.jpg",                                   alt: "Berceste — portrait",             category: "Backstage", span: "tall"   },
  { type: "img", src: "/gallery/SaveClip.App_573792729_17868998679469946_1257856799886885738_n.jpg",  alt: "Berceste live — Gate:01",         category: "Gate:01",   span: "normal" },
  { type: "img", src: "/gallery/SaveClip.App_586688471_17872439610469946_5088464307786262174_n.jpg",  alt: "Feel Every Beat in Your Veins",   category: "Gate:01",   span: "normal" },
  { type: "img", src: "/gallery/SaveClip.App_587266559_17872439595469946_8647313477321146666_n.jpg",  alt: "Gate:01 — Atmosphere",            category: "Crowd",     span: "normal" },
  { type: "img", src: "/gallery/SaveClip.App_587277655_17872439601469946_4470079853758776117_n.jpg",  alt: "Gate:01 — Atmosphere",            category: "Crowd",     span: "normal" },
  // ── Video ──
  { type: "video", src: "/gallery/SaveClip.App_AQODQn-MIvxL5FtLG9-mOpd4ggJ0uAdntG2QKKOChuJXOQeU6dbNf1IOTqLdD9J-4cmQR_4bhuqI3cxvbz8JF8Nml5jGpd9gHEEfcGg.mp4", alt: "Gate:01 — Video Clip", category: "Gate:01", span: "wide" },
];

export default function Gallery() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filtered = filter === "All"
    ? MEDIA
    : MEDIA.filter((m) => m.category === filter);

  // Navigate only among images (skip videos in prev/next)
  const imgIndices = filtered.reduce((acc, m, i) => (m.type === "img" ? [...acc, i] : acc), []);

  const prev = useCallback(() => {
    setActive((cur) => {
      const pos = imgIndices.indexOf(cur);
      return imgIndices[(pos - 1 + imgIndices.length) % imgIndices.length];
    });
  }, [imgIndices]);

  const next = useCallback(() => {
    setActive((cur) => {
      const pos = imgIndices.indexOf(cur);
      return imgIndices[(pos + 1) % imgIndices.length];
    });
  }, [imgIndices]);

  const onKey = useCallback((e) => {
    if (active === null) return;
    if (e.key === "ArrowLeft")  prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape")     setActive(null);
  }, [active, prev, next]);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  useEffect(() => {
    if (active !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  const counts = {
    All:       MEDIA.length,
    "Gate:01": MEDIA.filter(m => m.category === "Gate:01").length,
    Backstage: MEDIA.filter(m => m.category === "Backstage").length,
    Crowd:     MEDIA.filter(m => m.category === "Crowd").length,
  };

  const photoCount = MEDIA.filter(m => m.type === "img").length;

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
          <p>Captured in the darkness — {photoCount} photographs &amp; {MEDIA.length - photoCount} video</p>
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
              {filtered.map((item, i) => (
                <button
                  key={`${filter}-${i}`}
                  className={`gallery-cell gallery-cell--${item.span}${item.type === "video" ? " gallery-cell--video" : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={item.type === "video" ? `Play video: ${item.alt}` : `Open photo: ${item.alt}`}
                >
                  {item.type === "video" ? (
                    <div className="gallery-cell__video-thumb">
                      <video src={item.src} muted preload="metadata" />
                      <div className="gallery-cell__video-play" aria-hidden>
                        <span className="gallery-cell__play-icon">▶</span>
                        <span className="gallery-cell__play-label">VIDEO</span>
                      </div>
                    </div>
                  ) : (
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  )}
                  <div className="gallery-cell__overlay">
                    <div className="gallery-cell__info">
                      <span className="gallery-cell__tag">{item.category}</span>
                      <span className="gallery-cell__caption">{item.alt}</span>
                    </div>
                    <span className="gallery-cell__zoom">{item.type === "video" ? "▶" : "⊕"}</span>
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
      {active !== null && filtered[active] && (() => {
        const item = filtered[active];
        const isVideo = item.type === "video";
        return (
          <div
            className={`lightbox lightbox--enhanced${isVideo ? " lightbox--video" : ""}`}
            onClick={() => setActive(null)}
            role="dialog"
            aria-label={isVideo ? "Video player" : "Photo viewer"}
            aria-modal
          >
            {isVideo ? (
              /* ── Video player ── */
              <div className="lightbox-video-frame" onClick={(e) => e.stopPropagation()}>
                <video
                  className="lightbox-video"
                  src={item.src}
                  controls
                  autoPlay
                  playsInline
                />
                <div className="lightbox-caption">
                  <div>
                    <p className="lightbox-caption__main">{item.alt}</p>
                    <p className="lightbox-caption__sub">{item.category} · Video</p>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Image viewer ── */
              <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
                <img className="lightbox__img" src={item.src} alt={item.alt} />
                <div className="lightbox-caption">
                  <div>
                    <p className="lightbox-caption__main">{item.alt}</p>
                    <p className="lightbox-caption__sub">{item.category}</p>
                  </div>
                  <span className="lightbox-caption__counter">
                    {imgIndices.indexOf(active) + 1} / {imgIndices.length}
                  </span>
                </div>
              </div>
            )}

            <button className="lightbox__close" onClick={() => setActive(null)} aria-label="Close">✕</button>

            {!isVideo && imgIndices.length > 1 && (
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
        );
      })()}

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

        /* Video grid cell */
        .gallery-cell--video { background: #000; }
        .gallery-cell__video-thumb {
          width: 100%; height: 100%;
          position: relative;
          overflow: hidden;
        }
        .gallery-cell__video-thumb video {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: .55;
          pointer-events: none;
        }
        .gallery-cell__video-play {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          pointer-events: none;
        }
        .gallery-cell__play-icon {
          font-size: 36px;
          color: #fff;
          text-shadow: 0 0 24px rgba(255,0,51,.7);
          line-height: 1;
        }
        .gallery-cell__play-label {
          font-size: 10px; font-weight: 800;
          letter-spacing: 4px; text-transform: uppercase;
          color: var(--brand);
        }
        .gallery-cell--video:hover .gallery-cell__video-thumb video {
          opacity: .75;
          transform: scale(1.03);
          transition: opacity .4s, transform .4s;
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

        /* Video lightbox */
        .lightbox--video { align-items: center; }
        .lightbox-video-frame {
          position: relative;
          max-width: min(92vw, 1100px);
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 80px rgba(0,0,0,.9);
          background: #000;
        }
        .lightbox-video {
          display: block;
          width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 12px 12px 0 0;
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
