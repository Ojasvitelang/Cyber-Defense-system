import { ArrowRight } from "lucide-react";

const FlowExplanation = () => (
  <section className="px-4 py-6">
    <h2 className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4 text-center">
      Flow Explanation
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-lg p-5 bg-card neon-border">
        <h3 className="font-display text-xs font-bold text-neon tracking-wide mb-3">
          Normal Flow
        </h3>
        <div className="flex items-center gap-2 font-mono text-xs text-foreground">
          <span>User</span>
          <ArrowRight className="w-3 h-3 text-neon" />
          <span>Proxy</span>
          <ArrowRight className="w-3 h-3 text-neon" />
          <span>Web Server</span>
        </div>
        <p className="mt-3 font-mono text-[10px] text-muted-foreground leading-relaxed">
          Legitimate traffic flows through the Squid proxy, which logs all requests before
          forwarding them to the DVWA web server. Suricata monitors this traffic for anomalies.
        </p>
      </div>

      <div className="border rounded-lg p-5 bg-card danger-border">
        <h3 className="font-display text-xs font-bold text-danger tracking-wide mb-3">
          Attack Flow
        </h3>
        <div className="flex items-center gap-2 font-mono text-xs text-foreground">
          <span>Attacker</span>
          <ArrowRight className="w-3 h-3 text-danger" />
          <span>Honeypot</span>
          <ArrowRight className="w-3 h-3 text-danger" />
          <span>Behavior Logged</span>
        </div>
        <p className="mt-3 font-mono text-[10px] text-muted-foreground leading-relaxed">
          Attackers are redirected to the Cowrie honeypot, a fake SSH server that records
          every command and login attempt for analysis and threat intelligence.
        </p>
      </div>
    </div>
  </section>
);

export default FlowExplanation;
