import portrait from "../../assets/images/svc-hero-portrait.webp";
import daisyMark from "../../assets/images/daisy-mark.webp";
import { useCopy } from "../../lib/location.jsx";

export default function ServicesHero() {
  const t = useCopy();
  return (
    <section id="services-hero" className="relative bg-green-deep pt-[92px]">
      <div className="flex flex-col lg:h-[488px] lg:flex-row">
        {/* Left: dark panel; text overflows over the image's dark edge on desktop */}
        <div className="relative z-10 flex min-w-0 flex-col justify-center bg-[#041208] px-6 py-12 sm:px-10 lg:w-[37%] lg:py-0" data-reveal>
          <h1 className="font-serif text-[40px] font-medium leading-[1.05] tracking-[0.04em] text-gold sm:text-[52px] lg:whitespace-nowrap">
            {t("servicesPage.heroTitle")}
          </h1>

          <p className="mt-2 font-script text-[48px] leading-none text-cream sm:text-[64px] lg:whitespace-nowrap">
            {t("servicesPage.heroScript")}
          </p>

          {/* Daisy divider with gold rules */}
          <div className="mt-4 flex max-w-[460px] items-center gap-3">
            <span className="h-px flex-1 bg-gold/45" />
            <img src={daisyMark} alt="" aria-hidden="true" className="h-7 w-auto select-none sm:h-8" />
            <span className="h-px flex-1 bg-gold/45" />
          </div>

          <p className="mt-7 max-w-[440px] font-serif text-[20px] leading-[1.45] tracking-[0.04em] text-cream sm:text-[25px] lg:w-[650px] lg:max-w-none">
            {t("servicesPage.heroBody")}
          </p>
        </div>

        {/* Right: portrait with hard left edge softened for overlapping text */}
        <div className="relative h-[340px] w-full shrink-0 sm:h-[440px] lg:h-full lg:w-[63%]">
          <img
            src={portrait}
            alt="A guest enjoying a treatment at Margaret's Beauty Bar"
            className="h-full w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,#041208_0%,rgba(4,18,8,0.85)_9%,rgba(4,18,8,0.4)_20%,transparent_31%)]" />
        </div>
      </div>
    </section>
  );
}
