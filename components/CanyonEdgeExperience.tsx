"use client";

import Link from "next/link";
import { useState } from "react";
import "./CanyonEdgeExperience.css";

/* ── colour tokens (resolve against CSS vars defined on .ce) ── */
const ACCENT = "var(--ce-accent)";
const ACCENT2 = "var(--ce-accent-2)";
const GREEN = "var(--ce-green)";
const AMBER = "var(--ce-amber)";
const RED = "var(--ce-red)";
const FAINT = "var(--ce-faint)";
const SOFT: Record<string, string> = {
  red: "var(--ce-red-soft)",
  amber: "var(--ce-amber-soft)",
  green: "var(--ce-green-soft)",
  accent: "var(--ce-accent-soft)",
};
const BORD: Record<string, string> = {
  red: "var(--ce-red-border)",
  amber: "var(--ce-amber-border)",
  green: "var(--ce-green-border)",
  accent: "var(--ce-accent-border)",
};
const TONE_FG: Record<string, string> = { red: RED, amber: AMBER, accent: ACCENT2 };

/* ── small visuals ── */
function EdgeMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="0" y="22" width="8" height="14" rx="1.5" fill="#E8A882" />
      <rect x="10" y="12" width="8" height="24" rx="1.5" fill="#E8622A" />
      <rect x="20" y="6" width="8" height="30" rx="1.5" fill="#E8622A" />
      <rect x="30" y="16" width="6" height="20" rx="1.5" fill="#D4784E" />
    </svg>
  );
}

