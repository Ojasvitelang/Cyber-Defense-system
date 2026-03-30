import { useEffect, useRef } from "react";

interface LogPanelProps {
  title: string;
  logs: string[];
  color?: string;
}

const LogPanel = ({ title, logs, color = "text-neon" }: LogPanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="border rounded-lg overflow-hidden neon-border bg-card flex flex-col">
      <div className="px-4 py-2 border-b border-border flex items-center gap-2 bg-muted/30">
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-danger/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">{title}</span>
      </div>
      <div
        ref={scrollRef}
        className="terminal-bg p-3 h-48 overflow-y-auto font-mono text-xs space-y-0.5 scroll-smooth"
      >
        {logs.length === 0 ? (
          <p className="text-muted-foreground/50 animate-blink">Waiting for data...</p>
        ) : (
          logs.map((log, i) => (
            <p key={i} className={`${color} opacity-90 leading-relaxed`}>
              <span className="text-muted-foreground/40 mr-2">{">"}</span>
              {log}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default LogPanel;
