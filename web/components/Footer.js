import Link from "next/link";
import { FaInstagram, FaSoundcloud, FaSpotify, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand col */}
          <div>
            <img src="/logo.png" alt="Hellgate Project" style={{ height: 40, marginBottom: 16, filter: "drop-shadow(0 0 8px rgba(255,0,51,.5))" }} />
            <p style={{ fontSize: 13, color: "var(--muted-2)", lineHeight: 1.7, maxWidth: 260 }}>
              Underground rave & techno events.<br />
              Istanbul & Ankara.
            </p>
            <div className="footer__social" style={{ marginTop: 20 }}>
              <a href="https://www.instagram.com/hellgate.project/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://soundcloud.com/hellgate" target="_blank" rel="noopener noreferrer" aria-label="SoundCloud"><FaSoundcloud /></a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" aria-label="Spotify"><FaSpotify /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"><FaXTwitter /></a>
            </div>
          </div>

          {/* Navigation col */}
          <div>
            <p className="footer__col-title">Navigate</p>
            <ul className="footer__links">
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/tickets">Tickets</Link></li>
              <li><Link href="/lineup">Line-up</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/merch">Merch</Link></li>
            </ul>
          </div>

          {/* Info col */}
          <div>
            <p className="footer__col-title">Information</p>
            <ul className="footer__links">
              <li><Link href="/faq">FAQ & House Rules</Link></li>
              <li><Link href="/faq#location">Location Policy</Link></li>
              <li><Link href="/faq#tickets">Ticket Policy</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><a href="mailto:contact@hellgateproject.com">contact@hellgateproject.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {year} HELLGATE PROJECT — ALL RIGHTS RESERVED</p>
          <nav className="footer__legal" aria-label="Legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
