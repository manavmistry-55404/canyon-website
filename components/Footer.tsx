import Link from "next/link";
import { footerTagGroups } from "@/lib/content";
import { Logo } from "./Logo";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-panel">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>
              Canyon Data Labs helps organizations connect enterprise information, create business context, and turn
              insights into measurable action.
            </p>
          </div>

          <nav className="footer-column" aria-label="Company">
            <strong>Company</strong>
            <Link href="/about-us">About Us</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Get in Touch</Link>
          </nav>

          <nav className="footer-column" aria-label="Solutions">
            <strong>Solutions</strong>
            <Link href="/solutions">Overview</Link>
            <Link href="/solutions/canyon-systems">Canyon Systems</Link>
            <Link href="/solutions/canyon-edge">Canyon Edge</Link>
            <Link href="/solutions/canyon-grid">Canyon Grid</Link>
          </nav>

          {/* <nav className="footer-column" aria-label="Resources">
            <strong>Resources</strong>
            <Link href="/resources/insights">Insights</Link>
            <Link href="/resources/articles">Articles</Link>
            <Link href="/resources/faqs">FAQs</Link>
            <Link href="/resources/media-downloads">Media & Downloads</Link>
          </nav> */}

          <div className="footer-column footer-focus">
            <strong>Focus</strong>
            {footerTagGroups.flatMap((group) => group.items).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Canyon Data Labs.</span>
          <Link href="/terms-of-use">Terms of Use</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span className="footer-status">Operating Clarity Online</span>
        </div>
      </div>
    </footer>
  );
}
