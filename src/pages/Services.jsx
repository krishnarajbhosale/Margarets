import { useEffect } from "react";
import ServicesHero from "../components/services/ServicesHero.jsx";
import NailArt from "../components/services/NailArt.jsx";
import Eyelashes from "../components/services/Eyelashes.jsx";
import Hairstyles from "../components/services/Hairstyles.jsx";
import SpaCards from "../components/services/SpaCards.jsx";
import Makeup from "../components/services/Makeup.jsx";

export default function Services() {
  // Start at the top when navigating in.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // NOTE (USA / Mexico services): each section below pulls its copy per-language
  // via useCopy() (es = México, en = USA), so wording is already location-aware.
  // When the client provides USA-specific services/layout, branch here on
  // useLocationData().code (e.g. `code === "us" ? <UsaSections/> : <MxSections/>`)
  // so the USA catalog can change without touching the Mexico version. Section
  // images live in each component's imports — swap those for the USA photos.
  return (
    <div className="w-full bg-green-deep">
      <ServicesHero />
      <NailArt />
      <Eyelashes />
      <Hairstyles />
      <SpaCards />
      <Makeup />
    </div>
  );
}
