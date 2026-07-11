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
