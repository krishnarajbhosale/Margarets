import { useEffect } from "react";
import BarMenu from "../components/barmenu/BarMenu.jsx";
import Features from "../components/Features.jsx";

export default function Menu() {
  // Start at the top when navigating in.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-green-deep">
      <BarMenu />
      {/* Reused services strip from the home page */}
      <Features />
    </div>
  );
}
