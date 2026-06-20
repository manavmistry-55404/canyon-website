"use client";

import Link from "next/link";
import { useState } from "react";
import "./CanyonGridExperience.css";

/* ── colour tokens (resolve against CSS vars defined on .cg) ── */
const ACCENT2 = "var(--cg-accent-2)";
const GREEN = "var(--cg-green)";
const AMBER = "var(--cg-amber)";
const RED = "var(--cg-red)";
const BLUE = "var(--cg-blue)";
const STEEL = "var(--cg-steel)";
const INK = "var(--cg-ink)";
const FAINT = "var(--cg-faint)";

const SOFT: Record<string, string> = {
  accent: "var(--cg-accent-soft)",
  green: "var(--cg-green-soft)",
  amber: "var(--cg-amber-soft)",
  red: "var(--cg-red-soft)",
  blue: "var(--cg-blue-soft)",
  steel: "var(--cg-steel-soft)",
  muted: "rgba(7, 19, 28, 0.05)",
};
const BORD: Record<string, string> = {
  accent: "var(--cg-accent-border)",
  green: "var(--cg-green-border)",
  amber: "var(--cg-amber-border)",
  red: "var(--cg-red-border)",
  blue: "var(--cg-blue-border)",
  steel: "var(--cg-steel-border)",
};
const TONE_COLOR: Record<string, string> = {
  accent: ACCENT2,
  green: GREEN,
  amber: AMBER,
  red: RED,
  blue: BLUE,
  steel: STEEL,
};

/* ─────────────────────────────────────────────
   DATA — ported verbatim from canyon-grid.html
───────────────────────────────────────────── */

type Rule = {
  state: "active" | "inactive" | "warning";
  name: string;
  badge: "on" | "off" | "warn";
  badgeLabel: string;
  logic: string;
  meta: string[];
};

type Stage = { icon: string; tone: string; name: string; sub: string; count: string; countColor: string };

type Validation = {
  breakdown: { title: string; bars: { label: string; pct: number; color: string }[] };
  pipeline: Stage[];
};

type ScheduleData = {
  header: { title: string; tag: string };
  items: { freqVal: string; freqLabel: string; tone: string; name: string; desc: string; next: string; last: string }[];
};

const RULES: { rulelist: Rule[]; validation: Validation; schedule: ScheduleData } = {
  rulelist: [
    {
      state: "active",
      name: "Distributor Credit Limit Check",
      badge: "on",
      badgeLabel: "Active",
      logic: "IF order_value > credit_limit THEN flag → hold_for_approval",
      meta: ["⚡ Triggered 23 times today", "📅 Updated 3 days ago"],
    },
    {
      state: "active",
      name: "Scheme Eligibility Validation",
      badge: "on",
      badgeLabel: "Active",
      logic: "IF outlet_type IN ['MT','GT'] AND volume >= threshold THEN apply_scheme",
      meta: ["⚡ Triggered 148 times today", "📅 Updated 1 week ago"],
    },
    {
      state: "warning",
      name: "Stock Reorder Threshold",
      badge: "warn",
      badgeLabel: "Needs Review",
      logic: "IF inventory_days < 7 AND no_po_raised THEN alert → procurement_head",
      meta: ["⚡ Triggered 4 times today", "⚠️ Threshold may need update"],
    },
    {
      state: "inactive",
      name: "Seasonal Pricing Override",
      badge: "off",
      badgeLabel: "Inactive",
      logic: "IF month IN ['Oct','Nov','Dec'] THEN apply_festive_pricing_tier",
      meta: ["💤 Not triggered", "📅 Active from Oct 1"],
    },
  ],
  validation: {
    breakdown: {
      title: "Today's Validation Summary",
      bars: [
        { label: "Passed", pct: 94, color: GREEN },
        { label: "Flagged for review", pct: 4, color: AMBER },
        { label: "Rejected", pct: 2, color: RED },
      ],
    },
    pipeline: [
      { icon: "📥", tone: "accent", name: "Ingest", sub: "Data received from all connected sources", count: "1,964", countColor: ACCENT2 },
      { icon: "🔍", tone: "blue", name: "Schema Check", sub: "Format and completeness validated", count: "1,958", countColor: BLUE },
      { icon: "✅", tone: "green", name: "Rule Evaluation", sub: "Business rules applied to every record", count: "1,847", countColor: GREEN },
      { icon: "🚩", tone: "amber", name: "Flagged for Review", sub: "Routed to relevant owner with context", count: "78", countColor: AMBER },
      { icon: "🚫", tone: "red", name: "Rejected", sub: "Invalid records quarantined, source notified", count: "39", countColor: RED },
    ],
  },
  schedule: {
    header: { title: "Scheduled Rule Runs", tag: "All systems operational" },
    items: [
      { freqVal: "24", freqLabel: "Hourly", tone: "green", name: "Credit Limit Validation", desc: "All pending orders checked against distributor credit limits", next: "Next: 18 mins", last: "Last run: clean" },
      { freqVal: "1", freqLabel: "Nightly", tone: "blue", name: "SAP vs DMS Stock Reconciliation", desc: "Full inventory match across all depots", next: "Next: 11:30 PM", last: "Last: 2 flags raised" },
      { freqVal: "7", freqLabel: "Weekly", tone: "accent", name: "Primary vs Secondary Sales Match", desc: "Sell-in vs sell-out reconciliation across all distributors", next: "Next: Sunday 6 AM", last: "Last: clean" },
      { freqVal: "1", freqLabel: "Monthly", tone: "amber", name: "Procurement Spend vs Budget", desc: "Full vendor spend reconciliation against approved budget", next: "Next: Jul 1", last: "Last: 1 variance flagged" },
    ],
  },
};

