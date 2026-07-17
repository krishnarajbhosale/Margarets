import { useEffect, useState } from "react";
import { useCopy } from "../lib/location.jsx";

/**
 * Scroll-to-top — gold outline circle, bottom-right, appears after ~600px.
 * z-30 keeps it under the header (z-50) and the mobile menu overlay (z-40).
 */
export default function ScrollTopButton() {
  const [show, setShow] = useState(false);
  const t = useCopy();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("nav.backToTop")}
      className={`fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-green-darkest/85 text-gold shadow-lg shadow-black/30 backdrop-blur transition-all duration-300 hover:border-gold hover:bg-gold hover:text-green-darkest ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="m6 11 6-6 6 6" />
      </svg>
    </button>
  );
}
