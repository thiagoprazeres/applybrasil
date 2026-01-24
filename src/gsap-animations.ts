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
    
    // Background elements
    const bgElements = element.querySelectorAll('[data-bg-element]');
    if (bgElements.length) {
      timeline.fromTo(bgElements, 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.2, 
          ease: "power3.out",
          stagger: 0.2
        }
      );
    }
    
    // Content stagger
    const contentItems = element.querySelectorAll('[data-animate-item]');
    timeline.fromTo(contentItems,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        clearProps: "transform,opacity"
      },
      "-=0.6"
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
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  // Counter animation
  counter: (element: Element) => {
    const statValues = element.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
      const text = stat.textContent || '';
      const hasPercentage = text.includes('%');
      const hasMultiplier = text.includes('x');
      const number = parseFloat(text.replace(/[^0-9.]/g, ''));
      
      if (!isNaN(number)) {
        gsap.fromTo(stat,
          { textContent: 0 },
          {
            textContent: number,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function() {
              const current = Math.round(this.targets()[0].textContent);
              let displayText = current.toString();
              
              if (hasPercentage) displayText += '%';
              if (hasMultiplier) displayText += 'x';
              
              stat.textContent = displayText;
            }
          }
        );
      }
    });
  },

  // Floating animation
  float: (element: Element) => {
    gsap.to(element, {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });
  },

  // Slide animations
  slideLeft: (element: Element) => {
    gsap.fromTo(element,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        },
        clearProps: "transform,opacity"
      }
    );
  },

  slideRight: (element: Element) => {
    gsap.fromTo(element,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        },
        clearProps: "transform,opacity"
      }
    );
  },

  // Parallax effect
  parallax: (element: Element, speed: number = 0.5) => {
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  },

  // Text reveal
  textReveal: (element: Element) => {
    const text = element.textContent || '';
    element.textContent = '';
    
    gsap.to(element, {
      text: text,
      duration: 1.5,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      }
    });
  }
};

// Initialize animations
export function initAnimations(): void {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (prefersReducedMotion) return;

  console.log('🎬 GSAP: Initializing animations...');

  // Hero entrance
  const heroSection = document.querySelector('[data-animate="hero-entrance"]');
  if (heroSection) {
    console.log('🎬 GSAP: Found hero section');
    animations.heroEntrance(heroSection);
  }

  // 3D Cards
  const cards3D = document.querySelectorAll('[data-animate-3d="card"]');
  if (cards3D.length > 0) {
    console.log(`🎬 GSAP: Found ${cards3D.length} 3D cards`);
    cards3D.forEach(card => {
      const cleanup = animations.card3D(card);
      // Store cleanup function for later
      (card as any)._gsapCleanup = cleanup;
    });
  }

  // Counters
  const counters = document.querySelectorAll('[data-animate-counter]');
  if (counters.length > 0) {
    console.log(`🎬 GSAP: Found ${counters.length} counters`);
    counters.forEach(counter => {
      animations.counter(counter);
    });
  }

  // Floating elements
  const floatingElements = document.querySelectorAll('[data-animate-hover="float"]');
  if (floatingElements.length > 0) {
    console.log(`🎬 GSAP: Found ${floatingElements.length} floating elements`);
    floatingElements.forEach(element => {
      animations.float(element);
    });
  }

  // Slide animations
  const slideLeftElements = document.querySelectorAll('[data-animate-slide="left"]');
  const slideRightElements = document.querySelectorAll('[data-animate-slide="right"]');
  if (slideLeftElements.length > 0 || slideRightElements.length > 0) {
    console.log(`🎬 GSAP: Found ${slideLeftElements.length + slideRightElements.length} slide elements`);
    slideLeftElements.forEach(animations.slideLeft);
    slideRightElements.forEach(animations.slideRight);
  }

  // Parallax backgrounds
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length > 0) {
    console.log(`🎬 GSAP: Found ${parallaxElements.length} parallax elements`);
    parallaxElements.forEach(element => {
      const speed = parseFloat((element as HTMLElement).dataset.parallax || '0.5');
      animations.parallax(element, speed);
    });
  }

  // Text reveals
  const textElements = document.querySelectorAll('[data-animate-text]');
  if (textElements.length > 0) {
    console.log(`🎬 GSAP: Found ${textElements.length} text elements`);
    textElements.forEach(animations.textReveal);
  }

  // Legacy animations (data-animate, data-animate-group, data-animate-item)
  const legacyElements = document.querySelectorAll("[data-animate]");
  const legacyGroups = document.querySelectorAll("[data-animate-group]");
  
  if (legacyElements.length > 0 || legacyGroups.length > 0) {
    console.log(`🎬 GSAP: Found ${legacyElements.length} legacy elements and ${legacyGroups.length} legacy groups`);
    
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

      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, ...base },
      );
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

  console.log('✅ GSAP: Animation initialization complete');
}

// Cleanup function
export function cleanupAnimations(): void {
  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Clean up 3D card listeners
  document.querySelectorAll('[data-animate-3d="card"]').forEach(card => {
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
