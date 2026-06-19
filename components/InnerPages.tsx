import Link from "next/link";
import { audiences, solutions } from "@/lib/content";
import "./InnerPages.css";

type SimplePageProps = {
  eyebrow: string;
  title: React.ReactNode;
  copy: React.ReactNode;
  cta?: string;
  ctaHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  children?: React.ReactNode;
};

export function SimplePage({
  eyebrow,
  title,
  copy,
  cta = "Book a Discovery Workshop",
  ctaHref = "/contact#book-demo",
  secondaryCta = "Explore Solutions",
  secondaryHref = "/solutions",
  children,
}: SimplePageProps) {
  return (
    <>
      <section className="inner-hero">
        <div className="inner-hero-glow" aria-hidden="true" />
        <div className="container inner-hero-grid">
          <div className="inner-hero-copy">
            <p className="section-label reveal">{eyebrow}</p>
            <h1 className="reveal">{title}</h1>
            <p className="lead reveal">{copy}</p>
            <div className="button-row reveal">
              <Link className="btn primary" href={ctaHref}>
                {cta}
              </Link>
              <Link className="btn secondary" href={secondaryHref}>
                {secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
      {children}
    </>
  );
}

export function AboutContent() {
  const whatWeDo = [
    {
      title: "Deploy the systems you are missing.",
      copy: "We build and deploy Canyon Data Labs own field force, distributor management, and customer relationship management systems in six to eight weeks, designed from day one to feed directly into the intelligence layer built on top.",
      icon: "visibility",
    },
    {
      title: "Connect every source. Leave nothing stranded.",
      copy: "We connect every data source (ERP, CRM, HRMS, and other systems) into a single unified layer. No system left out. No data left behind. One version of the truth.",
      icon: "decision",
    },
    {
      title: "Build the intelligence your business needs.",
      copy: "Connected data is not the same as useful data. We structure everything around the decisions your business needs to make, by function, by role, by domain. ",
      icon: "execution",
    },
  ];

  const whyItems = [
    {
      title: "Business-first thinking",
      copy: "Everything we build, every connection, every intelligence view, every alert is designed backward from that answer.",
    },
    {
      title: "Tailored to your reality",
      copy: "Built around existing systems, team rhythms, and business goals, not a forced template.",
    },
    {
      title: "One partner, every layer",
      copy: "Strategy, systems, context, and execution connected by one accountable team.",
    },
    {
      title: "From information to impact",
      copy: "Raw signals become decisions, action, and measurable business movement.",
    },
    {
      title: "Built to evolve",
      copy: "Operating systems that grow with teams, markets, and priorities, designed for change.",
    },
  ];

  return (
    <>
      <section className="about-overview-section" id="company-overview">
        <div className="container about-overview-grid">
          <div className="about-overview-copy reveal">
            <p className="section-label">Company Overview</p>
            <h2>We build what is missing...</h2>
            <h2>We connect what exists...</h2>
            <h2>We make it all work together.</h2>
            {/* <p>
              Some enterprises need the systems built. Others need the systems connected. Most need the intelligence
              layer that makes all of it useful. Canyon Data Labs does all three: one partner, from the first data point
              to the boardroom decision.
            </p>
            <p>
              Every engagement starts with the problem your business needs to solve, then connects the data, builds the
              intelligence, and delivers it to the people who can act on it.
            </p> */}
          </div>
          <figure
            className="about-strata-panel reveal"
            aria-label="Signals flowing into one operating view"
          >
            <svg
              viewBox="0 0 600 700"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <rect width="600" height="700" fill="#121a2b" />
              <path
                d="M0 520 C 120 470, 240 560, 360 510 S 540 460, 600 500 L600 700 L0 700 Z"
                fill="#16243a"
              />
              <path
                d="M0 560 C 140 520, 260 610, 380 560 S 560 510, 600 545 L600 700 L0 700 Z"
                fill="#1b3a45"
              />
              <path
                d="M0 605 C 150 570, 280 650, 400 605 S 570 560, 600 590 L600 700 L0 700 Z"
                fill="#1e6e64"
              />
              <path
                d="M0 650 C 160 620, 300 690, 420 650 S 580 615, 600 635 L600 700 L0 700 Z"
                fill="#2b8a7c"
              />
              <g stroke="rgba(244,239,230,.14)" strokeWidth="1.2" fill="none">
                <path d="M0 160 C 130 120, 250 200, 370 160 S 540 110, 600 150" />
                <path d="M0 230 C 140 195, 260 270, 380 230 S 550 185, 600 220" />
                <path d="M0 300 C 150 270, 270 340, 390 300 S 560 260, 600 290" />
                <path d="M0 370 C 160 340, 280 410, 400 370 S 565 335, 600 360" />
              </g>
              <path
                d="M0 230 C 140 195, 260 270, 380 230 S 550 185, 600 220"
                stroke="#fa8112"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="380" cy="230" r="5" fill="#fa8112" />
              <circle
                cx="380"
                cy="230"
                r="11"
                fill="none"
                stroke="#fa8112"
                opacity=".4"
              />
            </svg>
            <figcaption>
              <span />
              Signals → One Operating View
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="about-statement-section" id="vision-mission">
        <div className="container about-statement reveal">
          <p className="section-label">Mission &amp; Vision</p>
          <h2>One partner. Every layer. Every decision.</h2>
          <div className="about-mission-grid">
            <article>
              <p className="section-label">Mission</p>
              <p>
                To be the only partner an enterprise needs on its data journey,
                building the systems that capture operational data, connecting
                every source into one intelligent layer, and making sure the
                right decision reaches the right person before the moment
                passes.
              </p>
            </article>
            <article>
              <p className="section-label">Vision</p>
              <p>
                To be the most trusted data partner for enterprises across India
                and global markets, the company that turns an
                organisation&apos;s own data into its sharpest competitive
                advantage.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-work-section" id="what-we-do">
        <div className="container">
          <div className="about-section-head reveal">
            <p className="section-label">What We Do</p>
            <h2>We build the layer between your data and next decision.</h2>
          </div>
          <div className="about-work-grid">
            {whatWeDo.map((item) => (
              <article className="about-work-card reveal" key={item.title}>
                <AboutIcon type={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-process-section" id="our-approach">
        <div className="container">
          <div className="about-process-head reveal">
            <p className="section-label">Our Approach</p>
            <h2>Connect. Contextualise. Activate.</h2>
            <p>
              One continuous motion from scattered signals to accountable
              action.
            </p>
          </div>
          <div className="about-pipeline" aria-hidden="true">
            <svg viewBox="0 0 1120 120">
              <path
                className="about-pipe-base"
                d="M40 80 C 200 80, 240 40, 400 40 C 560 40, 580 88, 740 88 C 880 88, 940 52, 1080 52"
              />
              <path
                className="about-pipe-active"
                d="M40 80 C 200 80, 240 40, 400 40 C 560 40, 580 88, 740 88 C 880 88, 940 52, 1080 52"
              />
              <circle className="about-pipe-dot" cx="40" cy="80" r="7" />
              <circle className="about-pipe-dot" cx="560" cy="64" r="7" />
              <circle className="about-pipe-dot" cx="1080" cy="52" r="7" />
            </svg>
          </div>
          <div className="about-steps">
            <article className="reveal">
              <h3>
                <span>01</span> Connect
              </h3>
              <p>
                Build, Unify systems, functions, and processes into a shared
                operating view.
              </p>
            </article>
            <article className="reveal">
              <h3>
                <span>02</span> Contextualise
              </h3>
              <p>Your data shaped around the way your business operates.</p>
            </article>
            <article className="reveal">
              <h3>
                <span>03</span> Activate
              </h3>
              <p>
                Move insights into accountable workflows, alerts, and outcomes.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-why-section" id="why-canyon">
        <div className="container about-why-grid">
          <div className="about-why-copy reveal">
            <p className="section-label">Why Canyon Data Labs</p>
            <h2>
              Every engagement begins with one question — what decision needs to
              be made better?
            </h2>
            {/* <p>
              We work backward from the business problem, building the systems,
              connections, and intelligence that get the right answer to the
              right person at exactly the right moment.
            </p> */}
          </div>
          <ol className="about-why-list">
            {whyItems.map((item, index) => (
              <li className="reveal" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="audience-strip" aria-label="Teams Canyon helps">
        <div className="audience-strip-inner reveal">
          <p className="section-label">Who We Help</p>
          <h2>Every function. One version of the truth.</h2>
          <p>
            Canyon Data Labs builds systems & intelligence for the entire
            organisation — every team, every level, all connected to the same
            source of truth.
          </p>
          <div className="audience-rail" aria-hidden="true">
            <div className="audience-track">
              {[...audiences, ...audiences].map((team, index) => (
                <span className="audience-pill" key={`${team}-${index}`}>
                  {team}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutIcon({ type }: { type: string }) {
  if (type === "decision") {
    return (
      <svg
        className="about-icon"
        viewBox="0 0 54 54"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="27" cy="14" r="6" />
        <path d="M27 20 V30 M27 30 L12 42 M27 30 L42 42" />
        <circle cx="12" cy="44" r="3.5" />
        <circle cx="42" cy="44" r="3.5" />
      </svg>
    );
  }

  if (type === "execution") {
    return (
      <svg
        className="about-icon"
        viewBox="0 0 54 54"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M6 27 H34" />
        <path d="M27 18 L36 27 L27 36" />
        <rect x="40" y="14" width="10" height="26" rx="2" />
      </svg>
    );
  }

  return (
    <svg
      className="about-icon"
      viewBox="0 0 54 54"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 40 L18 28 L27 34 L48 12" />
      <path d="M38 12 H48 V22" />
      <line x1="6" y1="46" x2="48" y2="46" opacity=".35" />
    </svg>
  );
}

export function SolutionsContent() {
  return (
    <>
      {/* <section className="section solution-capabilities-section">
        <div className="container solution-capabilities">
          <div className="solution-capabilities-head reveal">
            <p className="section-label">What Canyon Builds</p>
            <h2>Enterprise Intelligence, Ready For Action.</h2>
            <p className="lead">
              Canyon creates the command layer that connects business signals,
              decision context, and accountable execution.
            </p>
          </div>
          <div
            className="capability-grid"
            aria-label="Canyon solution capabilities"
          >
            {solutionCapabilities.map((capability, index) => (
              <article
                className={`capability-card capability-${capability.visual} reveal`}
                key={capability.title}
              >
                <div className="capability-visual" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="capability-copy">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      <section className="section">
        <div className="container page-card-grid">
          {solutions.map((solution) => (
            <article className="card reveal" key={solution.name}>
              <p className="section-label">{solution.line}</p>
              <h3>{solution.name}</h3>
              <p className="body-copy">{solution.intro}</p>
              <ul className="clean-list">
                {solution.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
              <Link className="text-link" href={solution.href}>
                Explore {solution.name} <span>→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function SolutionDetail({ name }: { name: string }) {
  const solution = solutions.find((item) => item.name === name) ?? solutions[0];

  return (
    <section className="section solution-detail-section">
      <div className="container solution-detail-panel reveal">
        <div>
          <p className="section-label">{solution.line}</p>
          <h2>{solution.name} creates a stronger operating foundation.</h2>
          <p>{solution.intro}</p>
          <Link className="btn primary" href="/contact#book-demo">
            Discuss {solution.name}
          </Link>
        </div>
        <div className="outcome-stack">
          {solution.outcomes.map((outcome, index) => (
            <article key={outcome}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{outcome}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResourcesContent() {
  const items = [
    ["Insights", "Leadership thinking for connected operating views."],
    ["Articles", "Practical writing on information, context, and execution."],
    ["FAQs", "Direct answers for teams evaluating Canyon."],
    ["Media & Downloads", "Brand, solution, and briefing materials."],
  ];

  return (
    <section className="section resource-index-section">
      <div className="container page-card-grid">
        {items.map(([item, copy]) => (
          <article className="card feature-card reveal" key={item}>
            <h3>{item}</h3>
            <p className="body-copy">{copy}</p>
            <Link
              className="text-link"
              href={`/resources/${item.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}`}
            >
              View {item} <span>→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ResourceDetailContent({
  kind,
}: {
  kind: "insights" | "articles" | "faqs" | "media";
}) {
  const content = {
    insights: {
      label: "Insight Themes",
      title: "Ideas shaped for leaders building operating clarity.",
      items: ["Enterprise visibility", "Decision context", "Execution rhythm"],
    },
    articles: {
      label: "Article Tracks",
      title: "Clear perspectives for teams modernizing how work moves.",
      items: [
        "Reporting confidence",
        "Leadership visibility",
        "Workflow accountability",
      ],
    },
    faqs: {
      label: "Direct Answers",
      title: "Everything starts with fit, priority, and the path to value.",
      items: ["Engagement shape", "Solution fit", "Implementation rhythm"],
    },
    media: {
      label: "Media Library",
      title: "Launch materials prepared for teams, partners, and briefings.",
      items: ["Company overview", "Solution summaries", "Brand assets"],
    },
  }[kind];

  return (
    <ContentGrid
      id={`${kind}-content`}
      label={content.label}
      title={content.title}
      items={content.items}
    />
  );
}

export function CareersContent() {
  return (
    <section className="section page-band">
      <div className="container split-panel reveal">
        <div>
          <p className="section-label">Careers At Canyon</p>
          <h2>Work across business, systems, data, and execution.</h2>
        </div>
        <div className="outcome-stack compact-stack">
          {["Business-first thinking", "High ownership", "Calm execution"].map(
            (item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export function ContactContent() {
  return (
    <section className="section contact-section" id="book-demo">
      <div className="container contact-panel reveal">
        <div className="contact-copy">
          <p className="section-label">Book a Discovery Workshop</p>
          <h2>One conversation. A clear path forward.</h2>
          <p className="lead">
            In one structured session, we map your data landscape and understand
            where decisions are slowing down, and that&apos;s our starting point...
          </p>
          <div className="contact-proof-grid" aria-label="Workshop details">
            {/* <article>
              <span>Base</span>
              <strong>Ahmedabad. India. Gulf.</strong>
            </article>
            <article>
              <span>Response</span>
              <strong>Within 1 business day</strong>
            </article> */}
            <article>
              <span>Email</span>
              <strong>info@canyondatalabs.com</strong>
            </article>
            <article>
              <span>Phone</span>
              <strong>+1 (555) 123-4567</strong>
            </article>
          </div>
        </div>
        <form className="contact-form contact-workshop-form">
          <div className="field-grid">
            <label htmlFor="firstName">
              First name
              <input
                id="firstName"
                name="firstName"
                placeholder="First name"
                suppressHydrationWarning
              />
            </label>
            <label htmlFor="lastName">
              Last name
              <input
                id="lastName"
                name="lastName"
                placeholder="Last name"
                suppressHydrationWarning
              />
            </label>
          </div>
          <label htmlFor="workEmail">
            Work email
            <input
              id="workEmail"
              name="email"
              type="email"
              placeholder="you@company.com"
              suppressHydrationWarning
            />
          </label>
          <div className="field-grid">
            <label htmlFor="workshopFocus">
              Workshop focus
              <select
                id="workshopFocus"
                name="focus"
                defaultValue="Sales visibility"
                suppressHydrationWarning
              >
                <option>Sales visibility</option>
                <option>Operations and response rhythm</option>
                <option>Executive decision layer</option>
                <option>Enterprise data strategy</option>
              </select>
            </label>
            <label htmlFor="industry">
              Industry
              <select
                id="industry"
                name="industry"
                defaultValue="FMCG"
                suppressHydrationWarning
              >
                <option>FMCG</option>
                <option>Manufacturing</option>
                <option>Pharma</option>
                <option>Retail</option>
                <option>Services</option>
              </select>
            </label>
          </div>
          <div className="field-grid">
            <label htmlFor="timeline">
              Timeline
              <select
                id="timeline"
                name="timeline"
                defaultValue="This quarter"
                suppressHydrationWarning
              >
                <option>This quarter</option>
                <option>Next quarter</option>
                <option>This year</option>
                <option>Exploring roadmap</option>
              </select>
            </label>
            <label htmlFor="engagement">
              Engagement
              <select
                id="engagement"
                name="engagement"
                defaultValue="Discovery Workshop"
                suppressHydrationWarning
              >
                <option>Discovery Workshop</option>
                <option>Data strategy sprint</option>
                <option>System build</option>
                <option>Intelligence layer</option>
              </select>
            </label>
          </div>
          <label htmlFor="primaryChallenge">
            Primary challenge
            <textarea
              id="primaryChallenge"
              name="message"
              placeholder="What decision, system, or data issue should Canyon prepare for?"
              suppressHydrationWarning
            />
          </label>
          <button className="btn primary" type="submit">
            Send Workshop Brief
          </button>
        </form>
      </div>
    </section>
  );
}

export function LegalContent({
  type,
}: {
  type: "privacy" | "terms" | "cookies";
}) {
  const content = {
    privacy: {
      label: "Privacy Framework",
      title: "Clear handling for information shared with Canyon.",
      items: [
        "Information shared through forms",
        "Communication preferences",
        "Responsible data handling",
      ],
    },
    terms: {
      label: "Website Terms",
      title: "Simple terms for a focused website experience.",
      items: ["Website access", "Content usage", "Contact pathways"],
    },
    cookies: {
      label: "Cookie Preferences",
      title: "Transparent choices for website performance and experience.",
      items: [
        "Essential site function",
        "Performance insight",
        "Preference control",
      ],
    },
  }[type];

  return (
    <ContentGrid
      id={`${type}-details`}
      label={content.label}
      title={content.title}
      items={content.items}
    />
  );
}

export function ThankYouContent() {
  return (
    <section className="section compact">
      <div className="container text-panel reveal">
        <p className="section-label">Next Step</p>
        <h2>
          We will review the business priority and respond with a clear path
          forward.
        </h2>
        <Link className="btn primary" href="/solutions">
          Explore Solutions
        </Link>
      </div>
    </section>
  );
}

function ContentGrid({
  id,
  label,
  title,
  items,
}: {
  id: string;
  label: string;
  title: string;
  items: string[];
}) {
  const copyFor = (item: string) =>
    ({
      "Enterprise visibility":
        "Bring trusted information into one leadership view across systems, reports, and teams.",
      "Decision support":
        "Shape signals into context that helps leaders choose the next move with confidence.",
      "Execution enablement":
        "Connect insight to owners, workflows, and follow-through across the business.",
      Connect:
        "Unify systems, functions, and processes into a shared operating view.",
      Contextualise:
        "Translate information into business meaning leaders can act on.",
      Activate:
        "Move insights into accountable workflows, alerts, and outcomes.",
      "Business-first thinking":
        "Start with the leadership priority, then shape technology around the operating reality.",
      "Tailored to your reality":
        "Build around existing systems, team rhythms, and business goals.",
      "One partner. Every layer.":
        "Connect strategy, systems, context, and execution with one accountable team.",
      "From information to impact":
        "Turn raw signals into decisions, action, and measurable business movement.",
      "Enterprise-wide perspective":
        "Create clarity across functions while preserving the details that matter.",
      "Built to evolve":
        "Design operating systems that grow with teams, markets, and priorities.",
      "Leadership teams seeking a unified business view":
        "Give leaders a trusted view of performance, priorities, and movement.",
      "Operations teams improving execution and response times":
        "Help operations teams coordinate response, ownership, and progress.",
      "Finance teams strengthening reporting confidence":
        "Support reporting confidence with clearer inputs, context, and visibility.",
      "Sales and commercial teams improving performance visibility":
        "Connect commercial performance signals to decisions and action.",
      "Supply chain teams connecting planning, inventory, and operations":
        "Link planning, inventory, and operational movement in one view.",
      "Growing businesses preparing for scale":
        "Create the operating foundation for faster, clearer growth.",
      "Reporting confidence":
        "Create reliable information flows for leadership updates and decision cycles.",
      "Leadership visibility":
        "Give teams a crisp view of priorities, performance, and ownership.",
      "Workflow accountability":
        "Connect decisions to owners, action paths, and follow-through.",
      "Engagement shape":
        "Start with the business priority and define the right path with Canyon.",
      "Solution fit":
        "Match Canyon Systems, Canyon Edge, and Canyon Grid to the operating opportunity.",
      "Implementation rhythm":
        "Move through clear phases that build visibility, context, and execution.",
      "Company overview":
        "A concise view of Canyon, the operating problem, and the path to clarity.",
      "Solution summaries":
        "Briefing-ready summaries of Canyon Systems, Canyon Edge, and Canyon Grid.",
      "Brand assets":
        "Organized materials for consistent communication and launch use.",
      "Information shared through forms":
        "Use submitted information to respond, prepare, and support the conversation.",
      "Communication preferences":
        "Respect chosen channels and keep outreach focused on the request.",
      "Responsible data handling":
        "Treat shared information with purpose, care, and clear access practices.",
      "Website access":
        "Use the Canyon website to learn, compare, and connect with the team.",
      "Content usage":
        "Reference Canyon content with respect for the brand and source.",
      "Contact pathways":
        "Use the contact experience to begin a focused business conversation.",
      "Essential site function":
        "Support core website performance, navigation, and visitor experience.",
      "Performance insight":
        "Understand site quality so the experience stays fast and useful.",
      "Preference control": "Keep visitor choices clear and simple.",
    })[item] ??
    "Built around business reality, active systems, and confident leadership decisions.";

  return (
    <section className="section compact" id={id}>
      <div className="container section-head">
        <p className="section-label reveal">{label}</p>
        <h2 className="reveal">{title}</h2>
      </div>
      <div className="container page-card-grid">
        {items.map((item, index) => (
          <article className="card feature-card reveal" key={item}>
            <span className="card-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{item}</h3>
            <p className="body-copy">{copyFor(item)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
