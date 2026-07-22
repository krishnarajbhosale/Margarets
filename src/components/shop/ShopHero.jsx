import daisyLine from "../../assets/images/daisy.webp";
import daisyMark from "../../assets/images/daisy-mark.webp";

/**
 * Shop hero — cream, airy, botanical. Script accent word over a large serif
 * heading, matching the Services / Book hero rhythm.
 */
export default function ShopHero() {
  return (
    <section className="relative overflow-hidden pt-[92px]">
      {/* Line-art daisies hugging the text (desktop) */}
      <img
        src={daisyLine}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 hidden h-[340px] -translate-y-1/2 -scale-x-100 select-none opacity-[0.18] lg:block"
      />
      <img
        src={daisyLine}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-[340px] -translate-y-1/2 select-none opacity-[0.18] lg:block"
      />

      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-6 py-16 text-center sm:py-20" data-reveal>
        {/* Daisy divider */}
        <div className="mb-7 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gold/50 sm:w-24" />
          <img src={daisyMark} alt="" aria-hidden="true" className="h-8 w-auto select-none" />
          <span className="h-px w-16 bg-gold/50 sm:w-24" />
        </div>

        <p className="font-script text-[42px] leading-none text-gold sm:text-[58px]">Curated</p>
        <h1 className="mt-1 font-serif text-[38px] font-medium leading-[1.05] tracking-[0.02em] text-green-darkest sm:text-[56px]">
          The Beauty Marketplace
        </h1>
        <p className="mt-6 max-w-[600px] font-serif text-[18px] italic leading-relaxed text-olive sm:text-[21px]">
          A hand-picked collection of the products we love and use at the bar — luxe skincare,
          hair rituals, and little indulgences, delivered to your door.
        </p>
      </div>
    </section>
  );
}
