import { HoneypotDashboardHeader } from "@/components/honeypot/HoneypotDashboardHeader";
import { AttackFeed } from "@/components/honeypot/AttackFeed";
import { ThreatMap } from "@/components/honeypot/ThreatMap";
import { AnalyticsPanel } from "@/components/honeypot/AnalyticsPanel";
import { SessionPlayback } from "@/components/honeypot/SessionPlayback";
import { LogsPanel } from "@/components/honeypot/LogsPanel";

const HumanInTheLoop = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background via-background to-background/95">
      {/* Scan line effect overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="scan-line absolute w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <HoneypotDashboardHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Live Attack Feed - Takes 2 columns on large screens */}
        <div className="xl:col-span-2 h-[500px]">
          <AttackFeed />
        </div>

        {/* Threat Map - Takes 1 column */}
        <div className="h-[500px]">
          <ThreatMap />
        </div>
      </div>

      {/* Analytics Panel - Full width */}
      <div className="mb-6 h-[350px]">
        <AnalyticsPanel />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Session Playback */}
        <div className="h-[450px]">
          <SessionPlayback />
        </div>

        {/* Firewall & Proxy Logs */}
        <div className="h-[450px]">
          <LogsPanel />
        </div>
      </div>
    </div>
  );
};

export default HumanInTheLoop;
