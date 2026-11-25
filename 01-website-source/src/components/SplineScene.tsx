"use client";

import type { Application } from "@splinetool/runtime";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

/**
 * Lazy Spline 3D scene: only mounts on wide, motion-friendly screens once it's near
 * the viewport, and fades in after the scene has loaded.
 */
export function SplineScene({
  scene,
  className = "",
  onReady,
}: {
  scene: string;
  className?: string;
  /** runs once the scene has loaded, before it fades in — e.g. to add objects via the runtime API */
  onReady?: (app: Application) => void | Promise<void>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className || "relative"}>
      {mount ? (
        <SplineBoundary>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <Spline
              scene={scene}
              onLoad={(app) => {
                // decorate before fading in; a failed decoration shouldn't hide the scene
                Promise.resolve(onReady?.(app))
                  .catch(() => {})
                  .finally(() => setLoaded(true));
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </SplineBoundary>
      ) : null}
    </div>
  );
}

/** react-spline throws during render if the scene can't load; keep that from taking the page down. */
class SplineBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
