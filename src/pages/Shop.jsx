import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, getCategories } from "../services/productService.js";
import ShopHero from "../components/shop/ShopHero.jsx";
import CategoryFilterBar from "../components/shop/CategoryFilterBar.jsx";
import ProductCard from "../components/shop/ProductCard.jsx";
import FeaturedStrip from "../components/shop/FeaturedStrip.jsx";
import QuickView from "../components/shop/QuickView.jsx";
import daisyMark from "../assets/images/daisy-mark.webp";

const GOLD_GRADIENT = "linear-gradient(180deg,#FAD669_0%,#CBA158_45%,#AE7D00_100%)";

// Fine film-grain texture — same technique the Bar Menu / Footer use.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Grid({ products, onQuickView }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
      ))}
    </div>
  );
}

export default function Shop() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null); // null = loading
  const [categories, setCategories] = useState(["All"]);
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [quick, setQuick] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    let alive = true;
    Promise.all([getProducts(), getCategories()]).then(([p, c]) => {
      if (!alive) return;
      setProducts(p);
      setCategories(c);
    });
    return () => {
      alive = false;
    };
  }, []);

  const featured = useMemo(() => products?.find((p) => p.featured) ?? null, [products]);

  const visible = useMemo(() => {
    if (!products) return [];
    const q = query.trim().toLowerCase();
    let list = products.filter(
      (p) =>
        (active === "All" || p.category === active) &&
        (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "newest") list = [...list].reverse();
    // "featured" keeps data order, with the featured product first.
    else list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [products, active, query, sort]);

  // The featured strip only breaks up the default, unfiltered view.
  const showStrip = active === "All" && !query.trim() && sort === "featured" && !!featured;
  const splitAt = Math.min(6, Math.ceil(visible.length / 2));

  return (
    <div className="relative w-full overflow-hidden bg-cream text-green-darkest">
      {/* Grain overlay across the cream area */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.5] mix-blend-multiply"
        style={{ backgroundImage: GRAIN, backgroundSize: "150px 150px" }}
      />

      <div className="relative z-10">
        <ShopHero />

        {/* Filters */}
        <div className="mt-2">
          <CategoryFilterBar
            categories={categories}
            active={active}
            onCategory={setActive}
            query={query}
            onQuery={setQuery}
            sort={sort}
            onSort={setSort}
          />
        </div>

        {/* Grid + featured strip */}
        <div className="mt-10 sm:mt-12">
          {products === null ? (
            <div className="flex min-h-[320px] items-center justify-center">
              <img src={daisyMark} alt="" aria-hidden="true" className="h-11 w-auto animate-pulse opacity-70" />
            </div>
          ) : visible.length === 0 ? (
            <p className="px-6 py-24 text-center font-serif text-[22px] italic text-olive">
              No products match “{query}” — try another search.
            </p>
          ) : showStrip ? (
            <>
              <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
                <Grid products={visible.slice(0, splitAt)} onQuickView={setQuick} />
              </div>
              <div className="my-14 sm:my-16">
                <FeaturedStrip product={featured} />
              </div>
              <div className="mx-auto max-w-[1240px] px-5 pb-4 sm:px-8">
                <Grid products={visible.slice(splitAt)} onQuickView={setQuick} />
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
              <Grid products={visible} onQuickView={setQuick} />
            </div>
          )}
        </div>

        {/* Bottom CTA — "Visit us in the salon" */}
        <section className="mx-auto mt-16 max-w-[1240px] px-6 pb-24 sm:mt-20 sm:px-8">
          <div
            className="relative overflow-hidden rounded-[28px] border border-gold/40 bg-green-deep px-8 py-14 text-center"
            data-reveal
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(199,162,83,0.12),transparent)]" />
            <div className="relative z-10 flex flex-col items-center">
              <img src={daisyMark} alt="" aria-hidden="true" className="h-10 w-auto opacity-90" />
              <p className="mt-4 font-script text-[38px] leading-none text-gold sm:text-[48px]">Prefer In Person?</p>
              <h2 className="mt-2 font-serif text-[28px] font-medium tracking-[0.03em] text-cream sm:text-[36px]">
                Visit Us In The Salon
              </h2>
              <p className="mt-4 max-w-[500px] font-serif text-[17px] leading-relaxed text-cream/80 sm:text-[19px]">
                Shop our full shelf in store, get a personal recommendation from our team, and make a
                day of it at the beauty bar.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="btn-sheen mt-7 rounded-full px-9 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-green-darkest"
                style={{ backgroundImage: GOLD_GRADIENT }}
              >
                Visit Us
              </button>
            </div>
          </div>
        </section>
      </div>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
