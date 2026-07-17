import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { openBooking, socialLinks, useCopy, useLang, useLocationData } from "../lib/location.jsx";
import { displayName } from "../data/services.js";
import indulgence from "../assets/images/indulgence.webp";
import daisyMark from "../assets/images/daisy-mark.webp";
import daisyLine from "../assets/images/daisy.webp";
import leafCorner from "../assets/images/svc-leaf-corner.webp";
import flourishLeft from "../assets/images/svc-flourish-left.webp";
import flourishRight from "../assets/images/svc-flourish-right.webp";
import frameLine from "../assets/images/svc-frame-line.webp";
import hennaLeaf from "../assets/images/svc-henna-leaf.webp";

/* ---- little inline icons ---- */
function Pin() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function Phone() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l3 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}
function Mail() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function Clock() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/* ---- social glyphs (match the footer) ---- */
function Instagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TikTok() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.28 2.03 1.42 3.24 3.5 3.5v2.42c-1.2.12-2.26-.28-3.5-1.03v5.83c0 3.06-2.28 5.28-5.2 5.28-2.86 0-5.05-2.2-5.05-5.05 0-2.98 2.35-5.14 5.6-4.86v2.55c-.4-.08-.83-.13-1.28-.1-1.3.09-2.13 1.02-2.06 2.42.06 1.24 1.02 2.13 2.28 2.06 1.28-.06 2.05-.98 2.05-2.4V3h3.16z" />
    </svg>
  );
}
function WhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.6 4.7-1.2A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 6.6 12.5l.7 2.5-2.6-.7A8 8 0 1 1 12 4zm-3 3.6c-.2 0-.5 0-.7.4-.2.4-.9.9-.9 2.2s.9 2.6 1 2.8c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.7-.3s-1.4-.7-1.6-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.4l.4-.5c.1-.2.2-.3.2-.5v-.4c0-.1-.6-1.5-.8-2-.2-.4-.4-.4-.6-.4z" />
    </svg>
  );
}

function DaisyDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 bg-gold/40 sm:w-24" />
      <img src={daisyMark} alt="" aria-hidden="true" className="h-8 w-auto select-none" />
      <span className="h-px w-16 bg-gold/40 sm:w-24" />
    </div>
  );
}

// Contact details come from the active salon's data; labels are translated.
const buildInfo = (d, t) => [
  { icon: Pin, label: t("contact.infoVisit"), lines: [d.address, d.city] },
  { icon: Phone, label: t("contact.infoCall"), lines: [d.phone], href: d.phoneHref },
  { icon: Mail, label: t("contact.infoEmail"), lines: [d.email], href: `mailto:${d.email}` },
  { icon: Clock, label: t("contact.infoHours"), lines: [d.hours.week, d.hours.sun] },
];

