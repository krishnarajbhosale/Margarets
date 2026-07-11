import FlourishDivider from "./FlourishDivider.jsx";
import microblading from "../../assets/images/svc-microblading.webp";
import microshading from "../../assets/images/svc-microshading.webp";
import henna from "../../assets/images/svc-henna.webp";
import hennaLeaf from "../../assets/images/svc-henna-leaf.webp";

const ROWS = [
  {
    title: "Microblading",
    img: microblading,
    alt: "Microblading eyebrow procedure",
    side: "right",
    text: "Microblading is a semi-permanent makeup technique that simulates eyebrow hairs. The strokes are thin and the highest quality pigments are used to create them. Before the procedure, an eyebrow design is created according to your face shape and bone structure, so that your eyebrows are as personalized as possible. The results sought in this technique are natural and realistic.",
  },
  {
    title: "Microshading",
    img: microshading,
    alt: "Microshading brow result",
    side: "left",
    text: 'Microshading is a semi-permanent shading technique that creates a "powder" effect on the eyebrows. It\'s the perfect technique for those who want a fuller look without the bulk of their brows. It can be combined with microblading for a striking hybrid brow.',
  },
  {
    title: "Henna",
    img: henna,
    alt: "Henna brow tinting",
    side: "right",
    leaf: true,
    text: "If you're someone who doesn't like things that are too permanent, this is your best option.",
  },
];

function BrowRow({ title, img, alt, text, side, leaf }) {
  const imageFirst = side === "left";
  return (
    <div className="grid items-stretch gap-0 md:grid-cols-2">
      <div
        className={`group h-[300px] overflow-hidden sm:h-[380px] md:h-[440px] ${
          imageFirst ? "md:order-1" : "md:order-2"
        }`}
      >
        <img
          src={img}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div
        className={`flex flex-col justify-center px-6 py-10 sm:px-10 md:py-0 ${
          imageFirst ? "md:order-2" : "md:order-1"
        }`}
      >
        <h3 className="mb-5 font-serif text-[30px] font-medium tracking-[0.03em] text-cream sm:text-[36px]">
          {title}
        </h3>
        <p className="max-w-[520px] font-serif text-[16px] leading-[1.7] tracking-[0.02em] text-muted sm:text-[18px]">
          {text}
        </p>
        {leaf && (
          <img
            src={hennaLeaf}
            alt=""
            aria-hidden="true"
            className="pointer-events-none mt-10 w-[78%] max-w-[430px] select-none mix-blend-lighten md:mt-auto md:pt-10"
          />
        )}
      </div>
    </div>
  );
}

export default function Eyebrows() {
  return (
    <section id="eyebrows" className="bg-green-deep py-14">
      <FlourishDivider label="Eyebrows" className="mb-12 px-6 sm:px-10" />
      <div className="flex flex-col gap-12 md:gap-16">
        {ROWS.map((r) => (
          <BrowRow key={r.title} {...r} />
        ))}
      </div>
    </section>
  );
}
