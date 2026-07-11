import Hero from "../components/Hero.jsx";
import Indulgence from "../components/Indulgence.jsx";
import Features from "../components/Features.jsx";
import SignatureServices from "../components/SignatureServices.jsx";

export default function Home() {
  return (
    <div className="w-full bg-green-dark">
      <Hero />
      <Indulgence />
      <Features />
      <SignatureServices />
    </div>
  );
}