type ReconRow = {
  flagged?: boolean;
  source: string;
  sub: string;
  a: string;
  aColor: string;
  b: string;
  bColor: string;
  diff: string;
  diffColor: string;
  status: string;
  statusKind: string;
};
type ReconData = {
  header: { title: string; run: string };
  summary?: { val: string; color: string; label: string }[];
  cols: string[];
  rows: ReconRow[];
};

const RECON: Record<string, ReconData> = {
  reconmain: {
    header: { title: "Reconciliation Dashboard", run: "Run now" },
    summary: [
      { val: "1,847", color: GREEN, label: "Matched" },
      { val: "7", color: RED, label: "Flagged" },
      { val: "3", color: AMBER, label: "In Review" },
      { val: "94.2%", color: INK, label: "Match Rate" },
    ],
    cols: ["Data Source Pair", "System A", "System B", "Variance", "Status"],
    rows: [
      { source: "Primary Sales", sub: "SAP ↔ DMS · Last run: 2h ago", a: "₹18.4Cr", aColor: INK, b: "₹18.4Cr", bColor: INK, diff: "0.0%", diffColor: GREEN, status: "Match", statusKind: "match" },
      { flagged: true, source: "Stock — Surat Depot", sub: "SAP ↔ DMS · Last run: 11:30 PM", a: "4,820 units", aColor: INK, b: "4,231 units", bColor: RED, diff: "−12.2%", diffColor: RED, status: "Flagged", statusKind: "flag" },
      { source: "Distributor Payables", sub: "ERP ↔ Portal · Last run: 6h ago", a: "₹2.1Cr", aColor: INK, b: "₹2.3Cr", bColor: AMBER, diff: "+9.5%", diffColor: AMBER, status: "Review", statusKind: "review" },
      { source: "Field Visit Logs", sub: "SFA ↔ CRM · Last run: 1h ago", a: "1,247", aColor: INK, b: "1,247", bColor: INK, diff: "0.0%", diffColor: GREEN, status: "Match", statusKind: "match" },
      { source: "Procurement Orders", sub: "ERP ↔ SAP · Last run: 4h ago", a: "₹4.8Cr", aColor: INK, b: "₹4.8Cr", bColor: INK, diff: "0.0%", diffColor: GREEN, status: "Match", statusKind: "match" },
    ],
  },
  stockrecon: {
    header: { title: "Inventory Reconciliation — All Depots", run: "Last run: 11:30 PM" },
    cols: ["Depot", "SAP Stock", "Physical", "Variance", "Status"],
    rows: [
      { source: "Ahmedabad Central", sub: "12 SKUs · Last count: today", a: "8,420", aColor: INK, b: "8,420", bColor: INK, diff: "0.0%", diffColor: GREEN, status: "Match", statusKind: "match" },
      { flagged: true, source: "Surat Depot", sub: "18 SKUs · Last count: yesterday", a: "4,820", aColor: INK, b: "4,231", bColor: RED, diff: "−589", diffColor: RED, status: "Flagged", statusKind: "flag" },
      { source: "Rajkot Depot", sub: "9 SKUs · Last count: today", a: "3,140", aColor: INK, b: "3,140", bColor: INK, diff: "0.0%", diffColor: GREEN, status: "Match", statusKind: "match" },
      { source: "Vadodara Depot", sub: "14 SKUs · Last count: 2 days ago", a: "5,890", aColor: INK, b: "5,760", bColor: AMBER, diff: "−130", diffColor: AMBER, status: "Review", statusKind: "review" },
      { source: "Mumbai Hub", sub: "22 SKUs · Last count: today", a: "11,240", aColor: INK, b: "11,240", bColor: INK, diff: "0.0%", diffColor: GREEN, status: "Match", statusKind: "match" },
    ],
  },
  salesrecon: {
    header: { title: "Primary vs Secondary Sales — June 2026", run: "Weekly run" },
    summary: [
      { val: "₹18.4Cr", color: INK, label: "Primary (Sell-In)" },
      { val: "₹16.2Cr", color: ACCENT2, label: "Secondary (Sell-Out)" },
      { val: "₹2.2Cr", color: AMBER, label: "Channel Inventory" },
      { val: "88%", color: GREEN, label: "Sell-Through Rate" },
    ],
    cols: ["Territory", "Primary", "Secondary", "Sell-Through", "Status"],
    rows: [
      { source: "Rajkot Zone", sub: "18 distributors", a: "₹4.2Cr", aColor: INK, b: "₹4.0Cr", bColor: INK, diff: "95%", diffColor: GREEN, status: "Healthy", statusKind: "match" },
      { flagged: true, source: "Surat Zone", sub: "24 distributors", a: "₹5.8Cr", aColor: INK, b: "₹4.1Cr", bColor: AMBER, diff: "71%", diffColor: RED, status: "At Risk", statusKind: "flag" },
      { source: "Ahmedabad Zone", sub: "31 distributors", a: "₹6.1Cr", aColor: INK, b: "₹5.7Cr", bColor: INK, diff: "93%", diffColor: GREEN, status: "Healthy", statusKind: "match" },
      { source: "Vadodara Zone", sub: "14 distributors", a: "₹2.3Cr", aColor: INK, b: "₹2.4Cr", bColor: AMBER, diff: "104%", diffColor: AMBER, status: "Review", statusKind: "review" },
    ],
  },
};