function Field({ label, type = "text", value, onChange, placeholder, textarea }) {
  const base =
    "w-full rounded-md border border-gold/25 bg-green-card/40 px-4 py-3 font-sans text-[15px] text-cream placeholder:text-cream/35 transition-colors focus:border-gold focus:outline-none";
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[12px] tracking-[0.15em] text-gold-soft">{label}</span>
      {textarea ? (
        <textarea rows={5} value={value} onChange={onChange} placeholder={placeholder} className={`${base} resize-none`} />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={base} />
      )}
    </label>
  );
}

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Services handed over from the Book An Appointment page.
  const location = useLocation();
  const { data } = useLocationData();
  const t = useCopy();
  const lang = useLang();
  const info = buildInfo(data, t);
  // Country-correct social destinations (same helper the footer uses).
  const sLinks = socialLinks(data);
  const socials = [
    { Icon: Instagram, label: "Instagram", href: sLinks.instagram },
    { Icon: TikTok, label: "TikTok", href: sLinks.tiktok },
    { Icon: WhatsApp, label: "WhatsApp", href: sLinks.whatsapp },
  ];
  // Selected treatments arrive as canonical English names; show them in the
  // active language.
  const picked = (location.state?.services ?? []).map((s) => displayName(s, lang));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: picked.length
      ? `${t("contact.bookingMsgIntro")}\n• ${picked.join("\n• ")}`
      : "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError(t("contact.errName"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError(t("contact.errEmail"));
    setError("");
    setSent(true);
  };

  return (
    <div className="w-full bg-green-deep">
      {/* ===== Hero header ===== */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#041208_0%,#041208_55%,#041208_100%)] pt-[92px]">
        {/* Soft gold glow */}
        <div className="pointer-events-none absolute left-1/2 top-8 h-[340px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(199,162,83,0.10),transparent)]" />

        <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-6 py-14 text-center sm:py-16">
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
          <p className="font-script text-[40px] leading-none text-gold sm:text-[54px]">{t("contact.script")}</p>
          <h1 className="mt-2 font-serif text-[34px] font-medium tracking-[0.16em] text-cream sm:text-[44px]">
            {t("contact.title")}
          </h1>
          <p className="mt-6 max-w-[600px] font-serif text-[18px] leading-relaxed text-cream/80 sm:text-[21px]">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Gold sparkle line */}
        <div
          className="relative z-10 mx-auto h-[14px] max-w-[1100px] bg-repeat-x"
          style={{ backgroundImage: `url(${frameLine})`, backgroundSize: "auto 100%" }}
        />
      </section>

      {/* ===== Info + Form ===== */}
      <section className="relative overflow-hidden bg-green-deep px-6 pb-24 pt-10 sm:px-10">
        {/* Faint henna leaf in the lower-left corner */}
        <img
          src={hennaLeaf}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-8 bottom-6 hidden w-[340px] select-none opacity-40 mix-blend-lighten lg:block"
        />

        <div className="relative mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Left — info */}
          <div data-reveal>
            <div className="flex items-end gap-4">
              <h2 className="font-script text-[44px] leading-none text-gold [text-shadow:0_0_18px_rgba(199,162,83,0.3)] sm:text-[56px]">
                {t("contact.visitScript")}
              </h2>
            </div>
            <p className="mt-5 max-w-[440px] font-serif text-[17px] leading-relaxed text-cream/80 sm:text-[19px]">
              {t("contact.visitBody")}
            </p>

            <div className="mt-9 flex flex-col gap-6">
              {info.map(({ icon: Icon, label, lines, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-green-card/50 text-gold">
                    <Icon />
                  </span>
                  <div>
                    <p className="font-sans text-[12px] tracking-[0.2em] text-gold-soft">{label.toUpperCase()}</p>
                    <div className="mt-1 font-sans text-[15.5px] font-light leading-relaxed text-cream/85">
                      {lines.map((l, i) =>
                        href && i === 0 ? (
                          <a key={i} href={href} className="block transition-colors hover:text-gold">
                            {l}
                          </a>
                        ) : (
                          <span key={i} className="block">
                            {l}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social — country-correct Instagram / TikTok / WhatsApp */}
            <div className="mt-9">
              <p className="mb-3 font-sans text-[12px] tracking-[0.2em] text-gold-soft">
                {t("contact.followUs").toUpperCase()}
              </p>
              <div className="flex items-center gap-3">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-green-card/50 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-green-darkest"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form card */}
          <div data-reveal data-reveal-delay="120" className="relative rounded-[24px] border border-gold/40 bg-[linear-gradient(150deg,#0f2118_0%,#0a1912_100%)] px-6 py-10 sm:px-10">
            {/* sparkle line along the top edge */}
            <span
              className="pointer-events-none absolute inset-x-6 top-0 h-[12px] bg-repeat-x"
              style={{ backgroundImage: `url(${frameLine})`, backgroundSize: "auto 100%" }}
            />
            {/* corner flourishes */}
            <img src={leafCorner} alt="" aria-hidden="true" className="pointer-events-none absolute -left-1 -top-1 h-14 w-auto -scale-x-100 select-none" />
            <img src={leafCorner} alt="" aria-hidden="true" className="pointer-events-none absolute -right-1 -top-1 h-14 w-auto select-none" />
            <img src={leafCorner} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-1 -left-1 h-14 w-auto -scale-100 select-none" />
            <img src={leafCorner} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-1 -right-1 h-14 w-auto -scale-y-100 select-none" />

            <div className="flex items-center justify-center gap-3">
              <img src={flourishLeft} alt="" aria-hidden="true" className="h-9 w-auto select-none" />
              <h3 className="text-center font-script text-[36px] leading-none text-gold sm:text-[44px]">
                {t("contact.formScript")}
              </h3>
              <img src={flourishRight} alt="" aria-hidden="true" className="h-9 w-auto select-none" />
            </div>
            <span className="mx-auto mt-3 mb-8 block h-px w-24 bg-gold/50" />

            {sent ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                <img src={daisyMark} alt="" aria-hidden="true" className="mb-5 h-14 w-auto" />
                <h4 className="font-serif text-[26px] text-cream">{t("contact.successTitle")}</h4>
                <p className="mt-3 max-w-[340px] font-sans text-[15px] font-light leading-relaxed text-cream/75">
                  {t("contact.successBody")}
                </p>
                <p className="mt-5 font-sans text-[13.5px] text-cream/70">
                  {t("contact.successBookText")}{" "}
                  <button onClick={() => openBooking(data.bookingUrl)} className="font-medium text-gold transition-colors hover:text-gold-bright">
                    {t("contact.successBookLink")}
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                {picked.length > 0 && (
                  <div className="rounded-md border border-gold/30 bg-gold/10 px-4 py-3">
                    <p className="font-sans text-[12px] tracking-[0.15em] text-gold">
                      {t("contact.selectionLabel")} · {picked.length}{" "}
                      {picked.length === 1 ? t("contact.treatmentOne") : t("contact.treatmentMany")}
                    </p>
                    <p className="mt-1.5 font-sans text-[13.5px] font-light leading-relaxed text-cream/85">
                      {picked.join(" · ")}
                    </p>
                  </div>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("contact.name")} value={form.name} onChange={set("name")} placeholder={t("contact.namePh")} />
                  <Field label={t("contact.phone")} type="tel" value={form.phone} onChange={set("phone")} placeholder={t("contact.phonePh")} />
                </div>
                <Field label={t("contact.email")} type="email" value={form.email} onChange={set("email")} placeholder={t("contact.emailPh")} />
                <Field label={t("contact.message")} textarea value={form.message} onChange={set("message")} placeholder={t("contact.messagePh")} />
                {error && <p className="font-sans text-[13px] text-red-300">{error}</p>}
                <button
                  type="submit"
                  className="mt-1 rounded-md bg-gold px-8 py-3.5 font-sans text-[13px] tracking-[0.16em] text-green-darkest transition-colors hover:bg-gold-bright"
                >
                  {t("contact.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===== Closing image band ===== */}
      <section className="relative h-[360px] overflow-hidden sm:h-[420px]">
        <img src={indulgence} alt="Signature cocktails at Margaret's Beauty Bar" width="1535" height="1024" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,18,8,0.92)_0%,rgba(4,18,8,0.72)_50%,rgba(4,18,8,0.5)_100%)]" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1240px] flex-col justify-center px-6 sm:px-10">
          <p className="font-script text-[34px] leading-none text-gold sm:text-[46px]">{t("contact.closeScript")}</p>
          <h2 className="mt-2 max-w-[560px] font-serif text-[30px] font-medium leading-[1.15] tracking-[0.04em] text-cream sm:text-[40px]">
            {t("contact.closeTitle")}
          </h2>
          <a
            href={data.phoneHref}
            className="mt-7 inline-block w-fit rounded-md border border-gold bg-gold/0 px-8 py-3.5 font-sans text-[13px] tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-green-darkest"
          >
            {t("contact.callToBook")}
          </a>
        </div>
      </section>
    </div>
  );
}
