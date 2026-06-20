"use client";

import Link from "next/link";
import { useState } from "react";
import "./CanyonSystemsExperience.css";

/* ── colour tokens (resolve against CSS vars defined on .cs) ── */
const ACCENT = "var(--cs-accent)";
const ACCENT2 = "var(--cs-accent-2)";
const GREEN = "var(--cs-green)";
const AMBER = "var(--cs-amber)";
const RED = "var(--cs-red)";
const BLUE = "var(--cs-blue)";
const INK = "var(--cs-ink)";

const SOFT: Record<string, string> = {
  accent: "var(--cs-accent-soft)",
  green: "var(--cs-green-soft)",
  amber: "var(--cs-amber-soft)",
  red: "var(--cs-red-soft)",
  blue: "var(--cs-blue-soft)",
  steel: "var(--cs-steel-soft)",
};
const BORD: Record<string, string> = {
  accent: "var(--cs-accent-border)",
  green: "var(--cs-green-border)",
  amber: "var(--cs-amber-border)",
  red: "var(--cs-red-border)",
  blue: "var(--cs-blue-border)",
  steel: "var(--cs-steel-border)",
};
const TONE_COLOR: Record<string, string> = {
  accent: ACCENT2,
  green: GREEN,
  amber: AMBER,
  red: RED,
  blue: BLUE,
  steel: "var(--cs-steel)",
};

/* ─────────────────────────────────────────────
   DATA — ported verbatim from canyon-systems.html
───────────────────────────────────────────── */

type BeatStat = { label: string; val: string; color: string; sub: string };
type BeatRow = { name: string; area: string; outlets: string; status: string; statusLabel: string; time: string };
type OrderItem = { name: string; qty: string; price: string };
type FpCard = { label: string; val: string; color: string; pct: number; barColor: string };
type FpRep = { avatar: string; tone: string; name: string; visits: string; pct: number; fill: string; pctColor?: string };
type Nudge = { kind: string; icon: string; label: string; time: string; title: string; body: string; action: string };

const SFA = {
  beat: {
    stats: [
      { label: "Today's Beats", val: "12", color: ACCENT2, sub: "4 in progress" },
      { label: "Outlets Planned", val: "186", color: INK, sub: "147 visited" },
      { label: "Coverage", val: "79%", color: GREEN, sub: "↑ vs last week" },
    ] as BeatStat[],
    rows: [
      { name: "Arjun Mehta", area: "Rajkot Central", outlets: "18 / 22", status: "active", statusLabel: "In Progress", time: "2m ago" },
      { name: "Priya Sharma", area: "Surat North", outlets: "24 / 24", status: "done", statusLabel: "Complete", time: "14m ago" },
      { name: "Ravi Patel", area: "Ahmedabad West", outlets: "9 / 20", status: "active", statusLabel: "In Progress", time: "6m ago" },
      { name: "Neha Joshi", area: "Vadodara East", outlets: "0 / 18", status: "pending", statusLabel: "Not Started", time: "—" },
    ] as BeatRow[],
  },
  order: {
    outlet: { avatar: "RS", name: "Rajesh Stores", meta: "Outlet #4821 · Rajkot Central · Last order 8 days ago", score: "87" },
    items: [
      { name: "Product SKU — Pipes 4 inch (Box of 10)", qty: "Qty: 5", price: "₹12,500" },
      { name: "Product SKU — Adhesive 500ml (Carton)", qty: "Qty: 12", price: "₹8,400" },
      { name: "Product SKU — Fittings Elbow 90° (Box)", qty: "Qty: 8", price: "₹4,800" },
    ] as OrderItem[],
    total: "₹25,700",
  },
  productivity: {
    top: [
      { label: "Visit Compliance", val: "84%", color: GREEN, pct: 84, barColor: GREEN },
      { label: "Order Conversion", val: "91%", color: ACCENT2, pct: 91, barColor: ACCENT },
    ] as FpCard[],
    reps: [
      { avatar: "AM", tone: "accent", name: "Arjun Mehta", visits: "18 visits", pct: 82, fill: GREEN },
      { avatar: "PS", tone: "blue", name: "Priya Sharma", visits: "24 visits", pct: 100, fill: GREEN },
      { avatar: "RP", tone: "green", name: "Ravi Patel", visits: "9 visits", pct: 45, fill: AMBER },
      { avatar: "NJ", tone: "steel", name: "Neha Joshi", visits: "0 visits", pct: 0, fill: RED, pctColor: RED },
    ] as FpRep[],
  },
  nudge: {
    cards: [
      {
        kind: "urgent",
        icon: "⚡",
        label: "Action Required",
        time: "Now",
        title: "Distributor inactive — 11 days without order",
        body: "Sunrise Traders, Rajkot has not placed an order in 11 days. Historical average is 7 days. Assign a visit today before the relationship goes cold.",
        action: "Assign visit →",
      },
      {
        kind: "warning",
        icon: "📦",
        label: "Stockout Risk",
        time: "3h ago",
        title: "SKU approaching reorder threshold — Surat depot",
        body: "4-inch pipe inventory at Surat depot is at 8% of safety stock. No purchase order raised. Likely stockout in 4 days if not actioned.",
        action: "Raise indent →",
      },
      {
        kind: "info",
        icon: "🎯",
        label: "Opportunity",
        time: "Today",
        title: "High-value outlet — no visit in 18 days",
        body: "Metro Hardware, Vadodara has an average order value of ₹42,000. Last visited 18 days ago. Scheduled on today's beat but not yet visited.",
        action: "View outlet →",
      },
    ] as Nudge[],
  },
};

