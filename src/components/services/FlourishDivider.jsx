import flourishLeft from "../../assets/images/svc-flourish-left.webp";
import flourishRight from "../../assets/images/svc-flourish-right.webp";

/**
 * Gold leaf-flourish divider used between Services sections.
 * Labeled (e.g. "Eyebrows"): [leaf] ~wavy line~ <script label> —straight line— [leaf]
 * Unlabeled: [leaf] ~wavy line~ [leaf]
 */
export default function FlourishDivider({ label, className = "" }) {
  // Unlabeled: a single continuous wavy gold line spanning the full width.
  if (!label) {
    return (
      <div className={`flex items-center ${className}`}>
        <ContinuousWave className="w-full" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-5 ${className}`}>
      <img
        src={flourishLeft}
        alt=""
        aria-hidden="true"
        className="hidden h-12 w-auto select-none sm:block md:h-[68px]"
      />

      <WavyLine className="flex-1" />

      <span className="whitespace-nowrap px-1 font-script text-[40px] leading-none text-gold [text-shadow:0_0_18px_rgba(199,162,83,0.3)] sm:text-[56px] md:text-[68px]">
        {label}
      </span>

      <StraightLine className="flex-1" />

      <img
        src={flourishRight}
        alt=""
        aria-hidden="true"
        className="hidden h-12 w-auto select-none sm:block md:h-[68px]"
      />
    </div>
  );
}

// A seamless, evenly-tiled wavy line that runs edge to edge at any width.
function ContinuousWave({ className = "" }) {
  return (
    <svg className={`h-3 text-gold ${className}`} aria-hidden="true">
      <defs>
        <pattern id="fd-wave" width="46" height="12" patternUnits="userSpaceOnUse">
          <path
            d="M0,6 C11.5,0 11.5,0 23,6 C34.5,12 34.5,12 46,6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            opacity="0.9"
          />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill="url(#fd-wave)" />
    </svg>
  );
}

function WavyLine({ className = "" }) {
  return (
    <svg
      className={`h-3 max-w-[300px] text-gold ${className}`}
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,6 H120 C150,6 150,1 175,3 C200,5 205,10 230,8 C255,6 260,6 300,6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.85"
      />
    </svg>
  );
}

function StraightLine({ className = "" }) {
  return (
    <svg
      className={`h-2 max-w-[300px] text-gold ${className}`}
      viewBox="0 0 300 8"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0,4 H300" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.8" />
      <path d="M296,1 L300,4 L296,7" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.8" />
    </svg>
  );
}
