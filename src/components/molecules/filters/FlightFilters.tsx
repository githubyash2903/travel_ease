import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

const AIRLINES = [
  { key: "IndiGo", label: "IndiGo" },
  { key: "Air India", label: "Air India" },
  { key: "SpiceJet", label: "SpiceJet" },
  { key: "Vistara", label: "Vistara" },
];

const STOPS = [
  { key: "0", label: "Non-stop" },
  { key: "1", label: "1 Stop" },
  { key: "2", label: "2+ Stops" },
];

const DEP_TIME = [
  { key: "morning", label: "Morning (6AM - 12PM)" },
  { key: "afternoon", label: "Afternoon (12PM - 6PM)" },
  { key: "evening", label: "Evening (6PM - 12AM)" },
  { key: "night", label: "Night (12AM - 6AM)" },
];

export const FlightFilters = ({
  onApply = () => {},
}: {
  onApply?: () => void;
}) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const push = useCallback(
    (next: URLSearchParams) => {
      onApply();
      navigate(`${pathname}?${next.toString()}`, { replace: true });
    },
    [navigate, pathname]
  );

  const toggleMulti = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    const values = next.getAll(key);
    next.delete(key);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    values.includes(value)
      ? values.filter((v) => v !== value).forEach((v) => next.append(key, v))
      : [...values, value].forEach((v) => next.append(key, v));

    push(next);
  };

  const minPrice = Number(params.get("minPrice") ?? 5000);
  const maxPrice = Number(params.get("maxPrice") ?? 50000);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Stops */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold mb-3 block">Stops</Label>
          {STOPS.map((s) => (
            <div key={s.key} className="flex items-center space-x-2">
              <Checkbox
                checked={params.getAll("stops").includes(s.key)}
                onCheckedChange={() => toggleMulti("stops", s.key)}
              />
              <Label className="cursor-pointer">{s.label}</Label>
            </div>
          ))}
        </div>

        <Separator />

        {/* Price */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold mb-3 block">
            Price Range
          </Label>
          <Slider
            min={0}
            max={100000}
            step={1000}
            value={[minPrice, maxPrice]}
            onValueChange={([min, max]) => {
              const next = new URLSearchParams(params);
              next.set("minPrice", String(min));
              next.set("maxPrice", String(max));
              push(next);
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{minPrice}</span>
            <span>₹{maxPrice}</span>
          </div>
        </div>

        <Separator />

        {/* Airlines */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold mb-3 block">Airlines</Label>
          {AIRLINES.map((a) => (
            <div key={a.key} className="flex items-center space-x-2">
              <Checkbox
                checked={params.getAll("airlines").includes(a.key)}
                onCheckedChange={() => toggleMulti("airlines", a.key)}
              />
              <Label className="cursor-pointer">{a.label}</Label>
            </div>
          ))}
        </div>

        <Separator />

        {/* Departure time */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold mb-3 block">
            Departure Time
          </Label>
          {DEP_TIME.map((t) => (
            <div key={t.key} className="flex items-center space-x-2">
              <Checkbox
                checked={params.getAll("depTime").includes(t.key)}
                onCheckedChange={() => toggleMulti("depTime", t.key)}
              />
              <Label className="cursor-pointer">{t.label}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