type Tag = { label: string; kind: string };
type TimelineRow = { dot: string; text: string; time: string };
type PipeCard = { name: string; company: string; val: string; valColor: string; date: string; tone?: string };
type PipeCol = { title: string; count: string; cards: PipeCard[] };
type FollowUp = { state: string; name: string; detail: string; time: string; timeKind: string; done?: boolean };
type Ring = { num: string; color: string; dashoffset: number; label: string; name: string; trend: string; trendColor: string };
type AccountRow = { name: string; score: string; scoreColor: string; trend: string; trendColor: string };

const CRM = {
  customer360: {
    contact: {
      avatar: "VK",
      name: "Vijay Kumar",
      company: "Kumar Enterprises · Procurement Head",
      tags: [
        { label: "Key Account", kind: "a" },
        { label: "High Value", kind: "b" },
        { label: "Active", kind: "c" },
      ] as Tag[],
    },
    stats: [
      { val: "₹18.4L", color: ACCENT2, label: "Total Orders" },
      { val: "94", color: GREEN, label: "Health Score" },
      { val: "3.2yr", color: INK, label: "Relationship" },
    ],
    timeline: [
      { dot: GREEN, text: "Order placed — ₹3.2L · Pipes and fittings", time: "2 days ago" },
      { dot: BLUE, text: "Site visit completed — Discussed Q3 requirements", time: "5 days ago" },
      { dot: ACCENT, text: "Follow-up call — Pricing query resolved", time: "12 days ago" },
      { dot: AMBER, text: "Quotation sent — ₹8.5L bulk order proposal", time: "18 days ago" },
    ] as TimelineRow[],
  },
  pipeline: {
    cols: [
      {
        title: "Qualified",
        count: "4",
        cards: [
          { name: "Mehta Construction", company: "Ahmedabad", val: "₹12.5L", valColor: ACCENT2, date: "Added 3 days ago" },
          { name: "Patel Infra", company: "Surat", val: "₹6.8L", valColor: ACCENT2, date: "Added 8 days ago" },
        ],
      },
      {
        title: "Proposal Sent",
        count: "3",
        cards: [
          { name: "Kumar Enterprises", company: "Rajkot", val: "₹8.5L", valColor: ACCENT2, date: "Decision: 3 days", tone: "accent" },
          { name: "Sunrise Traders", company: "Vadodara", val: "₹4.2L", valColor: ACCENT2, date: "Decision: 7 days" },
        ],
      },
      {
        title: "Negotiation",
        count: "2",
        cards: [{ name: "Royal Hardware", company: "Surat", val: "₹22.0L", valColor: GREEN, date: "Closing this week", tone: "green" }],
      },
    ] as PipeCol[],
  },
  followup: {
    items: [
      { state: "overdue", name: "Call Mehta Construction re: site visit", detail: "Assigned to Arjun Mehta · Rajkot Central", time: "2 days overdue", timeKind: "overdue" },
      { state: "today", name: "Send revised quote to Kumar Enterprises", detail: "Assigned to Priya Sharma · Surat North", time: "Due today", timeKind: "today" },
      { state: "", name: "Follow up on Royal Hardware contract approval", detail: "Assigned to Ravi Patel · Ahmedabad West", time: "Due in 2 days", timeKind: "upcoming" },
      { state: "done", name: "Deliver samples to Patel Infra", detail: "Completed by Neha Joshi · 1h ago", time: "Done", timeKind: "upcoming", done: true },
    ] as FollowUp[],
  },
  health: {
    rings: [
      { num: "94", color: GREEN, dashoffset: 22, label: "Portfolio Health", name: "Overall Score", trend: "↑ +6 this month", trendColor: GREEN },
      { num: "60", color: AMBER, dashoffset: 50, label: "At Risk Accounts", name: "7 accounts", trend: "↓ Need attention", trendColor: AMBER },
    ] as Ring[],
    accounts: [
      { name: "Kumar Enterprises", score: "94", scoreColor: GREEN, trend: "↑ +4", trendColor: GREEN },
      { name: "Royal Hardware", score: "88", scoreColor: GREEN, trend: "↑ +2", trendColor: GREEN },
      { name: "Mehta Construction", score: "72", scoreColor: AMBER, trend: "↓ −8", trendColor: RED },
      { name: "Sunrise Traders", score: "48", scoreColor: RED, trend: "↓ −15", trendColor: RED },
    ] as AccountRow[],
  },
};

