// Smooth-scroll to an in-page section by id.
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Site-wide scroll-reveal engine.
 *
 * Any element with a `data-reveal` attribute starts hidden (opacity 0,
 * translateY 24px — see global.css) and transitions in the first time it
 * enters the viewport. An optional `data-reveal-delay="120"` staggers it.
 *
 * One IntersectionObserver handles every element; a MutationObserver picks up
 * nodes added later (lazy-loaded routes, conditional renders), so components
 * only need the attribute — no hooks, no wrappers.
 *
 * Respects prefers-reduced-motion: elements are shown immediately.
 */
let revealIO = null;
let revealMO = null;

function bindReveals(reduceMotion) {
  const els = document.querySelectorAll("[data-reveal]:not([data-reveal-bound])");
  for (const el of els) {
    el.setAttribute("data-reveal-bound", "");
    if (reduceMotion) {
      el.classList.add("is-revealed");
      continue;
    }
    const delay = el.dataset.revealDelay;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    revealIO.observe(el);
  }
}

export function initReveals() {
  if (typeof window === "undefined" || revealIO) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  revealIO = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          revealIO.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  bindReveals(reduceMotion);
  revealMO = new MutationObserver(() => bindReveals(reduceMotion));
  revealMO.observe(document.body, { childList: true, subtree: true });
}
