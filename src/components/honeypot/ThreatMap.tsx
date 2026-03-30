import { Globe, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface Attack {
  id: number;
  lat: number;
  lng: number;
  country: string;
  city: string;
}

export const ThreatMap = () => {
  const [attacks, setAttacks] = useState<Attack[]>([]);

  useEffect(() => {
    // Simulate attack locations
    const locations = [
      { lat: 39.9, lng: 116.4, country: 'China', city: 'Beijing' },
      { lat: 55.7, lng: 37.6, country: 'Russia', city: 'Moscow' },
      { lat: 40.7, lng: -74.0, country: 'USA', city: 'New York' },
      { lat: 52.5, lng: 13.4, country: 'Germany', city: 'Berlin' },
      { lat: -23.5, lng: -46.6, country: 'Brazil', city: 'São Paulo' },
      { lat: 35.7, lng: 139.7, country: 'Japan', city: 'Tokyo' },
    ];

    const interval = setInterval(() => {
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      const newAttack: Attack = {
        id: Date.now(),
        ...randomLoc,
      };
      setAttacks(prev => [...prev, newAttack].slice(-20));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card border border-primary/20 p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/20">
        <Globe className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold terminal-font text-primary">GLOBAL THREAT MAP</h2>
      </div>

      <div className="flex-1 relative bg-secondary/30 rounded-lg overflow-hidden">
        {/* Simplified world map representation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe className="w-64 h-64 text-primary/20" />
        </div>

        {/* Attack markers */}
        {attacks.map((attack, index) => (
          <div
            key={attack.id}
            className="absolute animate-ping"
            style={{
              left: `${((attack.lng + 180) / 360) * 100}%`,
              top: `${((90 - attack.lat) / 180) * 100}%`,
              animationDelay: `${index * 0.1}s`,
              animationDuration: '2s'
            }}
          >
            <MapPin className="w-4 h-4 text-destructive" />
          </div>
        ))}

        {/* Recent attacks list */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
          <div className="space-y-1 text-xs terminal-font">
            {attacks.slice(-5).reverse().map(attack => (
              <div key={attack.id} className="flex items-center gap-2 text-primary">
                <MapPin className="w-3 h-3" />
                <span>{attack.country} - {attack.city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
