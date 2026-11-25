import Image from "next/image";

/**
 * The Unimade flame, untouched — wrapped in a spinning violet/cyan halo,
 * a breathing glow, a flicker on the flame and a periodic light sweep.
 */
export function AnimatedLogo({ size = 44, className = "", priority = false }: { size?: number; className?: string; priority?: boolean }) {
  return (
    <span className={`logo-anim ${className}`} style={{ width: size, height: size }}>
      <span className="logo-halo" aria-hidden />
      <Image
        src="/brand/logo.png"
        alt="Unimade"
        width={size}
        height={size}
        unoptimized
        priority={priority}
        className="logo-img"
      />
      <span className="logo-flame" aria-hidden />
      <span className="logo-shine" aria-hidden />
    </span>
  );
}
