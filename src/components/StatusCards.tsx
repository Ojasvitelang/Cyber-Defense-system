import { Server, Shield, Bug, Monitor } from "lucide-react";

const cards = [
  {
    icon: Monitor,
    title: "DVWA Server",
    status: "Running",
    port: "80",
    label: "Web Application",
    statusColor: "text-success",
  },
  {
    icon: Server,
    title: "Squid Proxy",
    status: "Active",
    port: "3128",
    label: "Traffic Logger",
    statusColor: "text-neon",
  },
  {
    icon: Bug,
    title: "Cowrie Honeypot",
    status: "Listening",
    port: "2222",
    label: "Fake SSH Server",
    statusColor: "text-warning",
  },
  {
    icon: Shield,
    title: "Suricata IDS",
    status: "Monitoring",
    port: "—",
    label: "Threat Detection Engine",
    statusColor: "text-neon",
  },
];

const StatusCards = () => (
  <section className="px-4 py-6">
    <h2 className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4 text-center">
      Live System Status
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.title}
          className="border rounded-lg p-5 bg-card neon-border hover:neon-border-strong transition-all duration-300 group"
        >
          <div className="flex items-center gap-3 mb-3">
            <c.icon className="w-5 h-5 text-neon group-hover:animate-pulse-neon" />
            <span className="font-display text-xs font-bold tracking-wide text-foreground">
              {c.title}
            </span>
          </div>
          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className={c.statusColor}>{c.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Port</span>
              <span className="text-foreground">{c.port}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="text-secondary-foreground">{c.label}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${c.statusColor === "text-success" ? "bg-success" : c.statusColor === "text-warning" ? "bg-warning" : "bg-neon"} animate-pulse-neon`} />
            <span className="font-mono text-[10px] text-muted-foreground">ONLINE</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default StatusCards;
