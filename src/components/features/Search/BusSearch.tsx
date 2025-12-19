import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import showToast from "@/lib/toast";

export function BusSearch() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [departDate, setDepartDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState<number>(1);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!from.trim() || !to.trim() || !departDate) {
      showToast.error("Please fill all required fields");
      return;
    }

    const params = new URLSearchParams({
      from,
      to,
      departDate: format(departDate, "yyyy-MM-dd"),
      passengers: String(passengers),
    });

    navigate(`/buses?${params.toString()}`);
  };

  return (
    <div className="bg-card rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            placeholder="Enter city"
            className="bg-background"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            placeholder="Enter city"
            className="bg-background"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Journey Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal text-black bg-background",
                  !departDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departDate ? format(departDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={departDate}
                onSelect={setDepartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2 text-black">
          <Label htmlFor="passengers">Passengers</Label>
          <Input
            id="passengers"
            type="number"
            placeholder="1"
            min={1}
            className="bg-background"
            value={passengers}
            onChange={(e) => setPassengers(Math.max(1, Number(e.target.value) || 1))}
          />
        </div>

        <div className="flex items-end">
            <Button
       className="w-full h-12 text-lg bg-blue-500 hover:opacity-90 transition-opacity"
        onClick={handleSearch}
      >
        <Search className="mr-2 h-5 w-5" />
        Search Buses
      </Button>
        </div>
      </div>
    </div>
  );
}