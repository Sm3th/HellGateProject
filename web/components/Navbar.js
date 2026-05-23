import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { href: "/events",  label: "Events"  },
  { href: "/lineup",  label: "Line-up" },
  { href: "/gallery", label: "Gallery" },
  { href: "/merch",   label: "Merch"   },
  { href: "/faq",     label: "Info"    },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const { totalItems } = useCart();
  const prevItems = useRef(totalItems);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Pulse cart badge when item count increases
  useEffect(() => {
    if (totalItems > prevItems.current) {
      setCartPulse(true);
      const t = setTimeout(() => setCartPulse(false), 600);
      prevItems.current = totalItems;
      return () => clearTimeout(t);
    }
    prevItems.current = totalItems;
  }, [totalItems]);

  const isSolid = !isHome || scrolled || menuOpen;

  return (
    <header className={`topbar ${isSolid ? "topbar--solid" : "topbar--transparent"}`}>
      <div className="topbar__inner">
        {/* Logo */}
        <Link href="/" className="brand" aria-label="Hellgate Project — Home">
          <img src="/logo.png" alt="Hellgate Project" />
        </Link>

        {/* Desktop nav */}
        <nav className="nav" role="navigation" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link${isActive ? " nav-link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}

          {/* Cart */}
          <Link
            href="/merch"
            className="nav-cart"
            aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className={`nav-cart__badge${cartPulse ? " nav-cart__badge--pulse" : ""}`}>
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>

          {/* Tickets CTA */}
          <Link href="/tickets" className="nav-cta" aria-label="Buy tickets">
            Tickets
          </Link>
        </nav>

        {/* Mobile burger */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Mobile cart */}
          <Link href="/merch" className="nav-cart nav-cart--mobile" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="nav-cart__badge">{totalItems > 9 ? "9+" : totalItems}</span>
            )}
          </Link>

          <button
            className={`burger ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`mobile-nav__link${isActive ? " mobile-nav__link--active" : ""}`}
              >
                <span>{label}</span>
                <span className="mobile-nav__arrow">→</span>
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: "20px 24px 24px" }}>
          <Link
            href="/tickets"
            className="btn btn--primary btn--block btn--lg"
            onClick={() => setMenuOpen(false)}
          >
            Get Tickets →
          </Link>
        </div>
      </div>

      <style jsx>{`
        /* Override desktop nav-link styles */
        .nav-link {
          position: relative;
          color: rgba(255,255,255,.75);
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 0;
          transition: color .2s;
        }
        .nav-link:hover { color: #fff; }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -3px; left: 0;
          height: 1px; width: 0;
          background: var(--brand);
          box-shadow: 0 0 6px var(--brand);
          transition: width .25s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link--active { color: var(--brand); }
        .nav-link--active::after { width: 100%; }

        /* Mobile cart icon — only shown on small screens */
        .nav-cart--mobile { display: none; }

        /* Mobile nav */
        .mobile-nav {
          display: none;
          flex-direction: column;
          position: absolute;
          top: 72px; left: 0; right: 0;
          background: rgba(5,5,5,.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          max-height: 0;
          overflow: hidden;
          transition: max-height .35s ease;
        }
        .mobile-nav--open {
          max-height: 600px;
        }
        .mobile-nav__link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,.7);
          border-bottom: 1px solid var(--border);
          transition: color .2s, background .2s;
        }
        .mobile-nav__link:hover { color: #fff; background: rgba(255,255,255,.03); }
        .mobile-nav__link--active { color: var(--brand); }
        .mobile-nav__arrow { color: var(--muted); font-size: 14px; }

        @media (max-width: 860px) {
          .nav { display: none !important; }
          .nav-cart--mobile { display: flex; }
          .mobile-nav { display: flex; }
          .burger { display: flex !important; }
        }

        /* Cart badge pulse animation */
        @keyframes badge-pop {
          0%  { transform: scale(.4); }
          60% { transform: scale(1.2); }
          100%{ transform: scale(1); }
        }
        .nav-cart__badge--pulse { animation: badge-pop .4s ease; }
      `}</style>
    </header>
  );
}