const TABS = [
  {
    id: "sfa",
    label: "Sales Force Automation",
    tag: "Canyon SFA",
    title: "Your field force, running on real data.",
    desc: "Every visit, every order, every outlet interaction — captured the moment it happens. Built for Indian field conditions. Deployed in 6–8 weeks.",
    screenName: "Canyon SFA",
    features: [
      { key: "beat", name: "Beat Planning and Route Optimisation", desc: "Structured daily routes for every sales representative. Every outlet scheduled, every visit accountable." },
      { key: "order", name: "Order Capture at the Point of Sale", desc: "Orders placed on the spot, submitted in real time, directly into the system — no manual entry, no lag." },
      { key: "productivity", name: "Field Productivity Tracking", desc: "Every representative's daily activity visible — visits completed, targets hit, compliance tracked." },
      { key: "nudge", name: "Daily Nudges and Alerts", desc: "The right signal, to the right person, before the moment passes. Which outlet needs attention. Which order is at risk." },
    ],
  },
  {
    id: "crm",
    label: "Customer Relationship Management",
    tag: "Canyon CRM",
    title: "Every customer relationship, visible and accountable.",
    desc: "Built for the way commercial teams in your industry actually work. Every interaction recorded, every opportunity tracked, every follow-up owned.",
    screenName: "Canyon CRM",
    features: [
      { key: "customer360", name: "Customer 360 View", desc: "Every interaction, order, and touchpoint for every customer — in one place, always current." },
      { key: "pipeline", name: "Pipeline and Opportunity Tracking", desc: "Every deal visible across every stage. Nothing falls through the cracks." },
      { key: "followup", name: "Follow-up Scheduling and Ownership", desc: "Every follow-up assigned, timed, and tracked. The customer never waits because someone forgot." },
      { key: "health", name: "Account Health Scoring", desc: "Every account scored by engagement, order frequency, and relationship strength — automatically." },
    ],
  },
];

/* ─────────────────────────────────────────────
   SCREEN RENDERERS
───────────────────────────────────────────── */

