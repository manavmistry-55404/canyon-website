"use client";

import { useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";

export function MotionProvider() {
  useReveal();

  useEffect(() => {
    let context: { revert: () => void } | undefined;

    async function loadMotion() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
          const depth = Number(element.dataset.parallax || 18);
          gsap.to(element, {
            y: depth,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-progress-section]").forEach((section) => {
          const bar = section.querySelector<HTMLElement>("[data-progress-bar]");
          if (!bar) return;
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                end: "bottom 45%",
                scrub: true
              }
            }
          );
        });
      });
    }

    loadMotion();

    return () => context?.revert();
  }, []);

  return null;
}
