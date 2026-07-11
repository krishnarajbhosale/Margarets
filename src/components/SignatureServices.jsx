import kidsNail from "../assets/images/kids-nail.webp";
import facial from "../assets/images/facial.webp";
import manicure from "../assets/images/manicure.webp";
import sectionBg from "../assets/images/services-bg.webp";
import iconKids from "../assets/images/icon-kids.webp";
import iconFacial from "../assets/images/icon-facial.webp";
import daisyMark from "../assets/images/daisy-mark.webp";
import { useCopy } from "../lib/location.jsx";

const SCALLOP =
  'path("M0,0 L320,0 L320,185 L206,185 C190,185 188,212 160,212 C132,212 130,185 114,185 L0,185 Z")';

const buildServices = (t) => [
  { img: kidsNail, icon: iconKids, name: t("signature.kidsName"), sub: t("signature.cardSub") },
  { img: facial, icon: iconFacial, name: t("signature.facialsName"), sub: t("signature.cardSub") },
  { img: kidsNail, icon: iconKids, name: t("signature.kidsName"), sub: t("signature.cardSub") },
  { img: manicure, icon: null, name: "", sub: "" },
];

function GoldIcon({ src, className }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        backgroundColor: "#c7a253",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export default function SignatureServices() {
  const t = useCopy();
  const SERVICES = buildServices(t);
  return (
    <section id="services" className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-10">
      {/* Decorative background (flowers, leaves, candle, towels) */}
      <img
        src={sectionBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(4,18,8,0.55)_0%,rgba(4,18,8,0.32)_45%,rgba(4,18,8,0.5)_100%)]" />

      {/* Header */}
      <div className="relative z-10 mb-2 text-center" data-reveal>
        <h2 className="font-script text-[40px] leading-none text-gold [text-shadow:0_0_18px_rgba(199,162,83,0.35)] sm:text-[56px]">
          {t("signature.title")}
        </h2>
        <a
          href="/services"
          className="mt-3 inline-block font-serif text-[16px] italic tracking-[0.2em] text-gold-soft transition-colors hover:text-gold sm:text-[19px] lg:absolute lg:right-0 lg:top-3 lg:mt-0"
        >
          {t("signature.viewAll")}
        </a>
      </div>

      <div className="relative z-10 mb-2 flex justify-center">
        <img src={daisyMark} alt="" aria-hidden="true" className="h-5 w-auto opacity-90" />
      </div>

      <p className="relative z-10 mb-12 text-center font-script text-[24px] text-gold-soft">
        {t("signature.subtitle")}
      </p>

      {/* Cards — fixed-width cards that wrap: 1-up on phones, 2-up on tablets,
          4-up on desktop. */}
      <div className="relative z-10 flex flex-wrap justify-center gap-5">
        {SERVICES.map((s, i) => (
          <div
            key={i}
            data-reveal
            data-reveal-delay={i * 90}
            className="hover-glow group relative h-[440px] w-[320px] overflow-hidden rounded-[18px] bg-[#0c1f16]"
          >
            <div className="h-[212px] w-full overflow-hidden" style={{ clipPath: SCALLOP }}>
              <img
                src={s.img}
                alt={s.name || "Service"}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col items-center px-5 pb-12 pt-3 text-center">
              {s.icon && <GoldIcon src={s.icon} className="mb-3 block h-9 w-9" />}
              {s.name && (
                <h3 className="mb-2 font-script text-[27px] leading-none text-gold">{s.name}</h3>
              )}
              {s.sub && (
                <p className="whitespace-pre-line font-sans text-[13px] font-light leading-snug text-muted">
                  {s.sub}
                </p>
              )}
            </div>

            <span className="pointer-events-none absolute inset-0 rounded-[18px] border border-gold/55" />
          </div>
        ))}
      </div>
    </section>
  );
}
