import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import daisyMark from "../assets/images/daisy-mark.webp";
import branch from "../assets/images/svc-spa-branch-t.webp";
import flourishLeft from "../assets/images/svc-flourish-left.webp";
import flourishRight from "../assets/images/svc-flourish-right.webp";
import spaDaisy from "../assets/images/svc-spa-daisy-t.webp";
import { scrollToId } from "../lib/scroll.js";
import { openBooking, socialLinks, useCopy, useLocationData } from "../lib/location.jsx";

// Fine film-grain texture (same as the Bar Menu cards).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// The bar-menu link only exists for the location that serves drinks.
const buildExplore = (t, hasBar) => [
  { key: "home", label: t("footer.lHome"), section: "home", home: true },
  { key: "services", label: t("footer.lServices"), to: "/services" },
  ...(hasBar ? [{ key: "menu", label: t("footer.lBarMenu"), to: "/menu" }] : []),
  { key: "book", label: t("footer.lBook"), to: "/book" },
  { key: "contact", label: t("footer.lContact"), to: "/contact" },
];

const buildServiceLinks = (t) => [
  { key: "nail", label: t("footer.sNail"), to: "/services", section: "nail-art" },
  { key: "lashes", label: t("footer.sLashes"), to: "/services", section: "eyelashes" },
  { key: "hair", label: t("footer.sHair"), to: "/services", section: "hairstyles" },
  { key: "spa", label: t("footer.sSpa"), to: "/services", section: "spa" },
  { key: "makeup", label: t("footer.sMakeup"), to: "/services", section: "makeup" },
];

