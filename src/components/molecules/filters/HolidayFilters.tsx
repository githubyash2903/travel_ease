import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

const DURATION = [
  { key: "2-3", label: "2–3 Days" },
  { key: "4-6", label: "4–6 Days" },
  { key: "7", label: "1 Week" },
  { key: "7+", label: "1 Week+" },
];

const CATEGORIES = ["Adventure", "Beach", "Cultural", "Honeymoon", "Family"];

const INCLUSIONS = ["Flights", "Hotels", "Meals", "Sightseeing", "Transfers"];

export const HolidayFilters = ({
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

  const minPrice = Number(params.get("minPrice") ?? 10000);
  const maxPrice = Number(params.get("maxPrice") ?? 100000);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Budget */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold mb-3 block">Budget</Label>
          <Slider
            min={0}
            max={200000}
            step={5000}
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

        {/* Duration */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold mb-3 block">Duration</Label>
          {DURATION.map((d) => (
            <div key={d.key} className="flex items-center space-x-2">
              <Checkbox
                checked={params.getAll("duration").includes(d.key)}
                onCheckedChange={() => toggleMulti("duration", d.key)}
              />
              <Label className="cursor-pointer">{d.label}</Label>
            </div>
          ))}
        </div>

        <Separator />

        {/* Category */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold mb-3 block">
            Package Type
          </Label>
          {CATEGORIES.map((c) => (
            <div key={c} className="flex items-center space-x-2">
              <Checkbox
                checked={params.getAll("category").includes(c)}
                onCheckedChange={() => toggleMulti("category", c)}
              />
              <Label className="cursor-pointer">{c}</Label>
            </div>
          ))}
        </div>

        <Separator />

        {/* Inclusions */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold mb-3 block">Inclusions</Label>
          {INCLUSIONS.map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                checked={params.getAll("inclusions").includes(i)}
                onCheckedChange={() => toggleMulti("inclusions", i)}
              />
              <Label className="cursor-pointer">{i}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
