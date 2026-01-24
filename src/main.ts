import "./style.css";
import { initAnimations, cleanupAnimations, reinitAnimations } from "./gsap-animations";

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cleanupAnimations();
  } else {
    reinitAnimations();
  }
});

// Handle dynamic content (for SPA scenarios)
const observer = new MutationObserver((mutations) => {
  let shouldReinit = false;
  
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Check if any added nodes have animation attributes
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          const element = node as Element;
          if (element.hasAttribute('data-animate') || 
              element.hasAttribute('data-animate-group') ||
              element.querySelector('[data-animate], [data-animate-group]')) {
            shouldReinit = true;
          }
        }
      });
    }
  });
  
  if (shouldReinit) {
    reinitAnimations();
  }
});

// Start observing the entire document
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Set year without causing reflow
const yearEl = document.getElementById("year");
if (yearEl) {
  requestAnimationFrame(() => {
    yearEl.textContent = String(new Date().getFullYear());
  });
}

// Cleanup on page unload
window.addEventListener("beforeunload", cleanupAnimations);

// Export for potential external use
export { initAnimations, cleanupAnimations, reinitAnimations };