type DiscCard = { sev: string; sevLabel: string; time: string; title: string; body: string; sources: string[]; action: string };

const EXC: {
  disclist: { filters: { label: string; active?: boolean }[]; cards: DiscCard[] };
  earlywarning: { label: string; note: string; cards: DiscCard[] };
  auditlog: { label: string; note: string; stages: Stage[] };
} = {
  disclist: {
    filters: [{ label: "All (10)", active: true }, { label: "Critical (2)" }, { label: "High (4)" }, { label: "Medium (4)" }],
    cards: [
      {
        sev: "critical",
        sevLabel: "Critical",
        time: "Now",
        title: "Stock discrepancy — Surat depot, 589 units unaccounted",
        body: "SAP records 4,820 units. Physical count shows 4,231. Discrepancy of 12.2% across 3 SKUs. Possible transit loss or recording error. Requires immediate depot investigation.",
        sources: ["SAP ↔ DMS", "Surat Depot", "Assigned: Supply Chain Head"],
        action: "Investigate →",
      },
      {
        sev: "high",
        sevLabel: "High",
        time: "3h ago",
        title: "Distributor payables variance — ₹20L unreconciled",
        body: "ERP shows ₹2.1Cr outstanding to 4 distributors. Distributor portal shows ₹2.3Cr. Difference of ₹20L may indicate unposted credit notes or duplicate invoices.",
        sources: ["ERP ↔ Portal", "Finance Team"],
        action: "Review credits →",
      },
      {
        sev: "medium",
        sevLabel: "Medium",
        time: "6h ago",
        title: "Surat Zone sell-through rate at 71% — channel inventory building",
        body: "Primary sales running ahead of secondary sell-through in Surat Zone for second consecutive week. Channel inventory now at ₹1.7Cr. Distributor-level review recommended before next cycle.",
        sources: ["Sales Intelligence", "Surat Zone RSM"],
        action: "View zone →",
      },
    ],
  },
  earlywarning: {
    label: "Early Warning Signals",
    note: "Pattern-based detection",
    cards: [
      {
        sev: "high",
        sevLabel: "Pattern Detected",
        time: "Today",
        title: "3 distributors — declining order frequency, 2nd consecutive week",
        body: "Sunrise Traders, Rajkot; Metro Supplies, Surat; and Krishna Dist., Vadodara have all reduced order frequency for 2 consecutive weeks. Historical pattern: 78% of distributors matching this signal went inactive within 30 days without intervention.",
        sources: ["SFA + DMS pattern", "Assigned: Field Managers"],
        action: "View distributors →",
      },
      {
        sev: "medium",
        sevLabel: "Pattern Detected",
        time: "Yesterday",
        title: "SKU approaching reorder threshold — no purchase order raised",
        body: "4-inch pipe (SKU #P-401) at Surat depot is at 8% of safety stock level. Average lead time from procurement is 9 days. At current depletion rate, stockout in approximately 4 days. No purchase order found in system.",
        sources: ["SAP Inventory", "Procurement Head"],
        action: "Raise indent →",
      },
    ],
  },
  auditlog: {
    label: "Audit Trail",
    note: "Last 24 hours",
    stages: [
      { icon: "✅", tone: "green", name: "Stock discrepancy — Surat — Resolved", sub: "Action taken by Supply Chain Head · 2h ago", count: "Done", countColor: GREEN },
      { icon: "🚨", tone: "red", name: "Credit limit breach — Distributor #D-2847 — Flagged", sub: "Order held pending approval · 3h ago", count: "Open", countColor: RED },
      { icon: "🔄", tone: "accent", name: "Nightly reconciliation run completed — 1,847 records", sub: "7 flagged, 3 in review · Last night 11:31 PM", count: "Log", countColor: ACCENT2 },
      { icon: "⚠️", tone: "amber", name: "Payables variance — Finance review requested", sub: "Assigned to CFO team · 6h ago", count: "Open", countColor: AMBER },
      { icon: "✅", tone: "green", name: "Scheme eligibility batch completed — 148 outlets processed", sub: "All approved and posted · 8h ago", count: "Done", countColor: GREEN },
    ],
  },
};

