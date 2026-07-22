import { useCart, formatPrice } from "../../lib/cart.jsx";

/* Small gold gradient used on the shop's pill buttons (spec palette). */
const GOLD_GRADIENT = "linear-gradient(180deg,#FAD669_0%,#CBA158_45%,#AE7D00_100%)";

function CartPlus() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M6 6 5 3H2" />
    </svg>
  );
}

/**
 * Marketplace product card — the arched-top image frame is its signature.
 * Hover lifts the card, zooms the image, intensifies the gold border, and
 * reveals "Add to Cart". Sold-out items are muted and non-interactive.
 */
export default function ProductCard({ product, onQuickView }) {
  const { add } = useCart();
  const soldOut = !product.inStock;

  return (
    <article
      data-reveal
      className="group flex flex-col text-center"
    >
      {/* Arched image frame */}
      <div className="relative">
        <button
          type="button"
          onClick={() => onQuickView(product)}
          aria-label={`Quick view — ${product.name}`}
          className="block w-full overflow-hidden rounded-[999px_999px_16px_16px] border border-gold/45 bg-white/50 p-1.5 shadow-[0_12px_30px_rgba(4,18,8,0.07)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gold group-hover:shadow-[0_20px_44px_rgba(4,18,8,0.13)]"
        >
          <div className="overflow-hidden rounded-[999px_999px_10px_10px]">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className={`aspect-[4/5] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04] ${
                soldOut ? "opacity-55 grayscale-[35%]" : ""
              }`}
            />
          </div>
        </button>

        {/* Badge */}
        {product.badge && !soldOut && (
          <span
            className="absolute left-3 top-3 rounded-full px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-green-darkest"
            style={{ backgroundImage: GOLD_GRADIENT }}
          >
            {product.badge}
          </span>
        )}

        {/* Sold-out label */}
        {soldOut && (
          <span className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full border border-green-darkest/25 bg-cream/85 px-4 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-green-darkest/70">
            Sold Out
          </span>
        )}

        {/* Add-to-cart reveal (hidden until hover / always tappable on touch) */}
        {!soldOut && (
          <div className="pointer-events-none absolute inset-x-4 bottom-3 flex justify-center opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 max-lg:pointer-events-auto max-lg:opacity-100">
            <button
              type="button"
              onClick={() => add(product)}
              className="btn-sheen flex items-center gap-2 rounded-full px-6 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-green-darkest shadow-lg shadow-black/10"
              style={{ backgroundImage: GOLD_GRADIENT }}
            >
              <CartPlus />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* Copy */}
      <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.24em] text-olive">
        {product.category}
      </p>
      <button
        type="button"
        onClick={() => onQuickView(product)}
        className="mt-1.5 font-serif text-[22px] leading-tight text-green-darkest transition-colors hover:text-olive"
      >
        {product.name}
      </button>
      <p className="mt-1 font-serif text-[19px] italic text-olive">{formatPrice(product.price)}</p>
    </article>
  );
}
