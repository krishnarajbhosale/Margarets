import aboutImg from "../assets/images/indulgence.webp";
import aboutUS from "../assets/images/usa2.webp";
import daisy from "../assets/images/daisy.webp";
import { useCopy, useLocationData } from "../lib/location.jsx";

// The MX salon leads with the cocktail-service photo; the US one with its own space.
const ABOUT_IMG = {
  mx: { src: aboutImg, width: 1535, height: 1024, alt: "Relaxing hair wash with signature cocktails" },
  us: { src: aboutUS, width: 1356, height: 730, alt: "Inside Margaret's Beauty Bar USA" },
};

export default function Indulgence() {
  const { code } = useLocationData();
  const t = useCopy();
  const img = ABOUT_IMG[code];
  return (
    <section id="about" className="relative overflow-hidden bg-green-dark lg:h-[600px]">
      {/* Left full-bleed photo (top masked into the wave curve); stacked as a
          full-width band on mobile, absolute left panel on desktop. */}
      <img
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        loading="lazy"
        decoding="async"
        className="h-[300px] w-full object-cover sm:h-[400px] lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[55%]"
      />

      {/* Wave mask at the top: green fill above the curve + gold accent lines */}
      <svg
        className="absolute left-0 top-0 z-10 h-[90px] w-full sm:h-[130px] lg:h-[180px]"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,150 C200,80 440,48 640,50 C820,52 1050,30 1440,8 L1440,0 L0,0 Z"
          fill="#041208"
        />
        <path
          d="M0,150 C200,80 440,48 640,50 C820,52 1050,30 1440,8"
          fill="none"
          stroke="#c7a253"
          strokeWidth="2"
          opacity="0.8"
        />
        <path
          d="M0,138 C200,68 440,36 640,38 C820,40 1050,16 1440,-8"
          fill="none"
          stroke="#c7a253"
          strokeWidth="1"
          opacity="0.35"
        />
        <path
          d="M1080,60 C1240,38 1360,18 1520,-14"
          fill="none"
          stroke="#c7a253"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>

      {/* Decorative line-art daisy on the right (desktop only) */}
      <img
        src={daisy}
        alt=""
        aria-hidden="true"
        width="581"
        height="1145"
        loading="lazy"
        decoding="async"
        className="float-slow pointer-events-none absolute right-[24px] top-[223px] z-10 hidden h-[500px] w-auto select-none opacity-50 lg:block"
      />

      {/* Right content: in-flow below the photo on mobile, absolute right panel on desktop */}
      <div
        className="relative z-20 max-w-[560px] px-6 pb-14 pt-10 sm:px-10 lg:absolute lg:left-[56%] lg:top-1/2 lg:max-w-[420px] lg:-translate-y-1/2 lg:p-0 lg:pr-6"
        data-reveal
      >
        <p className="font-sans text-[16px] tracking-[0.06em] text-gold-soft sm:text-[18px]">
          {t("indulgence.kicker")}
        </p>
        <span className="mb-8 mt-4 block h-px w-16 bg-gold/70" />

        <h2 className="mb-8 font-serif font-medium leading-[1.12]">
          <span className="block text-[34px] tracking-[0.1em] text-cream sm:text-[44px] lg:whitespace-nowrap lg:text-[52px]">
            {t("indulgence.title1")}
          </span>
          <span className="block text-[34px] tracking-[0.1em] text-gold sm:text-[44px] lg:whitespace-nowrap lg:text-[52px]">
            {t("indulgence.title2")}
          </span>
        </h2>

        <p className="mb-6 max-w-[370px] font-sans text-[16px] font-light leading-[1.7] text-cream/85">
          {t("indulgence.body1")}
        </p>
        <p className="max-w-[370px] font-sans text-[16px] font-light leading-[1.7] text-cream/85">
          {t("indulgence.body2")}
        </p>
      </div>
    </section>
  );
}