type FlowCard = { icon: string; tone: string; name: string; desc: string; runs: string; runsColor?: string; last: string; on: boolean; faded?: boolean };

const AUTO: {
  flows: { stats: { val: string; color: string; label: string }[]; cards: FlowCard[] };
  routing: Rule[];
} = {
  flows: {
    stats: [
      { val: "14", color: ACCENT2, label: "Active Flows" },
      { val: "2,841", color: GREEN, label: "Runs Today" },
      { val: "99.4%", color: INK, label: "Success Rate" },
    ],
    cards: [
      { icon: "🔄", tone: "accent", name: "Order Approval Routing", desc: "Orders above credit limit → hold → notify approval owner", runs: "23 runs", last: "Today", on: true },
      { icon: "🌙", tone: "green", name: "Nightly SAP↔DMS Reconciliation", desc: "Full stock and sales match across all connected depots", runs: "1 run", last: "11:31 PM last night", on: true },
      { icon: "📦", tone: "accent", name: "Reorder Alert Trigger", desc: "SKUs below safety stock → alert procurement → suggest PO", runs: "4 runs", last: "Today", on: true },
      { icon: "💳", tone: "blue", name: "Payment Cycle Flag", desc: "Overdue payments past agreed terms → flag → notify finance", runs: "8 runs", last: "Today", on: true },
      { icon: "📊", tone: "muted", name: "Monthly Spend vs Budget", desc: "Procurement spend reconciled against approved budget heads", runs: "Scheduled", runsColor: FAINT, last: "Jul 1 · 6 AM", on: false, faded: true },
    ],
  },
  routing: [
    {
      state: "active",
      name: "Stock Discrepancy → Supply Chain Head",
      badge: "on",
      badgeLabel: "Active",
      logic: "IF recon_variance > 5% AND source = 'inventory' THEN assign → supply_chain_head + notify_depot_manager",
      meta: ["⚡ Triggered today: 1 time", "⏱ Avg resolution: 4.2 hours"],
    },
    {
      state: "active",
      name: "Credit Breach → Sales Head Approval",
      badge: "on",
      badgeLabel: "Active",
      logic: "IF order_value > credit_limit THEN hold_order + assign → sales_head FOR approval WITHIN 2h",
      meta: ["⚡ Triggered today: 23 times", "⏱ Avg resolution: 1.8 hours"],
    },
    {
      state: "active",
      name: "Payment Overdue → Finance + RSM",
      badge: "on",
      badgeLabel: "Active",
      logic: "IF payment_overdue_days > 7 THEN notify → finance_team + rsm_territory + block_new_orders",
      meta: ["⚡ Triggered today: 8 times", "⏱ Avg resolution: 2.1 days"],
    },
  ],
};

