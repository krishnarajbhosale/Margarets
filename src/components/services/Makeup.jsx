import makeup from "../../assets/images/svc-makeup.webp";
import flourishRight from "../../assets/images/svc-flourish-right.webp";
import { useCopy } from "../../lib/location.jsx";

export default function Makeup() {
  const t = useCopy();
  return (
    <section id="makeup" className="relative overflow-hidden bg-green-deep px-6 pb-20 pt-8 sm:px-10">
      {/* Title */}
      <div className="relative mb-12 flex justify-center" data-reveal>
        <div className="text-center">
          <h2 className="font-script text-[52px] leading-none text-gold [text-shadow:0_0_18px_rgba(199,162,83,0.3)] sm:text-[72px]">
            {t("servicesPage.makeupTitle")}
          </h2>
          <span className="mx-auto mt-2 block h-px w-40 bg-gold/70 sm:w-56" />
        </div>
        <img
          src={flourishRight}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 hidden h-16 w-auto select-none opacity-90 md:block"
        />
      </div>

      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14" data-reveal>
        {/* Organic-masked photo */}
        <div className="flex justify-center">
          <div
            className="group w-full max-w-[460px] overflow-hidden ring-1 ring-cream/30"
            style={{ borderRadius: "47% 53% 62% 38% / 45% 48% 52% 55%" }}
          >
            <img
              loading="lazy"
              decoding="async"
              src={makeup}
              alt="Professional makeup application"
              className="h-[360px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[440px]"
            />
          </div>
        </div>

        {/* Copy */}
        <div>
          <h3 className="font-sans text-[28px] font-medium tracking-[0.06em] text-cream sm:text-[34px]">
            {t("servicesPage.makeupSocial")}
          </h3>
          <p className="mt-4 max-w-[520px] font-serif text-[16px] leading-[1.7] tracking-[0.04em] text-muted sm:text-[18px]">
            {t("servicesPage.makeupSocialText")}
          </p>

          <h3 className="mt-10 font-sans text-[28px] font-medium tracking-[0.06em] text-cream sm:text-[34px]">
            {t("servicesPage.makeupBridal")}
          </h3>
          <p className="mt-4 max-w-[520px] font-serif text-[16px] leading-[1.7] tracking-[0.04em] text-muted sm:text-[18px]">
            {t("servicesPage.makeupBridalText")}
          </p>
        </div>
      </div>
    </section>
  );
}
