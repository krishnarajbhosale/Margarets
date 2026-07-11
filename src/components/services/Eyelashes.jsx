import FlourishDivider from "./FlourishDivider.jsx";
import lashes from "../../assets/images/svc-eyelashes.webp";
import { useCopy } from "../../lib/location.jsx";

const buildLooks = (t) => [
  {
    title: t("servicesPage.lashNatural"),
    text: t("servicesPage.lashNaturalText"),
  },
  {
    title: t("servicesPage.lashHybrid"),
    text: t("servicesPage.lashHybridText"),
  },
  {
    title: t("servicesPage.lashVolume"),
    text: t("servicesPage.lashVolumeText"),
  },
  {
    title: t("servicesPage.lashLift"),
    text: t("servicesPage.lashLiftText"),
  },
];

export default function Eyelashes() {
  const t = useCopy();
  const LOOKS = buildLooks(t);
  return (
    <section id="eyelashes" className="bg-green-deep px-6 py-14 sm:px-10">
      <div data-reveal>
        <FlourishDivider className="mb-10 sm:mb-14" />
      </div>

      {/* Header: script title left, script intro right */}
      <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10" data-reveal>
        <h2 className="font-script text-[60px] leading-none text-gold [text-shadow:0_0_22px_rgba(199,162,83,0.3)] sm:text-[84px] lg:text-[96px]">
          {t("servicesPage.lashesTitle")}
        </h2>
        <p className="text-center font-script text-[28px] leading-[1.55] tracking-[0.01em] text-gold-soft sm:text-[38px] lg:text-[42px]">
          {t("servicesPage.lashesIntro")}
        </p>
      </div>

      {/* Content: photo left, look cards right */}
      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        {/* The photo is portrait; at lg it is taken out of flow so the row is
            sized by the cards column instead of the image's intrinsic height. */}
        <div className="group relative h-[340px] overflow-hidden rounded-sm sm:h-[440px] lg:h-auto">
          <img
            loading="lazy"
            decoding="async"
            src={lashes}
            alt="Eyelash extension application"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:absolute lg:inset-0 lg:object-top"
          />
        </div>

        <div className="flex flex-col gap-5">
          {LOOKS.map((l) => (
            <div
              key={l.title}
              data-reveal
              data-reveal-delay={LOOKS.indexOf(l) * 80}
              className="hover-glow rounded-sm border border-gold/60 px-7 py-6 transition-colors hover:border-gold"
            >
              <h3 className="mb-2 font-serif text-[26px] font-medium tracking-[0.03em] text-cream sm:text-[30px]">
                {l.title}
              </h3>
              <p className="font-sans text-[14px] font-light leading-[1.6] text-muted sm:text-[15px]">
                {l.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