function WindowDots() {
  return (
    <div className="ce-screen-dots">
      <div className="ce-screen-dot" style={{ background: "#E05252", opacity: 0.7 }} />
      <div className="ce-screen-dot" style={{ background: "#F5A623", opacity: 0.5 }} />
      <div className="ce-screen-dot" style={{ background: "#2AC46B", opacity: 0.5 }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   DATA — content ported verbatim from canyon-edge.html
───────────────────────────────────────────── */

type Delta = { dir: "up" | "down" | "neutral"; text: string };
type Spark = { color: string; bars: number[]; hlColor?: string };
type Kpi = { label: string; val: string; valColor?: string; delta: Delta; spark?: Spark };
type IntelItem = {
  icon: string;
  label: string;
  labelColor: string;
  text: string;
  val: string;
  valColor: string;
  border?: string;
  bg?: string;
};
type IntelScreen = {
  role: { icon: string; name: string; sub: string };
  kpis?: Kpi[];
  items: IntelItem[];
};

const INTEL: Record<string, IntelScreen> = {
  sales: {
    role: { icon: "📊", name: "Sales Head View", sub: "Updated continuously · June 19, 2026" },
    kpis: [
      {
        label: "Secondary Sales MTD",
        val: "₹18.4Cr",
        delta: { dir: "up", text: "↑ 12.3% vs last month" },
        spark: { color: ACCENT, bars: [40, 55, 48, 62, 58, 74, 100] },
      },
      {
        label: "Active Distributors",
        val: "5,214",
        delta: { dir: "up", text: "↑ 98.2% vs target" },
        spark: { color: GREEN, bars: [88, 90, 91, 93, 95, 97, 100] },
      },
    ],
    items: [
      {
        icon: "📈",
        label: "Top Territory",
        labelColor: GREEN,
        text: "Rajkot Zone is leading with the highest secondary sales growth this month.",
        val: "↑ 18.4% month over month",
        valColor: GREEN,
      },
      {
        icon: "⚠️",
        label: "Attention Required",
        labelColor: RED,
        text: "Surat Zone sell-through rate at 71% — channel inventory building for second consecutive week.",
        val: "₹1.7Cr channel stock at risk",
        valColor: RED,
        border: BORD.red,
      },
      {
        icon: "🎯",
        label: "Target Tracking",
        labelColor: ACCENT2,
        text: "Monthly target achievement at 84% with 11 days remaining. On track for full target.",
        val: "₹3.4Cr remaining to target",
        valColor: ACCENT2,
      },
    ],
  },
  supplychain: {
    role: { icon: "📦", name: "Supply Chain Head View", sub: "Updated continuously · June 19, 2026" },
    kpis: [
      {
        label: "On-Time In-Full Rate",
        val: "94.1%",
        delta: { dir: "down", text: "↓ 0.8% week over week" },
        spark: { color: AMBER, bars: [96, 97, 95, 98, 96, 95, 94], hlColor: RED },
      },
      {
        label: "Stockout Risk — Active",
        val: "3",
        delta: { dir: "down", text: "↑ 3 SKUs flagged" },
      },
    ],
    items: [
      {
        icon: "📦",
        label: "Stockout Risk",
        labelColor: RED,
        text: "4-inch pipe (SKU #P-401) at Surat depot is at 8% of safety stock. No purchase order raised. Estimated stockout in 4 days.",
        val: "Action needed today",
        valColor: RED,
        border: BORD.red,
      },
      {
        icon: "🚚",
        label: "Fulfilment",
        labelColor: ACCENT2,
        text: "Ahmedabad and Rajkot depots performing above target. Mumbai hub showing transit delay — 2.1 day average above target.",
        val: "Mumbai: review transit route",
        valColor: AMBER,
      },
    ],
  },
  finance: {
    role: { icon: "💰", name: "Chief Financial Officer View", sub: "Updated continuously · June 19, 2026" },
    kpis: [
      {
        label: "Working Capital Tied Up",
        val: "₹4.2Cr",
        delta: { dir: "down", text: "↓ ₹0.4Cr vs last month" },
      },
      {
        label: "Procurement Spend MTD",
        val: "₹8.1Cr",
        delta: { dir: "up", text: "↑ 3.2% vs budget" },
      },
    ],
    items: [
      {
        icon: "⚡",
        label: "Working Capital Alert",
        labelColor: AMBER,
        text: "Slow-moving inventory in Surat and Vadodara depots accounts for ₹1.7Cr of working capital that could be freed through targeted distributor sell-through activity.",
        val: "₹1.7Cr opportunity",
        valColor: AMBER,
        border: BORD.amber,
      },
      {
        icon: "📊",
        label: "Vendor Spend",
        labelColor: ACCENT2,
        text: "Top 3 vendors account for 68% of procurement spend. Vendor 2 price variance is 9.4% above contracted rate — review recommended before next order cycle.",
        val: "Review Vendor 2 pricing",
        valColor: ACCENT2,
      },
    ],
  },
  field: {
    role: { icon: "📱", name: "Field Representative — Daily Signal", sub: "Arjun Mehta · Rajkot Central · June 19" },
    items: [
      {
        icon: "🔴",
        label: "Priority Visit — Today",
        labelColor: RED,
        text: "Sunrise Traders has not placed an order in 11 days. Historical average is 7 days. High churn risk. Visit before 2 PM today.",
        val: "Outlet #ST-4821 · 2.4 km from current location",
        valColor: RED,
        border: BORD.red,
        bg: SOFT.red,
      },
      {
        icon: "💡",
        label: "Upsell Opportunity",
        labelColor: AMBER,
        text: "Metro Hardware typically orders adhesive alongside pipes. Last order had pipes only. Mention the adhesive range on today's visit.",
        val: "Avg add-on value: ₹4,200",
        valColor: AMBER,
        border: BORD.amber,
      },
      {
        icon: "✅",
        label: "Today's Beat Progress",
        labelColor: GREEN,
        text: "18 of 22 outlets visited. 4 remaining. On track to complete beat by 5 PM.",
        val: "82% beat completion",
        valColor: GREEN,
      },
    ],
  },
};

type NudgeCard = {
  variant: string;
  tag: string;
  tagLabel: string;
  who: string;
  time: string;
  title: string;
  body: string;
  action: string;
  toned?: boolean;
};
type AlertItem = {
  variant: string;
  badge: string;
  badgeLabel: string;
  fn: string;
  time: string;
  title: string;
  body: string;
};

const NUDGES = {
  allnudges: {
    header: { title: "Active Nudges", count: "7 open" },
    cards: [
      {
        variant: "critical",
        tag: "critical",
        tagLabel: "Critical",
        who: "→ Supply Chain Head",
        time: "Now",
        title: "Stockout in 4 days — Surat depot, SKU #P-401",
        body: "Inventory at 8% of safety stock. No purchase order raised. Average procurement lead time is 9 days. Action needed today to avoid stockout.",
        action: "Raise purchase order →",
      },
      {
        variant: "high",
        tag: "high",
        tagLabel: "High Priority",
        who: "→ Surat Zone RSM",
        time: "3h ago",
        title: "3 distributors inactive — 2nd consecutive week, Surat Zone",
        body: "Sunrise Traders, Metro Supplies, and Krishna Distributors have all reduced order frequency for 2 consecutive weeks. Historical churn probability: 78% without intervention.",
        action: "View distributors →",
      },
      {
        variant: "opportunity",
        tag: "opportunity",
        tagLabel: "Opportunity",
        who: "→ Arjun Mehta",
        time: "Today",
        title: "High-value outlet — 18 days since last visit, order likely",
        body: "Metro Hardware, Rajkot has an average order value of ₹42,000 and typical reorder cycle of 14 days. Overdue by 4 days. On today's beat — prioritise before 2 PM.",
        action: "Open outlet profile →",
      },
    ] as NudgeCard[],
  },
  proactive: {
    summary: [
      { val: "2", color: RED, label: "Critical" },
      { val: "3", color: AMBER, label: "High" },
      { val: "2", color: ACCENT2, label: "Medium" },
    ],
    alerts: [
      {
        variant: "crit",
        badge: "crit",
        badgeLabel: "Proactive Alert",
        fn: "Supply Chain",
        time: "Now",
        title: "Surat depot stockout forming — 4 days to zero stock",
        body: "Canyon Edge detected the depletion trend 3 days ago. No reorder action taken. Flagging now before the window to prevent stockout closes.",
      },
      {
        variant: "warn",
        badge: "warn",
        badgeLabel: "Pattern Alert",
        fn: "Sales",
        time: "Yesterday",
        title: "Surat Zone sell-through declining — channel inventory building",
        body: "Primary sales running 29% ahead of secondary sell-through for 2 consecutive weeks. If uncorrected, channel will resist new orders within 10 days.",
      },
      {
        variant: "warn",
        badge: "warn",
        badgeLabel: "Payment Alert",
        fn: "Finance",
        time: "2 days ago",
        title: "4 distributors approaching payment overdue threshold",
        body: "Payment cycles for 4 distributors are at 85–90% of the maximum agreed term. Finance team alerted before any breach occurs.",
      },
    ] as AlertItem[],
  },
  opportunities: {
    header: { title: "Opportunity Signals", count: "4 active", countTone: "green" },
    cards: [
      {
        variant: "opportunity",
        tag: "opportunity",
        tagLabel: "Upsell",
        who: "→ Arjun Mehta",
        time: "Today",
        title: "Metro Hardware — adhesive upsell on today's pipe order",
        body: "Historical purchase pattern shows Metro Hardware orders adhesive in 82% of visits where pipes are ordered. Last 2 visits were pipe-only. Average adhesive add-on: ₹4,200.",
        action: "View purchase history →",
      },
      {
        variant: "opportunity",
        tag: "opportunity",
        tagLabel: "Relationship",
        who: "→ Priya Sharma",
        time: "Today",
        title: "Royal Hardware contract renewal — 30 days before expiry",
        body: "Royal Hardware's annual contract expires in 30 days. They are Canyon's highest-value account in Surat Zone at ₹22L annual value. Initiate renewal conversation this week.",
        action: "Open account →",
      },
      {
        variant: "info",
        tag: "info",
        tagLabel: "Timing Signal",
        who: "→ Sales Head",
        time: "This week",
        title: "Rajkot Zone — peak order season beginning",
        body: "Based on 3-year seasonal pattern, Rajkot Zone typically increases orders by 22% in the last 10 days of June. Field allocation should be increased this week to capture the uplift.",
        action: "View territory plan →",
        toned: true,
      },
    ] as NudgeCard[],
  },
};

type MsgRow = { name: string; val: string; dot: string; valColor: string };
type AiMsg = {
  role: "ai";
  lead?: string;
  leadColor?: string;
  val?: string;
  valColor?: string;
  sub?: string;
  text?: string;
  chart?: { color: string; caption: string; bars: { h: number; hl?: boolean }[] };
  list?: MsgRow[];
  callout?: { tone: string; text: string };
};
type UserMsg = { role: "user"; text: string };
type Msg = AiMsg | UserMsg;
type AskScreen = { badge: string; placeholder: string; chips: string[]; messages: Msg[] };

const ASK: Record<string, AskScreen> = {
  sales_q: {
    badge: "Sales Intelligence",
    placeholder: "Ask another question about your sales data...",
    chips: ["Compare with last quarter", "Show bottom 3 territories", "Rajkot distributor health"],
    messages: [
      { role: "user", text: "Which territory had the highest secondary sales growth last month?" },
      {
        role: "ai",
        val: "Rajkot Zone",
        valColor: ACCENT2,
        sub: "↑ 18.4% vs prior month · 24 active distributors",
        chart: {
          color: ACCENT,
          caption: "Ahm · Sur · Raj · Vad",
          bars: [{ h: 55 }, { h: 40 }, { h: 100, hl: true }, { h: 70 }],
        },
      },
      { role: "user", text: "Which distributors in Rajkot are driving that growth?" },
      {
        role: "ai",
        text: "Top 3 contributors to Rajkot growth this month:",
        list: [
          { name: "Kumar Traders", val: "↑ 34%", dot: GREEN, valColor: GREEN },
          { name: "Patel Distributors", val: "↑ 22%", dot: ACCENT, valColor: ACCENT2 },
          { name: "Mehta Enterprises", val: "↑ 19%", dot: AMBER, valColor: AMBER },
        ],
      },
    ],
  },
  supply_q: {
    badge: "Supply Chain",
    placeholder: "Ask about inventory, depots, or fulfilment...",
    chips: ["Raise purchase order", "All SKU risk levels", "Vendor lead time history"],
    messages: [
      { role: "user", text: "Which depots are at risk of stockout this week?" },
      {
        role: "ai",
        lead: "1 depot at critical risk:",
        leadColor: RED,
        list: [
          { name: "Surat Depot — SKU #P-401", val: "4 days", dot: RED, valColor: RED },
          { name: "Vadodara — SKU #F-220", val: "9 days", dot: AMBER, valColor: AMBER },
          { name: "All other depots", val: "Healthy", dot: GREEN, valColor: GREEN },
        ],
      },
      { role: "user", text: "What is the procurement lead time for SKU P-401?" },
      {
        role: "ai",
        val: "9 days average",
        valColor: RED,
        sub: "SKU #P-401 · Vendor: Raj Polymers · Last 6 orders",
        callout: {
          tone: "red",
          text: "⚠ Current stock will last 4 days. Purchase order must be raised today to avoid stockout.",
        },
      },
    ],
  },
  finance_q: {
    badge: "Finance",
    placeholder: "Ask about spend, vendors, or working capital...",
    chips: ["Full vendor spend analysis", "Working capital breakdown", "Payment overdue list"],
    messages: [
      { role: "user", text: "Which vendor has the highest price variance against contracted rates this month?" },
      {
        role: "ai",
        val: "Sharma Chemicals",
        valColor: AMBER,
        sub: "9.4% above contracted rate · ₹38L spend this month",
        list: [
          { name: "Sharma Chemicals", val: "+9.4%", dot: RED, valColor: RED },
          { name: "Raj Polymers", val: "+3.1%", dot: AMBER, valColor: AMBER },
          { name: "Allied Materials", val: "−1.2%", dot: GREEN, valColor: GREEN },
        ],
      },
      { role: "user", text: "How much has that variance cost us this quarter?" },
      {
        role: "ai",
        val: "₹31.4L",
        valColor: RED,
        sub: "Excess spend above contracted rate · Q2 2026",
        callout: {
          tone: "amber",
          text: "Contract renewal is due in 45 days. Recommend initiating renegotiation with Sharma Chemicals before renewal.",
        },
      },
    ],
  },
};

const EXEC = {
  overview: {
    header: { greeting: "Good morning, Vikram.", date: "Friday, 19 June 2026 · 9:14 AM" },
    kpis: [
      { label: "Secondary Sales MTD", val: "₹18.4Cr", valColor: ACCENT2, delta: { dir: "up", text: "↑ 12.3% vs last month" } },
      { label: "On-Time In-Full Rate", val: "94.1%", valColor: AMBER, delta: { dir: "down", text: "↓ 0.8% this week" } },
      { label: "Procurement vs Budget", val: "−3.2%", valColor: GREEN, delta: { dir: "up", text: "↓ Under budget" } },
      { label: "Open Exceptions", val: "7", valColor: RED, delta: { dir: "down", text: "↑ 2 critical" } },
    ] as (Kpi & { valColor: string })[],
    signals: [
      {
        ind: GREEN,
        title: "Sales momentum strong — Rajkot Zone leading",
        sub: "Secondary sales growth at 18.4% month over month",
        val: "↑ 18.4%",
        valColor: GREEN,
      },
      {
        ind: RED,
        title: "Surat depot stockout risk — action needed today",
        sub: "SKU #P-401 at 8% stock · 4 days to zero",
        val: "4 days",
        valColor: RED,
        tone: "red",
      },
      {
        ind: AMBER,
        title: "Surat Zone channel inventory building",
        sub: "Sell-through at 71% · Review RSM strategy",
        val: "₹1.7Cr",
        valColor: AMBER,
        tone: "amber",
      },
      {
        ind: ACCENT,
        title: "Procurement under budget — 3.2% favourable",
        sub: "Vendor price variance flagged for review before renewal",
        val: "₹8.1Cr",
        valColor: ACCENT2,
      },
    ] as { ind: string; title: string; sub: string; val: string; valColor: string; tone?: string }[],
  },
  signals: {
    sLabel: { text: "Leadership Signals — Today", note: "Updated 4 mins ago" },
    alerts: [
      {
        variant: "opp",
        badge: "opp",
        badgeLabel: "Positive",
        fn: "Sales",
        time: "This month",
        title: "Rajkot Zone outperforming — highest growth in 6 months",
        body: "Secondary sales growth of 18.4% driven by 3 key distributors. Field execution compliance in this zone is at 94% — highest across all territories.",
      },
      {
        variant: "crit",
        badge: "crit",
        badgeLabel: "Decision Needed",
        fn: "Supply Chain",
        time: "Today",
        title: "Surat depot stockout — purchase order must be raised today",
        body: "Lead time is 9 days. Stock will run out in 4 days. Every day of delay increases stockout probability. Procurement Head has been notified — decision needs to be made before end of business today.",
      },
      {
        variant: "warn",
        badge: "warn",
        badgeLabel: "Monitor",
        fn: "Sales + Finance",
        time: "2 weeks",
        title: "Surat Zone sell-through gap — channel and working capital risk",
        body: "Primary sales running ahead of secondary sell-through for 2 consecutive weeks. ₹1.7Cr channel inventory may resist new orders in 10 days. Working capital implication growing.",
      },
    ] as AlertItem[],
  },
};

const TABS = [
  {
    id: "intelligence",
    label: "Role Intelligence",
    tag: "Role Intelligence",
    title: "The right intelligence for every person in the organisation.",
    desc: "Canyon Edge delivers a different view to every role — automatically. The Sales Head sees what the Sales Head needs. The field representative sees what is useful for today's beat. No one gets a generic dashboard.",
    screenName: "Canyon Edge — Intelligence",
    status: "Live",
    features: [
      { key: "sales", name: "Sales and Commercial", desc: "Distributor health, territory performance, and secondary sales — live, by territory, by rep." },
      { key: "supplychain", name: "Supply Chain", desc: "Demand signals, depot fill rates, stockout risk, and delivery performance — before the planning meeting." },
      { key: "finance", name: "Finance and Procurement", desc: "Working capital, vendor spend, procurement variances, and payment cycles — in one view." },
      { key: "field", name: "Field Representatives", desc: "Today's priorities — which outlet, which distributor, which order — delivered as a daily signal." },
    ],
  },
  {
    id: "nudges",
    label: "Nudges and Alerts",
    tag: "Nudges and Alerts",
    title: "The right signal. The right person. Before the moment passes.",
    desc: "Canyon Edge watches your business continuously and surfaces signals the moment they matter — routed to the person who can act on them, with the context and suggested action already attached.",
    screenName: "Canyon Edge — Nudges",
    status: "Watching",
    features: [
      { key: "allnudges", name: "All Active Nudges", desc: "Every live signal across the organisation — prioritised, assigned, and ready to act on." },
      { key: "proactive", name: "Proactive Alerts", desc: "Problems detected before they have materialised. Canyon Edge acts on patterns, not just triggers." },
      { key: "opportunities", name: "Opportunity Signals", desc: "Not just problems — Canyon Edge surfaces upsell moments, relationship opportunities, and timing signals too." },
    ],
  },
  {
    id: "ask",
    label: "Ask Your Data",
    tag: "Ask Your Data",
    title: "Ask anything. Get an answer. Instantly.",
    desc: "Canyon Edge lets anyone in your organisation ask a question in plain language and get an answer from your own data — instantly. No analyst. No SQL. No waiting until Monday morning.",
    screenName: "Canyon Edge — Ask Your Data",
    status: "Ready",
    features: [
      { key: "sales_q", name: "Sales Questions", desc: "Territory performance, distributor trends, secondary sales — answered in seconds." },
      { key: "supply_q", name: "Supply Chain Questions", desc: "Inventory levels, fulfilment rates, stockout risk — from any depot, any SKU, any timeframe." },
      { key: "finance_q", name: "Finance Questions", desc: "Working capital, procurement spend, payment cycles — the CFO asks, the data answers." },
    ],
  },
  {
    id: "executive",
    label: "Executive View",
    tag: "Executive View",
    title: "The complete picture. Always current.",
    desc: "The Managing Director and leadership team see every function in one view — sales, supply chain, finance, procurement, and field — updated continuously. Not a summary of last week. A live picture of right now.",
    screenName: "Canyon Edge — Executive",
    status: "Live",
    features: [
      { key: "overview", name: "Business Overview", desc: "Every key metric across every function — in one view, always current." },
      { key: "signals", name: "Live Business Signals", desc: "What is going well, what needs attention, and what the leadership team should act on today." },
    ],
  },
];

/* ─────────────────────────────────────────────
   SCREEN RENDERERS
───────────────────────────────────────────── */

function SparkBars({ spark }: { spark: Spark }) {
  return (
    <div className="ce-spark-bars">
      {spark.bars.map((h, i) => {
        const last = i === spark.bars.length - 1;
        return (
          <div
            key={i}
            className={`ce-spark-bar${last ? " highlight" : ""}`}
            style={{ height: `${h}%`, background: last && spark.hlColor ? spark.hlColor : spark.color }}
          />
        );
      })}
    </div>
  );
}

function IntelView({ data }: { data: IntelScreen }) {
  return (
    <div className="ce-screen-content">
      <div className="ce-role-header">
        <div className="ce-role-icon">{data.role.icon}</div>
        <div>
          <div className="ce-role-name">{data.role.name}</div>
          <div className="ce-role-sub">{data.role.sub}</div>
        </div>
      </div>
      {data.kpis && (
        <div className="ce-kpi-grid">
          {data.kpis.map((k, i) => (
            <div className="ce-kpi-tile" key={i}>
              <div className="ce-kt-label">{k.label}</div>
              <div className="ce-kt-val">{k.val}</div>
              <div className={`ce-kt-delta ${k.delta.dir}`}>{k.delta.text}</div>
              {k.spark && <SparkBars spark={k.spark} />}
            </div>
          ))}
        </div>
      )}
      <div className="ce-intel-list">
        {data.items.map((it, i) => (
          <div
            className="ce-intel-item"
            key={i}
            style={{ ...(it.border ? { borderColor: it.border } : {}), ...(it.bg ? { background: it.bg } : {}) }}
          >
            <div className="ce-ii-icon">{it.icon}</div>
            <div className="ce-ii-body">
              <div className="ce-ii-label" style={{ color: it.labelColor }}>{it.label}</div>
              <div className="ce-ii-text">{it.text}</div>
              <div className="ce-ii-val" style={{ color: it.valColor }}>{it.val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NudgeCards({
  header,
  cards,
}: {
  header: { title: string; count: string; countTone?: string };
  cards: NudgeCard[];
}) {
  return (
    <div className="ce-screen-content">
      <div className="ce-nudge-header">
        <span className="ce-nh-title">{header.title}</span>
        <span
          className="ce-nh-count"
          style={header.countTone === "green" ? { background: SOFT.green, color: GREEN, borderColor: BORD.green } : undefined}
        >
          {header.count}
        </span>
      </div>
      <div className="ce-nudge-list">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`ce-nudge-card ${c.variant}`}
            style={c.toned ? { borderColor: BORD.accent, background: SOFT.accent } : undefined}
          >
            <div className="ce-nc-header">
              <span className={`ce-nc-tag ${c.tag}`}>{c.tagLabel}</span>
              <span className="ce-nc-who">{c.who}</span>
              <span className="ce-nc-time">{c.time}</span>
            </div>
            <div className="ce-nc-title">{c.title}</div>
            <div className="ce-nc-body">{c.body}</div>
            <span className="ce-nc-action">{c.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertList({ alerts }: { alerts: AlertItem[] }) {
  return (
    <div className="ce-alert-list">
      {alerts.map((a, i) => (
        <div key={i} className={`ce-alert-item ${a.variant}`}>
          <div className="ce-ai-top">
            <span className={`ce-ai-badge ${a.badge}`}>{a.badgeLabel}</span>
            <span className="ce-ai-function">{a.fn}</span>
            <span className="ce-ai-time">{a.time}</span>
          </div>
          <div className="ce-ai-title">{a.title}</div>
          <div className="ce-ai-body">{a.body}</div>
        </div>
      ))}
    </div>
  );
}

function ProactiveView() {
  const { summary, alerts } = NUDGES.proactive;
  return (
    <div className="ce-screen-content">
      <div className="ce-alert-summary">
        {summary.map((s, i) => (
          <div key={i} className="ce-als-item">
            <div className="ce-als-val" style={{ color: s.color }}>{s.val}</div>
            <div className="ce-als-label">{s.label}</div>
          </div>
        ))}
      </div>
      <AlertList alerts={alerts} />
    </div>
  );
}

function AskView({ data }: { data: AskScreen }) {
  return (
    <>
      <div className="ce-ask-header">
        <div className="ce-ask-header-icon">🤖</div>
        <div>
          <div className="ce-ask-header-title">Canyon Edge</div>
          <div className="ce-ask-header-sub">Connected to your live data</div>
        </div>
        <div className="ce-ask-header-badge">{data.badge}</div>
      </div>
      <div className="ce-ask-convo">
        {data.messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="ce-msg user">
              <div className="ce-msg-avatar" style={{ background: SOFT.accent, color: ACCENT2 }}>You</div>
              <div className="ce-msg-bubble">{m.text}</div>
            </div>
          ) : (
            <div key={i} className="ce-msg ai">
              <div className="ce-msg-avatar" style={{ background: SOFT.accent, border: `1px solid ${BORD.accent}` }}>
                <EdgeMark size={14} />
              </div>
              <div className="ce-msg-bubble">
                {m.lead && (
                  <div style={{ fontSize: "12px", color: m.leadColor, fontWeight: 600, marginBottom: "6px" }}>{m.lead}</div>
                )}
                {m.val && <div className="ce-msg-val" style={{ color: m.valColor }}>{m.val}</div>}
                {m.sub && <div className="ce-msg-sub" style={m.chart || m.list ? { marginBottom: "8px" } : undefined}>{m.sub}</div>}
                {m.text && <span>{m.text}</span>}
                {m.chart && (
                  <>
                    <div className="ce-msg-chart">
                      {m.chart.bars.map((b, bi) => (
                        <div
                          key={bi}
                          className={`ce-chart-bar${b.hl ? " hl" : ""}`}
                          style={{ height: `${b.h}%`, background: m.chart!.color }}
                        />
                      ))}
                    </div>
                    <div style={{ fontSize: "9px", color: FAINT, marginTop: "4px" }}>{m.chart.caption}</div>
                  </>
                )}
                {m.list && (
                  <div className="ce-msg-list">
                    {m.list.map((r, ri) => (
                      <div key={ri} className="ce-ml-row">
                        <div className="ce-ml-dot" style={{ background: r.dot }} />
                        <div className="ce-ml-name">{r.name}</div>
                        <div className="ce-ml-val" style={{ color: r.valColor }}>{r.val}</div>
                      </div>
                    ))}
                  </div>
                )}
                {m.callout && (
                  <div
                    className="ce-ask-callout"
                    style={{ background: SOFT[m.callout.tone], border: `1px solid ${BORD[m.callout.tone]}`, color: TONE_FG[m.callout.tone] }}
                  >
                    {m.callout.text}
                  </div>
                )}
              </div>
            </div>
          ),
        )}
      </div>
      <div className="ce-suggest-chips">
        {data.chips.map((c, i) => (
          <span key={i} className="ce-chip">{c}</span>
        ))}
      </div>
      <div className="ce-ask-input-row">
        <input className="ce-ask-input" placeholder={data.placeholder} suppressHydrationWarning />
        <button type="button" className="ce-ask-send" aria-label="Send question">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  );
}

function ExecOverview() {
  const { header, kpis, signals } = EXEC.overview;
  return (
    <div className="ce-screen-content">
      <div className="ce-exec-header">
        <span className="ce-eh-greeting">{header.greeting}</span>
        <span className="ce-eh-date">{header.date}</span>
      </div>
      <div className="ce-exec-kpis">
        {kpis.map((k, i) => (
          <div key={i} className="ce-ek-tile">
            <div className="ce-ek-label">{k.label}</div>
            <div className="ce-ek-val" style={{ color: k.valColor }}>{k.val}</div>
            <div className={`ce-ek-delta ${k.delta.dir}`}>{k.delta.text}</div>
          </div>
        ))}
      </div>
      <div className="ce-exec-signals">
        {signals.map((s, i) => (
          <div
            key={i}
            className="ce-es-row"
            style={s.tone ? { background: SOFT[s.tone], borderColor: BORD[s.tone] } : undefined}
          >
            <div className="ce-es-indicator" style={{ background: s.ind }} />
            <div className="ce-es-body">
              <div className="ce-es-title">{s.title}</div>
              <div className="ce-es-sub">{s.sub}</div>
            </div>
            <div className="ce-es-val" style={{ color: s.valColor }}>{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecSignals() {
  const { sLabel, alerts } = EXEC.signals;
  return (
    <div className="ce-screen-content">
      <div className="ce-s-label">
        {sLabel.text} <span>{sLabel.note}</span>
      </div>
      <AlertList alerts={alerts} />
    </div>
  );
}

function ScreenBody({ tab, feature }: { tab: string; feature: string }) {
  if (tab === "intelligence") return <IntelView data={INTEL[feature]} />;
  if (tab === "nudges") {
    if (feature === "proactive") return <ProactiveView />;
    const block = NUDGES[feature as "allnudges" | "opportunities"];
    return <NudgeCards header={block.header} cards={block.cards} />;
  }
  if (tab === "ask") return <AskView data={ASK[feature]} />;
  if (feature === "signals") return <ExecSignals />;
  return <ExecOverview />;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export function CanyonEdgeExperience() {
  const [tab, setTab] = useState("intelligence");
  const [feature, setFeature] = useState<Record<string, string>>({
    intelligence: "sales",
    nudges: "allnudges",
    ask: "sales_q",
    executive: "overview",
  });

  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];
  const activeFeature = feature[tab];

  return (
    <div className="ce">
      {/* HERO */}
      <section className="ce-hero">
        <div className="container ce-hero-grid">
          <div className="ce-hero-copy">
            <p className="section-label">Canyon Edge</p>
            <h1 className="ce-hero-h1">
              Your data.
              <br />
              <span>Answering back.</span>
            </h1>
            <p className="ce-hero-lead">
              The intelligence layer where data becomes decisions. Live insights for every role, proactive nudges before
              problems form, and the ability to ask your data anything — in plain language, instantly.
            </p>
            <div className="ce-hero-actions">
              <Link className="btn primary" href="/contact#book-demo">
                Book a Discovery Workshop
              </Link>
              <a className="btn secondary" href="#ce-products">
                See Canyon Edge
              </a>
            </div>
          </div>
          <div className="ce-hero-visual">
            <div className="ce-mini-shell">
              <div className="ce-mini-bar">
                <div className="ce-mini-dots">
                  <div className="ce-mini-dot" style={{ background: "#E05252", opacity: 0.7 }} />
                  <div className="ce-mini-dot" style={{ background: "#F5A623", opacity: 0.5 }} />
                  <div className="ce-mini-dot" style={{ background: "#2AC46B", opacity: 0.5 }} />
                </div>
                <span className="ce-mini-title">Canyon Edge — Intelligence Layer</span>
                <div className="ce-mini-live">Live</div>
              </div>
              <div className="ce-mini-body">
                <div className="ce-mini-kpi-row">
                  <div className="ce-mk-item">
                    <div className="ce-mk-val" style={{ color: ACCENT2 }}>₹18.4Cr</div>
                    <div className="ce-mk-label">Secondary Sales</div>
                  </div>
                  <div className="ce-mk-item">
                    <div className="ce-mk-val" style={{ color: GREEN }}>94.1%</div>
                    <div className="ce-mk-label">Delivery Rate</div>
                  </div>
                  <div className="ce-mk-item">
                    <div className="ce-mk-val" style={{ color: AMBER }}>7</div>
                    <div className="ce-mk-label">Open Alerts</div>
                  </div>
                </div>
                <div className="ce-mini-chat">
                  <div className="ce-mc-msg user">
                    <div className="ce-mc-avatar" style={{ background: SOFT.accent, color: ACCENT2 }}>You</div>
                    <div className="ce-mc-bubble">Which territory had the highest secondary sales growth last month?</div>
                  </div>
                  <div className="ce-mc-msg ai">
                    <div className="ce-mc-avatar" style={{ background: SOFT.accent }}>
                      <EdgeMark size={14} />
                    </div>
                    <div className="ce-mc-bubble">
                      <div className="ce-mc-answer-val">Rajkot Zone</div>
                      <div className="ce-mc-answer-sub">↑ 18.4% growth vs prior month · 24 active distributors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="ce-tab-section" id="ce-products">
        <div className="container">
          <div className="ce-tab-header" role="tablist" aria-label="Canyon Edge capabilities">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`ce-tab-btn${tab === t.id ? " active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="ce-product-panel">
            <div className="ce-product-layout">
              <div className="ce-product-copy">
                <p className="section-label">{activeTab.tag}</p>
                <h2 className="ce-product-title">{activeTab.title}</h2>
                <p className="ce-product-desc">{activeTab.desc}</p>
                <div className="ce-feature-list">
                  {activeTab.features.map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      className={`ce-feature-item${activeFeature === f.key ? " active-feature" : ""}`}
                      onClick={() => setFeature((s) => ({ ...s, [tab]: f.key }))}
                    >
                      <span className="ce-fi-dot" />
                      <span className="ce-fi-text">
                        <span className="ce-fi-name">{f.name}</span>
                        <span className="ce-fi-desc">{f.desc}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ce-product-screen">
                <div className="ce-screen-shell">
                  <div className="ce-screen-bar">
                    <WindowDots />
                    <span className="ce-screen-name">{activeTab.screenName}</span>
                    <span className="ce-screen-status">{activeTab.status}</span>
                  </div>
                  <div className="ce-screen-view">
                    <ScreenBody tab={tab} feature={activeFeature} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTS */}
      <section className="ce-connects">
        <div className="container">
          <div className="ce-connects-head">
            <p className="section-label ce-connects-tag">The Intelligence Layer</p>
            <h2 className="ce-connects-title">Where all the data finally makes sense.</h2>
            <p className="ce-connects-body">
              Canyon Edge sits at the top of the platform — turning everything Canyon Systems captures and Canyon Grid
              contextualises into intelligence that the entire organisation can act on.
            </p>
          </div>
          <div className="ce-flow">
            <div className="ce-flow-block">
              <span className="ce-flow-badge sys">Canyon Systems</span>
              <div className="ce-flow-name">Capture</div>
              <div className="ce-flow-sub">Every transaction, visit, and interaction — structured and ready</div>
            </div>
            <div className="ce-flow-arrow" aria-hidden="true">→</div>
            <div className="ce-flow-block">
              <span className="ce-flow-badge grid">Canyon Grid</span>
              <div className="ce-flow-name">Contextualise</div>
              <div className="ce-flow-sub">Rules applied, data reconciled, discrepancies caught before they compound</div>
            </div>
            <div className="ce-flow-arrow" aria-hidden="true">→</div>
            <div className="ce-flow-block highlight">
              <span className="ce-flow-badge edge">Canyon Edge</span>
              <div className="ce-flow-name">Act</div>
              <div className="ce-flow-sub">
                Live intelligence, proactive nudges, and instant answers — from raw data to boardroom decision
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ce-cta">
        <div className="container">
          <h2 className="ce-cta-title">Ready to ask your data anything?</h2>
          <p className="ce-cta-body">
            One conversation is all it takes to find out where Canyon Edge would change what your leadership decides next.
          </p>
          <div className="ce-cta-actions">
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
