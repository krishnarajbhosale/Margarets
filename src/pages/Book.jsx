import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVICE_CATEGORIES, categoryName, displayName } from "../data/services.js";
import FlourishDivider from "../components/services/FlourishDivider.jsx";
import daisyMark from "../assets/images/daisy-mark.webp";
import daisyLine from "../assets/images/daisy.webp";
import frameLine from "../assets/images/svc-frame-line.webp";
import { scrollToId } from "../lib/scroll.js";
import { openBooking, useCopy, useLang, useLocationData } from "../lib/location.jsx";

function DaisyDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 bg-gold/40 sm:w-24" />
      <img src={daisyMark} alt="" aria-hidden="true" className="h-8 w-auto select-none" />
      <span className="h-px w-16 bg-gold/40 sm:w-24" />
    </div>
  );
}

function Search() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function Book() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const t = useCopy();
  const lang = useLang();
  const { data } = useLocationData();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);

  const toggle = (name) =>
    setSelected((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));

  // Filter categories by the search query (matches English name and, on the
  // Spanish site, the translated display name too).
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SERVICE_CATEGORIES;
    return SERVICE_CATEGORIES.map((c) => ({
      ...c,
      services: c.services.filter(
        (s) => s.toLowerCase().includes(q) || displayName(s, lang).toLowerCase().includes(q)
      ),
    })).filter((c) => c.services.length > 0);
  }, [query, lang]);

  const total = SERVICE_CATEGORIES.reduce((n, c) => n + c.services.length, 0);

  const book = () => {
    navigate("/contact", { state: { services: selected } });
  };

  return (
    <div className="w-full bg-green-deep">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#041208_0%,#041208_55%,#041208_100%)] pt-[92px]">
        {/* Soft gold glow */}
        <div className="pointer-events-none absolute left-1/2 top-8 h-[340px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(199,162,83,0.10),transparent)]" />

        <div className="relative z-10 mx-auto flex max-w-[940px] flex-col items-center px-6 py-14 text-center sm:py-16">
          {/* Line-art daisies hugging the text left and right */}
          <img
            src={daisyLine}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-1/2 hidden h-[320px] -translate-y-1/2 -scale-x-100 select-none opacity-40 lg:block"
          />
          <img
            src={daisyLine}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-1/2 hidden h-[320px] -translate-y-1/2 select-none opacity-40 lg:block"
          />
          <DaisyDivider className="mb-7" />
          <p className="font-script text-[40px] leading-none text-gold sm:text-[54px]">
            {t("book.script")}
          </p>
          <h1 className="mt-2 font-serif text-[32px] font-medium tracking-[0.14em] text-cream sm:text-[42px]">
            {t("book.title")}
          </h1>
          <p className="mt-5 max-w-[620px] font-serif text-[18px] leading-relaxed text-cream/80 sm:text-[20px]">
            {t("book.intro").replace("{n}", total).replace("{c}", SERVICE_CATEGORIES.length)}
          </p>

          {/* Search */}
          <div className="relative mt-8 w-full max-w-[460px]">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70">
              <Search />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("book.search")}
              aria-label={t("book.search")}
              className="w-full rounded-full border border-gold/35 bg-green-card/50 py-3.5 pl-12 pr-5 font-sans text-[15px] text-cream placeholder:text-cream/35 backdrop-blur transition-colors focus:border-gold focus:outline-none"
            />
          </div>

          {/* Instant-booking sidedoor */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-green-card/40 px-5 py-2 font-sans text-[13px] text-cream/85">
            {t("book.bannerText")}
            <button onClick={() => openBooking(data.bookingUrl)} className="font-medium text-gold transition-colors hover:text-gold-bright">
              {t("book.bannerLink")}
            </button>
          </div>
        </div>

        {/* Gold sparkle line */}
        <div
          className="relative z-10 mx-auto h-[14px] max-w-[1100px] bg-repeat-x"
          style={{ backgroundImage: `url(${frameLine})`, backgroundSize: "auto 100%" }}
        />
      </section>

      {/* ===== Category quick-nav ===== */}
      <nav className="sticky top-[64px] z-30 border-b border-gold/15 bg-green-deep/95 px-4 py-3 backdrop-blur sm:top-[68px]">
        <div className="mx-auto flex max-w-[1240px] gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {SERVICE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => scrollToId(`cat-${c.id}`)}
              className="shrink-0 whitespace-nowrap rounded-full border border-gold/30 px-4 py-1.5 font-sans text-[12.5px] tracking-[0.08em] text-cream/80 transition-colors hover:border-gold hover:text-gold"
            >
              {categoryName(c, lang)}
              <span className="ml-1.5 text-gold/70">{c.services.length}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ===== Categories ===== */}
      <section className="px-5 pb-40 pt-6 sm:px-10">
        <div className="mx-auto max-w-[1240px]">
          {visible.length === 0 && (
            <p className="py-20 text-center font-serif text-[20px] italic text-cream/70">
              {t("book.noMatch").replace("{q}", query)}
            </p>
          )}

          {visible.map((cat) => (
            <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-[130px] pt-12">
              <div data-reveal>
                <FlourishDivider label={cat.script} className="mb-3" />
                <p className="mb-8 text-center font-sans text-[13px] tracking-[0.3em] text-gold-soft">
                  {categoryName(cat, lang).toUpperCase()} · {cat.services.length}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cat.services.map((s, si) => {
                  const on = selected.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggle(s)}
                      aria-pressed={on}
                      data-reveal
                      data-reveal-delay={Math.min(si, 8) * 40}
                      className={`hover-glow group flex items-center justify-between gap-3 rounded-md border px-5 py-3.5 text-left font-sans text-[14.5px] transition-all ${
                        on
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-gold/25 bg-green-card/35 text-cream/85 hover:border-gold/60 hover:text-cream"
                      }`}
                    >
                      <span>{displayName(s, lang)}</span>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[13px] leading-none transition-colors ${
                          on
                            ? "border-gold bg-gold text-green-darkest"
                            : "border-gold/40 text-gold/70 group-hover:border-gold"
                        }`}
                      >
                        {on ? "✓" : "+"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Sticky booking bar ===== */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
          selected.length ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="border-t border-gold/30 bg-green-darkest/95 px-5 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.45)] backdrop-blur sm:px-10">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="font-serif text-[16px] text-cream sm:text-[18px]">
              <span className="font-medium text-gold">{selected.length}</span>{" "}
              {selected.length === 1 ? t("book.selectedOne") : t("book.selectedMany")}
              <button
                onClick={() => setSelected([])}
                className="ml-4 font-sans text-[12px] tracking-[0.1em] text-cream/50 underline-offset-4 hover:text-gold hover:underline"
              >
                {t("book.clear")}
              </button>
            </p>
            <button
              onClick={book}
              className="w-full rounded-md bg-gold px-8 py-3.5 font-sans text-[13px] tracking-[0.16em] text-green-darkest transition-colors hover:bg-gold-bright sm:w-auto"
            >
              {t("book.continue")} &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
