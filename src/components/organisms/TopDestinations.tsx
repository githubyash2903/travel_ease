import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import destMountains from "@/assets/dest-mountains.jpg";
import destCity from "@/assets/dest-city.jpg";
import destCoastal from "@/assets/dest-coastal.jpg";
import destNature from "@/assets/dest-nature.jpg";

const destinations = [
  {
    id: 1,
    name: "Swiss Alps",
    location: "Switzerland",
    image: destMountains,
    tag: "Adventure",
    price: "From ₹85,000",
  },
  {
    id: 2,
    name: "Dubai",
    location: "United Arab Emirates",
    image: destCity,
    tag: "Luxury",
    price: "From ₹45,000",
  },
  {
    id: 3,
    name: "Amalfi Coast",
    location: "Italy",
    image: destCoastal,
    tag: "Romantic",
    price: "From ₹95,000",
  },
  {
    id: 4,
    name: "Bali Paradise",
    location: "Indonesia",
    image: destNature,
    tag: "Beach",
    price: "From ₹35,000",
  },
];

export const TopDestinations = () => {
  return (
    <section className="py-16 px-4 bg-gradient-sky">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top Destinations
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover your next adventure in these stunning locations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.map((dest, index) => (
            <Card
              key={dest.id}
              className="group overflow-hidden hover:shadow-strong transition-all duration-300 cursor-pointer animate-slide-up "
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={dest.image}
                    alt={`${dest.name}, ${dest.location}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground border-0">
                    {dest.tag}
                  </Badge>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                    <p className="text-white/90 text-sm mb-3">{dest.location}</p>
                    <p className="text-lg font-semibold">{dest.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
