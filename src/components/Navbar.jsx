import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import daisyMark from "../assets/images/daisy-mark.webp";
import { scrollToId } from "../lib/scroll.js";
import { COPY } from "../lib/copy.js";
import { Flag, LOCATIONS, openBooking, useCopy, useLocationData } from "../lib/location.jsx";
import { useCart } from "../lib/cart.jsx";

// Shared site-wide link set. Each link is either a route ("/services"), an
// in-page section anchor ("services"), or the external booking platform
// (external: true). Section anchors that belong to the home page route the user
// there first, then smooth-scroll. The bar-menu and shop links only exist for
// the locations that offer them. The "book" link opens the active salon's
// external booking site (Welns / GlossGenius) — same destination as the CTA.
const buildLinks = (t, data) => [
  { key: "home", label: t("nav.home"), section: "home", home: true },
  { key: "services", label: t("nav.services"), to: "/services" },
  ...(data.hasBar ? [{ key: "beautyBar", label: t("nav.beautyBar"), to: "/menu" }] : []),
  ...(data.hasShop ? [{ key: "shop", label: t("nav.shop"), to: "/shop" }] : []),
  { key: "book", label: t("nav.book"), external: true },
  { key: "contact", label: t("nav.contact"), to: "/contact" },
];

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M6 8h12l-1 12.5H7L6 8Z" />
      <path d="M9 8V6.2a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

