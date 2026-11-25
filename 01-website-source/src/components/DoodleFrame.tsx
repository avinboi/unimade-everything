import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export function DoodleFrame({ src, alt, className = "" }: Props) {
  return (
    <span className={`doodle-frame ${className}`}>
      <span className="doodle-frame-inner">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          unoptimized
          className="doodle-frame-art"
          style={{ background: "transparent" }}
        />
      </span>
    </span>
  );
}
