import Link from "next/link";
import { SiteFrame } from "@/components/SiteFrame";
import "@/components/InnerPages.css";

export default function NotFound() {
  return (
    <SiteFrame>
      <section className="inner-hero">
        <div className="container">
          <p className="section-label">404</p>
          <h1>Let us guide you back to the operating view.</h1>
          <p className="lead">Return home or explore the Canyon Data Labs solution system.</p>
          <div className="button-row">
            <Link className="btn primary" href="/">
              Go Home
            </Link>
            <Link className="btn secondary" href="/solutions">
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
