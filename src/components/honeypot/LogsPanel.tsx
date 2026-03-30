import { Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const iptablesLogs = [
  '[UFW BLOCK] IN=eth0 OUT= SRC=185.220.101.45 DST=10.0.0.5 PROTO=TCP SPT=52341 DPT=22',
  '[UFW BLOCK] IN=eth0 OUT= SRC=103.41.204.122 DST=10.0.0.5 PROTO=TCP SPT=41234 DPT=22',
  '[UFW BLOCK] IN=eth0 OUT= SRC=45.142.212.61 DST=10.0.0.5 PROTO=TCP SPT=33891 DPT=80',
  '[UFW ALLOW] IN=eth0 OUT= SRC=192.168.1.10 DST=10.0.0.5 PROTO=TCP SPT=54321 DPT=443',
  '[UFW BLOCK] IN=eth0 OUT= SRC=194.26.192.45 DST=10.0.0.5 PROTO=TCP SPT=12345 DPT=3389',
  '[UFW BLOCK] IN=eth0 OUT= SRC=167.99.241.135 DST=10.0.0.5 PROTO=UDP SPT=53 DPT=53',
];

const squidLogs = [
  '1697315025.456 127 185.220.101.45 TCP_MISS/200 4567 GET http://malicious.site/payload.sh',
  '1697315087.234 89 103.41.204.122 TCP_DENIED/403 0 CONNECT evil.com:443',
  '1697315123.789 234 45.142.212.61 TCP_MISS/404 2341 GET http://exploit-db.com/shell.php',
  '1697315189.456 456 194.26.192.45 TCP_DENIED/403 0 POST http://c2server.net/beacon',
  '1697315234.123 67 167.99.241.135 TCP_MISS/200 1234 GET http://update-server.com/malware.exe',
];

export const LogsPanel = () => {
  return (
    <div className="glass-card border border-primary/20 p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/20">
        <Shield className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold terminal-font text-primary">FIREWALL & PROXY LOGS</h2>
      </div>

      <Tabs defaultValue="iptables" className="flex-1 flex flex-col">
        <TabsList className="glass-card border border-primary/20 w-fit">
          <TabsTrigger value="iptables" className="terminal-font data-[state=active]:bg-primary/20">
            IPTables
          </TabsTrigger>
          <TabsTrigger value="squid" className="terminal-font data-[state=active]:bg-primary/20">
            Squid Proxy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="iptables" className="flex-1 mt-4">
          <div className="glass-card border border-primary/10 p-4 bg-black/50 h-full overflow-y-auto">
            <div className="space-y-2 terminal-font text-xs">
              {iptablesLogs.map((log, index) => (
                <div key={index} className="hover:bg-primary/5 p-1 rounded transition-colors">
                  {log.includes('BLOCK') ? (
                    <>
                      <span className="text-destructive font-bold">[UFW BLOCK]</span>
                      <span className="text-foreground/70"> {log.split('] ')[1]}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-success font-bold">[UFW ALLOW]</span>
                      <span className="text-foreground/70"> {log.split('] ')[1]}</span>
                    </>
                  )}
                </div>
              ))}
              <span className="cursor-blink text-primary">█</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="squid" className="flex-1 mt-4">
          <div className="glass-card border border-primary/10 p-4 bg-black/50 h-full overflow-y-auto">
            <div className="space-y-2 terminal-font text-xs">
              {squidLogs.map((log, index) => (
                <div key={index} className="hover:bg-primary/5 p-1 rounded transition-colors">
                  {log.includes('DENIED') || log.includes('403') ? (
                    <span className="text-destructive">{log}</span>
                  ) : log.includes('404') ? (
                    <span className="text-warning">{log}</span>
                  ) : (
                    <span className="text-success">{log}</span>
                  )}
                </div>
              ))}
              <span className="cursor-blink text-primary">█</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
