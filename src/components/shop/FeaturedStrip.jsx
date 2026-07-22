import featuredImg from "../../assets/images/shop/featured.webp";
import flourishLeft from "../../assets/images/svc-flourish-left.webp";
import { useCart, formatPrice } from "../../lib/cart.jsx";

const GOLD_GRADIENT = "linear-gradient(180deg,#FAD669_0%,#CBA158_45%,#AE7D00_100%)";

/**
 * Full-width dark-green band that breaks up the grid, spotlighting one featured
 * product with an organic-masked image, script accent, and gold CTA.
 */
export default function FeaturedStrip({ product }) {
  const { add } = useCart();
  if (!product) return null;

  return (
    <section className="relative overflow-hidden bg-green-deep px-6 py-16 sm:px-10 sm:py-20">
      {/* Soft gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(199,162,83,0.10),transparent)]" />

      <div className="relative z-10 mx-auto grid max-w-[1120px] items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Organic-masked image */}
        <div className="order-1 flex justify-center md:order-none" data-reveal>
          <div
            className="group w-full max-w-[420px] overflow-hidden ring-1 ring-gold/40"
            style={{ borderRadius: "47% 53% 62% 38% / 45% 48% 52% 55%" }}
          >
            <img
              src={featuredImg}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Copy */}
        <div data-reveal data-reveal-delay="120">
          <img src={flourishLeft} alt="" aria-hidden="true" className="mb-4 h-10 w-auto select-none" />
          <p className="font-script text-[38px] leading-none text-gold sm:text-[48px]">Editor's Pick</p>
          <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.24em] text-gold-soft">{product.category}</p>
          <h2 className="mt-3 font-serif text-[34px] font-medium leading-[1.1] tracking-[0.02em] text-cream sm:text-[44px]">
            {product.name}
          </h2>
          <p className="mt-4 max-w-[460px] font-serif text-[17px] leading-relaxed text-cream/80 sm:text-[19px]">
            {product.description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <button
              onClick={() => add(product)}
              className="btn-sheen rounded-full px-8 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-green-darkest"
              style={{ backgroundImage: GOLD_GRADIENT }}
            >
              Add to Cart
            </button>
            <span className="font-serif text-[24px] italic text-gold-soft">{formatPrice(product.price)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
