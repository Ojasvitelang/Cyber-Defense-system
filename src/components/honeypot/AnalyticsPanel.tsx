import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const credentialData = [
  { name: 'root', attempts: 145 },
  { name: 'admin', attempts: 98 },
  { name: 'pi', attempts: 76 },
  { name: 'ubuntu', attempts: 54 },
  { name: 'test', attempts: 42 },
];

const attackTimeData = [
  { time: '00:00', attacks: 23 },
  { time: '04:00', attacks: 45 },
  { time: '08:00', attacks: 67 },
  { time: '12:00', attacks: 89 },
  { time: '16:00', attacks: 123 },
  { time: '20:00', attacks: 98 },
];

const commandData = [
  { name: 'ls', value: 234 },
  { name: 'whoami', value: 189 },
  { name: 'cat /etc/passwd', value: 156 },
  { name: 'wget', value: 134 },
  { name: 'curl', value: 98 },
];

const COLORS = ['#00ffff', '#00ff88', '#ffcc00', '#ff3366', '#9966ff'];

export const AnalyticsPanel = () => {
  return (
    <div className="glass-card border border-primary/20 p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-primary/20">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold terminal-font text-primary">ANALYTICS</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        {/* Top Credentials */}
        <div className="glass-card border border-primary/10 p-3">
          <h3 className="text-sm font-semibold terminal-font text-primary mb-3">Top Credentials Targeted</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={credentialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                style={{ fontFamily: 'JetBrains Mono' }}
              />
              <YAxis
                stroke="hsl(var(--foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                style={{ fontFamily: 'JetBrains Mono' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  borderRadius: '0.5rem',
                  fontFamily: 'JetBrains Mono'
                }}
              />
              <Bar dataKey="attempts" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attack Timeline */}
        <div className="glass-card border border-primary/10 p-3">
          <h3 className="text-sm font-semibold terminal-font text-primary mb-3">Attack Frequency (24h)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={attackTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                style={{ fontFamily: 'JetBrains Mono' }}
              />
              <YAxis
                stroke="hsl(var(--foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                style={{ fontFamily: 'JetBrains Mono' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  borderRadius: '0.5rem',
                  fontFamily: 'JetBrains Mono'
                }}
              />
              <Line
                type="monotone"
                dataKey="attacks"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--success))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Command Distribution */}
        <div className="glass-card border border-primary/10 p-3">
          <h3 className="text-sm font-semibold terminal-font text-primary mb-3">Command Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={commandData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {commandData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  borderRadius: '0.5rem',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
