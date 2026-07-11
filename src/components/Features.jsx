import diamond from "../assets/icons/diamond.svg";
import cocktail from "../assets/icons/cocktail.svg";
import flower from "../assets/icons/flower.svg";
import chair from "../assets/icons/chair.svg";
import { useCopy } from "../lib/location.jsx";

// The second card differs by branch — cocktails (México) vs refreshments (USA) —
// which is captured by language, since a branch maps to one language.
const buildFeatures = (t) => [
  { icon: diamond, title: t("features.luxuryTitle"), text: t("features.luxuryText") },
  { icon: cocktail, title: t("features.socialTitle"), text: t("features.socialText") },
  { icon: flower, title: t("features.productsTitle"), text: t("features.productsText") },
  { icon: chair, title: t("features.artistsTitle"), text: t("features.artistsText") },
];

export default function Features() {
  const t = useCopy();
  const features = buildFeatures(t);
  return (
    <section className="grid grid-cols-2 gap-y-10 border-y border-gold/35 bg-[#041208] px-5 py-10 sm:px-10 lg:grid-cols-4 lg:gap-y-0">
      {features.map((f, i) => (
        <div
          key={i}
          data-reveal
          data-reveal-delay={i * 80}
          className="relative flex flex-col items-center px-3 text-center sm:px-[30px]"
        >
          <img
            src={f.icon}
            alt=""
            aria-hidden="true"
            width="38"
            height="38"
            loading="lazy"
            decoding="async"
            className="mb-3.5 h-[38px] w-[38px]"
          />
          <h3 className="mb-3 whitespace-pre-line font-sans text-[14px] font-medium leading-snug tracking-[0.15em] text-cream">
            {f.title}
          </h3>
          <p className="whitespace-pre-line font-sans text-[12.5px] font-light leading-relaxed text-muted">
            {f.text}
          </p>

          {i < features.length - 1 && (
            <span
              className={`absolute right-0 top-1.5 h-[88px] w-px bg-gold/30 ${
                // In the 2-col mobile grid, the odd column ends at the screen
                // edge — its divider only makes sense in the 4-col layout.
                i % 2 === 1 ? "hidden lg:block" : ""
              }`}
            />
          )}
        </div>
      ))}
    </section>
  );
}
