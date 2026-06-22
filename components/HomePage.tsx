import Link from "next/link";
import Image from "next/image";
import { advantagePillars } from "@/lib/content";
import "./HomePage.css";

const signalSources = [
  "ERP",
  "CRM/SFA/DMS",
  "HRMS/LMS",
  "Supply Chain & Logistics",
  "Planning Systems",
  "Manual Reports",
];

const operatingOutcomes = [
  {
    title: "One Operating View",
    copy: "Trusted, shared, current",
  },
  {
    title: "Clear Decisions",
    copy: "Context leaders act on",
  },
  {
    title: "Accountable Action",
    copy: "Owners, follow-through, results",
  },
];

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-contours" aria-hidden="true">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
            <path
              className="contour-line contour-a"
              d="M-120 210 C 220 155, 440 285, 720 222 S 1240 132, 1720 214"
            />
            <path
              className="contour-line contour-b"
              d="M-120 292 C 245 236, 462 366, 748 305 S 1258 218, 1720 296"
            />
            <path
              className="contour-line contour-c"
              d="M-120 650 C 260 594, 506 725, 802 654 S 1308 568, 1720 642"
            />
            <path
              className="contour-line contour-d"
              d="M-120 740 C 282 690, 520 812, 820 742 S 1318 658, 1720 735"
            />
          </svg>
        </div>
        <div className="hero-atmosphere" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="section-label reveal">INSIGHTS. DECISIONS. GROWTH.</p>
            <h1 className="reveal">
              <span>Raw Data To</span>
              <span className="hero-accent-line">Boardroom Decision</span>
            </h1>
            <p className="lead reveal">
              Canyon Data Labs connects business information, decision context,
              and execution accountability onto a common platform across the
              organization.
            </p>
            <div className="button-row reveal">
              <Link className="btn primary" href="/contact#book-demo">
                Book a Discovery Workshop
              </Link>
              <Link className="btn secondary" href="/solutions">
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section operating-section">
        <div className="container operating-system reveal">
          <div className="operating-header">
            <p className="section-label">Operating Clarity</p>
            <h2>One flow from signal to action.</h2>
            <p className="lead">
              Disparate systems on one side. Clear decisions on the other.
              Canyon is the flow between them.
            </p>
          </div>

          <div className="operating-flow" aria-label="Canyon operating model">
            <div className="signal-stack" aria-label="Enterprise signals">
              {signalSources.map((source) => (
                <span key={source}>{source}</span>
              ))}
            </div>

            <div className="flow-canvas" aria-hidden="true">
              <svg viewBox="0 0 1160 420" preserveAspectRatio="none">
                <g className="flow-source-lines">
                  <path d="M18 46 C 235 44, 330 190, 528 206" />
                  <path d="M18 126 C 256 126, 340 196, 528 208" />
                  <path d="M18 206 C 282 206, 348 208, 528 210" />
                  <path d="M18 286 C 256 286, 340 222, 528 212" />
                  <path d="M18 366 C 235 368, 330 230, 528 214" />
                </g>
                <path
                  className="flow-primary-line"
                  d="M18 206 C 282 206, 348 208, 528 210"
                />
                <path
                  className="flow-output-line"
                  d="M650 210 C 770 210, 850 210, 924 210"
                />
                <path
                  className="flow-output-guide flow-guide-top"
                  d="M924 210 C 1002 148, 1068 94, 1158 62"
                />
                <path
                  className="flow-output-guide flow-guide-mid"
                  d="M924 210 C 996 210, 1074 210, 1158 210"
                />
                <path
                  className="flow-output-guide flow-guide-bottom"
                  d="M924 210 C 1002 272, 1068 326, 1158 358"
                />
                <circle className="flow-pulse flow-pulse-a" r="5" />
                <circle className="flow-pulse flow-pulse-b" r="5" />
              </svg>

              <div className="flow-core">
                <Image
                  className="core-mark"
                  src="/images/canyon-flow-core-icon.png"
                  alt=""
                  width={4500}
                  height={4500}
                  aria-hidden="true"
                />
              </div>
              <span className="flow-core-label">Canyon</span>
            </div>

            <div className="outcome-stack" aria-label="Leadership outcomes">
              {operatingOutcomes.map((card, index) => (
                <article className="flow-outcome" key={card.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{card.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="container why-shell">
          <div className="why-intro reveal">
            <p className="section-label">Why Us</p>
            <h2>Built Around Business Reality.</h2>
            <p className="lead">
              Canyon understands business requirement and transforms it into an
              enterprise wide connected operating model.
            </p>
          </div>
          <div className="advantage-panel" aria-label="Canyon advantage map">
            {advantagePillars.map((pillar, index) => (
              <article className="advantage-card reveal" key={pillar.title}>
                <span className="advantage-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="advantage-copy">
                  <h3>{pillar.title}</h3>
                  {/* <p>{pillar.outcome}</p> */}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container final-cta-inner reveal">
          <div className="final-cta-copy">
            <p className="section-label">Start with the business priority</p>
            <h2>
              <span>Build Smart Systems.</span>
              <span>Connect Systems.</span>
              <span>Improve Visibility.</span>
              <span>Strengthen Accountability.</span>
              <span>Drive Actionability.</span>
            </h2>
          </div>
          <div className="button-row final-cta-actions">
            <Link className="btn primary" href="/contact#book-demo">
              Book a Discovery Workshop
            </Link>
            <Link className="btn secondary" href="/solutions">
              Explore Solution
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
