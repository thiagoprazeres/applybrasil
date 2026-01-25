// GSAP Advanced Animations for ApplyBrasil
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Performance optimizations
ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
  autoRefreshEvents: "DOMContentLoaded,load,resize",
});

// Animation configurations
const animations = {
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

  // Legacy animations (data-animate, data-animate-item)
  const legacyElements = document.querySelectorAll("[data-animate]");

  if (legacyElements.length > 0) {
    console.log(
      `🎬 GSAP: Found ${legacyElements.length} legacy elements`,
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
