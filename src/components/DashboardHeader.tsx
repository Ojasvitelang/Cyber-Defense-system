const DashboardHeader = () => {
  return (
    <header className="relative py-8 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative z-10">
        <h1 className="font-display text-3xl md:text-5xl font-bold neon-text tracking-wider animate-pulse-neon">
          Adaptive Cyber Defense System
        </h1>
        <p className="mt-3 font-mono text-sm md:text-base text-muted-foreground tracking-[0.3em] uppercase">
          Monitoring &nbsp;|&nbsp; Detection &nbsp;|&nbsp; Deception
        </p>
        <div className="mt-4 mx-auto h-px w-64 bg-gradient-to-r from-transparent via-neon to-transparent opacity-60" />
      </div>
    </header>
  );
};

export default DashboardHeader;
