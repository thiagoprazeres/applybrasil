// GSAP Advanced Animations for ApplyBrasil
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

// Register plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Performance optimizations
ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
  autoRefreshEvents: "DOMContentLoaded,load,resize",
});

// Animation configurations
const animations = {
  // Hero entrance animation
  heroEntrance: (element: Element) => {
    const timeline = gsap.timeline();

    // Content stagger
    const contentItems = element.querySelectorAll("[data-animate-item]");
    timeline.fromTo(
      contentItems,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        clearProps: "transform,opacity",
      },
      "-=0.6",
    );

    return timeline;
  },

  // 3D Card hover effect
  card3D: (element: Element) => {
    const card = element as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  },
};

// Initialize animations
export function initAnimations(): void {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) return;

  // Hero entrance
  const heroSection = document.querySelector('[data-animate="hero-entrance"]');
  if (heroSection) {
    animations.heroEntrance(heroSection);
  }

  // 3D Cards
  const cards3D = document.querySelectorAll('[data-animate-3d="card"]');
  if (cards3D.length > 0) {
    console.log(`🎬 GSAP: Found ${cards3D.length} 3D cards`);
    cards3D.forEach((card) => {
      const cleanup = animations.card3D(card);
      // Store cleanup function for later
      (card as any)._gsapCleanup = cleanup;
    });
  }

  // Legacy animations (data-animate, data-animate-group, data-animate-item)
  const legacyElements = document.querySelectorAll("[data-animate]");
  const legacyGroups = document.querySelectorAll("[data-animate-group]");

  if (legacyElements.length > 0 || legacyGroups.length > 0) {
    console.log(
      `🎬 GSAP: Found ${legacyElements.length} legacy elements and ${legacyGroups.length} legacy groups`,
    );

    // Process individual elements
    legacyElements.forEach((el) => {
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

      gsap.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, ...base });
    });

    // Process groups with stagger
    legacyGroups.forEach((group) => {
      const items = Array.from(group.querySelectorAll("[data-animate-item]"));
      if (items.length > 0) {
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
              trigger: group,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
              scrub: false,
            },
          },
        );
      }
    });
  }
}

// Cleanup function
export function cleanupAnimations(): void {
  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Clean up 3D card listeners
  document.querySelectorAll('[data-animate-3d="card"]').forEach((card) => {
    const cleanup = (card as any)._gsapCleanup;
    if (cleanup) {
      cleanup();
      delete (card as any)._gsapCleanup;
    }
  });
}

// Re-initialize on dynamic content
export function reinitAnimations(): void {
  cleanupAnimations();
  initAnimations();
}
