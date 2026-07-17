import { createContext, useCallback, useContext, useEffect, useState } from "react";
import daisyMark from "../assets/images/daisy-mark.webp";
import { COPY } from "./copy.js";

/**
 * Dual-location support: the brand runs two salons (Mexico / USA) that share
 * one site. Everything location-specific lives in LOCATIONS; components read
 * it through useLocationData(). The choice persists in localStorage.
 *
 * Language is derived from the branch: México → Spanish, USA → English. The
 * per-branch prose below is therefore already written in the branch's language;
 * shared UI chrome is translated per-language in copy.js via useCopy().
 */

const STORAGE_KEY = "mbb-location";

// Instant-booking: always route through the active location's bookingUrl so
// switching salons swaps the platform on the very next click.
export const openBooking = (url) => window.open(url, "_blank", "noopener,noreferrer");

// Build the outbound social/WhatsApp URLs for a location from its handles.
// Keeping this in one place means every icon/button stays country-correct.
export const socialLinks = (data) => ({
  instagram: `https://instagram.com/${data.instagram}`,
  tiktok: `https://www.tiktok.com/@${data.tiktok}`,
  whatsapp: `https://wa.me/${data.whatsapp}`,
});

// Map GPS coordinates to one of our two salons via a free, keyless reverse
// geocode. A lat/lng bounding box can't reliably tell the two countries apart
// near the border, so we resolve the actual country. Returns "mx", "us", or
// null (unknown / any other country → let the visitor choose).
async function countryFromCoords(lat, lng) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (!res.ok) return null;
    const { countryCode } = await res.json();
    if (countryCode === "MX") return "mx";
    if (countryCode === "US") return "us";
    return null;
  } catch {
    return null;
  }
}

export const LOCATIONS = {
  mx: {
    code: "mx",
    flag: "🇲🇽",
    label: "México",
    city: "11530 Ciudad de México, CDMX, México",
    address: "1337 Homero Avenue, Polanco (2ª Sección), Miguel Hidalgo",
    phone: "+52 55 2908 8580", // same as WhatsApp; change if the call line differs
    phoneHref: "tel:+525529088580",
    email: "mexico@margaretsbeautybar.com", // TODO: client to confirm
    hours: { week: "Mon–Sat · 9AM – 8PM", sun: "Sunday · 10AM – 6PM" }, // TODO: client to confirm
    // Social handles (no leading @). URLs are built by socialLinks() below.
    instagram: "margaretsbeautybar", // @margaretsbeautybar
    tiktok: "margarets.beautybar", // @margarets.beautybar
    whatsapp: "525529088580", // +52 55 2908 8580 (digits only, for wa.me)
    // Legal documents — client will supply the final PDFs. Drop them in
    // /public/legal/ (or replace with a hosted URL). Links are already wired
    // in the footer; they simply resolve once the files exist. TODO: client PDFs.
    privacyUrl: "/legal/privacy-policy.pdf",
    termsUrl: "/legal/terms-and-conditions.pdf",
    hasBar: true, // shows the drinks/refreshments menu page + nav/footer links
    servesAlcohol: true, // México serves alcohol → the beer bar item is shown
    // Booking platform for the México salon.
    bookingUrl: "https://www.welns.io/product/booking/WFRCHN000013093/Margaretsbeautybar?bk_src=WI104",
    bookingPlatform: "Welns",
    // Branch prose in Spanish (México → es).
    heroKicker: "BELLEZA. CÓCTELES. LUJO.",
    heroAccent: "Belleza & Cócteles",
    heroTagline:
      "Arte en uñas premium, cócteles y tratamientos de belleza en el corazón de la Ciudad de México.",
    footerTagline:
      "Un beauty bar de alto nivel donde los tratamientos premium se encuentran con cócteles de autor — creado para quienes disfrutan consentirse.",
    metaTitle: "Margaret's Beauty Bar — México",
    metaDescription:
      "Margaret's Beauty Bar en la Ciudad de México — tratamientos de belleza premium y cócteles de autor en un solo espacio de lujo.",
  },
  us: {
    code: "us",
    flag: "🇺🇸",
    label: "USA",
    city: "Winter Garden, FL 34787, United States",
    address: "12623 W Colonial Dr A",
    phone: "(352) 459-8223", // same as WhatsApp; change if the call line differs
    phoneHref: "tel:+13524598223",
    email: "usa@margaretsbeautybar.com", // TODO: client to confirm
    hours: { week: "Mon–Sat · 9AM – 8PM", sun: "Sunday · 10AM – 6PM" }, // TODO: client to confirm
    // Social handles (no leading @). URLs are built by socialLinks() below.
    instagram: "margaretsbeautybar.usa", // @margaretsbeautybar.usa
    tiktok: "margaretsbeautybar.usa", // @margaretsbeautybar.usa
    whatsapp: "13524598223", // +1 (352) 459-8223 (digits only, for wa.me)
    // Legal documents — client will supply the final PDFs. Drop them in
    // /public/legal/ (or replace with a hosted URL). Links are already wired
    // in the footer; they simply resolve once the files exist. TODO: client PDFs.
    privacyUrl: "/legal/privacy-policy.pdf",
    termsUrl: "/legal/terms-and-conditions.pdf",
    hasBar: true, // USA also has a menu — a no-alcohol "Refreshments" version
    servesAlcohol: false, // USA: no alcohol → the beer bar item is hidden
    // Booking platform for the USA salon.
    bookingUrl: "https://margaretsbeautybar.glossgenius.com/",
    bookingPlatform: "GlossGenius",
    heroKicker: "BEAUTY. BLISS. LUXURY.",
    heroAccent: "Beauty & Bliss",
    heroTagline:
      "Premium nail artistry, refreshments, and beauty treatments in the heart of Winter Garden, Florida.",
    footerTagline:
      "An elevated beauty bar where premium treatments meet signature refreshments — crafted for those who indulge.",
    metaTitle: "Margaret's Beauty Bar — USA",
    metaDescription:
      "Margaret's Beauty Bar in Winter Garden, FL — premium beauty treatments and an upscale social atmosphere in one elevated space.",
  },
};

