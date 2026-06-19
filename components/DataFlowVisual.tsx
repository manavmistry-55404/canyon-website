import "./DataFlowVisual.css";

export function DataFlowVisual() {
  const leftNodes = ["ERP", "CRM", "Ops", "Finance", "Supply"];
  const rightNodes = ["Alert", "Owner", "Action", "KPI"];

  return (
    <div className="data-visual" aria-hidden="true" data-parallax="24">
      <div className="flow-column scattered">
        {leftNodes.map((node, index) => (
          <span className="flow-node" style={{ "--i": index } as React.CSSProperties} key={node}>
            {node}
          </span>
        ))}
      </div>

      <div className="intelligence-layer">
        <div className="layer-ring outer" />
        <div className="layer-ring middle" />
        <div className="layer-core">
          <strong>Unified</strong>
          <span>Business Context</span>
        </div>
      </div>

      <div className="flow-column action">
        {rightNodes.map((node, index) => (
          <span className="flow-node action-node" style={{ "--i": index } as React.CSSProperties} key={node}>
            {node}
          </span>
        ))}
      </div>

      <svg className="flow-lines" viewBox="0 0 900 520" role="presentation">
        <path d="M122 110 C260 118 302 185 418 214" />
        <path d="M110 220 C246 220 292 232 416 252" />
        <path d="M126 330 C262 314 302 288 420 278" />
        <path d="M490 224 C592 172 650 116 774 116" />
        <path d="M498 258 C606 252 668 236 786 230" />
        <path d="M492 292 C608 332 662 378 782 382" />
      </svg>
    </div>
  );
}
