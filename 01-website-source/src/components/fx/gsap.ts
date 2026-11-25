"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

type IntroWindow = Window & { __umIntroDone?: boolean };

/** Fires once the preloader has lifted, so hero intros don't play underneath it. */
export function onIntroDone(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if ((window as IntroWindow).__umIntroDone) {
    cb();
    return () => {};
  }
  window.addEventListener("um:intro-done", cb, { once: true });
  return () => window.removeEventListener("um:intro-done", cb);
}

export function markIntroDone() {
  (window as IntroWindow).__umIntroDone = true;
  window.dispatchEvent(new Event("um:intro-done"));
}

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