export default function Navbar({ variant = "outline" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { code, data, setLocation } = useLocationData();
  const t = useCopy();
  const { count, setOpen } = useCart();
  const overlayRef = useRef(null);
  const toggleRef = useRef(null);
  const other = LOCATIONS[code === "mx" ? "us" : "mx"];
  const navLinks = buildLinks(t, data);
  // The switch label reads in the DESTINATION's language ("Switch to USA" for
  // MX visitors), so pull it from the other salon's copy, not the current one.
  const switchLabel = COPY[other.code === "mx" ? "es" : "en"].nav.switchToOther;
  // The overlay's bottom CTA is the booking path on mobile; drop the duplicate
  // nav entry that triggers the same external booking site.
  const mobileLinks = navLinks.filter((l) => !l.external);

  // Route-aware nav state (home is a section anchor, so match "/" directly).
  const isActive = (link) =>
    link.to ? location.pathname === link.to : link.home ? location.pathname === "/" : false;

  // Instant booking → the active salon's external platform (Welns / GlossGenius).
  const instantBook = () => {
    openBooking(data.bookingUrl);
    setMenuOpen(false);
  };

  // Switch salon in place; leave the bar menu if the new location has none.
  const switchLocation = () => {
    setLocation(other.code);
    if (!other.hasBar && location.pathname === "/menu") navigate("/");
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the overlay whenever the route changes (covers back/forward too).
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // While open: Escape closes (focus returns to the toggle) and Tab is trapped
  // inside the overlay. The first link receives focus after the entrance.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const root = overlayRef.current;
      if (!root) return;
      const items = root.querySelectorAll("button, a[href]");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = setTimeout(() => {
      overlayRef.current?.querySelector("button")?.focus();
    }, 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
    };
  }, [menuOpen]);

  // Resolve a link/cta descriptor into a click handler. Always close the
  // mobile overlay first — it must never outlive a navigation.
  const go = (item) => () => {
    setMenuOpen(false);
    if (item.external) {
      openBooking(data.bookingUrl);
      return;
    }
    if (item.to) {
      navigate(item.to);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (item.section) {
      // A home-page section: route home first if we're elsewhere.
      if (item.home && location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToId(item.section), 80);
      } else {
        scrollToId(item.section);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-gold/20 bg-green-darkest/95 py-3 shadow-lg shadow-black/30 backdrop-blur"
            : "py-5"
        }`}
      >
        <div className="flex w-full items-center justify-between gap-4 px-6 sm:px-10">
          {/* Brand */}
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Margaret's Beauty Bar — home"
            className="flex shrink-0 items-center gap-3 leading-none"
          >
            <img src={daisyMark} alt="Margaret's Beauty Bar" className="h-10 w-auto sm:h-12" />
            <span className="flex flex-col items-start">
              <span className="font-script text-[26px] text-gold sm:text-[30px]">Margaret's</span>
              <span className="-mt-1 pl-1 font-sans text-[9px] tracking-[0.4em] text-gold-soft sm:text-[10px]">
                BEAUTY BAR
              </span>
            </span>
          </button>

          {/* Links — with SHOP the set is 6 wide, so the horizontal nav appears
              at xl and the hamburger covers 1024–1279 (tablet-landscape). */}
          <nav className="hidden items-center gap-6 xl:flex xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={go(link)}
                aria-current={isActive(link) ? "page" : undefined}
                className={`nav-link font-sans text-[13px] tracking-[0.18em] transition-colors hover:text-gold ${
                  isActive(link) ? "is-active" : "text-cream/90"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Cart — USA marketplace only. Opens the slide-over drawer; the
                badge reflects the live item count. Shown at every width. */}
            {data.hasShop && (
              <button
                onClick={() => setOpen(true)}
                aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-soft transition-all duration-300 hover:border-gold hover:text-gold hover:shadow-[0_0_14px_rgba(199,162,83,0.35)]"
              >
                <CartIcon />
                {count > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 font-sans text-[10px] font-semibold leading-none text-green-darkest">
                    {count}
                  </span>
                )}
              </button>
            )}

            {/* Location switcher: shows the OTHER salon's flag, tooltip in the
                destination's language. */}
            <button
              onClick={switchLocation}
              title={switchLabel}
              aria-label={switchLabel}
              className="hidden h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/40 transition-all duration-300 hover:scale-105 hover:border-gold hover:shadow-[0_0_14px_rgba(199,162,83,0.35)] sm:flex"
            >
              <Flag code={other.code} className="h-4 w-6 rounded-sm" />
            </button>

            {/* CTA → instant external booking. Hidden on phones — the mobile
                overlay menu carries its own booking CTA. Shown from sm up, next
                to the hamburger (≤xl) or the full nav (xl+). */}
            <button
              onClick={instantBook}
              className={
                variant === "outline"
                  ? "btn-sheen hidden shrink-0 rounded-md border border-olive bg-green-card/40 px-5 py-2.5 font-sans text-[12px] tracking-[0.12em] text-gold-soft hover:border-gold hover:bg-gold hover:text-green-darkest sm:block sm:px-7"
                  : "btn-sheen hidden shrink-0 rounded border border-gold px-5 py-2.5 font-sans text-[12px] tracking-[0.2em] text-gold hover:bg-gold hover:text-green-darkest sm:block sm:px-6"
              }
            >
              {t("nav.bookCta")}
            </button>

            {/* Mobile menu toggle — 48px tap target, morphs into an X */}
            <button
              ref={toggleRef}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-12 w-12 flex-col items-center justify-center gap-[5px] xl:hidden"
            >
              <span className={`h-px w-6 bg-gold transition-transform duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`h-px w-6 bg-gold transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-px w-6 bg-gold transition-transform duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — a SIBLING of the header, never its child: backdrop-filter
          on the scrolled header would otherwise become the containing block for
          this fixed overlay and clamp it to the bar (the "transparent menu over
          the footer" bug). Solid brand green so page content can never bleed
          through, z-40 so the bar + X above (z-50) stay usable. */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 xl:hidden ${menuOpen ? "" : "pointer-events-none"}`}
      >
        {/* Fully opaque deep-green backdrop */}
        <div
          className={`absolute inset-0 bg-green-darkest transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {menuOpen && (
          <>
            {/* Soft gold glow near the links */}
            <div className="absolute left-1/2 top-[38%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(199,162,83,0.12),transparent)]" />
            {/* Oversized daisy watermark, cropped into the bottom-right corner */}
            <img
              src={daisyMark}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -right-20 h-[340px] w-auto max-w-none select-none opacity-[0.05]"
            />
          </>
        )}

        {menuOpen && (
          <div className="relative flex h-full flex-col overflow-y-auto px-8 pt-24 pb-[calc(env(safe-area-inset-bottom)+1.75rem)]">
            {/* Links — index accents, gold serif, active dot; staggered rise-in */}
            <nav className="flex flex-1 flex-col justify-center">
              {mobileLinks.map((link, i) => {
                const active = isActive(link);
                return (
                  <button
                    key={link.key}
                    onClick={go(link)}
                    aria-current={active ? "page" : undefined}
                    style={{ animationDelay: `${120 + i * 70}ms` }}
                    className="hero-rise group flex w-full items-center gap-5 py-4 text-left"
                  >
                    <span className="font-sans text-[12px] tracking-[0.3em] text-gold/55">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif text-[30px] tracking-[0.05em] transition-colors ${
                        active ? "text-gold" : "text-cream/90 group-hover:text-gold"
                      }`}
                    >
                      {link.label}
                    </span>
                    {active && <span className="ml-auto h-2 w-2 rounded-full bg-gold" />}
                  </button>
                );
              })}
            </nav>

            {/* Bottom actions: booking CTA + salon switcher, pinned above the
                home-indicator via safe-area padding on the wrapper. */}
            <div
              className="hero-rise flex flex-col items-stretch gap-4"
              style={{ animationDelay: `${120 + mobileLinks.length * 70 + 80}ms` }}
            >
              <button
                onClick={instantBook}
                className="btn-sheen w-full rounded-md bg-gold px-8 py-4 font-sans text-[13px] tracking-[0.2em] text-green-darkest hover:bg-gold-bright"
              >
                {t("nav.bookCta").toUpperCase()} ↗
              </button>
              <button
                onClick={switchLocation}
                className="mx-auto flex min-h-12 items-center gap-3 rounded-full border border-gold/35 px-6 py-2.5 font-sans text-[12px] tracking-[0.18em] text-cream/85 transition-colors hover:border-gold hover:text-gold"
              >
                <Flag code={other.code} className="h-4 w-6 rounded-sm" />
                {switchLabel.toUpperCase()}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
