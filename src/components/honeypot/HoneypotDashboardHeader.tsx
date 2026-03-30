import { Shield, Activity, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const HoneypotDashboardHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="glass-card border-b border-primary/20 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary animate-pulse-glow" />
          <div>
            <h1 className="text-2xl font-bold glow-text terminal-font tracking-wider">
              DECEPTIVE HONEYPOT THREAT INTELLIGENCE
            </h1>
            <p className="text-sm text-muted-foreground terminal-font">
              Human in the Loop - Real-time Security Monitoring System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="font-mono text-xs px-4 py-2 rounded-md border border-neon/30 text-neon hover:bg-neon/10 transition-all duration-300"
          >
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-2 glass-card px-4 py-2 border border-success/30">
            <Activity className="w-4 h-4 text-success animate-pulse" />
            <div>
              <p className="text-xs text-muted-foreground">System Status</p>
              <p className="text-sm font-semibold text-success terminal-font">
                OPERATIONAL
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 glass-card px-4 py-2 border border-warning/30">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <div>
              <p className="text-xs text-muted-foreground">Threat Level</p>
              <p className="text-sm font-semibold text-warning terminal-font">
                ELEVATED
              </p>
            </div>
          </div>

          <div className="glass-card px-4 py-2 border border-primary/30">
            <p className="text-xs text-muted-foreground">UTC Time</p>
            <p className="text-sm font-semibold text-primary terminal-font">
              {time.toUTCString().split(" ").slice(4, 5).join(" ")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