/* ---- social + contact glyphs ---- */
function Instagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TikTok() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.28 2.03 1.42 3.24 3.5 3.5v2.42c-1.2.12-2.26-.28-3.5-1.03v5.83c0 3.06-2.28 5.28-5.2 5.28-2.86 0-5.05-2.2-5.05-5.05 0-2.98 2.35-5.14 5.6-4.86v2.55c-.4-.08-.83-.13-1.28-.1-1.3.09-2.13 1.02-2.06 2.42.06 1.24 1.02 2.13 2.28 2.06 1.28-.06 2.05-.98 2.05-2.4V3h3.16z" />
    </svg>
  );
}
function WhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.6 4.7-1.2A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 6.6 12.5l.7 2.5-2.6-.7A8 8 0 1 1 12 4zm-3 3.6c-.2 0-.5 0-.7.4-.2.4-.9.9-.9 2.2s.9 2.6 1 2.8c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.7-.3s-1.4-.7-1.6-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.4l.4-.5c.1-.2.2-.3.2-.5v-.4c0-.1-.6-1.5-.8-2-.2-.4-.4-.4-.6-.4z" />
    </svg>
  );
}
function Pin() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-[17px] w-[17px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function Phone() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-[17px] w-[17px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l3 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}
function Mail() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-[17px] w-[17px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function Clock() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-[17px] w-[17px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ColHeading({ children }) {
  return (
    <h3 className="mb-5 inline-flex flex-col font-sans text-[13px] font-medium tracking-[0.25em] text-gold">
      {children}
      <span className="mt-2 h-px w-8 bg-gold/50" />
    </h3>
  );
}

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useLocationData();
  const t = useCopy();
  const explore = buildExplore(t, data.hasBar);
  const serviceLinks = buildServiceLinks(t);
  // Country-correct social destinations (Instagram / TikTok / WhatsApp).
  const links = socialLinks(data);
  const socials = [
    { Icon: Instagram, label: "Instagram", href: links.instagram },
    { Icon: TikTok, label: "TikTok", href: links.tiktok },
    { Icon: WhatsApp, label: "WhatsApp", href: links.whatsapp },
  ];
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const go = (item) => () => {
    if (item.to && item.section) {
      if (location.pathname !== item.to) {
        navigate(item.to);
        setTimeout(() => scrollToId(item.section), 120);
      } else {
        scrollToId(item.section);
      }
      return;
    }
    if (item.to) {
      navigate(item.to);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (item.section) {
      if (item.home && location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToId(item.section), 120);
      } else {
        scrollToId(item.section);
      }
    }
  };

  const subscribe = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#041208_0%,#041208_35%,#041208_100%)]"
    >
      {/* Soft gold glow behind the brand block */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(199,162,83,0.09),transparent)]" />
      {/* Fine film grain so the surface feels crafted, not flat */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />
      {/* Gold leaf-branch corner flourishes */}
      <img src={branch} alt="" aria-hidden="true" className="pointer-events-none absolute -left-3 top-0 hidden w-[210px] select-none opacity-45 lg:block" />
      <img src={branch} alt="" aria-hidden="true" className="pointer-events-none absolute -right-3 top-0 hidden w-[210px] -scale-x-100 select-none opacity-45 lg:block" />
      {/* Top gold hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(199,162,83,0.7),transparent)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 sm:px-10">
        {/* Brand block */}
        <div className="flex flex-col items-center gap-5 pb-4 pt-14 text-center">
          <div className="relative flex items-center gap-3">
            <span className="pointer-events-none absolute left-2 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-gold/15 blur-2xl" />
            <img src={daisyMark} alt="Margaret's Beauty Bar" className="relative h-14 w-auto" />
            <span className="relative flex flex-col items-start leading-none">
              <span className="font-script text-[38px] text-gold">Margaret's</span>
              <span className="pl-1 font-sans text-[11px] tracking-[0.45em] text-gold-soft">BEAUTY BAR</span>
            </span>
          </div>
          <p className="max-w-[540px] font-serif text-[17px] italic leading-relaxed text-cream/80">
            {data.footerTagline}
          </p>
          <div className="mt-1 flex items-center gap-3">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold-soft transition-colors hover:border-gold hover:bg-gold hover:text-green-darkest"
              >
                <Icon />
              </a>
            ))}
          </div>
          <button
            onClick={() => openBooking(data.bookingUrl)}
            className="mt-2 rounded-md bg-gold px-8 py-3 font-sans text-[12px] tracking-[0.16em] text-green-darkest transition-colors hover:bg-gold-bright"
          >
            {t("footer.bookCta")}
          </button>
        </div>

        {/* Flourish + daisy monogram divider */}
        <div className="flex items-center justify-between gap-4 py-8 sm:gap-8">
          <img src={flourishLeft} alt="" aria-hidden="true" className="h-12 w-auto select-none sm:h-16" />
          <span className="hidden h-px max-w-[300px] flex-1 bg-gold/45 sm:block" />
          <img src={spaDaisy} alt="" aria-hidden="true" className="mx-auto h-16 w-auto select-none sm:h-20" />
          <span className="hidden h-px max-w-[300px] flex-1 bg-gold/45 sm:block" />
          <img src={flourishRight} alt="" aria-hidden="true" className="h-12 w-auto select-none sm:h-16" />
        </div>

        {/* Columns */}
        <div className="grid gap-10 pb-14 pt-2 sm:grid-cols-2 lg:grid-cols-4">
          {/* Explore */}
          <div data-reveal>
            <ColHeading>{t("footer.quickLinks")}</ColHeading>
            <ul className="flex flex-col gap-3">
              {explore.map((l) => (
                <li key={l.key}>
                  <button onClick={go(l)} className="font-sans text-[14.5px] font-light text-cream/80 transition-colors hover:text-gold">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div data-reveal data-reveal-delay="80">
            <ColHeading>{t("footer.ourServices")}</ColHeading>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((l) => (
                <li key={l.key}>
                  <button onClick={go(l)} className="font-sans text-[14.5px] font-light text-cream/80 transition-colors hover:text-gold">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit us */}
          <div data-reveal data-reveal-delay="160">
            <ColHeading>{t("footer.visitUs")}</ColHeading>
            <ul className="flex flex-col gap-4 font-sans text-[14.5px] font-light leading-relaxed text-cream/80">
              <li className="flex gap-3">
                <span className="text-gold"><Pin /></span>
                {data.address}, {data.city}
              </li>
              <li className="flex gap-3">
                <span className="text-gold"><Phone /></span>
                <a href={data.phoneHref} className="transition-colors hover:text-gold">{data.phone}</a>
              </li>
              <li className="flex gap-3">
                <span className="text-gold"><Mail /></span>
                <a href={`mailto:${data.email}`} className="break-all transition-colors hover:text-gold">{data.email}</a>
              </li>
              <li className="flex gap-3">
                <span className="text-gold"><Clock /></span>
                {data.hours.week}<br className="hidden xl:block" /> {data.hours.sun}
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div data-reveal data-reveal-delay="240">
            <ColHeading>{t("footer.stayInTouch")}</ColHeading>
            <p className="mb-5 font-sans text-[14px] font-light leading-relaxed text-cream/70">
              {t("footer.newsletterText")}
            </p>
            {subscribed ? (
              <p className="flex items-center gap-2 font-serif text-[16px] italic text-gold-soft">
                <img src={daisyMark} alt="" aria-hidden="true" className="h-6 w-auto" />
                {t("footer.subscribed")}
              </p>
            ) : (
              <form onSubmit={subscribe} className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.emailPh")}
                  aria-label={t("footer.emailPh")}
                  className="w-full rounded-md border border-gold/30 bg-green-card/40 py-3 pl-4 pr-14 font-sans text-[14px] text-cream placeholder:text-cream/35 transition-colors focus:border-gold focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 flex h-9 w-11 items-center justify-center rounded bg-gold text-green-darkest transition-colors hover:bg-gold-bright"
                >
                  &#8594;
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gold/15 py-7 text-center sm:flex-row sm:text-left">
          <p className="font-sans text-[12.5px] font-light text-cream/55">
            © {new Date().getFullYear()} Margaret's Beauty Bar. {t("footer.rights")}
          </p>
          {/* Legal links resolve to the client's PDFs (see LOCATIONS.*.privacyUrl
              / termsUrl). They open in a new tab once the files are provided. */}
          <p className="flex items-center gap-4 font-sans text-[12.5px] font-light text-cream/55">
            <a href={data.privacyUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">{t("footer.privacy")}</a>
            <span className="h-3 w-px bg-gold/25" />
            <a href={data.termsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">{t("footer.terms")}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
