import { useEffect, useState, useRef } from "react";
import { Terminal } from "lucide-react";

interface AttackLog {
  id: number;
  timestamp: string;
  ip: string;
  country: string;
  username: string;
  password: string;
  command: string;
  type: 'login' | 'command' | 'alert';
}

export const AttackFeed = () => {
  const [logs, setLogs] = useState<AttackLog[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate incoming attack data
    const mockAttacks = [
      { ip: '185.220.101.45', country: 'CN', username: 'root', password: 'admin123', command: 'ls -la' },
      { ip: '103.41.204.122', country: 'RU', username: 'admin', password: 'password', command: 'whoami' },
      { ip: '45.142.212.61', country: 'US', username: 'pi', password: 'raspberry', command: 'cat /etc/passwd' },
      { ip: '194.26.192.45', country: 'NL', username: 'root', password: '123456', command: 'wget malware.sh' },
      { ip: '167.99.241.135', country: 'DE', username: 'ubuntu', password: 'ubuntu', command: 'curl -O exploit.py' },
      { ip: '143.198.180.62', country: 'BR', username: 'test', password: 'test123', command: 'rm -rf /' },
    ];

    const interval = setInterval(() => {
      const randomAttack = mockAttacks[Math.floor(Math.random() * mockAttacks.length)];
      const types: ('login' | 'command' | 'alert')[] = ['login', 'command', 'alert'];
      const type = types[Math.floor(Math.random() * types.length)];

      const newLog: AttackLog = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...randomAttack,
        type,
      };

      setLogs(prev => [newLog, ...prev].slice(0, 50));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [logs]);

  const getLogColor = (type: string) => {
    switch (type) {
      case 'alert': return 'text-destructive';
      case 'command': return 'text-warning';
      default: return 'text-primary';
    }
  };

  return (
    <div className="glass-card border border-primary/20 p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/20">
        <Terminal className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold terminal-font text-primary">LIVE ATTACK FEED</h2>
        <span className="ml-auto text-xs text-muted-foreground terminal-font">
          {logs.length} events captured
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1 terminal-font text-sm scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
      >
        {logs.map((log, index) => (
          <div
            key={log.id}
            className={`animate-data-stream ${getLogColor(log.type)} hover:bg-primary/5 p-2 rounded transition-colors`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <span className="text-muted-foreground">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
            {' '}
            <span className="text-primary font-semibold">{log.ip}</span>
            {' '}
            <span className="text-muted-foreground">({log.country})</span>
            {' '}
            {log.type === 'login' && (
              <>
                <span className="text-warning">LOGIN ATTEMPT:</span>
                {' '}
                <span className="text-foreground">{log.username}</span>
                {' / '}
                <span className="text-foreground">{log.password}</span>
              </>
            )}
            {log.type === 'command' && (
              <>
                <span className="text-accent">EXECUTED:</span>
                {' '}
                <span className="text-foreground font-mono">{log.command}</span>
              </>
            )}
            {log.type === 'alert' && (
              <>
                <span className="text-destructive font-bold">ALERT:</span>
                {' '}
                <span className="text-destructive">Malicious activity detected</span>
              </>
            )}
            <span className="cursor-blink">_</span>
          </div>
        ))}
      </div>
    </div>
  );
};
