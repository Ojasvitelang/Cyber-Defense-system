import { Shield, Globe, Server, Bug, Monitor } from "lucide-react";

interface ArchitectureDiagramProps {
  activeFlow: "normal" | "ssh" | "web" | null;
}

const NodeBox = ({
  icon: Icon,
  label,
  sublabel,
  glowClass = "neon-border",
}: {
  icon: React.ElementType;
  label: string;
  sublabel: string;
  glowClass?: string;
}) => (
  <div
    className={`border rounded-lg p-4 flex flex-col items-center gap-2 bg-card ${glowClass} transition-all duration-300 hover:scale-105 min-w-[140px]`}
  >
    <Icon className="w-8 h-8 text-neon" />
    <span className="font-display text-xs font-semibold text-foreground tracking-wide text-center">
      {label}
    </span>
    <span className="font-mono text-[10px] text-muted-foreground text-center leading-tight">
      {sublabel}
    </span>
  </div>
);

const Arrow = ({
  color = "neon",
  active = false,
  label,
}: {
  color?: "neon" | "danger";
  active?: boolean;
  label?: string;
}) => (
  <div className="flex flex-col items-center gap-1 mx-2">
    {label && (
      <span className={`font-mono text-[9px] ${color === "danger" ? "text-danger" : "text-neon"} opacity-70`}>
        {label}
      </span>
    )}
    <div className="relative w-16 md:w-24 h-0.5 overflow-hidden rounded-full"
      style={{ backgroundColor: color === "danger" ? "hsl(var(--danger) / 0.2)" : "hsl(var(--neon) / 0.2)" }}
    >
      {active && (
        <div
          className="absolute inset-y-0 w-8 animate-flow-right rounded-full"
          style={{ backgroundColor: color === "danger" ? "hsl(var(--danger))" : "hsl(var(--neon))" }}
        />
      )}
    </div>
  </div>
);

const ArchitectureDiagram = ({ activeFlow }: ArchitectureDiagramProps) => {
  const normalActive = activeFlow === "normal" || activeFlow === "web";
  const attackActive = activeFlow === "ssh";
  const webAttackActive = activeFlow === "web";

  return (
    <section className="px-4 py-6">
      <h2 className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-6 text-center">
        System Architecture
      </h2>
      <div className="border rounded-xl p-6 md:p-8 bg-card neon-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 space-y-8">
          {/* Normal traffic flow */}
          <div>
            <p className="font-mono text-[10px] text-neon/60 uppercase tracking-widest mb-3">
              Normal Traffic Flow
            </p>
            <div className="flex items-center justify-center flex-wrap gap-y-4">
              <NodeBox icon={Globe} label="User" sublabel="Browser" />
              <Arrow color="neon" active={normalActive} label="HTTP" />
              <NodeBox icon={Server} label="Squid Proxy" sublabel="Traffic Monitoring & Routing" />
              <Arrow color="neon" active={normalActive} label="Forward" />
              <NodeBox icon={Monitor} label="DVWA Server" sublabel="Vulnerable Web Application" />
            </div>
          </div>

          {/* Attack traffic flow */}
          <div>
            <p className="font-mono text-[10px] text-danger/60 uppercase tracking-widest mb-3">
              Attack Traffic Flow
            </p>
            <div className="flex items-center justify-center flex-wrap gap-y-4">
              <NodeBox icon={Bug} label="Attacker" sublabel="Malicious Actor" glowClass="danger-border" />
              <Arrow color="danger" active={attackActive} label="SSH" />
              <NodeBox icon={Shield} label="Cowrie Honeypot" sublabel="Deception System" glowClass="danger-border" />
            </div>
          </div>

          {/* Suricata */}
          <div className="flex justify-center">
            <div className="border border-dashed rounded-lg px-6 py-3 flex items-center gap-3 bg-card/50"
              style={{
                borderColor: webAttackActive ? "hsl(var(--danger) / 0.5)" : "hsl(var(--neon) / 0.2)",
                boxShadow: webAttackActive ? "var(--danger-glow)" : "none",
                transition: "all 0.5s",
              }}
            >
              <Shield className="w-6 h-6 text-warning" />
              <div>
                <span className="font-display text-xs font-semibold text-foreground">Suricata IDS</span>
                <p className="font-mono text-[10px] text-muted-foreground">
                  Monitoring all network traffic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDiagram;