/**
 * Inline SVG flags — Windows/Chrome doesn't render flag emoji (it falls back to
 * region-code letters), so we draw simplified flags instead. No image assets.
 */
export function Flag({ code, className = "h-4 w-6" }) {
  if (code === "mx") {
    return (
      <svg viewBox="0 0 24 16" className={className} role="img" aria-label="México">
        <rect width="24" height="16" rx="2" fill="#fff" />
        <path d="M2 0h6v16H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" fill="#006847" />
        <path d="M16 0h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6z" fill="#ce1126" />
        <circle cx="12" cy="8" r="1.6" fill="none" stroke="#8b5a2b" strokeWidth="0.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 16" className={className} role="img" aria-label="USA">
      <defs>
        <clipPath id="us-r"><rect width="24" height="16" rx="2" /></clipPath>
      </defs>
      <g clipPath="url(#us-r)">
        <rect width="24" height="16" fill="#fff" />
        {[0, 2, 4, 6, 8, 10, 12].map((y) => (
          <rect key={y} y={y * (16 / 13)} width="24" height={16 / 13} fill="#b22234" />
        ))}
        <rect width="11" height={16 * (7 / 13)} fill="#3c3b6e" />
        {[...Array(4)].map((_, r) =>
          [...Array(5)].map((_, c) => (
            <circle key={`${r}-${c}`} cx={1.4 + c * 2} cy={1.3 + r * 2} r="0.5" fill="#fff" />
          ))
        )}
      </g>
    </svg>
  );
}

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  // null = first visit, no choice made yet (splash is shown; site renders mx).
  const [code, setCode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "mx" || saved === "us" ? saved : null;
    } catch {
      return null;
    }
  });

  const setLocation = useCallback((next) => {
    setCode(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — session-only choice */
    }
  }, []);

  // First visit only: true while we try to auto-route by the visitor's location.
  // A prior saved choice, no Geolocation support, or a refusal all resolve this
  // to false — at which point the manual chooser (LocationSplash) takes over.
  const [geoPending, setGeoPending] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "mx" || saved === "us") return false;
    } catch {
      return false;
    }
    return typeof navigator !== "undefined" && "geolocation" in navigator;
  });

  useEffect(() => {
    if (!geoPending) return;
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setGeoPending(false);
      return;
    }
    let settled = false;
    const done = () => {
      if (!settled) {
        settled = true;
        setGeoPending(false);
      }
    };
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const c = await countryFromCoords(pos.coords.latitude, pos.coords.longitude);
        if (c) setLocation(c); // matched a salon → auto-route, skip the popup
        done();
      },
      done, // refused / unavailable → fall back to the chooser popup
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    );
  }, [geoPending, setLocation]);

  const active = code ?? "mx";
  const data = LOCATIONS[active];
  const lang = active === "mx" ? "es" : "en";

  // Per-location document metadata + <html lang>.
  useEffect(() => {
    document.title = data.metaTitle;
    document.documentElement.lang = lang;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", data.metaDescription);
  }, [data, lang]);

  return (
    <LocationContext.Provider value={{ code: active, chosen: code !== null, data, lang, geoPending, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

/** Active location: { code, chosen, data, lang, setLocation }. */
export function useLocationData() {
  return useContext(LocationContext);
}

/** Active language: 'es' for México, 'en' for USA. */
export function useLang() {
  return useContext(LocationContext).lang;
}

/**
 * Translation helper. `t('hero.ctaPrimary')` walks COPY[lang] by dot-path and
 * returns the string, or the key itself if missing (so gaps are obvious in dev).
 */
export function useCopy() {
  const lang = useLang();
  return (key) => {
    const val = key.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), COPY[lang]);
    return val ?? key;
  };
}

/**
 * Shown briefly on a first visit while we auto-detect the visitor's location.
 * Bilingual because the salon (and therefore the language) isn't chosen yet.
 */
function DetectingOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[linear-gradient(180deg,#041208_0%,#041208_55%,#041208_100%)] px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(199,162,83,0.10),transparent)]" />
      <div className="relative flex flex-col items-center text-center">
        <img src={daisyMark} alt="" aria-hidden="true" width="180" height="180" className="float-slow h-14 w-auto select-none" />
        <p className="mt-6 font-script text-[30px] leading-none text-gold sm:text-[38px]">Welcome · Bienvenidos</p>
        <p className="mt-3 font-sans text-[12px] tracking-[0.25em] text-gold-soft/80">
          FINDING YOUR NEAREST SALON · BUSCANDO TU SALÓN
        </p>
        <span className="mt-6 flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 animate-pulse rounded-full bg-gold [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-gold [animation-delay:200ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-gold [animation-delay:400ms]" />
        </span>
      </div>
    </div>
  );
}

/**
 * First-visit country chooser. Rendered on top of the page (the site is
 * visible and interactive underneath once a card is picked). Fades out and
 * never returns after a choice is stored. Only appears if geolocation
 * auto-routing was declined or inconclusive.
 */
export function LocationSplash() {
  const { chosen, geoPending, setLocation } = useLocationData();
  const [closing, setClosing] = useState(false);
  const [gone, setGone] = useState(false);

  if (gone) return null;
  // Auto-detecting the visitor's location: show a brief branded loader instead
  // of the chooser, so the popup only surfaces if geolocation is declined.
  if (geoPending && !chosen) return <DetectingOverlay />;
  if (chosen && !closing) return null;

  const pick = (c) => () => {
    setLocation(c);
    setClosing(true);
    setTimeout(() => setGone(true), 520);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[linear-gradient(180deg,#041208_0%,#041208_55%,#041208_100%)] px-6 transition-[opacity,transform] duration-500 ease-out ${
        closing ? "pointer-events-none scale-[1.03] opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(199,162,83,0.10),transparent)]" />

      <div className="relative flex flex-col items-center text-center">
        <div className="mb-6 flex items-center gap-3">
          <img src={daisyMark} alt="" aria-hidden="true" width="180" height="180" className="h-12 w-auto select-none" />
          <span className="flex flex-col items-start leading-none">
            <span className="font-script text-[34px] text-gold">Margaret's</span>
            <span className="pl-1 font-sans text-[10px] tracking-[0.45em] text-gold-soft">BEAUTY BAR</span>
          </span>
        </div>

        <p className="font-script text-[34px] leading-none text-gold sm:text-[42px]">Welcome · Bienvenidos</p>
        <h1 className="mt-2 font-serif text-[20px] font-medium tracking-[0.14em] text-cream sm:text-[26px]">
          CHOOSE YOUR SALON · ELIGE TU SALÓN
        </h1>
        <span className="mx-auto mt-4 mb-10 block h-px w-24 bg-gold/50" />

        <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
          <button
            onClick={pick("mx")}
            className="group w-[270px] rounded-lg border border-gold/40 bg-green-card/40 px-8 py-9 text-center transition-all duration-300 hover:scale-[1.02] hover:border-gold hover:shadow-[0_0_30px_rgba(199,162,83,0.18)]"
          >
            <Flag code="mx" className="mx-auto h-[42px] w-[62px] rounded shadow-md ring-1 ring-black/20" />
            <span className="mt-4 block font-serif text-[24px] font-medium tracking-[0.1em] text-cream">
              México
            </span>
            <span className="mt-2 block font-script text-[22px] leading-snug text-gold">
              Nuestra casa en México
            </span>
          </button>

          <button
            onClick={pick("us")}
            className="group w-[270px] rounded-lg border border-gold/40 bg-green-card/40 px-8 py-9 text-center transition-all duration-300 hover:scale-[1.02] hover:border-gold hover:shadow-[0_0_30px_rgba(199,162,83,0.18)]"
          >
            <Flag code="us" className="mx-auto h-[42px] w-[62px] rounded shadow-md ring-1 ring-black/20" />
            <span className="mt-4 block font-serif text-[24px] font-medium tracking-[0.1em] text-cream">
              USA
            </span>
            <span className="mt-2 block font-script text-[22px] leading-snug text-gold">
              Our home in the USA
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
