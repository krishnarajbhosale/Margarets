import { useNavigate } from "react-router-dom";
import interior from "../assets/images/hero-interior.webp";
import heroUS from "../assets/images/usahero.webp";
import sparkle from "../assets/images/hero-sparkle.webp";
import { openBooking, useCopy, useLocationData } from "../lib/location.jsx";

// Each salon leads with its own photo; everything else is shared.
const HERO_IMG = {
  mx: { src: interior, width: 1084, height: 1120, alt: "Margaret's Beauty Bar interior" },
  us: { src: heroUS, width: 1170, height: 732, alt: "Margaret's Beauty Bar USA" },
};

function Sparkle({ className = "" }) {
  
}

export default function Hero() {
  const navigate = useNavigate();
  const { code, data } = useLocationData();
  const t = useCopy();
  const img = HERO_IMG[code];
  const goTo = (path) => () => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <section
      id="home"
      className="relative min-h-[580px] overflow-hidden bg-[radial-gradient(120%_120%_at_15%_30%,#10301f_0%,#041208_45%,#041208_100%)] lg:min-h-[660px]"
    >
      {/* Photo: full-bleed under a dark veil on mobile; right panel with a
          diagonal clip and softly faded left edge on desktop. */}
      <div className="absolute right-0 top-0 h-full w-full lg:w-[55%] lg:[clip-path:polygon(9%_0,100%_0,100%_100%,0_100%)]">
        <img
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          fetchpriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,8,0.92)_0%,rgba(4,18,8,0.82)_50%,rgba(4,18,8,0.9)_100%)] lg:bg-[linear-gradient(90deg,#041208_0%,rgba(4,18,8,0.35)_22%,transparent_45%)]" />
      </div>

      {/* Gold sparkle streak behind the hero text */}
      <img
        src={sparkle}
        alt=""
        aria-hidden="true"
        className="float-slow pointer-events-none absolute left-[1%] top-[-9%] z-0 h-full w-auto select-none opacity-100"
      />

      {/* Left content */}
      <div className="relative z-10 max-w-[640px] px-6 pb-16 pt-[140px] sm:px-10 lg:pt-[180px]">
        <p className="hero-rise mb-2 flex items-center gap-3 font-sans text-[13px] font-medium tracking-[0.25em] text-gold sm:text-[15px]">
          <Sparkle className="h-3.5 w-3.5" />
          {data.heroKicker}
        </p>
        <span className="hero-rise mb-7 block h-px w-12 bg-gold" />

        <h1 className="hero-rise hero-rise-1 font-display text-[42px] font-medium leading-[1.04] tracking-wide sm:text-[50px] lg:text-[66px]">
          <span className="block text-white">{t("hero.title1")}</span>
          <span className="block text-white">{t("hero.title2")}</span>
        </h1>
        <span className="hero-rise hero-rise-2 mt-1 flex items-center gap-3 font-accent text-[48px] leading-none text-gold sm:text-[78px] lg:text-[100px]">
          {data.heroAccent}
          <Sparkle className="h-5 w-5" />
        </span>

        <p className="hero-rise hero-rise-3 mb-9 mt-7 max-w-[420px] font-sans text-[16px] font-light leading-[1.7] text-muted">
          {data.heroTagline}
        </p>

        <div className="hero-rise hero-rise-4 flex flex-wrap items-center gap-4">
          {/* Primary → instant external booking */}
          <button
            onClick={() => openBooking(data.bookingUrl)}
            className="group flex items-center gap-2 rounded bg-gold px-7 py-3.5 font-sans text-[13px] tracking-[0.15em] text-green-darkest transition-colors hover:bg-gold-bright"
          >
            {t("hero.ctaPrimary")}
            <span className="transition-transform group-hover:translate-x-1">&#8594;</span>
          </button>
          {/* Secondary → internal browse-and-enquire flow */}
          <button
            onClick={goTo("/book")}
            className="rounded border border-gold px-7 py-3.5 font-sans text-[13px] tracking-[0.15em] text-cream transition-colors hover:bg-gold hover:text-green-darkest"
          >
            {t("hero.ctaSecondary")}
          </button>
        </div>
      </div>
    </section>
  );
}