function BeatView() {
  const { stats, rows } = SFA.beat;
  return (
    <div className="cs-screen-content">
      <div className="cs-beat-grid">
        {stats.map((s, i) => (
          <div className="cs-beat-stat" key={i}>
            <div className="cs-bs-label">{s.label}</div>
            <div className="cs-bs-val" style={{ color: s.color }}>{s.val}</div>
            <div className="cs-bs-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="cs-beat-list">
        <div className="cs-beat-list-head">
          <div className="cs-blh-col">Representative</div>
          <div className="cs-blh-col">Outlets</div>
          <div className="cs-blh-col">Status</div>
          <div className="cs-blh-col">Last sync</div>
        </div>
        {rows.map((r, i) => (
          <div className="cs-beat-row" key={i}>
            <div>
              <div className="cs-br-name">{r.name}</div>
              <div className="cs-br-area">{r.area}</div>
            </div>
            <div className="cs-br-outlets">{r.outlets}</div>
            <div>
              <span className={`cs-status-pill ${r.status}`}>{r.statusLabel}</span>
            </div>
            <div className="cs-br-time">{r.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderView() {
  const { outlet, items, total } = SFA.order;
  return (
    <div className="cs-screen-content">
      <div className="cs-order-header">
        <span className="cs-oh-title">New Order</span>
        <span className="cs-oh-tag">Synced in real time</span>
      </div>
      <div className="cs-order-outlet">
        <div className="cs-oo-avatar">{outlet.avatar}</div>
        <div>
          <div className="cs-oo-name">{outlet.name}</div>
          <div className="cs-oo-meta">{outlet.meta}</div>
        </div>
        <div className="cs-oo-score">
          <div className="cs-oo-score-val">{outlet.score}</div>
          <div className="cs-oo-score-label">Health Score</div>
        </div>
      </div>
      <div className="cs-order-items">
        {items.map((it, i) => (
          <div className="cs-order-item" key={i}>
            <div className="cs-oi-name">{it.name}</div>
            <div className="cs-oi-qty">{it.qty}</div>
            <div className="cs-oi-price">{it.price}</div>
          </div>
        ))}
      </div>
      <div className="cs-order-total">
        <span className="cs-ot-label">Order Total</span>
        <span className="cs-ot-val">{total}</span>
      </div>
    </div>
  );
}

function ProductivityView() {
  const { top, reps } = SFA.productivity;
  return (
    <div className="cs-screen-content">
      <div className="cs-fp-top">
        {top.map((c, i) => (
          <div className="cs-fp-card" key={i}>
            <div className="cs-fp-card-label">{c.label}</div>
            <div className="cs-fp-card-val" style={{ color: c.color }}>{c.val}</div>
            <div className="cs-fp-card-bar">
              <div className="cs-fp-card-bar-fill" style={{ width: `${c.pct}%`, background: c.barColor }} />
            </div>
          </div>
        ))}
      </div>
      <div className="cs-fp-reps">
        <div className="cs-fp-reps-head">
          <span className="cs-fp-reps-title">Representative Performance — Today</span>
        </div>
        {reps.map((r, i) => (
          <div className="cs-fp-rep-row" key={i}>
            <div className="cs-fpr-avatar" style={{ background: SOFT[r.tone], color: TONE_COLOR[r.tone], border: `1px solid ${BORD[r.tone]}` }}>{r.avatar}</div>
            <div className="cs-fpr-name">{r.name}</div>
            <div className="cs-fpr-visits">{r.visits}</div>
            <div className="cs-fpr-track">
              <div className="cs-fpr-fill" style={{ width: `${r.pct}%`, background: r.fill }} />
            </div>
            <div className="cs-fpr-pct" style={r.pctColor ? { color: r.pctColor } : undefined}>{r.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NudgeView() {
  return (
    <div className="cs-screen-content">
      <div className="cs-nudge-stack">
        {SFA.nudge.cards.map((n, i) => (
          <div className={`cs-nudge-card ${n.kind}`} key={i}>
            <div className="cs-nudge-header">
              <span className="cs-nudge-icon">{n.icon}</span>
              <span className="cs-nudge-label">{n.label}</span>
              <span className="cs-nudge-time">{n.time}</span>
            </div>
            <div className="cs-nudge-title">{n.title}</div>
            <div className="cs-nudge-body">{n.body}</div>
            <span className="cs-nudge-action">{n.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Customer360View() {
  const { contact, stats, timeline } = CRM.customer360;
  return (
    <div className="cs-screen-content">
      <div className="cs-crm-contact">
        <div className="cs-crm-avatar">{contact.avatar}</div>
        <div>
          <div className="cs-crm-name">{contact.name}</div>
          <div className="cs-crm-company">{contact.company}</div>
          <div className="cs-crm-tags">
            {contact.tags.map((t, i) => (
              <span className={`cs-crm-tag ${t.kind}`} key={i}>{t.label}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="cs-crm-stats">
        {stats.map((s, i) => (
          <div className="cs-crm-stat" key={i}>
            <div className="cs-crm-stat-val" style={{ color: s.color }}>{s.val}</div>
            <div className="cs-crm-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="cs-crm-timeline">
        <div className="cs-crt-title">Recent Activity</div>
        {timeline.map((t, i) => (
          <div className="cs-crt-row" key={i}>
            <div className="cs-crt-dot" style={{ background: t.dot }} />
            <div className="cs-crt-text">{t.text}</div>
            <div className="cs-crt-time">{t.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelineView() {
  return (
    <div className="cs-screen-content">
      <div className="cs-pipeline-cols">
        {CRM.pipeline.cols.map((col, i) => (
          <div className="cs-pipe-col" key={i}>
            <div className="cs-pipe-col-head">
              <span className="cs-pc-title">{col.title}</span>
              <span className="cs-pc-count">{col.count}</span>
            </div>
            <div className="cs-pipe-cards">
              {col.cards.map((c, ci) => (
                <div
                  className="cs-pipe-card"
                  key={ci}
                  style={c.tone ? { borderColor: BORD[c.tone], background: SOFT[c.tone] } : undefined}
                >
                  <div className="cs-pipe-card-name">{c.name}</div>
                  <div className="cs-pipe-card-company">{c.company}</div>
                  <div className="cs-pipe-card-val" style={{ color: c.valColor }}>{c.val}</div>
                  <div className="cs-pipe-card-date">{c.date}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FollowUpView() {
  return (
    <div className="cs-screen-content">
      <div className="cs-followup-list">
        {CRM.followup.items.map((f, i) => (
          <div className={`cs-fu-item${f.state ? ` ${f.state}` : ""}`} key={i}>
            <div className="cs-fu-check">
              {f.done && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                  <path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div className="cs-fu-body">
              <div className={`cs-fu-name${f.done ? " strike" : ""}`}>{f.name}</div>
              <div className="cs-fu-detail">{f.detail}</div>
              <span className={`cs-fu-time ${f.timeKind}`}>{f.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthView() {
  const { rings, accounts } = CRM.health;
  return (
    <div className="cs-screen-content">
      <div className="cs-ah-top">
        {rings.map((r, i) => (
          <div className="cs-ah-score-card" key={i}>
            <div className="cs-ah-score-ring">
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(7,19,28,0.08)" strokeWidth="5" />
                <circle cx="26" cy="26" r="20" fill="none" stroke={r.color} strokeWidth="5" strokeDasharray="125.6" strokeDashoffset={r.dashoffset} strokeLinecap="round" />
              </svg>
              <div className="cs-ah-score-num" style={{ color: r.color }}>{r.num}</div>
            </div>
            <div>
              <div className="cs-ah-score-label">{r.label}</div>
              <div className="cs-ah-score-name">{r.name}</div>
              <div className="cs-ah-score-trend" style={{ color: r.trendColor }}>{r.trend}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="cs-ah-accounts">
        <div className="cs-ah-accounts-head">
          <span className="cs-ah-accounts-title">Account Health — Top Accounts</span>
        </div>
        {accounts.map((a, i) => (
          <div className="cs-ah-row" key={i}>
            <div className="cs-ah-row-name">{a.name}</div>
            <div className="cs-ah-row-score" style={{ color: a.scoreColor }}>{a.score}</div>
            <div className="cs-ah-row-trend" style={{ color: a.trendColor }}>{a.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenBody({ tab, feature }: { tab: string; feature: string }) {
  if (tab === "sfa") {
    if (feature === "order") return <OrderView />;
    if (feature === "productivity") return <ProductivityView />;
    if (feature === "nudge") return <NudgeView />;
    return <BeatView />;
  }
  if (feature === "pipeline") return <PipelineView />;
  if (feature === "followup") return <FollowUpView />;
  if (feature === "health") return <HealthView />;
  return <Customer360View />;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export function CanyonSystemsExperience() {
  const [tab, setTab] = useState("sfa");
  const [feature, setFeature] = useState<Record<string, string>>({
    sfa: "beat",
    crm: "customer360",
  });

  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];
  const activeFeature = feature[tab];

  return (
    <div className="cs">
      {/* HERO */}
      <section className="cs-hero">
        <div className="container cs-hero-grid">
          <div className="cs-hero-copy">
            <p className="section-label">Canyon Systems</p>
            <h1 className="cs-hero-h1">
              Capture every
              <br />
              <span>transaction.</span>
              <br />
              Miss nothing.
            </h1>
            <p className="cs-hero-lead">
              Smart execution systems that record every field visit, every order, and every customer interaction —
              structured and ready from day one. The foundation everything else is built on.
            </p>
            <div className="cs-hero-actions">
              <Link className="btn primary" href="/contact#book-demo">
                Book a Discovery Workshop
              </Link>
              <a className="btn secondary" href="#cs-products">
                See the systems
              </a>
            </div>
          </div>
          <div className="cs-hero-visual">
            <div className="cs-mini-shell">
              <div className="cs-mini-bar">
                <div className="cs-mini-dots">
                  <div className="cs-mini-dot" style={{ background: "#E05252", opacity: 0.7 }} />
                  <div className="cs-mini-dot" style={{ background: "#F5A623", opacity: 0.5 }} />
                  <div className="cs-mini-dot" style={{ background: "#2AC46B", opacity: 0.5 }} />
                </div>
                <span className="cs-mini-title">Canyon Systems — Live</span>
              </div>
              <div className="cs-mini-body">
                <div className="cs-mini-kpi">
                  <div className="cs-mini-kpi-label">Visits Today</div>
                  <div className="cs-mini-kpi-val">147</div>
                  <div className="cs-mini-kpi-delta up">↑ 18 vs yesterday</div>
                </div>
                <div className="cs-mini-kpi">
                  <div className="cs-mini-kpi-label">Orders Captured</div>
                  <div className="cs-mini-kpi-val">83</div>
                  <div className="cs-mini-kpi-delta up">↑ 94% conversion</div>
                </div>
                <div className="cs-mini-kpi">
                  <div className="cs-mini-kpi-label">Active Reps</div>
                  <div className="cs-mini-kpi-val">24</div>
                  <div className="cs-mini-kpi-delta up">↑ 96% on beat</div>
                </div>
                <div className="cs-mini-kpi">
                  <div className="cs-mini-kpi-label">Pending Follow-ups</div>
                  <div className="cs-mini-kpi-val">12</div>
                  <div className="cs-mini-kpi-delta down">↓ 3 overdue</div>
                </div>
                <div className="cs-mini-list">
                  <div className="cs-mini-list-title">Territory Coverage</div>
                  <div className="cs-mini-row">
                    <div className="cs-mini-row-name">Rajkot — Zone A</div>
                    <div className="cs-mini-bar-track"><div className="cs-mini-bar-fill" style={{ width: "92%", background: "#2AC46B" }} /></div>
                    <div className="cs-mini-row-pct">92%</div>
                  </div>
                  <div className="cs-mini-row">
                    <div className="cs-mini-row-name">Surat — Zone B</div>
                    <div className="cs-mini-bar-track"><div className="cs-mini-bar-fill" style={{ width: "78%", background: "#F5A623" }} /></div>
                    <div className="cs-mini-row-pct">78%</div>
                  </div>
                  <div className="cs-mini-row">
                    <div className="cs-mini-row-name">Vadodara — Zone C</div>
                    <div className="cs-mini-bar-track"><div className="cs-mini-bar-fill" style={{ width: "85%", background: "#2AC46B" }} /></div>
                    <div className="cs-mini-row-pct">85%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="cs-tab-section" id="cs-products">
        <div className="container">
          <div className="cs-tab-header" role="tablist" aria-label="Canyon Systems capabilities">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`cs-tab-btn${tab === t.id ? " active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="cs-product-panel">
            <div className="cs-product-layout">
              <div className="cs-product-copy">
                <p className="section-label">{activeTab.tag}</p>
                <h2 className="cs-product-title">{activeTab.title}</h2>
                <p className="cs-product-desc">{activeTab.desc}</p>
                <div className="cs-feature-list">
                  {activeTab.features.map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      className={`cs-feature-item${activeFeature === f.key ? " active-feature" : ""}`}
                      onClick={() => setFeature((s) => ({ ...s, [tab]: f.key }))}
                    >
                      <span className="cs-fi-dot" />
                      <span className="cs-fi-text">
                        <span className="cs-fi-name">{f.name}</span>
                        <span className="cs-fi-desc">{f.desc}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cs-product-screen">
                <div className="cs-screen-shell">
                  <div className="cs-screen-bar">
                    <div className="cs-screen-dots">
                      <div className="cs-screen-dot" style={{ background: "#E05252", opacity: 0.7 }} />
                      <div className="cs-screen-dot" style={{ background: "#F5A623", opacity: 0.5 }} />
                      <div className="cs-screen-dot" style={{ background: "#2AC46B", opacity: 0.5 }} />
                    </div>
                    <span className="cs-screen-name">{activeTab.screenName}</span>
                    <span className="cs-screen-status">Live</span>
                  </div>
                  <div className="cs-screen-view">
                    <ScreenBody tab={tab} feature={activeFeature} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTS */}
      <section className="cs-connects">
        <div className="container">
          <div className="cs-connects-head">
            <p className="section-label cs-connects-tag">Built to Connect</p>
            <h2 className="cs-connects-title">The foundation everything is built on.</h2>
            <p className="cs-connects-body">
              Canyon Systems captures the data. Canyon Grid gives it business meaning. Canyon Edge turns it into
              intelligence your leadership acts on.
            </p>
          </div>
          <div className="cs-flow">
            <div className="cs-flow-block highlight">
              <span className="cs-flow-badge sys">Canyon Systems</span>
              <div className="cs-flow-name">Capture</div>
              <div className="cs-flow-sub">SFA and CRM capture every transaction, visit, and interaction — structured from the moment it happens</div>
            </div>
            <div className="cs-flow-arrow" aria-hidden="true">→</div>
            <div className="cs-flow-block">
              <span className="cs-flow-badge grid">Canyon Grid</span>
              <div className="cs-flow-name">Contextualise</div>
              <div className="cs-flow-sub">Every data point given business meaning — your rules, your structure, your language</div>
            </div>
            <div className="cs-flow-arrow" aria-hidden="true">→</div>
            <div className="cs-flow-block">
              <span className="cs-flow-badge edge">Canyon Edge</span>
              <div className="cs-flow-name">Act</div>
              <div className="cs-flow-sub">Live intelligence, proactive nudges, and instant answers — from raw data to boardroom decision</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cs-cta">
        <div className="container">
          <h2 className="cs-cta-title">Ready to start capturing?</h2>
          <p className="cs-cta-body">
            Every engagement starts with a Discovery Workshop — where we map what data you have, what is missing, and
            what to build first.
          </p>
          <div className="cs-cta-actions">
            <Link className="btn primary" href="/contact#book-demo">
              Book a Discovery Workshop
            </Link>
            <Link className="btn secondary" href="/solutions">
              Explore all products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
