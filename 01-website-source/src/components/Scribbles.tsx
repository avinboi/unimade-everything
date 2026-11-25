export function WavyUnderline({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 200 12" fill="none" aria-hidden>
      <path
        d="M2 8 C 20 2, 40 12, 58 7 S 90 2, 110 8 150 14, 198 5"
        stroke="url(#wave)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="wave" x1="0" x2="200" y1="0" y2="0">
          <stop stopColor="#67e8f9" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function StarDoodle({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l1.2 7.2L20 12l-6.8 2.8L12 22l-1.2-7.2L4 12l6.8-2.8L12 2z"
        stroke="#c4b5fd"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function CircleScribble({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 100 42"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 22 C 12 6, 88 4, 94 20 C 98 32, 18 40, 8 22"
        stroke="#c4b5fd"
        strokeWidth="1.8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const cuts = [
  {
    a: "M2 15 C 26 10, 54 20, 102 13",
    b: "M3 18 C 30 12, 60 22, 101 16",
  },
  {
    a: "M1 17 C 28 22, 58 11, 103 18",
    b: "M2 14 C 32 20, 62 9, 102 15",
  },
  {
    a: "M2 16 C 36 21, 68 10, 102 17",
    b: "M3 13 C 34 9, 70 20, 101 14",
  },
];

export function SlashedName({ children, variant = 0 }: { children: string; variant?: number }) {
  const cut = cuts[variant % cuts.length];
  return (
    <span className="relative inline-block px-1">
      <span className="hand-label text-lg tracking-tight text-zinc-200 sm:text-xl md:text-2xl">{children}</span>
      <svg
        className="pointer-events-none absolute left-[-3%] top-[28%] h-[48%] w-[106%]"
        viewBox="0 0 104 32"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={cut.a} stroke="#67e8f9" strokeWidth="2.8" strokeLinecap="round" />
        <path d={cut.b} stroke="#a855f7" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}
