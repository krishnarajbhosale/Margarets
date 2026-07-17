import { useNavigate } from "react-router-dom";
import daisyMark from "../assets/images/daisy-mark.webp";
import daisyLine from "../assets/images/daisy.webp";
import { useCopy } from "../lib/location.jsx";

/** Branded 404 — brand green + gold, daisy ornament, route back home. */
export default function NotFound() {
  const navigate = useNavigate();
  const t = useCopy();
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-green-deep px-6 pt-[92px] text-center">
      {/* Soft gold glow + line-art daisy backdrop */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(199,162,83,0.10),transparent)]" />
      <img
        src={daisyLine}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 hidden h-[380px] -translate-y-1/2 select-none opacity-30 lg:block"
      />

      <div className="relative flex flex-col items-center">
        <img src={daisyMark} alt="" aria-hidden="true" className="float-slow h-14 w-auto select-none" />
        <p className="hero-rise mt-6 font-serif text-[90px] font-medium leading-none text-gold sm:text-[120px]">
          404
        </p>
        <p className="hero-rise hero-rise-1 mt-2 font-script text-[34px] leading-none text-gold-soft sm:text-[44px]">
          {t("notFound.script")}
        </p>
        <h1 className="hero-rise hero-rise-2 mt-4 font-serif text-[22px] font-medium tracking-[0.18em] text-cream sm:text-[28px]">
          {t("notFound.title")}
        </h1>
        <p className="hero-rise hero-rise-3 mt-4 max-w-[420px] font-sans text-[15px] font-light leading-relaxed text-muted">
          {t("notFound.body")}
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn-sheen hero-rise hero-rise-4 mt-9 rounded-md bg-gold px-9 py-3.5 font-sans text-[13px] tracking-[0.16em] text-green-darkest hover:bg-gold-bright"
        >
          {t("notFound.cta")}
        </button>
      </div>
    </div>
  );
}
