import hair from "../../assets/images/svc-hairstyles.webp";
import { useCopy } from "../../lib/location.jsx";

export default function Hairstyles() {
  const t = useCopy();
  return (
    <section id="hairstyles" className="relative bg-green-deep">
      <div className="grid lg:grid-cols-2">
        {/* Left: layered green → olive panel with an organic wavy divider */}
        <div className="relative overflow-hidden bg-[#041208]">
          {/* Olive lower region + wavy top edge, drawn as one shape so there's no seam */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 640 900"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="hair-olive" x1="0" y1="0" x2="0.35" y2="1">
                <stop offset="0" stopColor="#a58548" />
                <stop offset="1" stopColor="#7c6031" />
              </linearGradient>
            </defs>
            <path
              d="M0,450 C60,492 120,600 220,592 C360,582 432,462 640,432 L640,900 L0,900 Z"
              fill="url(#hair-olive)"
            />
          </svg>

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between gap-16 px-5 py-12 sm:px-8 lg:gap-0 lg:px-10 lg:py-14">
            <div data-reveal>
              <h2 className="font-serif text-[32px] font-medium leading-[1.2] tracking-[0.06em] text-cream sm:text-[42px] lg:text-[46px]">
                {t("servicesPage.hairTitle1")}
              </h2>
              <p className="mt-7 max-w-[500px] font-serif text-[16px] leading-[1.85] tracking-[0.07em] text-cream/90 sm:text-[18px]">
                {t("servicesPage.hairText1")}
              </p>
            </div>

            <div data-reveal>
              <h2 className="font-serif text-[32px] font-medium leading-[1.2] tracking-[0.06em] text-cream sm:text-[42px] lg:text-[46px]">
                {t("servicesPage.hairTitle2")}
              </h2>
              <p className="mt-6 max-w-[520px] text-justify font-serif text-[16px] leading-[1.85] tracking-[0.07em] text-cream/90 sm:text-[18px]">
                {t("servicesPage.hairText2")}
              </p>
            </div>
          </div>
        </div>

        {/* Right: hair photo with large script overlay */}
        <div className="relative min-h-[460px] lg:min-h-[600px]">
          <img
            loading="lazy"
            decoding="async"
            src={hair}
            alt="Long, styled wavy hair"
            className="h-full w-full object-cover"
          />
          <span className="pointer-events-none absolute inset-x-4 bottom-5 text-center font-script text-[64px] leading-none text-gold [text-shadow:0_2px_14px_rgba(0,0,0,0.65)] sm:bottom-8 sm:text-[104px] lg:text-[140px]">
            {t("servicesPage.hairScript")}
          </span>
        </div>
      </div>
    </section>
  );
}
