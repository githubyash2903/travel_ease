import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useAdminHotelsLite } from "@/hooks/useAdminHotelsLite";

/* ---------- types ---------- */

type BedItem = {
  type: string;
  count: number;
};

type ImageItem = {
  url: string;
  is_primary?: boolean;
};

export function RoomForm({
  value,
  onSubmit,
}: {
  value?: any;
  onSubmit: (payload: any) => void;
}) {
  const { data: hotels = [] } = useAdminHotelsLite();

  const [form, setForm] = useState({
    hotel_id: "",
    type: "",
    description: "",
    area_sqft: 0,
    max_occupancy: 1,
    beds: [] as BedItem[],
    price_per_night: 0,
    total_rooms: 1,
    amenities: {} as Record<string, boolean>,
    images: [] as ImageItem[],
    is_active: true,
    ...value,
  });

  /* ---------- helpers ---------- */

  const update = (k: string, v: any) =>
    setForm((p) => ({ ...p, [k]: v }));

  /* ---------- beds ---------- */

  const addBed = () =>
    setForm((p) => ({
      ...p,
      beds: [...p.beds, { type: "", count: 1 }],
    }));

  const updateBed = (i: number, patch: Partial<BedItem>) =>
    setForm((p) => ({
      ...p,
      beds: p.beds.map((b, idx) =>
        idx === i ? { ...b, ...patch } : b
      ),
    }));

  const removeBed = (i: number) =>
    setForm((p) => ({
      ...p,
      beds: p.beds.filter((_, idx) => idx !== i),
    }));

  /* ---------- images ---------- */

  const addImage = () =>
    setForm((p) => ({
      ...p,
      images: [
        ...p.images,
        { url: "", is_primary: p.images.length === 0 },
      ],
    }));

  const updateImage = (i: number, patch: Partial<ImageItem>) =>
    setForm((p) => ({
      ...p,
      images: p.images.map((img, idx) =>
        idx === i ? { ...img, ...patch } : img
      ),
    }));

  const setPrimaryImage = (i: number) =>
    setForm((p) => ({
      ...p,
      images: p.images.map((img, idx) => ({
        ...img,
        is_primary: idx === i,
      })),
    }));

  const removeImage = (i: number) =>
    setForm((p) => ({
      ...p,
      images: p.images.filter((_, idx) => idx !== i),
    }));

  /* ---------- UI ---------- */

  return (
    <div className="space-y-6">
      {/* HOTEL */}
      <Field label="Hotel *">
        <Select
          value={form.hotel_id}
          onValueChange={(v) => update("hotel_id", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select hotel" />
          </SelectTrigger>
          <SelectContent>
            {hotels.map((h: any) => (
              <SelectItem key={h.id} value={h.id}>
                {h.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {/* BASIC */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Room Type *">
          <Input
            value={form.type}
            onChange={(e) => update("type", e.target.value)}
          />
        </Field>

        <Field label="Area (sqft)">
          <Input
            type="number"
            value={form.area_sqft}
            onChange={(e) =>
              update("area_sqft", Number(e.target.value))
            }
          />
        </Field>

        <Field label="Max Occupancy *">
          <Input
            type="number"
            value={form.max_occupancy}
            onChange={(e) =>
              update("max_occupancy", Number(e.target.value))
            }
          />
        </Field>

        <Field label="Total Rooms *">
          <Input
            type="number"
            value={form.total_rooms}
            onChange={(e) =>
              update("total_rooms", Number(e.target.value))
            }
          />
        </Field>
      </div>

      <Field label="Description">
        <Textarea
          value={form.description}
          onChange={(e) =>
            update("description", e.target.value)
          }
        />
      </Field>

      <Field label="Price / Night *">
        <Input
          type="number"
          value={form.price_per_night}
          onChange={(e) =>
            update("price_per_night", Number(e.target.value))
          }
        />
      </Field>

      {/* BEDS */}
      <Section title="Beds">
        <Button size="sm" variant="outline" onClick={addBed}>
          <Plus className="h-4 w-4 mr-1" /> Add Bed
        </Button>

        {!form.beds.length && (
          <Empty text="No beds added" />
        )}

        {form.beds.map((b, i) => (
          <div
            key={i}
            className="flex gap-3 items-center border rounded-md p-3"
          >
            <Input
              placeholder="Type (queen, single)"
              value={b.type}
              onChange={(e) =>
                updateBed(i, { type: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Count"
              value={b.count}
              onChange={(e) =>
                updateBed(i, { count: Number(e.target.value) })
              }
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeBed(i)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </Section>

      {/* AMENITIES */}
      <Section title="Amenities">
        {Object.keys(form.amenities).length === 0 && (
          <Empty text="Add amenities dynamically by toggling" />
        )}

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(form.amenities).map(([k, v]) => (
            <div key={k} className="flex items-center gap-2">
              <Checkbox
                checked={Boolean(v)}
                onCheckedChange={(val) =>
                  update("amenities", {
                    ...form.amenities,
                    [k]: Boolean(val),
                  })
                }
              />
              <Label className="capitalize">
                {k.replace("_", " ")}
              </Label>
            </div>
          ))}
        </div>

        <Input
          placeholder="Add amenity key and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const key = e.currentTarget.value.trim();
              if (!key) return;
              update("amenities", {
                ...form.amenities,
                [key]: true,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </Section>

      {/* IMAGES */}
      <Section title="Images">
        <Button size="sm" variant="outline" onClick={addImage}>
          <Plus className="h-4 w-4 mr-1" /> Add Image
        </Button>

        {!form.images.length && (
          <Empty text="No images added" />
        )}

        {form.images.map((img, i) => (
          <div
            key={i}
            className="flex gap-3 items-center border rounded-md p-3"
          >
            <Input
              placeholder="Image URL"
              value={img.url}
              onChange={(e) =>
                updateImage(i, { url: e.target.value })
              }
            />

            <div className="flex items-center gap-2">
              <Checkbox
                checked={!!img.is_primary}
                onCheckedChange={() => setPrimaryImage(i)}
              />
              <Label>Primary</Label>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeImage(i)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </Section>

      {/* STATUS */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={form.is_active}
          onCheckedChange={(v) =>
            update("is_active", Boolean(v))
          }
        />
        <Label>Active</Label>
      </div>

      <Button className="w-full" onClick={() => onSubmit(form)}>
        Save Room
      </Button>
    </div>
  );
}

/* ---------- helpers ---------- */

function Field({ label, children }: any) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="space-y-3">
      <Label>{title}</Label>
      {children}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <p className="text-sm text-muted-foreground">{text}</p>
  );
}
