import { useEffect, useRef, useState } from "react";
import daisyMark from "../../assets/images/daisy-mark.webp";
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
 * Slide-over cart (UI only). Line items with qty +/- and remove, subtotal, and
 * a gold Checkout that shows a tasteful "coming soon" state — never a dead
 * click. Locks scroll, traps focus, closes on Esc / backdrop when open.
 */
export default function CartDrawer() {
  const { items, subtotal, count, open, setOpen, updateQty, remove } = useCart();
  const [checkoutMsg, setCheckoutMsg] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    setCheckoutMsg(false);
    const focusTimer = setTimeout(() => panelRef.current?.querySelector("button")?.focus(), 60);
    const onKey = (e) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const els = panelRef.current?.querySelectorAll("button, [href], input");
      if (!els?.length) return;
      const first = els[0];
      const last = els[els.length - 1];
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
    };
  }, [open, setOpen]);

  return (
    <div
      className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-green-darkest/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-cream shadow-2xl shadow-black/40 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold/25 px-6 py-5">
          <h2 className="font-serif text-[24px] font-medium text-green-darkest">
            Your Cart <span className="text-olive">({count})</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-green-darkest transition-colors hover:border-gold hover:bg-gold hover:text-cream"
          >
            <Close />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <img src={daisyMark} alt="" aria-hidden="true" className="h-12 w-auto opacity-70" />
            <p className="mt-5 font-serif text-[20px] italic text-olive">Your cart is empty</p>
            <p className="mt-2 font-sans text-[14px] text-green-darkest/60">
              Add a little indulgence to get started.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full border border-gold px-7 py-2.5 font-sans text-[12px] uppercase tracking-[0.16em] text-olive transition-colors hover:bg-gold hover:text-cream"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-4">
                {items.map(({ product, qty }) => (
                  <li key={product.id} className="flex gap-4 border-b border-gold/15 pb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-16 shrink-0 rounded-[999px_999px_6px_6px] border border-gold/30 object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="font-serif text-[17px] leading-tight text-green-darkest">{product.name}</p>
                      <p className="font-serif text-[15px] italic text-olive">{formatPrice(product.price)}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-gold/40">
                          <button
                            onClick={() => updateQty(product.id, qty - 1)}
                            aria-label={`Decrease ${product.name} quantity`}
                            className="flex h-8 w-8 items-center justify-center text-[16px] text-green-darkest hover:text-olive"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-sans text-[13px] text-green-darkest">{qty}</span>
                          <button
                            onClick={() => updateQty(product.id, qty + 1)}
                            aria-label={`Increase ${product.name} quantity`}
                            className="flex h-8 w-8 items-center justify-center text-[16px] text-green-darkest hover:text-olive"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => remove(product.id)}
                          className="font-sans text-[11px] uppercase tracking-[0.14em] text-green-darkest/45 underline-offset-4 hover:text-olive hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-gold/25 px-6 py-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-olive">Subtotal</span>
                <span className="font-serif text-[24px] text-green-darkest">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 font-sans text-[12px] text-green-darkest/55">Shipping & taxes calculated at checkout.</p>
              {checkoutMsg ? (
                <p className="mt-4 flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-white/50 px-5 py-3.5 text-center font-sans text-[12px] uppercase tracking-[0.14em] text-olive">
                  <img src={daisyMark} alt="" aria-hidden="true" className="h-5 w-auto" />
                  Checkout coming soon
                </p>
              ) : (
                <button
                  onClick={() => setCheckoutMsg(true)}
                  className="btn-sheen mt-4 w-full rounded-full px-8 py-4 font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-green-darkest"
                  style={{ backgroundImage: GOLD_GRADIENT }}
                >
                  Checkout
                </button>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
