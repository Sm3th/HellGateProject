import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { href: "/events",  label: "Events"   },
  { href: "/lineup",  label: "Line-up"  },
  { href: "/gallery", label: "Gallery"  },
  { href: "/merch",   label: "Merch"    },
  { href: "/faq",     label: "Info"     },
  { href: "/contact", label: "Contact"  },
];

export default function Navbar() {
  const { pathname } = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isSolid = !isHome || scrolled || menuOpen;

  return (
    <header className={`topbar ${isSolid ? "topbar--solid" : "topbar--transparent"}`}>
      <div className="topbar__inner">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="Hellgate Project" />
        </Link>

        <button
          className={`burger ${menuOpen ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <nav className={`nav ${menuOpen ? "nav--open" : ""}`} role="navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={pathname === href || pathname.startsWith(href + "/")
                ? { color: "var(--brand)" }
                : undefined
              }
            >
              {label}
            </Link>
          ))}

          {/* Merch cart badge */}
          <Link href="/merch" className="nav-cart" onClick={() => setMenuOpen(false)} aria-label={`Cart (${totalItems} items)`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="nav-cart__badge">{totalItems > 9 ? "9+" : totalItems}</span>
            )}
          </Link>

          <Link href="/tickets" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Tickets
          </Link>
        </nav>
      </div>
    </header>
  );
}
