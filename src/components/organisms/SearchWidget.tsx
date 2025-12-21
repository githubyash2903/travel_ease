import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Plane, Hotel, Palmtree, Bus } from "lucide-react";
import { FlightSearch } from "../features/Search/FlightSearch";
import { HotelSearch } from "../features/Search/HotelSearch";
import { HolidaySearch } from "../features/Search/HolidaySearch";
import { BusSearch } from "../features/Search/BusSearch";

export const SearchWidget = () => {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4 bg-white shadow-medium h-auto p-1 rounded-xl">
          <TabsTrigger
            value="flights"
            className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-gradient-hero data-[state=active]:text-white"
          >
            <Plane className="h-4 w-4" />
            <span className="font-medium">Flights</span>
          </TabsTrigger>
          <TabsTrigger
            value="hotels"
            className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-gradient-hero data-[state=active]:text-white"
          >
            <Hotel className="h-4 w-4" />
            <span className="font-medium">Hotels</span>
          </TabsTrigger>
          <TabsTrigger
            value="holidays"
            className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-gradient-hero data-[state=active]:text-white"
          >
            <Palmtree className="h-4 w-4" />
            <span className="font-medium">Holidays</span>
          </TabsTrigger>
          <TabsTrigger
            value="buses"
            className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-gradient-hero data-[state=active]:text-white"
          >
            <Bus className="h-4 w-4" />
            <span className="font-medium">Buses</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 bg-white rounded-2xl shadow-strong p-6 md:p-8">
          <TabsContent value="flights" className="mt-0">
            <FlightSearch />
          </TabsContent>
          <TabsContent value="hotels" className="mt-0">
            <HotelSearch />
          </TabsContent>
          <TabsContent value="holidays" className="mt-0">
            <HolidaySearch />
          </TabsContent>
          <TabsContent value="buses" className="mt-0">
            <BusSearch />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
