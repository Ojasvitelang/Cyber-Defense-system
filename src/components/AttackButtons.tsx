interface AttackButtonsProps {
  onSimulate: (type: "normal" | "ssh" | "web") => void;
  activeFlow: "normal" | "ssh" | "web" | null;
}

const buttons = [
  { type: "normal" as const, label: "Simulate Normal User Traffic", variant: "neon" },
  { type: "ssh" as const, label: "Simulate Attacker (SSH)", variant: "danger" },
  { type: "web" as const, label: "Simulate Web Attack", variant: "warning" },
];

const AttackButtons = ({ onSimulate, activeFlow }: AttackButtonsProps) => (
  <section className="px-4 py-6">
    <h2 className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4 text-center">
      Attack Simulation
    </h2>
    <div className="flex flex-wrap justify-center gap-3">
      {buttons.map((b) => {
        const isActive = activeFlow === b.type;
        const colorMap = {
          neon: {
            base: "border-neon/30 text-neon hover:bg-neon/10",
            active: "bg-neon/20 border-neon neon-border-strong",
          },
          danger: {
            base: "border-danger/30 text-danger hover:bg-danger/10",
            active: "bg-danger/20 border-danger danger-border",
          },
          warning: {
            base: "border-warning/30 text-warning hover:bg-warning/10",
            active: "bg-warning/20 border-warning",
          },
        };
        const c = colorMap[b.variant as keyof typeof colorMap];

        return (
          <button
            key={b.type}
            onClick={() => onSimulate(b.type)}
            className={`font-mono text-xs px-5 py-2.5 rounded-md border transition-all duration-300 tracking-wide ${
              isActive ? c.active : c.base
            }`}
          >
            {isActive ? "⏹ Stop" : "▶ " + b.label}
          </button>
        );
      })}
    </div>
  </section>
);

export default AttackButtons;
