import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const AMENITIES = [
  "wifi",
  "parking",
  "conference_room",
  "restaurant",
  "airport_shuttle",
];

type ImageItem = {
  url: string;
  is_primary?: boolean;
};

type HotelFormValue = {
  name: string;
  description?: string;
  city: string;
  state: string;
  address: string;
  rating?: number;
  rating_count?: number;
  min_price_per_night: number;
  amenities: Record<string, boolean>;
  images: ImageItem[];
  is_active: boolean;
};

export function HotelForm({
  value,
  onSubmit,
}: {
  value?: Partial<HotelFormValue>;
  onSubmit: (payload: HotelFormValue) => void;
}) {
  const [form, setForm] = useState<HotelFormValue>({
    name: "",
    description: "",
    city: "",
    state: "",
    address: "",
    rating: 0,
    rating_count: 0,
    min_price_per_night: 0,
    amenities: {},
    images: [],
    is_active: true,
    ...value,
  });

  /* ---------- helpers ---------- */

  const update = (key: keyof HotelFormValue, val: any) =>
    setForm((p) => ({ ...p, [key]: val }));

  const addImage = () =>
    setForm((p) => ({
      ...p,
      images: [...p.images, { url: "", is_primary: p.images.length === 0 }],
    }));

  const updateImage = (index: number, patch: Partial<ImageItem>) =>
    setForm((p) => ({
      ...p,
      images: p.images.map((img, i) =>
        i === index ? { ...img, ...patch } : img
      ),
    }));

  const setPrimary = (index: number) =>
    setForm((p) => ({
      ...p,
      images: p.images.map((img, i) => ({
        ...img,
        is_primary: i === index,
      })),
    }));

  const removeImage = (index: number) =>
    setForm((p) => ({
      ...p,
      images: p.images.filter((_, i) => i !== index),
    }));

  /* ---------- UI ---------- */

  return (
    <div className="space-y-6">
      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name *">
          <Input value={form.name} onChange={(e) => update("name", e.target.value)} />
        </Field>

        <Field label="City *">
          <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
        </Field>

        <Field label="State *">
          <Input value={form.state} onChange={(e) => update("state", e.target.value)} />
        </Field>

        <Field label="Address *">
          <Input value={form.address} onChange={(e) => update("address", e.target.value)} />
        </Field>
      </div>

      <Field label="Description">
        <Textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </Field>

      {/* PRICING */}
      <div className="grid grid-cols-3 gap-4">
        <Field label="Rating">
          <Input
            type="number"
            step="0.1"
            value={form.rating}
            onChange={(e) => update("rating", Number(e.target.value))}
          />
        </Field>

        <Field label="Rating Count">
          <Input
            type="number"
            value={form.rating_count}
            onChange={(e) => update("rating_count", Number(e.target.value))}
          />
        </Field>

        <Field label="Min Price / Night *">
          <Input
            type="number"
            value={form.min_price_per_night}
            onChange={(e) =>
              update("min_price_per_night", Number(e.target.value))
            }
          />
        </Field>
      </div>

      {/* AMENITIES */}
      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 gap-3">
          {AMENITIES.map((a) => (
            <div key={a} className="flex items-center gap-2">
              <Checkbox
                checked={!!form.amenities[a]}
                onCheckedChange={(v) =>
                  update("amenities", { ...form.amenities, [a]: Boolean(v) })
                }
              />
              <Label className="capitalize">{a.replace("_", " ")}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* IMAGES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Images</Label>
          <Button type="button" size="sm" variant="outline" onClick={addImage}>
            <Plus className="h-4 w-4 mr-1" />
            Add Image
          </Button>
        </div>

        {!form.images.length && (
          <p className="text-sm text-muted-foreground">No images added.</p>
        )}

        {form.images.map((img, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-md border p-3"
          >
            <Input
              placeholder="Image URL"
              value={img.url}
              onChange={(e) => updateImage(i, { url: e.target.value })}
            />

            <div className="flex items-center gap-2">
              <Checkbox
                checked={!!img.is_primary}
                onCheckedChange={() => setPrimary(i)}
              />
              <Label>Primary</Label>
            </div>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => removeImage(i)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* STATUS */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={form.is_active}
          onCheckedChange={(v) => update("is_active", Boolean(v))}
        />
        <Label>Active</Label>
      </div>

      <Button className="w-full" onClick={() => onSubmit(form)}>
        Save Hotel
      </Button>
    </div>
  );
}

/* ---------- small helper ---------- */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
