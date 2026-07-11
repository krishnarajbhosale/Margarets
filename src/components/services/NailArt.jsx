import nail from "../../assets/images/svc-nail.webp";
import frameLine from "../../assets/images/svc-frame-line.webp";
import leafCorner from "../../assets/images/svc-leaf-corner.webp";
import { useCopy } from "../../lib/location.jsx";

export default function NailArt() {
  const t = useCopy();
  return (
    <section id="nail-art" className="bg-green-deep px-6 pb-16 pt-8 sm:px-10">
      {/* OUR SERVICES divider */}
      <div className="mb-6 text-center" data-reveal>
        <h2 className="inline-block font-sans text-[18px] font-medium tracking-[0.45em] text-gold sm:text-[20px]">
          {t("servicesPage.ourServices")} <span className="text-cream">{t("servicesPage.services")}</span>
        </h2>
        <span className="mx-auto mt-2 block h-px w-28 bg-gold/70" />
      </div>

      {/* Gold sparkle-framed panel */}
      <div className="relative mx-auto max-w-[1380px] px-5 py-10 sm:px-10 md:px-14 md:py-14" data-reveal>
        {/* Frame: sparkle lines top/bottom, thin gold sides, leaf corners */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-[14px] bg-contain bg-repeat-x"
          style={{ backgroundImage: `url(${frameLine})`, backgroundSize: "auto 100%" }}
        />
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px] -scale-y-100 bg-contain bg-repeat-x"
          style={{ backgroundImage: `url(${frameLine})`, backgroundSize: "auto 100%" }}
        />
        <span className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gold/35" />
        <span className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gold/35" />
        <img src={leafCorner} alt="" aria-hidden="true" className="pointer-events-none absolute -left-1 -top-1 h-12 w-auto -scale-x-100 select-none sm:h-16" />
        <img src={leafCorner} alt="" aria-hidden="true" className="pointer-events-none absolute -right-1 -top-1 h-12 w-auto select-none sm:h-16" />
        <img src={leafCorner} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-1 -left-1 h-12 w-auto -scale-100 select-none sm:h-16" />
        <img src={leafCorner} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-1 -right-1 h-12 w-auto -scale-y-100 select-none sm:h-16" />

        {/* Content: tall image + copy */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,34%)_minmax(0,1fr)] md:items-stretch md:gap-12">
          <div className="overflow-hidden border border-[#c9b27e]/70">
            <img
              loading="lazy"
              decoding="async"
              src={nail}
              alt="A fresh manicure in progress at Margaret's Beauty Bar"
              className="h-[300px] w-full object-cover sm:h-[380px] md:h-full"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="font-script text-[52px] leading-none text-gold [text-shadow:0_0_18px_rgba(199,162,83,0.25)] sm:text-[72px]">
              {t("servicesPage.nailTitle")}
            </h3>
            <p className="mt-5 max-w-[640px] font-serif text-[18px] leading-[1.7] tracking-[0.02em] text-cream/95 sm:text-[21px]">
              {t("servicesPage.nailTagline")}
            </p>

            <div className="mt-6 rounded-[22px] bg-[#46544c]/35 px-6 py-6 sm:px-9 sm:py-8">
              <p className="text-justify font-serif text-[16px] leading-[1.8] tracking-[0.01em] text-cream/90 sm:text-[19px]">
                {t("servicesPage.nailBody")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
