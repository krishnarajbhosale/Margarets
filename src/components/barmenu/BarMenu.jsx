import bmTitle from "../../assets/images/bm-title.webp";
import bmDaisy from "../../assets/images/bm-daisy.webp";
import lightBulb from "../../assets/images/LightBulb.webp";
import daisyMark from "../../assets/images/daisy-mark.webp";
import beer from "../../assets/images/bm-beer.webp";
import coffee from "../../assets/images/bm-coffee.webp";
import tea from "../../assets/images/bm-tea.webp";
import soft from "../../assets/images/bm-soft.webp";
import water from "../../assets/images/bm-water.webp";
import { useCopy, useLocationData } from "../../lib/location.jsx";

// Both salons share this menu. Text comes from copy.js per language (es/en).
// The beer item only appears where alcohol is served (México); the USA version
// is a no-alcohol "Refreshments" menu. Images are shared; copy differs.
const ITEM_IMAGES = { beer, coffee, tea, soft, water };

const buildItems = (t, servesAlcohol) => {
  const keys = servesAlcohol
    ? ["beer", "coffee", "tea", "soft", "water"]
    : ["coffee", "tea", "soft", "water"];
  return keys.map((k) => ({
    img: ITEM_IMAGES[k],
    title: t(`barMenu.items.${k}.title`),
    tagline: t(`barMenu.items.${k}.tagline`),
    desc: t(`barMenu.items.${k}.desc`),
  }));
};

// Fine film-grain texture layered over each card (matches the design's noise).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Small gold leaf sprig that sits at the left end of each card's underline.
function Sprig() {
  return (
    <svg
      width="30"
      height="16"
      viewBox="0 0 30 16"
      className="shrink-0 text-gold"
      aria-hidden="true"
    >
      <path d="M30,8 H9" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M9,8 C5,7 3,4 1,2 C4,2.5 8,3.5 9,8 Z" fill="currentColor" />
      <path d="M9,8 C5,9 3,12 1,14 C4,13.5 8,12.5 9,8 Z" fill="currentColor" />
      <circle cx="9" cy="8" r="1.4" fill="currentColor" />
    </svg>
  );
}

function DaisyDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px flex-1 bg-gold/40" />
      <img src={bmDaisy} alt="" aria-hidden="true" className="h-10 w-auto shrink-0 select-none mix-blend-lighten sm:h-11" />
      <span className="h-px flex-1 bg-gold/40" />
    </div>
  );
}

export default function BarMenu() {
  const t = useCopy();
  const { data } = useLocationData();
  const ITEMS = buildItems(t, data.servesAlcohol);
  return (
    <section id="bar-menu" className="relative overflow-hidden bg-green-deep pt-[92px]">
      <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-10">
        {/* Top daisy divider */}
        <DaisyDivider className="pt-6" />

        {/* Title + subtitle. México uses the stylized "Bar Menu" artwork; the
            no-alcohol USA version renders a matching gold script title. */}
        <div className="mt-10 text-center" data-reveal>
          {data.servesAlcohol ? (
            <img
              src={bmTitle}
              alt="Bar Menu"
              className="mx-auto h-[70px] w-auto select-none mix-blend-lighten sm:h-[92px]"
            />
          ) : (
            <h1 className="font-script text-[56px] leading-none text-gold [text-shadow:0_0_18px_rgba(199,162,83,0.35)] sm:text-[80px]">
              {t("barMenu.title")}
            </h1>
          )}
          <p className="mt-5 font-serif text-[18px] tracking-[0.02em] text-cream/90 sm:text-[22px]">
            {t("barMenu.subtitle")}
          </p>
        </div>

        {/* Menu cards */}
        <div className="relative mt-12 flex flex-col gap-7 pb-4">
          {/* Hanging Edison bulb — cord, bulb, and warm glow baked into one
              image. Pinned to the viewport's left edge (independent of the
              centered container) so it hangs in the far-left margin at any width. */}
          <img
            src={lightBulb}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[calc(50%-50vw)] top-[-150px] z-20 hidden h-[560px] w-auto select-none lg:block"
          />

          {ITEMS.map((item) => (
            <article
              key={item.title}
              data-reveal
              data-reveal-delay={ITEMS.indexOf(item) * 70}
              className="hover-glow group relative isolate flex items-center gap-5 overflow-hidden rounded-[22px] border border-gold/45 bg-[linear-gradient(100deg,#0e1e16_0%,#081410_100%)] px-5 py-6 transition-colors hover:border-gold/75 sm:gap-8 sm:px-8"
            >
              {/* Film-grain texture */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.6] mix-blend-soft-light"
                style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
              />

              {/* Faint daisy watermark */}
              <img
                src={daisyMark}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute right-8 top-1/2 z-0 hidden h-[120px] w-auto -translate-y-1/2 select-none opacity-[0.09] sm:block lg:h-[140px]"
              />

              {/* Circular drink icon */}
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                decoding="async"
                width="300"
                height="300"
                className="relative z-10 h-[130px] w-[130px] shrink-0 rounded-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[172px] sm:w-[172px]"
              />

              {/* Copy */}
              <div className="relative z-10 min-w-0 flex-1">
                <h3 className="font-serif text-[30px] font-medium leading-none tracking-[0.06em] text-cream sm:text-[44px]">
                  {item.title}
                </h3>
                <div className="mt-2.5 flex items-center gap-2">
                  <Sprig />
                  <span className="h-px w-full max-w-[240px] bg-gold/70" />
                </div>
                <p className="mt-4 font-serif text-[17px] italic leading-snug text-cream/95 sm:text-[20px]">
                  {item.tagline}
                </p>
                <p className="mt-1.5 font-serif text-[17px] italic leading-snug text-cream/80 sm:text-[20px]">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom daisy divider */}
        <DaisyDivider className="py-10" />
      </div>
    </section>
  );
}
