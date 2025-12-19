import { SearchWidget } from "@/components/organisms/SearchWidget";
import { Promotions } from "@/components/organisms/Promotions";
import { TopDestinations } from "@/components/organisms/TopDestinations";

import heroBeach from "@/assets/hero-beach.jpg";
import About from "./About";

const Home = () => {
  return (
    <main className="flex-1 w-screen">

      {/* HERO SECTION */}
      <section className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[650px] flex items-center justify-center px-4 overflow-hidden">

        {/* Background Image */}
        <img
          src={heroBeach}
          alt="Beach"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-0" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto py-8 md:py-12 lg:py-16">
          <div className="text-center mb-8 md:mb-10 lg:mb-12 text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-xl">
              Your Journey Begins Here
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
              Search and book the best flights, hotels & holiday packages effortlessly
            </p>
          </div>

          {/* Search Widget (FlightSearch Component Inside) */}
          <div className="animate-slide-up mx-4 md:mx-0">
            <SearchWidget />
          </div>
        </div>

      </section>

      {/* SECTION: Promotions */}
      <Promotions />

      {/* SECTION: Destinations */}
      <TopDestinations />

      <About />
    </main>
  );
};

export default Home;
