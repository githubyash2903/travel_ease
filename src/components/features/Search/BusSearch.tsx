import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

export function BusSearch() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="bg-card rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            placeholder="Enter city"
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            placeholder="Enter city"
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label>Journey Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-background",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="passengers">Passengers</Label>
          <Input
            id="passengers"
            type="number"
            placeholder="1"
            min="1"
            defaultValue="1"
            className="bg-background"
          />
        </div>

        <div className="flex items-end">
          <Button className="w-full">Search Buses</Button>
        </div>
      </div>
    </div>
  );
}
