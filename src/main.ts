import "./style.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  const animateEl = (el: Element) => {
    const mode = (el as HTMLElement).dataset.animate ?? "fade-up";

    const base: gsap.TweenVars = {
      duration: 0.8,
      ease: "power2.out",
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
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
  };

  document.querySelectorAll("[data-animate]").forEach(animateEl);

  document.querySelectorAll("[data-animate-group]").forEach((group) => {
    const items = Array.from(group.querySelectorAll("[data-animate-item]"));
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}
