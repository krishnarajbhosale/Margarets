import { useEffect, useRef, useState } from "react";
import { useCart, formatPrice } from "../../lib/cart.jsx";

const GOLD_GRADIENT = "linear-gradient(180deg,#FAD669_0%,#CBA158_45%,#AE7D00_100%)";

function Close() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

/**
 * Product quick view — cream modal, arched image, quantity + add to cart.
 * Locks body scroll, traps focus, closes on Esc and backdrop click.
 */
export default function QuickView({ product, onClose }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const soldOut = product && !product.inStock;

  // Reset quantity each time a new product opens.
  useEffect(() => setQty(1), [product]);

  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    const prevFocus = document.activeElement;
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 40);

    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const items = panelRef.current?.querySelectorAll("button, [href], input, select, textarea");
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
      prevFocus?.focus?.();
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="route-fade fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} — quick view`}
    >
      {/* Backdrop */}
      <button
        aria-label="Close quick view"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-green-darkest/70 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 grid max-h-[92vh] w-full max-w-[860px] overflow-y-auto rounded-[22px] border border-gold/40 bg-cream shadow-2xl shadow-black/40 sm:grid-cols-2"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-cream/80 text-green-darkest transition-colors hover:border-gold hover:bg-gold hover:text-cream"
        >
          <Close />
        </button>

        {/* Arched image */}
        <div className="p-4 sm:p-5">
          <div className="overflow-hidden rounded-[999px_999px_14px_14px] border border-gold/40 bg-white/50 p-1.5">
            <img
              src={product.image}
              alt={product.name}
              className={`aspect-[4/5] w-full rounded-[999px_999px_10px_10px] object-cover ${soldOut ? "opacity-60 grayscale-[35%]" : ""}`}
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col px-6 pb-8 pt-2 sm:justify-center sm:px-8 sm:pt-6">
          <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-olive">{product.category}</p>
          <h2 className="mt-2 font-serif text-[30px] font-medium leading-tight text-green-darkest sm:text-[36px]">
            {product.name}
          </h2>
          <p className="mt-2 font-serif text-[22px] italic text-olive">{formatPrice(product.price)}</p>
          <span className="mt-4 block h-px w-16 bg-gold/50" />
          <p className="mt-4 font-serif text-[16px] leading-relaxed text-green-darkest/80 sm:text-[17px]">
            {product.description}
          </p>

          {soldOut ? (
            <p className="mt-7 rounded-full border border-green-darkest/20 bg-white/40 px-5 py-3 text-center font-sans text-[12px] uppercase tracking-[0.18em] text-green-darkest/60">
              Currently Sold Out
            </p>
          ) : (
            <div className="mt-7 flex flex-wrap items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center rounded-full border border-gold/45">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[20px] text-green-darkest transition-colors hover:text-olive"
                >
                  −
                </button>
                <span className="w-8 text-center font-serif text-[18px] text-green-darkest" aria-live="polite">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[20px] text-green-darkest transition-colors hover:text-olive"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  add(product, qty);
                  onClose();
                }}
                className="btn-sheen flex-1 rounded-full px-8 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-green-darkest"
                style={{ backgroundImage: GOLD_GRADIENT }}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
