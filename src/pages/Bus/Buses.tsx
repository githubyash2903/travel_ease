import { useState } from "react";

import { BusSearch } from "../../components/features/Search/BusSearch";
import { BusFilters } from "../../components/molecules/filters/BusFilters";
import { BusCard } from "../../components/molecules/cards/BusCard";

const mockBuses = [
  {
    id: "1",
    operator: "Volvo Express",
    busType: "AC Sleeper",
    from: "Delhi",
    to: "Jaipur",
    departureTime: "22:00",
    arrivalTime: "06:00",
    duration: "8h",
    price: 1200,
    seats: 15,
    rating: 4.5,
    amenities: ["WiFi", "Blanket", "Water Bottle", "Charging Point"]
  },
  {
    id: "2",
    operator: "SRS Travels",
    busType: "AC Seater",
    from: "Mumbai",
    to: "Pune",
    departureTime: "08:00",
    arrivalTime: "11:30",
    duration: "3.5h",
    price: 500,
    seats: 22,
    rating: 4.2,
    amenities: ["WiFi", "Water Bottle", "Charging Point"]
  },
  {
    id: "3",
    operator: "RedBus Premium",
    busType: "AC Sleeper (2+1)",
    from: "Bangalore",
    to: "Hyderabad",
    departureTime: "20:30",
    arrivalTime: "06:30",
    duration: "10h",
    price: 1800,
    seats: 8,
    rating: 4.8,
    amenities: ["WiFi", "Blanket", "Water Bottle", "Charging Point", "Entertainment", "Reading Light"]
  },
  {
    id: "4",
    operator: "VRL Travels",
    busType: "Non-AC Seater",
    from: "Chennai",
    to: "Coimbatore",
    departureTime: "14:00",
    arrivalTime: "21:00",
    duration: "7h",
    price: 600,
    seats: 30,
    rating: 4.0,
    amenities: ["Water Bottle", "Charging Point"]
  },
  {
    id: "5",
    operator: "Orange Travels",
    busType: "AC Sleeper",
    from: "Ahmedabad",
    to: "Udaipur",
    departureTime: "23:00",
    arrivalTime: "08:00",
    duration: "9h",
    price: 1400,
    seats: 12,
    rating: 4.6,
    amenities: ["WiFi", "Blanket", "Water Bottle", "Charging Point", "Entertainment"]
  },
  {
    id: "6",
    operator: "Patel Tours",
    busType: "AC Seater (2+2)",
    from: "Kolkata",
    to: "Siliguri",
    departureTime: "19:00",
    arrivalTime: "07:00",
    duration: "12h",
    price: 1100,
    seats: 18,
    rating: 4.3,
    amenities: ["WiFi", "Water Bottle", "Charging Point"]
  }
];

export default function Buses() {
  const [buses] = useState(mockBuses);

  return (
    <div className="min-h-screen flex flex-col">
 
      
      <main className="flex-1 bg-muted/30">
        <div className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Book Bus Tickets</h1>
            <BusSearch />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 flex-shrink-0">
              <BusFilters />
            </aside>

            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-muted-foreground">
                  {buses.length} buses found
                </p>
              </div>

              <div className="space-y-4">
                {buses.map((bus) => (
                  <BusCard key={bus.id} {...bus} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

   
    </div>
  );
}