const MINI_ROWS = [
  { name: "Primary Sales", sub: "SAP ↔ DMS", a: "₹18.4Cr", aColor: INK, b: "₹18.4Cr", bColor: INK, pill: "ok", pillLabel: "Match" },
  { name: "Stock — Surat Depot", sub: "SAP ↔ DMS", a: "4,820", aColor: INK, b: "4,231", bColor: RED, pill: "flag", pillLabel: "Flagged" },
  { name: "Distributor Payables", sub: "ERP ↔ Portal", a: "₹2.1Cr", aColor: INK, b: "₹2.3Cr", bColor: AMBER, pill: "warn", pillLabel: "Review" },
  { name: "Field Visit Data", sub: "SFA ↔ CRM", a: "1,247", aColor: INK, b: "1,247", bColor: INK, pill: "ok", pillLabel: "Match" },
];

const TABS = [
  {
    id: "rules",
    label: "Business Rules Engine",
    tag: "Business Rules Engine",
    title: "Your rules, encoded into the data layer.",
    desc: "Every business runs on rules — credit limits, scheme eligibility, reorder thresholds, approval hierarchies. Canyon Grid encodes every one of them so every transaction is automatically evaluated, flagged, or approved.",
    screenName: "Canyon Grid — Rules Engine",
    status: "Running",
    features: [
      { key: "rulelist", name: "Rule Library", desc: "All business rules in one place — active, inactive, and under review. Full visibility of what is running." },
      { key: "validation", name: "Data Validation Pipeline", desc: "Every incoming data point checked against defined rules before it enters the intelligence layer." },
      { key: "schedule", name: "Scheduled Rule Runs", desc: "Rules run on a schedule — nightly, weekly, or on trigger — so nothing waits for manual intervention." },
    ],
  },
  {
    id: "recon",
    label: "Reconciliation Engine",
    tag: "Reconciliation Engine",
    title: "Does your data add up? Always.",
    desc: "Automated matching across every connected system — run nightly, weekly, or monthly. Discrepancies surfaced before your next planning meeting, not after.",
    screenName: "Canyon Grid — Reconciliation",
    status: "Running",
    features: [
      { key: "reconmain", name: "Cross-System Reconciliation", desc: "SAP vs DMS, primary vs secondary, forecast vs actuals — all matched and reported automatically." },
      { key: "stockrecon", name: "Inventory Reconciliation", desc: "Every depot, every SKU — system stock versus physical count, matched and discrepancies owned." },
      { key: "salesrecon", name: "Sales and Sell-Through Match", desc: "Primary sell-in versus secondary sell-out — the number that tells you whether distributors are actually moving stock." },
    ],
  },
  {
    id: "exceptions",
    label: "Exceptions and Alerts",
    tag: "Exceptions and Alerts",
    title: "Problems surfaced before they compound.",
    desc: "Every exception routed to the right person with context, severity, and suggested action. Not a report to find things in — a task assigned to someone who can fix it.",
    screenName: "Canyon Grid — Exceptions",
    status: "Monitoring",
    features: [
      { key: "disclist", name: "Exception Queue", desc: "Every flagged issue in one view — prioritised by severity, assigned to the right owner." },
      { key: "earlywarning", name: "Early Warning Signals", desc: "Pattern recognition across historical data identifies problems forming — before they have materialised." },
      { key: "auditlog", name: "Audit Trail", desc: "Every exception raised, every alert triggered, every action taken — logged, queryable, always there." },
    ],
  },
  {
    id: "automation",
    label: "Automation Layer",
    tag: "Automation Layer",
    title: "Routine work, running itself.",
    desc: "Order approvals, exception routing, payment flagging, cycle counts — processes that currently require manual intervention, automated and running continuously so your team focuses on decisions, not administration.",
    screenName: "Canyon Grid — Automation",
    status: "Active",
    features: [
      { key: "flows", name: "Automated Flows", desc: "Every recurring process configured once, running continuously, reporting back on every execution." },
      { key: "routing", name: "Exception Routing", desc: "Every flagged item assigned to the right person automatically — with context and suggested action already attached." },
    ],
  },
];

/* ─────────────────────────────────────────────
   SCREEN RENDERERS
───────────────────────────────────────────── */

function Pipeline({ stages }: { stages: Stage[] }) {
  return (
    <div className="cg-val-pipeline">
      {stages.map((s, i) => (
        <div className="cg-vp-stage" key={i}>
          <div className="cg-vp-icon" style={{ background: SOFT[s.tone] }}>{s.icon}</div>
          <div>
            <div className="cg-vp-name">{s.name}</div>
            <div className="cg-vp-sub">{s.sub}</div>
          </div>
          <div className="cg-vp-count" style={{ color: s.countColor }}>{s.count}</div>
        </div>
      ))}
    </div>
  );
}

