
import { Footer } from "../../components/organisms/Footer";
import { HolidayPackageCard } from "../../components/molecules/cards/HolidayPackageCard";
import { HolidayFilters } from "../../components/molecules/filters/HolidayFilters";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroBeach from "@/assets/hero-beach.jpg";
import destMountains from "@/assets/dest-mountains.jpg";
import destCoastal from "@/assets/dest-coastal.jpg";
import destNature from "@/assets/dest-nature.jpg";

const mockPackages = [
  {
    id: "1",
    title: "Enchanting Kerala - God's Own Country",
    destination: "Kerala",
    duration: "5 Days / 4 Nights",
    image: destNature,
    price: 24999,
    rating: 4.7,
    inclusions: ["Flights", "Hotels", "Meals", "Sightseeing", "Transfers"],
    category: "Beach"
  },
  {
    id: "2",
    title: "Himalayan Adventure - Manali Special",
    destination: "Manali, Himachal Pradesh",
    duration: "6 Days / 5 Nights",
    image: destMountains,
    price: 18999,
    rating: 4.6,
    inclusions: ["Hotels", "Meals", "Adventure Activities", "Transfers"],
    category: "Adventure"
  },
  {
    id: "3",
    title: "Golden Triangle Tour",
    destination: "Delhi, Agra, Jaipur",
    duration: "7 Days / 6 Nights",
    image: destCoastal,
    price: 32999,
    rating: 4.8,
    inclusions: ["Flights", "Hotels", "Meals", "Guide", "Sightseeing"],
    category: "Cultural"
  },
  {
    id: "4",
    title: "Goa Beach Paradise",
    destination: "Goa",
    duration: "4 Days / 3 Nights",
    image: heroBeach,
    price: 15999,
    rating: 4.5,
    inclusions: ["Hotels", "Breakfast", "Water Sports", "Transfers"],
    category: "Beach"
  },
  {
    id: "5",
    title: "Romantic Udaipur - Lake City Honeymoon",
    destination: "Udaipur, Rajasthan",
    duration: "5 Days / 4 Nights",
    image: destCoastal,
    price: 28999,
    rating: 4.9,
    inclusions: ["Flights", "Luxury Hotels", "All Meals", "Romantic Dinner", "Transfers"],
    category: "Honeymoon"
  },
  {
    id: "6",
    title: "Wildlife Safari - Jim Corbett National Park",
    destination: "Uttarakhand",
    duration: "3 Days / 2 Nights",
    image: destNature,
    price: 12999,
    rating: 4.4,
    inclusions: ["Hotels", "Meals", "Safari", "Guide"],
    category: "Adventure"
  }
];

const Holidays = () => {
  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-1 text-center container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Holiday Packages</h1>
          <p className="text-muted-foreground">Discover amazing destinations with our curated packages</p>
        </div>

        <div className="flex px-5  gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <HolidayFilters />
          </aside>

          <div className="flex-1  ">
            <div className="flex  items-center justify-between mb-6">
              <Button variant="outline" className="lg:hidden">Filters</Button>
              <div className="flex  items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select defaultValue="popularity">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
              {mockPackages.map((pkg, idx) => (
                <HolidayPackageCard key={idx} {...pkg} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Holidays;
