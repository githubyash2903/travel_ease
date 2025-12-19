import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FlightSearch } from "../features/Search/FlightSearch";
import { HotelSearch } from "../features/Search/HotelSearch";
import { HolidaySearch } from "../features/Search/HolidaySearch";
import { BusSearch } from "../features/Search/BusSearch";

import { Plane, Hotel, Palmtree, Bus } from "lucide-react";

export const SearchWidget = () => {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <div className="w-full max-w-5xl mx-auto">

      {/* ONLY Tab Buttons go inside Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className="grid w-full md:w-auto grid-cols-4 bg-white shadow-medium h-auto p-1 rounded-xl"
        >
          <TabsTrigger
            value="flights"
            className="flex items-center gap-2 px-6 py-3 
              data-[state=active]:bg-blue-400 
              data-[state=active]:text-white"
          >
            <Plane className="h-4 w-4" />
            Flights
          </TabsTrigger>

          <TabsTrigger
            value="hotels"
            className="flex items-center gap-2 px-6 py-3 
              data-[state=active]:bg-blue-400 
              data-[state=active]:text-white"
          >
            <Hotel className="h-4 w-4" />
            Hotels
          </TabsTrigger>

          <TabsTrigger
            value="holidays"
            className="flex items-center gap-2 px-6 py-3 
              data-[state=active]:bg-blue-400 
              data-[state=active]:text-white"
          >
            <Palmtree className="h-4 w-4" />
            Holidays
          </TabsTrigger>

          <TabsTrigger
            value="buses"
            className="flex items-center gap-2 px-6 py-3 
              data-[state=active]:bg-blue-400 
              data-[state=active]:text-white"
          >
            <Bus className="h-4 w-4" />
            Buses
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* CONTENT KEPT OUTSIDE — FIXES PAGE NOT FOUND ISSUE */}
      <div className="mt-6 bg-white rounded-2xl shadow-strong p-6 md:p-8">
        {activeTab === "flights" && <FlightSearch />}
        {activeTab === "hotels" && <HotelSearch />}
        {activeTab === "holidays" && <HolidaySearch />}
        {activeTab === "buses" && <BusSearch />}
      </div>
    </div>
  );
};