function RuleCards({ label, note, rules }: { label: string; note: string; rules: Rule[] }) {
  return (
    <div className="cg-screen-content">
      <div className="cg-section-title">
        {label} <span>{note}</span>
      </div>
      <div className="cg-rules-list">
        {rules.map((r, i) => (
          <div className={`cg-rule-card ${r.state}-rule`} key={i}>
            <div className="cg-rc-header">
              <div className="cg-rc-name">{r.name}</div>
              <span className={`cg-rc-badge ${r.badge}`}>{r.badgeLabel}</span>
            </div>
            <div className="cg-rc-logic">{r.logic}</div>
            <div className="cg-rc-meta">
              {r.meta.map((m, mi) => (
                <span key={mi}>{m}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ValidationView({ data }: { data: Validation }) {
  return (
    <div className="cg-screen-content">
      <div className="cg-val-breakdown">
        <div className="cg-vb-title">{data.breakdown.title}</div>
        {data.breakdown.bars.map((b, i) => (
          <div className="cg-vb-bar-row" key={i}>
            <div className="cg-vb-label">{b.label}</div>
            <div className="cg-vb-track">
              <div className="cg-vb-fill" style={{ width: `${b.pct}%`, background: b.color }} />
            </div>
            <div className="cg-vb-pct" style={{ color: b.color }}>{b.pct}%</div>
          </div>
        ))}
      </div>
      <Pipeline stages={data.pipeline} />
    </div>
  );
}

function ScheduleView({ data }: { data: ScheduleData }) {
  return (
    <div className="cg-screen-content">
      <div className="cg-sched-header">
        <span className="cg-sh-title">{data.header.title}</span>
        <span className="cg-sh-tag">{data.header.tag}</span>
      </div>
      <div className="cg-sched-list">
        {data.items.map((it, i) => (
          <div className="cg-sched-item" key={i}>
            <div className="cg-si-freq" style={{ background: SOFT[it.tone], border: `1px solid ${BORD[it.tone]}` }}>
              <div className="cg-si-freq-val" style={{ color: TONE_COLOR[it.tone] }}>{it.freqVal}</div>
              <div className="cg-si-freq-label">{it.freqLabel}</div>
            </div>
            <div>
              <div className="cg-si-name">{it.name}</div>
              <div className="cg-si-desc">{it.desc}</div>
            </div>
            <div className="cg-si-right">
              <div className="cg-si-next">{it.next}</div>
              <div className="cg-si-last">{it.last}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReconView({ data }: { data: ReconData }) {
  return (
    <div className="cg-screen-content">
      <div className="cg-recon-header">
        <span className="cg-rh-title">{data.header.title}</span>
        <span className="cg-rh-run">{data.header.run}</span>
      </div>
      {data.summary && (
        <div className="cg-recon-summary">
          {data.summary.map((s, i) => (
            <div className="cg-rs-item" key={i}>
              <div className="cg-rs-val" style={{ color: s.color }}>{s.val}</div>
              <div className="cg-rs-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}
      <div className="cg-recon-table">
        <div className="cg-rt-head">
          {data.cols.map((c, i) => (
            <div className="cg-rt-h" key={i}>{c}</div>
          ))}
        </div>
        {data.rows.map((r, i) => (
          <div className={`cg-rt-row${r.flagged ? " flagged" : ""}`} key={i}>
            <div>
              <div className="cg-rt-source">{r.source}</div>
              <div className="cg-rt-sub">{r.sub}</div>
            </div>
            <div className="cg-rt-val" style={{ color: r.aColor }}>{r.a}</div>
            <div className="cg-rt-val" style={{ color: r.bColor }}>{r.b}</div>
            <div className="cg-rt-diff" style={{ color: r.diffColor }}>{r.diff}</div>
            <div className="cg-rt-status">
              <span className={`cg-rt-pill ${r.statusKind}`}>{r.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscCardList({ cards }: { cards: DiscCard[] }) {
  return (
    <div className="cg-disc-list">
      {cards.map((c, i) => (
        <div className={`cg-disc-card ${c.sev}`} key={i}>
          <div className="cg-disc-header">
            <span className={`cg-disc-severity ${c.sev}`}>{c.sevLabel}</span>
            <span className="cg-disc-time">{c.time}</span>
          </div>
          <div className="cg-disc-title">{c.title}</div>
          <div className="cg-disc-body">{c.body}</div>
          <div className="cg-disc-meta">
            {c.sources.map((s, si) => (
              <span className="cg-disc-source" key={si}>{s}</span>
            ))}
            <span className="cg-disc-action">{c.action}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExceptionQueue() {
  return (
    <div className="cg-screen-content">
      <div className="cg-disc-filter-row">
        {EXC.disclist.filters.map((f, i) => (
          <span key={i} className={`cg-df-pill${f.active ? " active" : ""}`}>{f.label}</span>
        ))}
      </div>
      <DiscCardList cards={EXC.disclist.cards} />
    </div>
  );
}

function FlowsView() {
  return (
    <div className="cg-screen-content">
      <div className="cg-auto-stats">
        {AUTO.flows.stats.map((s, i) => (
          <div className="cg-auto-stat" key={i}>
            <div className="cg-as-val" style={{ color: s.color }}>{s.val}</div>
            <div className="cg-as-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="cg-auto-flows">
        {AUTO.flows.cards.map((c, i) => (
          <div className="cg-flow-card" key={i} style={c.faded ? { opacity: 0.6 } : undefined}>
            <div className="cg-fc-icon" style={{ background: SOFT[c.tone] }}>{c.icon}</div>
            <div className="cg-fc-body">
              <div className="cg-fc-name">{c.name}</div>
              <div className="cg-fc-desc">{c.desc}</div>
            </div>
            <div className="cg-fc-right">
              <div className="cg-fc-runs" style={c.runsColor ? { color: c.runsColor } : undefined}>{c.runs}</div>
              <div className="cg-fc-last">{c.last}</div>
            </div>
            <div className={`cg-fc-toggle${c.on ? "" : " off"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenBody({ tab, feature }: { tab: string; feature: string }) {
  if (tab === "rules") {
    if (feature === "validation") return <ValidationView data={RULES.validation} />;
    if (feature === "schedule") return <ScheduleView data={RULES.schedule} />;
    return <RuleCards label="Active Rules" note="18 running" rules={RULES.rulelist} />;
  }
  if (tab === "recon") return <ReconView data={RECON[feature]} />;
  if (tab === "exceptions") {
    if (feature === "earlywarning")
      return (
        <div className="cg-screen-content">
          <div className="cg-section-title">
            {EXC.earlywarning.label} <span>{EXC.earlywarning.note}</span>
          </div>
          <DiscCardList cards={EXC.earlywarning.cards} />
        </div>
      );
    if (feature === "auditlog")
      return (
        <div className="cg-screen-content">
          <div className="cg-section-title">
            {EXC.auditlog.label} <span>{EXC.auditlog.note}</span>
          </div>
          <Pipeline stages={EXC.auditlog.stages} />
        </div>
      );
    return <ExceptionQueue />;
  }
  if (feature === "routing") return <RuleCards label="Exception Routing Rules" note="Auto-assigned" rules={AUTO.routing} />;
  return <FlowsView />;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export function CanyonGridExperience() {
  const [tab, setTab] = useState("rules");
  const [feature, setFeature] = useState<Record<string, string>>({
    rules: "rulelist",
    recon: "reconmain",
    exceptions: "disclist",
    automation: "flows",
  });

  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];
  const activeFeature = feature[tab];

  return (
    <div className="cg">
      {/* HERO */}
      <section className="cg-hero">
        <div className="container cg-hero-grid">
          <div className="cg-hero-copy">
            <p className="section-label">Canyon Grid</p>
            <h1 className="cg-hero-h1">
              Raw data,
              <br />
              given <span>business meaning.</span>
            </h1>
            <p className="cg-hero-lead">
              The layer between your data and your decisions. Every data point structured around your rules, your
              language, and your operations — reconciled, validated, and ready to act on.
            </p>
            <div className="cg-hero-actions">
              <Link className="btn primary" href="/contact#book-demo">
                Book a Discovery Workshop
              </Link>
              <a className="btn secondary" href="#cg-products">
                See Canyon Grid
              </a>
            </div>
          </div>
          <div className="cg-hero-visual">
            <div className="cg-mini-shell">
              <div className="cg-mini-bar">
                <div className="cg-mini-dots">
                  <div className="cg-mini-dot" style={{ background: "#E05252", opacity: 0.7 }} />
                  <div className="cg-mini-dot" style={{ background: "#F5A623", opacity: 0.5 }} />
                  <div className="cg-mini-dot" style={{ background: "#2AC46B", opacity: 0.5 }} />
                </div>
                <span className="cg-mini-title">Canyon Grid — Reconciliation Engine</span>
              </div>
              <div className="cg-mini-body">
                <div className="cg-mini-summary">
                  <div className="cg-ms-item"><div className="cg-ms-val" style={{ color: GREEN }}>94.2%</div><div className="cg-ms-label">Match Rate</div></div>
                  <div className="cg-ms-item"><div className="cg-ms-val" style={{ color: RED }}>7</div><div className="cg-ms-label">Flagged</div></div>
                  <div className="cg-ms-item"><div className="cg-ms-val" style={{ color: AMBER }}>3</div><div className="cg-ms-label">In Review</div></div>
                  <div className="cg-ms-item"><div className="cg-ms-val" style={{ color: INK }}>1,847</div><div className="cg-ms-label">Validated</div></div>
                </div>
                <div className="cg-mini-recon">
                  <div className="cg-mr-head">
                    <div className="cg-mr-h">Source</div>
                    <div className="cg-mr-h">System A</div>
                    <div className="cg-mr-h">System B</div>
                    <div className="cg-mr-h">Status</div>
                  </div>
                  {MINI_ROWS.map((r, i) => (
                    <div className="cg-mr-row" key={i}>
                      <div>
                        <div className="cg-mr-name">{r.name}</div>
                        <div className="cg-mr-sub">{r.sub}</div>
                      </div>
                      <div className="cg-mr-val" style={{ color: r.aColor }}>{r.a}</div>
                      <div className="cg-mr-val" style={{ color: r.bColor }}>{r.b}</div>
                      <div>
                        <span className={`cg-mr-pill ${r.pill}`}>{r.pillLabel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="cg-tab-section" id="cg-products">
        <div className="container">
          <div className="cg-tab-header" role="tablist" aria-label="Canyon Grid capabilities">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`cg-tab-btn${tab === t.id ? " active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="cg-product-panel">
            <div className="cg-product-layout">
              <div className="cg-product-copy">
                <p className="section-label">{activeTab.tag}</p>
                <h2 className="cg-product-title">{activeTab.title}</h2>
                <p className="cg-product-desc">{activeTab.desc}</p>
                <div className="cg-feature-list">
                  {activeTab.features.map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      className={`cg-feature-item${activeFeature === f.key ? " active-feature" : ""}`}
                      onClick={() => setFeature((s) => ({ ...s, [tab]: f.key }))}
                    >
                      <span className="cg-fi-dot" />
                      <span className="cg-fi-text">
                        <span className="cg-fi-name">{f.name}</span>
                        <span className="cg-fi-desc">{f.desc}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cg-product-screen">
                <div className="cg-screen-shell">
                  <div className="cg-screen-bar">
                    <div className="cg-screen-dots">
                      <div className="cg-screen-dot" style={{ background: "#E05252", opacity: 0.7 }} />
                      <div className="cg-screen-dot" style={{ background: "#F5A623", opacity: 0.5 }} />
                      <div className="cg-screen-dot" style={{ background: "#2AC46B", opacity: 0.5 }} />
                    </div>
                    <span className="cg-screen-name">{activeTab.screenName}</span>
                    <span className="cg-screen-status">{activeTab.status}</span>
                  </div>
                  <div className="cg-screen-view">
                    <ScreenBody tab={tab} feature={activeFeature} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTS */}
      <section className="cg-connects">
        <div className="container">
          <div className="cg-connects-head">
            <p className="section-label cg-connects-tag">The Middle Layer</p>
            <h2 className="cg-connects-title">Data in. Intelligence out.</h2>
            <p className="cg-connects-body">
              Canyon Grid sits between what your systems capture and what your leadership acts on — giving every data
              point the business context it needs before it becomes a decision.
            </p>
          </div>
          <div className="cg-flow">
            <div className="cg-flow-block">
              <span className="cg-flow-badge sys">Canyon Systems</span>
              <div className="cg-flow-name">Capture</div>
              <div className="cg-flow-sub">SFA and CRM capture every transaction and interaction in real time</div>
            </div>
            <div className="cg-flow-arrow" aria-hidden="true">→</div>
            <div className="cg-flow-block highlight">
              <span className="cg-flow-badge grid">Canyon Grid</span>
              <div className="cg-flow-name">Contextualise</div>
              <div className="cg-flow-sub">
                Every data point validated, reconciled, and given the business meaning specific to your organisation
              </div>
            </div>
            <div className="cg-flow-arrow" aria-hidden="true">→</div>
            <div className="cg-flow-block">
              <span className="cg-flow-badge edge">Canyon Edge</span>
              <div className="cg-flow-name">Act</div>
              <div className="cg-flow-sub">Live intelligence, nudges, and instant answers — built on data you can trust</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cg-cta">
        <div className="container">
          <h2 className="cg-cta-title">Ready to trust your data?</h2>
          <p className="cg-cta-body">
            Every engagement starts with a Discovery Workshop — where we map your data sources, identify where
            discrepancies are forming, and define what Canyon Grid reconciles first.
          </p>
          <div className="cg-cta-actions">
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
