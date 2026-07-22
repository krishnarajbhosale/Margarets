const GOLD_GRADIENT = "linear-gradient(180deg,#FAD669_0%,#CBA158_45%,#AE7D00_100%)";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-olive" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/**
 * Category pills + search + sort. Categories are passed in (derived from data,
 * so nothing is hardcoded). Active pill = gold gradient; inactive = gold outline.
 */
export default function CategoryFilterBar({
  categories,
  active,
  onCategory,
  query,
  onQuery,
  sort,
  onSort,
}) {
  return (
    <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
      {/* Search + sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-[320px]">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-olive">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search the shop…"
            aria-label="Search products"
            className="w-full rounded-full border border-gold/45 bg-white/50 py-3 pl-11 pr-5 font-sans text-[14px] text-green-darkest placeholder:text-olive/60 transition-colors focus:border-gold focus:outline-none"
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <label htmlFor="shop-sort" className="sr-only">Sort products</label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-full border border-gold/45 bg-white/50 py-3 pl-5 pr-11 font-sans text-[13px] uppercase tracking-[0.1em] text-green-darkest transition-colors focus:border-gold focus:outline-none sm:w-auto"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <Chevron />
        </div>
      </div>

      {/* Category pills */}
      <div
        className="mt-5 flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center"
        role="tablist"
        aria-label="Product categories"
      >
        {categories.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategory(cat)}
              style={isActive ? { backgroundImage: GOLD_GRADIENT } : undefined}
              className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2 font-sans text-[12px] uppercase tracking-[0.16em] transition-colors ${
                isActive
                  ? "border border-transparent text-green-darkest"
                  : "border border-gold/45 text-olive hover:border-gold hover:text-green-darkest"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
