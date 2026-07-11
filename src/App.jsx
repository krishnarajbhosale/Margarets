import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { LocationProvider, LocationSplash, useLocationData } from "./lib/location.jsx";
import { initReveals } from "./lib/scroll.js";
import daisyMark from "./assets/images/daisy-mark.webp";

// Route-level code splitting: each page loads on demand.
const Home = lazy(() => import("./pages/Home.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const Menu = lazy(() => import("./pages/Menu.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Book = lazy(() => import("./pages/Book.jsx"));

// Minimal branded fallback while a page chunk loads.
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-deep">
      <img src={daisyMark} alt="" aria-hidden="true" width="180" height="180" className="h-12 w-auto animate-pulse" />
    </div>
  );
}

function Shell() {
  const { data } = useLocationData();
  const { pathname } = useLocation();

  // One observer powers every [data-reveal] on the site.
  useEffect(() => {
    initReveals();
  }, []);

  return (
    <>
      <Navbar />
      {/* Keyed by path so every route change gets a soft fade-in. */}
      <div key={pathname} className="route-fade">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            {/* The bar is a Mexico-only experience. */}
            <Route
              path="/menu"
              element={data.hasBar ? <Menu /> : <Navigate to="/" replace />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <LocationSplash />
    </>
  );
}

export default function App() {
  return (
    <LocationProvider>
      <Shell />
    </LocationProvider>
  );
}
