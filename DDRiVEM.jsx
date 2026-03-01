import { useState, useEffect, useRef } from "react";

/* ============================================================
   DDRiVE-M  |  AI-Powered Disaster Resilience Platform
   © ASilva Innovations  |  https://asilvainnovations.com
   ============================================================ */

const LOGO = "https://appimize.app/assets/apps/user_1097/images/b4e60d94a143_503_1097.png";

// ─── ICON SYSTEM ─────────────────────────────────────────────
const PATHS = {
  shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  radar:"M12 2a10 10 0 100 20A10 10 0 0012 2zM12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0M12 12l7-7",
  activity:"M22 12h-4l-3 9L9 3l-3 9H2",
  alert:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01",
  check:"M20 6L9 17l-5-5",
  layers:"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  zap:"M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  home:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10",
  users:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  bell:"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  file:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  download:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
  plus:"M12 5v14M5 12h14",
  trash:"M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6",
  info:"M12 2a10 10 0 100 20A10 10 0 0012 2zM12 16v-4M12 8h.01",
  x:"M18 6L6 18M6 6l12 12",
  external:"M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3",
  sim:"M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  trophy:"M8 21h8M12 17v4M5 3H3v4a4 4 0 004 4h10a4 4 0 004-4V3h-2M5 3h14",
  wind:"M9.59 4.59A2 2 0 1111 8H2M17.59 11.59A2 2 0 1119 15H2M14.83 16.83A2 2 0 1116 20H2",
  drop:"M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z",
  map:"M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16",
  play:"M5 3l14 9-14 9V3z",
  chat:"M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  edit:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  question:"M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01",
  globe:"M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  book:"M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 004 22h16V2H6.5A2.5 2.5 0 004 4.5v15z",
};
const I = ({ n, s = 18, c = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={PATHS[n]} />
  </svg>
);

// ─── MODULE TUTORIALS ────────────────────────────────────────
const TUTORIALS = {
  dashboard: {
    title: "Dashboard — Mission Control",
    steps: [
      "The top alert banner shows active hazard warnings from PAGASA/PHIVOLCS. Click VIEW to jump to Detection.",
      "The 4 stat cards show real-time KPIs: active LGUs, compliance rate, alerts, and average risk score.",
      "The 7-Phase Cycle buttons navigate directly to each module. Click any phase number to open it.",
      "Live Hazard Feed streams multi-agency alerts with intensity bars. Pulse animation = active warning.",
      "LGU Compliance Overview shows all monitored LGUs ranked by compliance percentage.",
    ],
  },
  detection: {
    title: "Phase 1 — Detection",
    steps: [
      "The radar sweep shows real-time meteorological data. Blips indicate active hazard events by location.",
      "Wind speed, rainfall (mm), and seismic magnitude are displayed as live telemetry metrics.",
      "Agency API status panel shows PHIVOLCS, PAGASA, NOAH, and MGB connectivity and feed counts.",
      "Hazard alerts are color-coded: RED = Warning, AMBER = Watch, BLUE = Advisory.",
      "Intensity bars show the hazard power percentage. WARNING-level events pulse in red.",
    ],
  },
  diagnosis: {
    title: "Phase 2 — Diagnosis",
    steps: [
      "The Risk Register lists ISO 31000 risk categories. Click any row to expand details.",
      "Use '+ ADD RISK' to manually enter risks, vulnerabilities, or hazards not auto-detected by sensors.",
      "Set Category, Severity (1-10), and Likelihood (1-5) for each custom risk entry.",
      "The Risk Matrix (5×5 grid) shows combined impact × likelihood scores. Red = High, Green = Low.",
      "AI Diagnosis button sends your risk register to Claude AI for a compliance narrative report.",
    ],
  },
  response: {
    title: "Phase 3 — Response",
    steps: [
      "Four control categories align with OCD protocols: Preventive, Detective, Corrective, Directive.",
      "Click ACTIVATE on any control to log its activation in the system audit trail.",
      "Each activated control is timestamped and linked to the triggering hazard event.",
      "Use the filter bar to find controls relevant to a specific hazard type (typhoon, earthquake, flood).",
      "The control count badge shows how many controls are currently active in each category.",
    ],
  },
  integration: {
    title: "Phase 4 — Integration",
    steps: [
      "The 10 Essentials scorecard maps your LGU against the UNDRR MCR2030 framework.",
      "Each Essential score is auto-calculated from your Detection, Diagnosis, and Response data.",
      "Click USE on any DRRM template to open a pre-filled document based on your LGU profile.",
      "The Overall MCR2030 Score compares your LGU against the national average of 74.3%.",
      "Scores below 70% trigger automatic recommendations and compliance alerts.",
    ],
  },
  validation: {
    title: "Phase 5 — Validation",
    steps: [
      "Configure a simulation by setting the scenario type, population, duration, and resource level.",
      "Click RUN SIMULATION to run a gap analysis against your current DRRM plans.",
      "After simulation, review the A–F performance grades across 5 critical KPI areas.",
      "Click SIMULATE ICS to launch the full Incident Command System simulator (external).",
      "Use simulation results to identify gaps and feed them back into Phase 6 Enhancement.",
    ],
  },
  enhancement: {
    title: "Phase 6 — Enhancement",
    steps: [
      "Click ⚡ AI GEN next to any document to have DDRiVER AI generate a RA 10121-compliant template.",
      "Generated documents can be copied, exported, or sent directly to the Command Center.",
      "Click 'Gawad Kalasag Simulator' to assess your LGU's Gawad Kalasag award eligibility.",
      "Document status: READY = AI-generated; DRAFT = awaiting review and approval.",
      "All generated documents are auto-tagged with the current LGU, date, and applicable legal framework.",
    ],
  },
  monitoring: {
    title: "Phase 7 — Command Center",
    steps: [
      "Command Chat is a real-time multi-agency messaging hub. Press Enter or → to send messages.",
      "SMS Mass Alert allows bulk messaging to thousands of residents across selected barangays.",
      "Video Conferencing connects all DRRM stakeholders. Click START CALL to launch a session.",
      "DDRiVE-M PSCP and NDP are specialized versions of this platform for specific frameworks.",
      "All shared documents are version-controlled and downloadable with a single click.",
    ],
  },
  lgus: {
    title: "LGU Registry",
    steps: [
      "Search by LGU name or province to filter the registry table in real time.",
      "Status dots: Green = Active, Amber = Warning, Red = Alert/Non-compliant.",
      "Click VIEW to open a full LGU profile with all 7-phase scores and historical trends.",
      "Click EDIT to update LGU details, contacts, and assigned LDRRMO officers.",
      "Click + ADD LGU to onboard a new Local Government Unit into the platform.",
    ],
  },
};

// ─── RISK SEVERITY COLORS ────────────────────────────────────
const riskColor = (v) => v >= 8 ? "#ef4444" : v >= 6 ? "#f97316" : v >= 4 ? "#eab308" : "#22c55e";
const levelLabel = (v) => v >= 8 ? "Critical" : v >= 6 ? "High" : v >= 4 ? "Medium" : "Low";

// ─── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const [mod, setMod] = useState("dashboard");
  const [alertCount, setAlertCount] = useState(3);
  const [time, setTime] = useState(new Date());
  const [chat, setChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", text: "Magandang araw! I am DDRiVER, your AI Disaster Resilience Expert. I am trained on RA 10121, ISO 31000, UNDRR MCR2030, and DILG standards. How can I assist your LGU today?" },
  ]);
  const [tutorial, setTutorial] = useState(null);
  const [tutStep, setTutStep] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const chatBottom = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    chatBottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const openTutorial = () => { setTutorial(mod); setTutStep(0); };

  const sendChat = async () => {
    const msg = chatInput.trim();
    if (!msg || isStreaming) return;
    setChatInput("");
    setChatHistory(h => [...h, { role: "user", text: msg }]);
    setIsStreaming(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are DDRiVER, the AI Disaster Resilience Expert embedded in the DDRiVE-M platform by ASilva Innovations. You are a specialist in: Philippine DRRM (RA 10121), ISO 31000 risk management, UNDRR MCR2030 Making Cities Resilient 10 Essentials, DILG MC 2020-161, Gawad Kalasag award assessment, ICS (Incident Command System), DANA (Damage and Needs Assessment), DRRM Plans, Contingency Plans, PSCP, and BCP. Respond concisely and authoritatively. Use Filipino/English mix when appropriate. Always cite specific law sections or standards when relevant.`,
          messages: chatHistory.filter(m => m.role !== "system").concat({ role: "user", content: msg }).map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.map(c => c.text || "").join("") || "Sandali lang po. Nagpo-process ang AI...";
      setChatHistory(h => [...h, { role: "ai", text: reply }]);
    } catch {
      setChatHistory(h => [...h, { role: "ai", text: "Hindi ma-connect sa AI backend. Pakitingnan ang inyong koneksyon." }]);
    }
    setIsStreaming(false);
  };

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: "home" },
    { id: "detection", label: "Phase 1 · Detection", icon: "radar" },
    { id: "diagnosis", label: "Phase 2 · Diagnosis", icon: "activity" },
    { id: "response", label: "Phase 3 · Response", icon: "shield" },
    { id: "integration", label: "Phase 4 · Integration", icon: "layers" },
    { id: "validation", label: "Phase 5 · Validation", icon: "check" },
    { id: "enhancement", label: "Phase 6 · Enhancement", icon: "zap" },
    { id: "monitoring", label: "Phase 7 · Command Center", icon: "eye" },
    { id: "lgus", label: "LGU Registry", icon: "users" },
  ];

  const moduleProps = { openTutorial };

  return (
    <div style={{ fontFamily:"'IBM Plex Mono','Courier New',monospace", background:"#05090f", color:"#ffffff", minHeight:"100vh", display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#0a1520;}::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:2px;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.25}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @keyframes slideRight{from{transform:translateX(100%);opacity:0}to{transform:none;opacity:1}}
        @keyframes scanline{0%{background-position:0 0}100%{background-position:0 100%}}
        .pulse{animation:pulse 2s infinite;}
        .spin{animation:spin 1s linear infinite;}
        .fade-up{animation:fadeUp 0.4s ease forwards;}
        .slide-right{animation:slideRight 0.3s ease forwards;}
        .nav-item{width:100%;display:flex;align-items:center;gap:10px;padding:10px 14px;background:transparent;border:none;border-left:3px solid transparent;color:#5a8aab;font-size:10px;cursor:pointer;text-align:left;letter-spacing:0.5px;font-family:inherit;transition:all 0.2s;}
        .nav-item:hover{background:rgba(0,212,255,0.07);color:#ffffff;border-left-color:#00d4ff55;}
        .nav-item.active{background:rgba(0,212,255,0.12);color:#00d4ff;border-left-color:#00d4ff;}
        .card{background:#0d1a26;border:1px solid #1a3352;border-radius:4px;}
        .card:hover{border-color:#00d4ff33;}
        .btn{border:none;padding:8px 18px;font-family:inherit;font-size:11px;font-weight:700;letter-spacing:1px;cursor:pointer;border-radius:3px;transition:all 0.2s;text-transform:uppercase;display:inline-flex;align-items:center;gap:6px;}
        .btn-primary{background:#00d4ff;color:#05090f;}
        .btn-primary:hover{background:#00b8d9;transform:translateY(-1px);}
        .btn-danger{background:#ef4444;color:#fff;}
        .btn-danger:hover{background:#dc2626;}
        .btn-ghost{background:transparent;color:#00d4ff;border:1px solid #00d4ff44;}
        .btn-ghost:hover{background:rgba(0,212,255,0.1);border-color:#00d4ff;}
        .btn-green{background:#10b981;color:#fff;}
        .btn-green:hover{background:#059669;}
        .btn-amber{background:#f59e0b;color:#05090f;}
        .btn-amber:hover{background:#d97706;}
        .btn-purple{background:#a855f7;color:#fff;}
        .btn-purple:hover{background:#9333ea;}
        .input{background:#0a1520;border:1px solid #1e3a5f;color:#ffffff;padding:9px 12px;font-family:inherit;font-size:12px;border-radius:3px;outline:none;width:100%;}
        .input:focus{border-color:#00d4ff66;}
        .input::placeholder{color:#4a7a9b;}
        select.input option{background:#0d1a26;color:#ffffff;}
        .tag{display:inline-flex;align-items:center;padding:2px 8px;border-radius:2px;font-size:10px;letter-spacing:0.8px;font-weight:700;}
        .progress{background:#0a1520;border-radius:2px;height:5px;overflow:hidden;}
        .progress-fill{height:100%;border-radius:2px;transition:width 0.8s ease;}
        .scanline{background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,212,255,0.012) 2px,rgba(0,212,255,0.012) 4px);}
        table{width:100%;border-collapse:collapse;}
        th{font-size:9px;color:#4a7a9b;letter-spacing:1.5px;padding:8px 10px;text-align:left;border-bottom:1px solid #1a3352;}
        td{font-size:11px;color:#ffffff;padding:10px;border-bottom:1px solid #0d1520;}
        tr:hover td{background:rgba(0,212,255,0.03);}
        .logo-circle{width:36px;height:36px;border-radius:50%;overflow:hidden;background:transparent;display:flex;align-items:center;justify-content:center;border:2px solid #00d4ff55;flex-shrink:0;}
        .logo-circle img{width:100%;height:100%;object-fit:cover;mix-blend-mode:screen;filter:brightness(1.2) contrast(1.1);}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:2000;display:flex;align-items:center;justify-content:center;}
        .risk-critical{color:#ef4444;} .risk-high{color:#f97316;} .risk-medium{color:#eab308;} .risk-low{color:#22c55e;}
      `}</style>

      {/* ── TOP BAR ── */}
      <header style={{ background:"#06090f", borderBottom:"1px solid #1a3352", height:54, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", flexShrink:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div className="logo-circle" style={{ width:40, height:40, borderColor:"#00d4ff88" }}>
            <img src={LOGO} alt="DDRiVE-M" />
          </div>
          <div>
            <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:14, fontWeight:900, color:"#00d4ff", letterSpacing:4 }}>DDRiVE-M</div>
            <div style={{ fontSize:8, color:"#4a7a9b", letterSpacing:1.5 }}>AI DISASTER RESILIENCE PLATFORM · ASILVA INNOVATIONS</div>
          </div>
        </div>

        <div style={{ display:"flex", gap:8 }}>
          {["RA 10121","ISO 31000","UNDRR MCR2030","DILG MC 2020-161"].map(t => (
            <span key={t} className="tag" style={{ background:"rgba(0,212,255,0.08)", color:"#00d4ff", border:"1px solid #00d4ff22", fontSize:9 }}>{t}</span>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:13, color:"#00d4ff" }}>{time.toLocaleTimeString("en-PH")}</div>
            <div style={{ fontSize:9, color:"#4a7a9b" }}>PHILIPPINE STANDARD TIME</div>
          </div>
          <button onClick={() => setAlertCount(0)} style={{ background:"none", border:"none", cursor:"pointer", position:"relative", padding:4 }}>
            <I n="bell" s={20} c={alertCount > 0 ? "#ef4444" : "#4a7a9b"} />
            {alertCount > 0 && <span className="pulse" style={{ position:"absolute", top:0, right:0, background:"#ef4444", color:"#fff", borderRadius:"50%", width:14, height:14, fontSize:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{alertCount}</span>}
          </button>
        </div>
      </header>

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        {/* ── SIDEBAR ── */}
        <nav style={{ width:210, background:"#06090f", borderRight:"1px solid #1a3352", display:"flex", flexDirection:"column", flexShrink:0, overflowY:"auto" }}>
          <div style={{ padding:"8px 0", borderBottom:"1px solid #1a3352" }}>
            <div style={{ fontSize:8, color:"#2a5a7b", letterSpacing:2, padding:"6px 14px 4px" }}>NAVIGATION</div>
            {nav.map(n => (
              <button key={n.id} className={`nav-item${mod === n.id ? " active" : ""}`} onClick={() => setMod(n.id)}>
                <I n={n.icon} s={13} c="currentColor" />
                {n.label}
              </button>
            ))}
          </div>

          <div style={{ padding:"10px 0", borderBottom:"1px solid #1a3352" }}>
            <div style={{ fontSize:8, color:"#2a5a7b", letterSpacing:2, padding:"4px 14px 6px" }}>API FEEDS</div>
            {[["PHIVOLCS","Seismic",true],["PAGASA","Weather",true],["NOAH","Flood",true],["SMS Gateway","Alerts",false]].map(([n,t,ok]) => (
              <div key={n} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"4px 14px" }}>
                <div>
                  <div style={{ fontSize:10, color:"#ffffff" }}>{n}</div>
                  <div style={{ fontSize:8, color:"#4a7a9b" }}>{t}</div>
                </div>
                <div className={ok ? "" : "pulse"} style={{ width:7, height:7, borderRadius:"50%", background:ok ? "#10b981" : "#f59e0b" }} />
              </div>
            ))}
          </div>

          <div style={{ marginTop:"auto", padding:12, borderTop:"1px solid #1a3352", display:"flex", flexDirection:"column", gap:8 }}>
            <button className="btn btn-primary" style={{ width:"100%", justifyContent:"center" }} onClick={() => setChat(true)}>
              <div className="logo-circle" style={{ width:18, height:18, border:"1px solid #00d4ff33" }}><img src={LOGO} alt="" /></div>
              DDRiVER AI
            </button>
            <button className="btn btn-ghost" style={{ width:"100%", justifyContent:"center", fontSize:10 }} onClick={openTutorial}>
              <I n="book" s={12} c="currentColor" /> Tutorial
            </button>
          </div>
        </nav>

        {/* ── MAIN ── */}
        <main className="scanline" style={{ flex:1, overflowY:"auto", position:"relative" }}>
          {mod === "dashboard" && <Dashboard setMod={setMod} {...moduleProps} />}
          {mod === "detection" && <Detection {...moduleProps} />}
          {mod === "diagnosis" && <Diagnosis {...moduleProps} />}
          {mod === "response" && <Response {...moduleProps} />}
          {mod === "integration" && <Integration {...moduleProps} />}
          {mod === "validation" && <Validation {...moduleProps} />}
          {mod === "enhancement" && <Enhancement {...moduleProps} />}
          {mod === "monitoring" && <Monitoring {...moduleProps} />}
          {mod === "lgus" && <LGURegistry {...moduleProps} />}
        </main>
      </div>

      {/* ── DDRIVER CHAT ── */}
      {chat && (
        <div className="slide-right" style={{ position:"fixed", right:20, bottom:20, width:400, height:560, background:"#0d1a26", border:"1px solid #00d4ff44", borderRadius:8, display:"flex", flexDirection:"column", zIndex:1000, boxShadow:"0 0 60px rgba(0,212,255,0.12)" }}>
          <div style={{ padding:"12px 16px", borderBottom:"1px solid #1a3352", display:"flex", alignItems:"center", gap:10 }}>
            <div className="logo-circle" style={{ width:34, height:34, border:"2px solid #00d4ff66", background:"#0a1520" }}>
              <img src={LOGO} alt="DDRiVER" />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#00d4ff", letterSpacing:1 }}>DDRiVER</div>
              <div style={{ fontSize:9, color:"#4a7a9b" }}>AI DRRM EXPERT · ONLINE</div>
            </div>
            <span className="pulse" style={{ width:8, height:8, borderRadius:"50%", background:"#10b981" }} />
            <button onClick={() => setChat(false)} style={{ background:"none", border:"none", color:"#4a7a9b", cursor:"pointer" }}><I n="x" s={16} c="currentColor" /></button>
          </div>
          <div style={{ flex:1, overflow:"auto", padding:14, display:"flex", flexDirection:"column", gap:10 }}>
            {chatHistory.map((m, i) => (
              <div key={i} style={{ display:"flex", gap:8, flexDirection:m.role === "user" ? "row-reverse" : "row" }}>
                {m.role === "ai" && (
                  <div className="logo-circle" style={{ width:26, height:26, border:"1px solid #00d4ff44", flexShrink:0, alignSelf:"flex-end" }}>
                    <img src={LOGO} alt="" />
                  </div>
                )}
                <div style={{ maxWidth:"82%", padding:"9px 12px", borderRadius:4, fontSize:11, lineHeight:1.7,
                  background:m.role === "user" ? "rgba(0,212,255,0.12)" : "#0a1520",
                  border:`1px solid ${m.role === "user" ? "#00d4ff33" : "#1a3352"}`,
                  color:"#ffffff" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {isStreaming && (
              <div style={{ display:"flex", gap:8 }}>
                <div className="logo-circle" style={{ width:26, height:26, border:"1px solid #00d4ff44" }}><img src={LOGO} alt="" /></div>
                <div style={{ padding:"9px 12px", background:"#0a1520", border:"1px solid #1a3352", borderRadius:4, fontSize:11, color:"#4a7a9b" }}>
                  <span className="pulse">DDRiVER is thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatBottom} />
          </div>
          <div style={{ padding:"10px 14px", borderTop:"1px solid #1a3352", display:"flex", gap:8 }}>
            <input className="input" placeholder="Ask DDRiVER about DRRM, RA 10121, risk..." value={chatInput}
              onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} style={{ fontSize:11 }} />
            <button className="btn btn-primary" onClick={sendChat} disabled={isStreaming} style={{ padding:"8px 14px" }}>→</button>
          </div>
        </div>
      )}

      {/* ── TUTORIAL MODAL ── */}
      {tutorial && (
        <div className="modal-overlay">
          <div className="fade-up" style={{ background:"#0d1a26", border:"1px solid #00d4ff44", borderRadius:8, width:520, padding:28, boxShadow:"0 0 80px rgba(0,212,255,0.15)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div className="logo-circle" style={{ width:40, height:40, border:"2px solid #00d4ff66" }}><img src={LOGO} alt="" /></div>
              <div>
                <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:13, fontWeight:700, color:"#00d4ff", letterSpacing:2 }}>TUTORIAL</div>
                <div style={{ fontSize:12, color:"#ffffff", marginTop:2 }}>{TUTORIALS[tutorial]?.title}</div>
              </div>
              <button onClick={() => setTutorial(null)} style={{ marginLeft:"auto", background:"none", border:"none", color:"#4a7a9b", cursor:"pointer" }}><I n="x" s={18} c="currentColor" /></button>
            </div>
            <div style={{ background:"#0a1520", borderRadius:4, border:"1px solid #1a3352", padding:18, marginBottom:20, minHeight:80 }}>
              <div style={{ fontSize:10, color:"#4a7a9b", letterSpacing:1, marginBottom:8 }}>STEP {tutStep + 1} OF {TUTORIALS[tutorial]?.steps.length}</div>
              <div style={{ fontSize:13, color:"#ffffff", lineHeight:1.8 }}>
                {TUTORIALS[tutorial]?.steps[tutStep]}
              </div>
            </div>
            <div className="progress" style={{ marginBottom:16 }}>
              <div className="progress-fill" style={{ width:`${((tutStep + 1) / TUTORIALS[tutorial]?.steps.length) * 100}%`, background:"#00d4ff" }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <button className="btn btn-ghost" onClick={() => tutStep > 0 && setTutStep(s => s - 1)} style={{ opacity:tutStep === 0 ? 0.3 : 1 }}>← PREV</button>
              <div style={{ display:"flex", gap:6 }}>
                {TUTORIALS[tutorial]?.steps.map((_, i) => (
                  <div key={i} onClick={() => setTutStep(i)} style={{ width:8, height:8, borderRadius:"50%", background:i === tutStep ? "#00d4ff" : "#1a3352", cursor:"pointer" }} />
                ))}
              </div>
              {tutStep < TUTORIALS[tutorial]?.steps.length - 1
                ? <button className="btn btn-primary" onClick={() => setTutStep(s => s + 1)}>NEXT →</button>
                : <button className="btn btn-green" onClick={() => setTutorial(null)}>DONE ✓</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SHARED HEADER ────────────────────────────────────────────
function ModHdr({ phase, title, subtitle, color, openTutorial, children }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:22 }}>
      <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
        {phase && <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:32, fontWeight:900, color:`${color}33`, lineHeight:1, marginTop:2 }}>{phase}</div>}
        <div style={{ borderLeft:`3px solid ${color}`, paddingLeft:12 }}>
          <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:16, fontWeight:700, color:"#ffffff", letterSpacing:2 }}>{title}</div>
          <div style={{ fontSize:10, color:"#8aaabf", marginTop:3, maxWidth:520 }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:8, flexShrink:0 }}>
        {children}
        <button className="btn btn-ghost" onClick={openTutorial} style={{ fontSize:10, padding:"7px 12px" }}>
          <I n="question" s={12} c="currentColor" /> GUIDE
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════════════════
function Dashboard({ setMod, openTutorial }) {
  const phases = [
    { id:"detection", n:1, label:"Detection", icon:"radar", c:"#00d4ff" },
    { id:"diagnosis", n:2, label:"Diagnosis", icon:"activity", c:"#f97316" },
    { id:"response", n:3, label:"Response", icon:"shield", c:"#ef4444" },
    { id:"integration", n:4, label:"Integration", icon:"layers", c:"#a855f7" },
    { id:"validation", n:5, label:"Validation", icon:"check", c:"#10b981" },
    { id:"enhancement", n:6, label:"Enhancement", icon:"zap", c:"#f59e0b" },
    { id:"monitoring", n:7, label:"Monitoring", icon:"eye", c:"#06b6d4" },
  ];
  const stats = [
    { label:"Active LGUs", v:"120+", sub:"+8 this month", c:"#00d4ff", icon:"users" },
    { label:"Compliance Rate", v:"98%", sub:"ISO 31000 avg", c:"#10b981", icon:"check" },
    { label:"Active Alerts", v:"3", sub:"2 critical", c:"#ef4444", icon:"alert" },
    { label:"Avg Risk Score", v:"4.2", sub:"↓ from 5.1", c:"#f59e0b", icon:"activity" },
  ];
  return (
    <div className="fade-up" style={{ padding:24 }}>
      <ModHdr title="MISSION CONTROL" subtitle="DDRiVE-M Intelligence Resilience Dashboard — Philippine LGU Operations Center" color="#00d4ff" openTutorial={openTutorial} />
      <div style={{ background:"rgba(239,68,68,0.07)", border:"1px solid #ef444433", borderRadius:4, padding:"11px 16px", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
        <div className="pulse" style={{ width:8, height:8, borderRadius:"50%", background:"#ef4444", flexShrink:0 }} />
        <span style={{ fontSize:11, color:"#fca5a5" }}>⚠ ACTIVE ALERT: Typhoon MAWAR — Warning Signal #2 affecting 12 LGUs in Region V. PAGASA updated 14 min ago.</span>
        <button className="btn btn-ghost" style={{ marginLeft:"auto", fontSize:10, flexShrink:0, borderColor:"#ef444444", color:"#fca5a5" }} onClick={() => setMod("detection")}>VIEW →</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:20 }}>
        {stats.map(s => (
          <div key={s.label} className="card" style={{ padding:18 }}>
            <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:1.5, marginBottom:6 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:26, fontWeight:700, color:s.c }}>{s.v}</div>
            <div style={{ fontSize:10, color:"#5a8aab", marginTop:4 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:12 }}>7-PHASE INTELLIGENCE RESILIENCE CYCLE</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:10 }}>
          {phases.map(p => (
            <button key={p.id} onClick={() => setMod(p.id)} style={{ background:"#0d1a26", border:`1px solid ${p.c}33`, borderRadius:4, padding:"14px 8px", cursor:"pointer", textAlign:"center", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=p.c; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=`${p.c}33`; e.currentTarget.style.transform="none"; }}>
              <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:20, fontWeight:900, color:p.c, marginBottom:6 }}>{p.n}</div>
              <div style={{ width:28, height:28, borderRadius:"50%", background:`${p.c}15`, border:`1px solid ${p.c}33`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px" }}>
                <I n={p.icon} s={12} c={p.c} />
              </div>
              <div style={{ fontSize:9, color:"#ffffff", fontWeight:600, letterSpacing:0.5 }}>{p.label}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:12 }}>LIVE HAZARD FEED</div>
          {[
            { name:"Typhoon MAWAR", agency:"PAGASA", lvl:"WARNING", pct:85, c:"#ef4444" },
            { name:"Seismic M4.2 — Batangas", agency:"PHIVOLCS", lvl:"WATCH", pct:42, c:"#f59e0b" },
            { name:"Flood Risk — Zone A", agency:"NOAH", lvl:"ADVISORY", pct:67, c:"#06b6d4" },
            { name:"Landslide Potential — CAR", agency:"MGB", lvl:"ADVISORY", pct:55, c:"#a855f7" },
          ].map((h, i, arr) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:i<arr.length-1?"1px solid #0d1520":"none" }}>
              <div className={h.lvl==="WARNING"?"pulse":""} style={{ width:7, height:7, borderRadius:"50%", background:h.c, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, color:"#ffffff", fontWeight:600 }}>{h.name}</div>
                <div style={{ fontSize:9, color:"#4a7a9b" }}>{h.agency}</div>
              </div>
              <span className="tag" style={{ background:`${h.c}15`, color:h.c, border:`1px solid ${h.c}33` }}>{h.lvl}</span>
              <div style={{ width:48 }}>
                <div style={{ fontSize:8, color:"#4a7a9b", textAlign:"right", marginBottom:2 }}>{h.pct}%</div>
                <div className="progress"><div className="progress-fill" style={{ width:`${h.pct}%`, background:h.c }} /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:12 }}>LGU COMPLIANCE OVERVIEW</div>
          {[
            { name:"Cabanatuan City", province:"Nueva Ecija", pct:94, phase:"Monitoring", s:"active" },
            { name:"Naga City", province:"Camarines Sur", pct:98, phase:"Enhancement", s:"active" },
            { name:"Iloilo City", province:"Iloilo", pct:87, phase:"Validation", s:"active" },
            { name:"Cagayan de Oro", province:"Misamis Oriental", pct:91, phase:"Integration", s:"active" },
            { name:"Legazpi City", province:"Albay", pct:76, phase:"Response", s:"warning" },
            { name:"Dagupan City", province:"Pangasinan", pct:62, phase:"Diagnosis", s:"alert" },
          ].map((l, i, arr) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:i<arr.length-1?"1px solid #0d1520":"none" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, color:"#ffffff" }}>{l.name}</div>
                <div style={{ fontSize:9, color:"#4a7a9b" }}>{l.province}</div>
              </div>
              <div style={{ width:80 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                  <span style={{ fontSize:8, color:"#4a7a9b" }}>Compliance</span>
                  <span style={{ fontSize:9, fontWeight:700, color:l.pct>=90?"#10b981":l.pct>=75?"#f59e0b":"#ef4444" }}>{l.pct}%</span>
                </div>
                <div className="progress"><div className="progress-fill" style={{ width:`${l.pct}%`, background:l.pct>=90?"#10b981":l.pct>=75?"#f59e0b":"#ef4444" }} /></div>
              </div>
              <div style={{ width:7, height:7, borderRadius:"50%", background:l.s==="active"?"#10b981":l.s==="warning"?"#f59e0b":"#ef4444" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PHASE 1 — DETECTION
// ══════════════════════════════════════════════════════════════
function Detection({ openTutorial }) {
  const [angle, setAngle] = useState(0);
  useEffect(() => { const t = setInterval(() => setAngle(a => (a + 3) % 360), 50); return () => clearInterval(t); }, []);
  const sweep = (a) => ({ x: 100 + 92 * Math.cos((a - 90) * Math.PI / 180), y: 100 + 92 * Math.sin((a - 90) * Math.PI / 180) });
  const s1 = sweep(angle), s2 = sweep(angle - 60);
  return (
    <div className="fade-up" style={{ padding:24 }}>
      <ModHdr phase="01" title="DETECTION" subtitle="Multi-agency real-time hazard monitoring — PHIVOLCS, PAGASA, NOAH & MGB data feeds" color="#00d4ff" openTutorial={openTutorial} />
      <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:16, marginBottom:16 }}>
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:10 }}>RADAR</div>
          <svg width={200} height={200} style={{ display:"block", margin:"0 auto" }}>
            <rect width={200} height={200} fill="#060c14" rx={4}/>
            {[24,48,72,96].map(r => <circle key={r} cx={100} cy={100} r={r} fill="none" stroke="#1a3352" strokeWidth="1"/>)}
            <line x1={100} y1={4} x2={100} y2={196} stroke="#1a3352" strokeWidth="0.5"/>
            <line x1={4} y1={100} x2={196} y2={100} stroke="#1a3352" strokeWidth="0.5"/>
            <defs>
              <radialGradient id="swp" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <path d={`M100,100 L${s1.x},${s1.y} A92,92 0 0,0 ${s2.x},${s2.y} Z`} fill="url(#swp)"/>
            <line x1={100} y1={100} x2={s1.x} y2={s1.y} stroke="#00d4ff" strokeWidth="1.5"/>
            <circle cx={138} cy={62} r={5} fill="#ef4444" className="pulse"/>
            <circle cx={64} cy={130} r={3.5} fill="#f59e0b"/>
            <circle cx={108} cy={150} r={3} fill="#10b981"/>
            <circle cx={70} cy={75} r={2.5} fill="#a855f7"/>
          </svg>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginTop:12 }}>
            {[["Wind","142kph","#ef4444"],["Rain","89mm","#00d4ff"],["Seismic","M4.2","#f59e0b"],["Surge","2.3m","#a855f7"]].map(([l,v,c]) => (
              <div key={l} style={{ background:"#060c14", borderRadius:3, padding:"6px 8px", border:"1px solid #1a3352", textAlign:"center" }}>
                <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:12, fontWeight:700, color:c }}>{v}</div>
                <div style={{ fontSize:8, color:"#4a7a9b", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:12 }}>ACTIVE HAZARD ALERTS</div>
          {[
            { name:"Typhoon MAWAR", desc:"Signal #2 — Wind 145kph, Storm surge 2.3m, affecting Regions V, VIII", agency:"PAGASA", lvl:"WARNING", pct:85, c:"#ef4444", icon:"wind" },
            { name:"Seismic Activity M4.2", desc:"Epicenter: 5km SW Taal Volcano — Depth: 12km, Felt Intensity III", agency:"PHIVOLCS", lvl:"WATCH", pct:42, c:"#f59e0b", icon:"activity" },
            { name:"Flood Risk — Zone A", desc:"Critical river levels in Cagayan Valley — Marikina River gauge 18.3m", agency:"NOAH", lvl:"ADVISORY", pct:67, c:"#06b6d4", icon:"drop" },
            { name:"Landslide Potential", desc:"High rainfall saturation in Cordillera slopes — CAR Region advisory", agency:"MGB", lvl:"ADVISORY", pct:55, c:"#a855f7", icon:"alert" },
          ].map((h, i, arr) => (
            <div key={i} style={{ display:"flex", gap:14, padding:"12px 0", borderBottom:i<arr.length-1?"1px solid #0d1520":"none", alignItems:"flex-start" }}>
              <div style={{ width:44, height:44, borderRadius:4, background:`${h.c}10`, border:`1px solid ${h.c}33`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <I n={h.icon} s={20} c={h.c}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                  <div className={h.lvl==="WARNING"?"pulse":""} style={{ width:7, height:7, borderRadius:"50%", background:h.c, flexShrink:0 }}/>
                  <span style={{ fontSize:12, fontWeight:700, color:"#ffffff" }}>{h.name}</span>
                  <span className="tag" style={{ background:`${h.c}15`, color:h.c, border:`1px solid ${h.c}33` }}>{h.lvl}</span>
                </div>
                <div style={{ fontSize:10, color:"#8aaabf", marginBottom:6 }}>{h.desc}</div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div className="progress" style={{ flex:1 }}>
                    <div className="progress-fill" style={{ width:`${h.pct}%`, background:`linear-gradient(90deg,${h.c}88,${h.c})` }}/>
                  </div>
                  <span style={{ fontSize:10, fontFamily:"'Orbitron',sans-serif", color:h.c, fontWeight:700, minWidth:34 }}>{h.pct}%</span>
                  <span style={{ fontSize:9, color:"#4a7a9b" }}>{h.agency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding:16 }}>
        <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:12 }}>MONITORING AGENCIES — LIVE API STATUS</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {[
            { n:"PHIVOLCS", full:"Philippine Institute of Volcanology", lat:"234ms", feeds:18, uptime:"99.8%" },
            { n:"PAGASA", full:"Atmospheric/Geophysical Services Admin.", lat:"189ms", feeds:42, uptime:"99.2%" },
            { n:"NOAH", full:"Nationwide Operational Assessment of Hazards", lat:"312ms", feeds:127, uptime:"98.7%" },
            { n:"MGB", full:"Mines & Geosciences Bureau", lat:"441ms", feeds:34, uptime:"97.4%" },
          ].map(a => (
            <div key={a.n} style={{ background:"#060c14", borderRadius:4, padding:14, border:"1px solid #1a3352" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:13, fontWeight:700, color:"#00d4ff", fontFamily:"'Orbitron',sans-serif" }}>{a.n}</span>
                <span style={{ width:8, height:8, borderRadius:"50%", background:"#10b981", display:"block" }}/>
              </div>
              <div style={{ fontSize:9, color:"#4a7a9b", marginBottom:8 }}>{a.full}</div>
              {[["Feeds",a.feeds,"#00d4ff"],["Latency",a.lat,"#10b981"],["Uptime",a.uptime,"#f59e0b"]].map(([l,v,c]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ fontSize:9, color:"#4a7a9b" }}>{l}</span>
                  <span style={{ fontSize:9, fontWeight:700, color:c }}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PHASE 2 — DIAGNOSIS  (Interactive)
// ══════════════════════════════════════════════════════════════
function Diagnosis({ openTutorial }) {
  const [risks, setRisks] = useState([
    { id:1, category:"Strategic", type:"Hazard", description:"Typhoon-induced flooding in low-lying barangays", severity:8, likelihood:4, status:"Active", controls:12, source:"Auto-detected" },
    { id:2, category:"Operational", type:"Vulnerability", description:"Insufficient evacuation centers (4 for 124K pop.)", severity:6, likelihood:5, status:"Active", controls:18, source:"Manual" },
    { id:3, category:"Financial", type:"Risk", description:"DRRM Fund below 5% threshold — RA 10121 Sec. 21", severity:5, likelihood:3, status:"Active", controls:9, source:"Auto-detected" },
    { id:4, category:"Compliance", type:"Risk", description:"DRRMP not updated since 2021", severity:3, likelihood:2, status:"Mitigated", controls:24, source:"Manual" },
    { id:5, category:"Environmental", type:"Hazard", description:"Mangrove depletion — coastal surge amplification", severity:8, likelihood:4, status:"Active", controls:15, source:"Manual" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);
  const [form, setForm] = useState({ category:"Strategic", type:"Risk", description:"", severity:5, likelihood:3, status:"Active", controls:0 });
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const saveRisk = () => {
    if (!form.description.trim()) return;
    const score = Number(form.severity) * Number(form.likelihood) / 5;
    if (editingRisk) {
      setRisks(r => r.map(x => x.id === editingRisk ? { ...x, ...form, id:editingRisk, source:x.source } : x));
      setEditingRisk(null);
    } else {
      setRisks(r => [...r, { ...form, id:Date.now(), source:"Manual", severity:Number(form.severity), likelihood:Number(form.likelihood) }]);
    }
    setShowForm(false);
    setForm({ category:"Strategic", type:"Risk", description:"", severity:5, likelihood:3, status:"Active", controls:0 });
  };

  const deleteRisk = (id) => setRisks(r => r.filter(x => x.id !== id));
  const editRisk = (risk) => { setForm(risk); setEditingRisk(risk.id); setShowForm(true); };

  const runAI = async () => {
    setAnalyzing(true); setAiAnalysis("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:"You are DDRiVER, a Philippine DRRM AI Expert. Analyze risk registers and provide ISO 31000-aligned assessments. Be concise and cite RA 10121 sections when applicable.",
          messages:[{ role:"user", content:`Analyze this risk register and provide a prioritized DRRM action plan:\n${JSON.stringify(risks, null, 2)}` }] }),
      });
      const d = await res.json();
      setAiAnalysis(d.content?.map(c => c.text||"").join("") || "");
    } catch { setAiAnalysis("AI diagnosis unavailable. Check connection."); }
    setAnalyzing(false);
  };

  const riskScore = (r) => (Number(r.severity) * Number(r.likelihood)) / 5;

  return (
    <div className="fade-up" style={{ padding:24 }}>
      <ModHdr phase="02" title="DIAGNOSIS" subtitle="ISO 31000-aligned AI risk analysis — add, categorize, and diagnose risks, vulnerabilities & hazards" color="#f97316" openTutorial={openTutorial}>
        <button className="btn btn-amber" onClick={() => { setEditingRisk(null); setShowForm(true); }}>
          <I n="plus" s={13} c="#05090f"/> ADD RISK
        </button>
        <button className="btn btn-ghost" onClick={runAI} disabled={analyzing}>
          {analyzing ? <span className="spin" style={{ display:"inline-block", fontSize:14 }}>⟳</span> : <I n="activity" s={13} c="currentColor"/>}
          AI DIAGNOSE
        </button>
      </ModHdr>

      {/* ADD/EDIT FORM */}
      {showForm && (
        <div className="card fade-up" style={{ padding:20, marginBottom:16, border:"1px solid #f9741644" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#f97316", letterSpacing:1, marginBottom:14 }}>
            {editingRisk ? "EDIT RISK ENTRY" : "ADD NEW RISK / VULNERABILITY / HAZARD"}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
            <div>
              <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:1, marginBottom:6 }}>CATEGORY</div>
              <select className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category:e.target.value }))}>
                {["Strategic","Operational","Financial","Compliance","Environmental","Reputational","Social","Physical"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:1, marginBottom:6 }}>TYPE</div>
              <select className="input" value={form.type} onChange={e => setForm(f => ({ ...f, type:e.target.value }))}>
                {["Risk","Hazard","Vulnerability","Exposure","Threat"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:1, marginBottom:6 }}>STATUS</div>
              <select className="input" value={form.status} onChange={e => setForm(f => ({ ...f, status:e.target.value }))}>
                {["Active","Monitoring","Mitigated","Closed"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:1, marginBottom:6 }}>DESCRIPTION</div>
            <input className="input" placeholder="Describe the risk, vulnerability, or hazard in detail..." value={form.description} onChange={e => setForm(f => ({ ...f, description:e.target.value }))}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:16 }}>
            <div>
              <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:1, marginBottom:6 }}>SEVERITY (1–10): <span style={{ color:riskColor(form.severity), fontWeight:700 }}>{form.severity} — {levelLabel(form.severity)}</span></div>
              <input type="range" min={1} max={10} value={form.severity} onChange={e => setForm(f => ({ ...f, severity:Number(e.target.value) }))} style={{ width:"100%", accentColor:riskColor(form.severity) }}/>
            </div>
            <div>
              <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:1, marginBottom:6 }}>LIKELIHOOD (1–5): <span style={{ color:"#00d4ff", fontWeight:700 }}>{form.likelihood}</span></div>
              <input type="range" min={1} max={5} value={form.likelihood} onChange={e => setForm(f => ({ ...f, likelihood:Number(e.target.value) }))} style={{ width:"100%", accentColor:"#00d4ff" }}/>
            </div>
            <div>
              <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:1, marginBottom:6 }}>RISK SCORE</div>
              <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:24, fontWeight:900, color:riskColor(Number(form.severity) * Number(form.likelihood) / 5) }}>
                {(Number(form.severity) * Number(form.likelihood) / 5).toFixed(1)}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button className="btn btn-primary" onClick={saveRisk}>{editingRisk ? "SAVE CHANGES" : "ADD TO REGISTER"}</button>
            <button className="btn btn-ghost" onClick={() => { setShowForm(false); setEditingRisk(null); }}>CANCEL</button>
          </div>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16 }}>
        {/* RISK TABLE */}
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:12 }}>RISK REGISTER — {risks.length} ENTRIES</div>
          <table>
            <thead>
              <tr>
                <th>Description</th><th>Category</th><th>Type</th><th>Severity</th><th>Likelihood</th><th>Score</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r, i) => {
                const sc = riskScore(r);
                const col = riskColor(sc);
                return (
                  <>
                    <tr key={r.id} onClick={() => setExpandedRow(expandedRow === r.id ? null : r.id)} style={{ cursor:"pointer" }}>
                      <td><div style={{ color:"#ffffff", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.description}</div></td>
                      <td><span className="tag" style={{ background:"rgba(0,212,255,0.08)", color:"#00d4ff", border:"1px solid #00d4ff22" }}>{r.category}</span></td>
                      <td style={{ color:"#8aaabf" }}>{r.type}</td>
                      <td><span style={{ fontWeight:700, color:riskColor(r.severity) }}>{r.severity}</span></td>
                      <td style={{ color:"#8aaabf" }}>{r.likelihood}</td>
                      <td><span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:14, fontWeight:700, color:col }}>{sc.toFixed(1)}</span></td>
                      <td><span className="tag" style={{ background:`${r.status==="Active"?"#ef4444":r.status==="Mitigated"?"#10b981":"#f59e0b"}15`, color:r.status==="Active"?"#ef4444":r.status==="Mitigated"?"#10b981":"#f59e0b", border:`1px solid ${r.status==="Active"?"#ef444433":r.status==="Mitigated"?"#10b98133":"#f59e0b33"}` }}>{r.status}</span></td>
                      <td>
                        <div style={{ display:"flex", gap:6 }}>
                          <button className="btn btn-ghost" style={{ padding:"4px 8px", fontSize:9 }} onClick={e => { e.stopPropagation(); editRisk(r); }}><I n="edit" s={11} c="currentColor"/></button>
                          <button className="btn btn-danger" style={{ padding:"4px 8px", fontSize:9 }} onClick={e => { e.stopPropagation(); deleteRisk(r.id); }}><I n="trash" s={11} c="#fff"/></button>
                        </div>
                      </td>
                    </tr>
                    {expandedRow === r.id && (
                      <tr key={`exp-${r.id}`}>
                        <td colSpan={8} style={{ background:"#060c14", color:"#8aaabf", fontSize:11, lineHeight:1.7, padding:14 }}>
                          <strong style={{ color:col }}>Full Description:</strong> {r.description} &nbsp;|&nbsp; <strong style={{ color:"#00d4ff" }}>Source:</strong> {r.source} &nbsp;|&nbsp; <strong style={{ color:"#f59e0b" }}>Controls:</strong> {r.controls}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* MATRIX */}
          <div className="card" style={{ padding:16 }}>
            <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:10 }}>ISO 31000 RISK MATRIX</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:3 }}>
              {Array.from({length:25}, (_, i) => {
                const row = Math.floor(i/5), col = i%5;
                const v = (5-row)*(col+1);
                const bg = v>=16?"#ef4444":v>=10?"#f97316":v>=6?"#eab308":"#22c55e";
                return <div key={i} style={{ height:26, background:`${bg}bb`, borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"#fff", fontWeight:700 }}>{v}</div>;
              })}
            </div>
          </div>

          {/* AI ANALYSIS */}
          <div className="card" style={{ padding:16, flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2 }}>AI DIAGNOSIS REPORT</div>
              {analyzing && <div className="spin" style={{ fontSize:16, color:"#f97316" }}>⟳</div>}
            </div>
            {aiAnalysis ? (
              <div style={{ background:"#060c14", borderRadius:3, padding:12, border:"1px solid #f9741633", fontSize:10, lineHeight:1.8, color:"#ffffff", maxHeight:260, overflowY:"auto", whiteSpace:"pre-wrap" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <div className="logo-circle" style={{ width:20, height:20, border:"1px solid #00d4ff44" }}><img src={LOGO} alt=""/></div>
                  <span style={{ fontSize:9, color:"#f97316", fontWeight:700 }}>DDRiVER ANALYSIS</span>
                </div>
                {aiAnalysis}
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:160, color:"#4a7a9b", gap:10 }}>
                <I n="activity" s={36} c="#1a3352"/>
                <div style={{ fontSize:11 }}>Click AI DIAGNOSE to analyze register</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PHASE 3 — RESPONSE
// ══════════════════════════════════════════════════════════════
function Response({ openTutorial }) {
  const [activated, setActivated] = useState({});
  const controls = [
    { type:"Preventive", color:"#10b981", icon:"shield", items:["Evacuation pre-positioning","Early warning SMS dissemination","Stockpile maintenance and inventory","Mandatory DRRM training drills","Pre-emptive family evacuation orders"] },
    { type:"Detective", color:"#00d4ff", icon:"eye", items:["Real-time sensor network monitoring","Community-based early warning watchers","Social media situation monitoring","Field damage reporting system","LDRRMO situation report (SITREP)"] },
    { type:"Corrective", color:"#f59e0b", icon:"zap", items:["Emergency response team deployment","Search and rescue operations","Medical surge capacity activation","Debris clearing and road access","Emergency shelter operations"] },
    { type:"Directive", color:"#a855f7", icon:"layers", items:["OCD coordination protocol activation","Mandatory evacuation order issuance","Price freeze declaration (RA 7581)","LDRRMO emergency powers","State of Calamity declaration"] },
  ];
  const toggle = (type, item) => setActivated(a => ({ ...a, [`${type}:${item}`]: !a[`${type}:${item}`] }));
  return (
    <div className="fade-up" style={{ padding:24 }}>
      <ModHdr phase="03" title="RESPONSE" subtitle="Structured risk treatment — preventive, detective, corrective & directive controls per OCD protocols" color="#ef4444" openTutorial={openTutorial} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {controls.map(c => (
          <div key={c.type} className="card" style={{ padding:20, borderLeft:`3px solid ${c.color}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:c.color, letterSpacing:1 }}>{c.type.toUpperCase()} CONTROLS</div>
                <div style={{ fontSize:9, color:"#4a7a9b", marginTop:2 }}>OCD Protocol Aligned · RA 10121</div>
              </div>
              <div style={{ background:`${c.color}15`, border:`1px solid ${c.color}33`, borderRadius:3, padding:"4px 10px" }}>
                <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:18, fontWeight:700, color:c.color }}>
                  {c.items.filter((_,i) => activated[`${c.type}:${_}`]).length}/{c.items.length}
                </div>
                <div style={{ fontSize:8, color:"#4a7a9b" }}>ACTIVE</div>
              </div>
            </div>
            {c.items.map((item, i) => {
              const key = `${c.type}:${item}`;
              const on = activated[key];
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:i<c.items.length-1?"1px solid #0d1520":"none" }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:on?c.color:"#1a3352", border:`1px solid ${on?c.color:"#2a5a7b"}`, flexShrink:0, transition:"all 0.2s" }}/>
                  <span style={{ fontSize:11, color:on?"#ffffff":"#8aaabf", flex:1, transition:"color 0.2s" }}>{item}</span>
                  <button className="btn" style={{ padding:"4px 10px", fontSize:9, background:on?`${c.color}22`:"transparent", color:on?c.color:"#5a8aab", border:`1px solid ${on?c.color:"#1a3352"}` }}
                    onClick={() => toggle(c.type, item)}>
                    {on ? "ACTIVE ✓" : "ACTIVATE"}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PHASE 4 — INTEGRATION
// ══════════════════════════════════════════════════════════════
function Integration({ openTutorial }) {
  const essentials = [
    { n:1, title:"Organize for DRR", score:92 },
    { n:2, title:"Identify, Understand & Use Current Scenarios", score:88 },
    { n:3, title:"Strengthen Fiscal Capacity for Resilience", score:71 },
    { n:4, title:"Pursue Resilient Urban Development & Design", score:85 },
    { n:5, title:"Safeguard Natural Buffers", score:79 },
    { n:6, title:"Strengthen Institutional Capacity", score:94 },
    { n:7, title:"Understand & Strengthen Societal Capacity", score:68 },
    { n:8, title:"Increase Infrastructure Resilience", score:82 },
    { n:9, title:"Ensure Effective Disaster Response", score:96 },
    { n:10, title:"Expedite Recovery & Build Back Better", score:74 },
  ];
  const avg = Math.round(essentials.reduce((a,e) => a+e.score,0)/essentials.length);
  return (
    <div className="fade-up" style={{ padding:24 }}>
      <ModHdr phase="04" title="INTEGRATION" subtitle="UNDRR MCR2030 10 Essentials assessment with customizable DRRM plan templates" color="#a855f7" openTutorial={openTutorial}/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:16 }}>
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:14 }}>UNDRR MCR2030 — 10 ESSENTIALS SCORECARD</div>
          {essentials.map((e, i) => {
            const c = e.score>=85?"#10b981":e.score>=70?"#f59e0b":"#ef4444";
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:i<essentials.length-1?"1px solid #0d1520":"none" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:"rgba(168,85,247,0.1)", border:"1px solid rgba(168,85,247,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:11, fontWeight:700, color:"#a855f7" }}>{e.n}</span>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11, color:"#ffffff", marginBottom:4 }}>Essential {e.n}: {e.title}</div>
                  <div className="progress"><div className="progress-fill" style={{ width:`${e.score}%`, background:`linear-gradient(90deg,${c}88,${c})` }}/></div>
                </div>
                <div style={{ textAlign:"right", minWidth:80 }}>
                  <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:16, fontWeight:700, color:c }}>{e.score}%</div>
                  <span className="tag" style={{ fontSize:8, background:`${c}15`, color:c, border:`1px solid ${c}33` }}>
                    {e.score>=85?"COMPLIANT":e.score>=70?"IN PROGRESS":"ACTION REQ."}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div className="card" style={{ padding:16 }}>
            <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:10 }}>MCR2030 OVERALL SCORE</div>
            <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:44, fontWeight:900, color:"#a855f7" }}>{avg}%</div>
              <div style={{ fontSize:10, color:"#4a7a9b", marginTop:6 }}>National Average: 74.3%</div>
              <div className="progress" style={{ marginTop:10 }}>
                <div className="progress-fill" style={{ width:`${avg}%`, background:"linear-gradient(90deg,#7c3aed,#a855f7)" }}/>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding:16 }}>
            <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:10 }}>DRRM PLAN TEMPLATES</div>
            {["Barangay DRRM Plan","Municipal DRRM Plan","Provincial DRRM Plan","City DRRM Plan"].map((t, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:i<3?"1px solid #0d1520":"none" }}>
                <div style={{ fontSize:11, color:"#ffffff" }}>{t}</div>
                <button className="btn btn-ghost" style={{ fontSize:9, padding:"5px 10px" }}>USE →</button>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding:16 }}>
            <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:10 }}>LEGAL FRAMEWORKS</div>
            {["RA 10121 – DRRMA 2010","DILG MC 2020-161","RA 9729 – Climate Change Act","PD 1566 – Disaster Act"].map((l, i) => (
              <div key={i} style={{ fontSize:10, color:"#8aaabf", padding:"5px 0", borderBottom:i<3?"1px solid #0d1520":"none" }}>{l}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PHASE 5 — VALIDATION
// ══════════════════════════════════════════════════════════════
function Validation({ openTutorial }) {
  const [running, setRunning] = useState(false);
  const [pct, setPct] = useState(0);
  const [results, setResults] = useState(null);
  const [scenario, setScenario] = useState("Typhoon Cat.4");

  const runSim = () => {
    setRunning(true); setPct(0); setResults(null);
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 7 + 3;
      if (p >= 100) { p = 100; clearInterval(t); setRunning(false); setResults(true); }
      setPct(Math.min(p, 100));
    }, 120);
  };

  const kpis = [
    { kpi:"Evacuation Speed", score:87, grade:"A" },
    { kpi:"Resource Allocation", score:72, grade:"B" },
    { kpi:"Communication Effectiveness", score:94, grade:"A+" },
    { kpi:"Medical Response", score:68, grade:"C+" },
    { kpi:"Recovery Timeline", score:81, grade:"B+" },
  ];

  return (
    <div className="fade-up" style={{ padding:24 }}>
      <ModHdr phase="05" title="VALIDATION" subtitle="Simulation-based validation of risk treatments and EOC operations with performance scoring & gap analysis" color="#10b981" openTutorial={openTutorial}/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {/* SIM ENGINE */}
        <div className="card" style={{ padding:20 }}>
          <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:16 }}>SIMULATION ENGINE</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
            <div>
              <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:1, marginBottom:6 }}>SCENARIO</div>
              <select className="input" value={scenario} onChange={e => setScenario(e.target.value)}>
                {["Typhoon Cat.4","Earthquake M7.0","100-year Flood","Volcanic Eruption","Multi-hazard Event"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            {[["Population","124,500"],["Duration","72 hours"],["Resources","85% deployed"]].map(([l,v]) => (
              <div key={l} style={{ background:"#060c14", borderRadius:3, padding:10, border:"1px solid #1a3352" }}>
                <div style={{ fontSize:9, color:"#4a7a9b", marginBottom:4 }}>{l}</div>
                <div style={{ fontSize:13, fontWeight:700, color:"#00d4ff" }}>{v}</div>
              </div>
            ))}
          </div>
          {running && (
            <div style={{ marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:10, color:"#10b981" }}>Running simulation — {scenario}</span>
                <span style={{ fontSize:10, fontFamily:"'Orbitron',sans-serif", color:"#10b981" }}>{Math.floor(pct)}%</span>
              </div>
              <div className="progress" style={{ height:8 }}>
                <div className="progress-fill" style={{ width:`${pct}%`, background:"linear-gradient(90deg,#10b981,#00d4ff)" }}/>
              </div>
            </div>
          )}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <button className="btn btn-green" onClick={runSim} disabled={running} style={{ width:"100%", justifyContent:"center", fontSize:11 }}>
              {running ? <><span className="spin" style={{ display:"inline-block" }}>⟳</span> SIMULATING...</> : <><I n="play" s={14} c="#fff"/> RUN SIMULATION</>}
            </button>
            <a href="https://asilvainnovations.com/ics-simulator" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <button className="btn btn-primary" style={{ width:"100%", justifyContent:"center", fontSize:11 }}>
                <I n="sim" s={14} c="#05090f"/> SIMULATE ICS
                <I n="external" s={11} c="#05090f"/>
              </button>
            </a>
          </div>
          <div style={{ marginTop:16, background:"rgba(16,185,129,0.06)", borderRadius:4, padding:12, border:"1px solid rgba(16,185,129,0.2)", fontSize:10, color:"#4a7a9b", lineHeight:1.7 }}>
            <span style={{ color:"#10b981", fontWeight:700 }}>ICS Simulator</span> opens the full Incident Command System exercise by ASilva Innovations — test your EOC structure, resource ordering, and span of control in a live interactive environment.
          </div>
        </div>

        {/* RESULTS */}
        <div className="card" style={{ padding:20 }}>
          <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:16 }}>PERFORMANCE SCORING</div>
          {results ? (
            <div className="fade-up">
              {kpis.map((k, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom:"1px solid #0d1520" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:11, color:"#ffffff", marginBottom:4 }}>{k.kpi}</div>
                    <div className="progress">
                      <div className="progress-fill" style={{ width:`${k.score}%`, background:k.score>=85?"#10b981":k.score>=70?"#f59e0b":"#ef4444" }}/>
                    </div>
                  </div>
                  <div style={{ textAlign:"right", minWidth:60 }}>
                    <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:20, fontWeight:900, color:k.score>=85?"#10b981":k.score>=70?"#f59e0b":"#ef4444" }}>{k.grade}</div>
                    <div style={{ fontSize:9, color:"#4a7a9b" }}>{k.score}%</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:16, background:"rgba(16,185,129,0.08)", borderRadius:4, padding:14, border:"1px solid rgba(16,185,129,0.2)", textAlign:"center" }}>
                <div style={{ fontSize:9, color:"#10b981", letterSpacing:2, marginBottom:6 }}>OVERALL PERFORMANCE</div>
                <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:40, fontWeight:900, color:"#10b981" }}>B+</div>
                <div style={{ fontSize:10, color:"#4a7a9b" }}>80.4% — Above Required Threshold</div>
              </div>
              <button className="btn btn-ghost" style={{ width:"100%", justifyContent:"center", marginTop:10, fontSize:10 }}>
                <I n="download" s={13} c="currentColor"/> EXPORT VALIDATION REPORT
              </button>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:280, color:"#4a7a9b", gap:12 }}>
              <I n="play" s={48} c="#1a3352"/>
              <div style={{ fontSize:11 }}>Run a simulation to see performance results</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PHASE 6 — ENHANCEMENT
// ══════════════════════════════════════════════════════════════
function Enhancement({ openTutorial }) {
  const [generating, setGenerating] = useState(null);
  const [output, setOutput] = useState({});

  const docs = [
    { name:"Damage Assessment (DANA)", desc:"Post-disaster needs assessment per NDRRMC guidelines", status:"Ready" },
    { name:"DRRM Plan 2024–2026", desc:"3-year DRRM plan compliant with RA 10121 Sec. 12", status:"Draft" },
    { name:"Contingency Plan — Typhoon", desc:"Typhoon operational contingency plan", status:"Ready" },
    { name:"PSCP Template", desc:"Pre-disaster Safety Compliance Plan checklist", status:"Draft" },
    { name:"Business Continuity Plan", desc:"BCP for LGU critical services continuity", status:"Ready" },
  ];

  const generateDoc = async (docName) => {
    setGenerating(docName);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:"You are DDRiVER, a Philippine DRRM AI Expert. Generate professional, RA 10121-compliant document templates. Include section headings, key content bullets, and cite applicable laws/standards.",
          messages:[{ role:"user", content:`Generate a detailed template outline for: ${docName}. Include all required sections per Philippine DRRM standards. Format professionally with section numbers.` }] }),
      });
      const d = await res.json();
      setOutput(prev => ({ ...prev, [docName]: d.content?.map(c => c.text||"").join("") || "" }));
    } catch { setOutput(prev => ({ ...prev, [docName]: "Document generation unavailable. Check API connectivity." })); }
    setGenerating(null);
  };

  return (
    <div className="fade-up" style={{ padding:24 }}>
      <ModHdr phase="06" title="ENHANCEMENT" subtitle="AI-assisted generation of DANA, DRRM Plans, Contingency Plans, PSCP & BCP — RA 10121 compliant" color="#f59e0b" openTutorial={openTutorial}/>
      <div style={{ marginBottom:16 }}>
        <a href="https://asilvainnovations.com/gawad-kalasag" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
          <div style={{ background:"linear-gradient(135deg,rgba(245,158,11,0.12),rgba(251,191,36,0.06))", border:"1px solid #f59e0b44", borderRadius:6, padding:"16px 20px", display:"flex", alignItems:"center", gap:16, cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor="#f59e0b"}
            onMouseLeave={e => e.currentTarget.style.borderColor="#f59e0b44"}>
            <div style={{ width:48, height:48, borderRadius:"50%", background:"rgba(245,158,11,0.15)", border:"2px solid #f59e0b44", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <I n="trophy" s={22} c="#f59e0b"/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:"#f59e0b", fontFamily:"'Orbitron',sans-serif", letterSpacing:1 }}>GAWAD KALASAG SIMULATOR</div>
              <div style={{ fontSize:11, color:"#8aaabf", marginTop:3 }}>Assess your LGU's eligibility for the Gawad Kalasag National Award — Philippines' highest DRRM recognition</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, color:"#f59e0b", fontSize:11, fontWeight:700 }}>
              LAUNCH <I n="external" s={14} c="#f59e0b"/>
            </div>
          </div>
        </a>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:14 }}>AI DOCUMENT GENERATOR</div>
          {docs.map((d, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:i<docs.length-1?"1px solid #0d1520":"none" }}>
              <div style={{ width:38, height:38, borderRadius:3, background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <I n="file" s={18} c="#f59e0b"/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#ffffff" }}>{d.name}</div>
                <div style={{ fontSize:9, color:"#4a7a9b", marginTop:2 }}>{d.desc}</div>
              </div>
              <span className="tag" style={{ background:d.status==="Ready"?"rgba(16,185,129,0.1)":"rgba(245,158,11,0.1)", color:d.status==="Ready"?"#10b981":"#f59e0b", border:`1px solid ${d.status==="Ready"?"#10b98133":"#f59e0b33"}` }}>{d.status}</span>
              <button className="btn btn-amber" style={{ fontSize:9, padding:"6px 12px" }} onClick={() => generateDoc(d.name)} disabled={!!generating}>
                {generating===d.name ? <span className="spin" style={{ display:"inline-block" }}>⟳</span> : <><I n="zap" s={11} c="#05090f"/> AI GEN</>}
              </button>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:12 }}>GENERATED DOCUMENT PREVIEW</div>
          {generating && !output[generating] && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:300, gap:12 }}>
              <div style={{ width:40, height:40, border:"3px solid #f59e0b33", borderTop:"3px solid #f59e0b", borderRadius:"50%" }} className="spin"/>
              <div style={{ fontSize:11, color:"#4a7a9b" }}>DDRiVER generating {generating}...</div>
            </div>
          )}
          {Object.keys(output).length > 0 && !generating ? (
            <div className="fade-up">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#f59e0b" }}>{Object.keys(output)[Object.keys(output).length-1]}</div>
                <button className="btn btn-ghost" style={{ fontSize:9, padding:"5px 10px" }}><I n="download" s={11} c="currentColor"/> EXPORT</button>
              </div>
              <div style={{ background:"#060c14", borderRadius:3, border:"1px solid #1a3352", padding:14, maxHeight:380, overflowY:"auto", fontSize:11, lineHeight:1.8, color:"#ffffff", whiteSpace:"pre-wrap" }}>
                {output[Object.keys(output)[Object.keys(output).length-1]]}
              </div>
            </div>
          ) : !generating && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:300, color:"#4a7a9b", gap:10 }}>
              <I n="file" s={48} c="#1a3352"/>
              <div style={{ fontSize:11 }}>Click ⚡ AI GEN to generate a document</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PHASE 7 — COMMAND CENTER / MONITORING
// ══════════════════════════════════════════════════════════════
function Monitoring({ openTutorial }) {
  const [tab, setTab] = useState("chat");
  const [msgs, setMsgs] = useState([
    { from:"OCD-NCR", text:"Typhoon MAWAR — Coordination call in 30 min. All LDRRMO to stand by.", time:"14:23" },
    { from:"LDRRMO-Cabanatuan", text:"Pre-emptive evacuation of 234 families in Brgy. San Isidro complete.", time:"14:18" },
    { from:"RDRRMC-V", text:"Signal #2 now covers Camarines Norte effective 15:00 PST.", time:"14:05" },
    { from:"DILG Region V", text:"Requesting DRRM Fund utilization report submission by COB today.", time:"13:55" },
  ]);
  const [newMsg, setNewMsg] = useState("");
  const [smsText, setSmsText] = useState("BABALA: Typhoon Signal #2. Mangyaring lumikas na sa mga ligtas na lugar. -LDRRMO");

  const sendMsg = () => {
    if (!newMsg.trim()) return;
    setMsgs(m => [{ from:"You (LDRRMO)", text:newMsg, time:new Date().toLocaleTimeString("en-PH",{hour:"2-digit",minute:"2-digit"}) }, ...m]);
    setNewMsg("");
  };

  const platforms = [
    { name:"DDRiVE-M PSCP", desc:"Pre-disaster Safety Compliance Plan — Structured pre-event assessment and readiness verification", url:"https://asilvainnovations.com/pscp", color:"#00d4ff", icon:"shield", tag:"PSCP" },
    { name:"DDRiVE-M NDP", desc:"National Disaster Preparedness Platform — Macro-level coordination, NDRRMC integration and multi-agency monitoring", url:"https://asilvainnovations.com/ddrive-m-ndp", color:"#a855f7", icon:"globe", tag:"NDP" },
  ];

  return (
    <div className="fade-up" style={{ padding:24 }}>
      <ModHdr phase="07" title="COMMAND CENTER" subtitle="Real-time collaborative operations — video conferencing, SMS alerts, multi-agency chat & document sharing" color="#06b6d4" openTutorial={openTutorial}/>

      {/* DDRiVE-M PLATFORM VERSIONS */}
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:12 }}>DDRiVE-M SPECIALIZED PLATFORMS</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {platforms.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <div style={{ background:"#0d1a26", border:`1px solid ${p.color}33`, borderRadius:6, padding:"16px 20px", display:"flex", gap:14, alignItems:"flex-start", cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=p.color; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=`${p.color}33`; e.currentTarget.style.transform="none"; }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:`${p.color}15`, border:`2px solid ${p.color}44`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <I n={p.icon} s={20} c={p.color}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:12, fontWeight:700, color:p.color }}>{p.name}</span>
                    <span className="tag" style={{ background:`${p.color}15`, color:p.color, border:`1px solid ${p.color}33`, fontSize:8 }}>{p.tag}</span>
                  </div>
                  <div style={{ fontSize:10, color:"#8aaabf", lineHeight:1.6 }}>{p.desc}</div>
                </div>
                <I n="external" s={14} c={`${p.color}88`}/>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={{ display:"flex", gap:2, marginBottom:16 }}>
        {[["chat","COMMAND CHAT"],["sms","SMS ALERTS"],["video","VIDEO CONF."],["docs","DOCUMENTS"]].map(([t,l]) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:"8px 18px", fontSize:10, fontWeight:700, letterSpacing:1, fontFamily:"inherit", cursor:"pointer", border:"none", borderBottom:`2px solid ${tab===t?"#06b6d4":"transparent"}`, background:tab===t?"rgba(6,182,212,0.08)":"transparent", color:tab===t?"#06b6d4":"#4a7a9b", transition:"all 0.2s" }}>
            {l}
          </button>
        ))}
      </div>

      {tab === "chat" && (
        <div className="card" style={{ padding:16 }}>
          <div style={{ height:320, overflowY:"auto", display:"flex", flexDirection:"column", gap:8, marginBottom:12 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ background:"#060c14", borderRadius:3, padding:12, border:"1px solid #1a3352" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:10, fontWeight:700, color:m.from==="You (LDRRMO)"?"#10b981":"#06b6d4" }}>{m.from}</span>
                  <span style={{ fontSize:9, color:"#4a7a9b" }}>{m.time}</span>
                </div>
                <div style={{ fontSize:11, color:"#ffffff", lineHeight:1.6 }}>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <input className="input" placeholder="Send command message to all agencies..." value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key==="Enter" && sendMsg()}/>
            <button className="btn btn-primary" onClick={sendMsg}>→</button>
          </div>
        </div>
      )}
      {tab === "sms" && (
        <div className="card" style={{ padding:20 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div>
              <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:12 }}>MESSAGE COMPOSITION</div>
              <div style={{ marginBottom:10 }}>
                <div style={{ fontSize:9, color:"#4a7a9b", marginBottom:6 }}>COVERAGE AREA</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
                  {["All Barangays","Coastal Zones","Zone A","Poblacion"].map(b => <span key={b} className="tag" style={{ background:"rgba(6,182,212,0.1)", color:"#06b6d4", border:"1px solid rgba(6,182,212,0.3)" }}>{b}</span>)}
                </div>
                <textarea className="input" style={{ height:90, resize:"none", lineHeight:1.7 }} value={smsText} onChange={e => setSmsText(e.target.value)}/>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:10, color:"#4a7a9b" }}>Recipients: <span style={{ color:"#ffffff" }}>34,512</span></span>
                <button className="btn btn-primary" style={{ fontSize:11 }}>SEND ALERT</button>
              </div>
            </div>
            <div>
              <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:12 }}>DELIVERY STATUS</div>
              <div style={{ background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:4, padding:14, marginBottom:10 }}>
                <div style={{ fontSize:9, color:"#10b981", marginBottom:4, letterSpacing:1 }}>LAST SENT · 14:05 PST</div>
                <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:22, fontWeight:700, color:"#10b981" }}>90.4%</div>
                <div style={{ fontSize:10, color:"#4a7a9b", marginTop:4 }}>31,204 of 34,512 delivered</div>
                <div className="progress" style={{ marginTop:8 }}><div className="progress-fill" style={{ width:"90.4%", background:"#10b981" }}/></div>
              </div>
              {[["Delivered","31,204","#10b981"],["Pending","2,108","#f59e0b"],["Failed","1,200","#ef4444"]].map(([l,v,c]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid #0d1520" }}>
                  <span style={{ fontSize:10, color:"#4a7a9b" }}>{l}</span>
                  <span style={{ fontSize:10, fontWeight:700, color:c }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab === "video" && (
        <div className="card" style={{ padding:20 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 260px", gap:16 }}>
            <div>
              <div style={{ background:"#060c14", borderRadius:4, height:220, border:"1px solid #1a3352", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                <div style={{ textAlign:"center", color:"#4a7a9b" }}>
                  <I n="users" s={48} c="#1a3352"/>
                  <div style={{ fontSize:12, marginTop:10 }}>No active conference</div>
                  <div style={{ fontSize:10, marginTop:4 }}>Start or join a call below</div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                <button className="btn btn-primary" style={{ justifyContent:"center" }}>▶ START CALL</button>
                <button className="btn btn-ghost" style={{ justifyContent:"center" }}>SCHEDULE</button>
                <button className="btn btn-ghost" style={{ justifyContent:"center" }}>JOIN</button>
              </div>
            </div>
            <div>
              <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:10 }}>PARTICIPANTS (6)</div>
              {[["OCD-NCR",true],["LDRRMO Cabanatuan",true],["RDRRMC-V",true],["DILG Region V",false],["PHIVOLCS",false],["PAGASA",false]].map(([p,on],i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid #0d1520" }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:on?"#10b981":"#4a7a9b", flexShrink:0 }}/>
                  <span style={{ fontSize:11, color:on?"#ffffff":"#4a7a9b" }}>{p}</span>
                  {on && <span className="tag" style={{ marginLeft:"auto", background:"rgba(16,185,129,0.1)", color:"#10b981", border:"1px solid rgba(16,185,129,0.3)", fontSize:8 }}>ONLINE</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab === "docs" && (
        <div className="card" style={{ padding:16 }}>
          <div style={{ fontSize:9, color:"#4a7a9b", letterSpacing:2, marginBottom:12 }}>SHARED DOCUMENTS</div>
          <table>
            <thead><tr><th>DOCUMENT</th><th>TYPE</th><th>SHARED BY</th><th>TIME</th><th></th></tr></thead>
            <tbody>
              {[
                { name:"MAWAR SITREP #3", type:"PDF", by:"LDRRMO", time:"14:20" },
                { name:"Evacuation Map — Zone A", type:"IMG", by:"OCD-NCR", time:"13:40" },
                { name:"DRRM Fund Status Q3", type:"XLSX", by:"Finance Dept", time:"12:15" },
                { name:"Response Protocol v2", type:"DOCX", by:"RDRRMC", time:"11:30" },
              ].map((d, i) => (
                <tr key={i}>
                  <td style={{ color:"#ffffff" }}>{d.name}</td>
                  <td><span className="tag" style={{ background:"rgba(0,212,255,0.08)", color:"#00d4ff", border:"1px solid #00d4ff22" }}>{d.type}</span></td>
                  <td style={{ color:"#8aaabf" }}>{d.by}</td>
                  <td style={{ color:"#4a7a9b" }}>{d.time}</td>
                  <td><button className="btn btn-ghost" style={{ fontSize:9, padding:"4px 10px" }}><I n="download" s={11} c="currentColor"/> DL</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// LGU REGISTRY
// ══════════════════════════════════════════════════════════════
function LGURegistry({ openTutorial }) {
  const lgus = [
    { name:"Cabanatuan City", province:"Nueva Ecija", region:"III", compliance:94, phase:"Monitoring", status:"active", pop:"325,000" },
    { name:"Naga City", province:"Camarines Sur", region:"V", compliance:98, phase:"Enhancement", status:"active", pop:"196,000" },
    { name:"Iloilo City", province:"Iloilo", region:"VI", compliance:87, phase:"Validation", status:"active", pop:"457,000" },
    { name:"Cagayan de Oro", province:"Misamis Oriental", region:"X", compliance:91, phase:"Integration", status:"active", pop:"728,000" },
    { name:"Legazpi City", province:"Albay", region:"V", compliance:76, phase:"Response", status:"warning", pop:"209,000" },
    { name:"Dagupan City", province:"Pangasinan", region:"I", compliance:62, phase:"Diagnosis", status:"alert", pop:"174,000" },
    { name:"General Santos City", province:"South Cotabato", region:"XII", compliance:83, phase:"Validation", status:"active", pop:"594,000" },
    { name:"Zamboanga City", province:"Zamboanga del Sur", region:"IX", compliance:71, phase:"Integration", status:"warning", pop:"885,000" },
  ];
  const [q, setQ] = useState("");
  const filtered = lgus.filter(l => l.name.toLowerCase().includes(q.toLowerCase()) || l.province.toLowerCase().includes(q.toLowerCase()) || l.region.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="fade-up" style={{ padding:24 }}>
      <ModHdr title="LGU REGISTRY" subtitle="Philippine LGU DRRM compliance tracking — 120+ active local government units" color="#00d4ff" openTutorial={openTutorial}>
        <button className="btn btn-primary"><I n="plus" s={13} c="#05090f"/> ADD LGU</button>
      </ModHdr>
      <div style={{ display:"flex", gap:12, marginBottom:16 }}>
        <input className="input" style={{ width:300 }} placeholder="Search LGU, province, or region..." value={q} onChange={e => setQ(e.target.value)}/>
        <button className="btn btn-ghost"><I n="download" s={13} c="currentColor"/> EXPORT</button>
      </div>
      <div className="card">
        <table>
          <thead>
            <tr><th>LGU NAME</th><th>PROVINCE</th><th>REGION</th><th>POPULATION</th><th>PHASE</th><th>COMPLIANCE</th><th>STATUS</th><th>ACTIONS</th></tr>
          </thead>
          <tbody>
            {filtered.map((l, i) => (
              <tr key={i}>
                <td style={{ fontWeight:700, color:"#ffffff" }}>{l.name}</td>
                <td style={{ color:"#8aaabf" }}>{l.province}</td>
                <td><span className="tag" style={{ background:"rgba(0,212,255,0.08)", color:"#00d4ff", border:"1px solid #00d4ff22" }}>Region {l.region}</span></td>
                <td style={{ color:"#8aaabf" }}>{l.pop}</td>
                <td><span className="tag" style={{ background:"rgba(0,212,255,0.06)", color:"#8aaabf", border:"1px solid #1a3352" }}>{l.phase}</span></td>
                <td>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div className="progress" style={{ width:60 }}>
                      <div className="progress-fill" style={{ width:`${l.compliance}%`, background:l.compliance>=90?"#10b981":l.compliance>=75?"#f59e0b":"#ef4444" }}/>
                    </div>
                    <span style={{ fontSize:11, fontWeight:700, color:l.compliance>=90?"#10b981":l.compliance>=75?"#f59e0b":"#ef4444" }}>{l.compliance}%</span>
                  </div>
                </td>
                <td>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:l.status==="active"?"#10b981":l.status==="warning"?"#f59e0b":"#ef4444" }}/>
                </td>
                <td>
                  <div style={{ display:"flex", gap:6 }}>
                    <button className="btn btn-ghost" style={{ fontSize:9, padding:"4px 10px" }}>VIEW</button>
                    <button className="btn btn-ghost" style={{ fontSize:9, padding:"4px 10px" }}>EDIT</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginTop:16 }}>
        {[["Total LGUs","120+","#00d4ff"],["Avg Compliance","82.5%","#10b981"],["Alerts","3 LGUs","#ef4444"],["Pending Reviews","14","#f59e0b"]].map(([l,v,c]) => (
          <div key={l} className="card" style={{ padding:16, textAlign:"center" }}>
            <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:24, fontWeight:700, color:c }}>{v}</div>
            <div style={{ fontSize:9, color:"#4a7a9b", marginTop:6, letterSpacing:1 }}>{l.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
