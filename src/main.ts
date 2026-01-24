import "./style.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Use requestAnimationFrame for DOM updates
const raf = requestAnimationFrame;

// Set year without causing reflow
const yearEl = document.getElementById("year");
if (yearEl) {
  raf(() => {
    yearEl.textContent = String(new Date().getFullYear());
  });
}

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Batch DOM reads and writes to avoid forced reflows
if (!prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  // Optimize ScrollTrigger performance
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
    autoRefreshEvents: "DOMContentLoaded,load,resize",
  });

  // Cache elements to avoid repeated DOM queries
  const animatedElements = document.querySelectorAll("[data-animate]");
  const animatedGroups = document.querySelectorAll("[data-animate-group]");

  // Process animations in batches to avoid layout thrashing
  raf(() => {
    // Batch read operations
    const elementsToAnimate = Array.from(animatedElements);
    const groupsToProcess = Array.from(animatedGroups).map(group => ({
      group,
      items: Array.from(group.querySelectorAll("[data-animate-item]"))
    })).filter(({ items }) => items.length > 0);

    // Batch write operations
    elementsToAnimate.forEach((el) => {
      const mode = (el as HTMLElement).dataset.animate ?? "fade-up";

      const base: gsap.TweenVars = {
        duration: 0.6,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
          scrub: false,
        },
      };

      if (mode === "fade") {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, ...base });
        return;
      }

      if (mode === "scale") {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, ...base },
        );
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, ...base },
      );
    });

    groupsToProcess.forEach(({ items }) => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.06,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: items[0].parentElement,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
            scrub: false,
          },
        },
      );
    });
  });

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    raf(() => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
  });
}
