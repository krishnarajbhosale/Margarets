import footSpa from "../../assets/images/svc-foot-spa.webp";
import threading from "../../assets/images/svc-threading.webp";
import waxing from "../../assets/images/svc-waxing.webp";
import spaDaisy from "../../assets/images/svc-spa-daisy.webp";
import spaBranch from "../../assets/images/svc-spa-branch.webp";
import { useCopy } from "../../lib/location.jsx";

const buildCards = (t) => [
  {
    img: footSpa,
    title: t("servicesPage.spaFoot"),
    text: t("servicesPage.spaFootText"),
  },
  {
    img: threading,
    title: t("servicesPage.spaThreading"),
    text: t("servicesPage.spaThreadingText"),
  },
  {
    img: waxing,
    title: t("servicesPage.spaWaxing"),
    text: t("servicesPage.spaWaxingText"),
  },
];

export default function SpaCards() {
  const t = useCopy();
  const CARDS = buildCards(t);
  return (
    <section id="spa" className="relative overflow-hidden bg-green-deep pb-16">
      {/* Ornate gold corner branches at the very edges */}
      <img
        src={spaBranch}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 w-[220px] select-none mix-blend-lighten sm:w-[290px] lg:w-[330px]"
      />
      <img
        src={spaBranch}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-10 w-[220px] -scale-x-100 select-none mix-blend-lighten sm:w-[290px] lg:w-[330px]"
      />

      <div className="relative px-5 sm:px-8">
        {/* Center daisy monogram with gold rules */}
        <div className="mx-auto flex max-w-[1120px] items-center justify-center gap-3 pt-[130px] pb-4 sm:pt-[170px]">
          <span className="h-px flex-1 bg-gold/45" />
          <img
            src={spaDaisy}
            alt=""
            aria-hidden="true"
            className="h-[86px] w-auto shrink-0 select-none mix-blend-lighten sm:h-[104px]"
          />
          <span className="h-px flex-1 bg-gold/45" />
        </div>

        {/* Three outlined cards with framed photos */}
        <div className="mt-6 grid gap-6 md:grid-cols-3 lg:gap-8">
          {CARDS.map((c) => (
            <article
              key={c.title}
              data-reveal
              data-reveal-delay={CARDS.indexOf(c) * 90}
              className="hover-glow group flex flex-col border border-gold/40 px-5 pb-9 pt-5 text-center transition-colors hover:border-gold/70 sm:px-6"
            >
              <div className="overflow-hidden border border-gold/40 p-1">
                <img
                  loading="lazy"
                  decoding="async"
                  src={c.img}
                  alt={c.title}
                  className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[300px]"
                />
              </div>
              <h3 className="mt-6 font-script text-[42px] leading-none text-gold [text-shadow:0_0_14px_rgba(199,162,83,0.25)] sm:text-[52px]">
                {c.title}
              </h3>
              <p className="mt-5 font-serif text-[15px] leading-[1.8] tracking-[0.05em] text-cream/85 sm:text-[16px]">
                {c.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
