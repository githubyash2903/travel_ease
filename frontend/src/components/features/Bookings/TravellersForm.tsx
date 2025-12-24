import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Traveller = {
  full_name?: string;
  age?: number;
  gender?: "MALE" | "FEMALE" | "OTHER";
  id_proof_type?: "AADHAR" | "PASSPORT" | "DRIVING_LICENSE" | "VOTER_ID";
  id_proof_number?: string;
};

type Props = {
  count: number;
  value: Traveller[];
  onChange: (v: Traveller[]) => void;
};

export function TravellersForm({ count, value, onChange }: Props) {
  if (!count) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traveller Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {Array.from({ length: count }).map((_, i) => {
          const t = value[i] || {};
          return (
            <div key={i} className="border rounded-md p-4 space-y-3">
              <div className="font-medium text-sm">
                Traveller {i + 1}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    value={t.full_name ?? ""}
                    onChange={(e) => {
                      const next = [...value];
                      next[i] = { ...t, full_name: e.target.value };
                      onChange(next);
                    }}
                  />
                </div>

                <div>
                  <Label>Age *</Label>
                  <Input
                    type="number"
                    min={1}
                    value={t.age ?? ""}
                    onChange={(e) => {
                      const next = [...value];
                      next[i] = { ...t, age: Number(e.target.value) };
                      onChange(next);
                    }}
                  />
                </div>

                <div>
                  <Label>Gender *</Label>
                  <Select
                    value={t.gender}
                    onValueChange={(v) => {
                      const next = [...value];
                      next[i] = { ...t, gender: v as any };
                      onChange(next);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>ID Proof *</Label>
                  <Select
                    value={t.id_proof_type}
                    onValueChange={(v) => {
                      const next = [...value];
                      next[i] = { ...t, id_proof_type: v as any };
                      onChange(next);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AADHAR">Aadhar</SelectItem>
                      <SelectItem value="PASSPORT">Passport</SelectItem>
                      <SelectItem value="DRIVING_LICENSE">
                        Driving License
                      </SelectItem>
                      <SelectItem value="VOTER_ID">Voter ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <Label>ID Proof Number *</Label>
                  <Input
                    value={t.id_proof_number ?? ""}
                    onChange={(e) => {
                      const next = [...value];
                      next[i] = {
                        ...t,
                        id_proof_number: e.target.value,
                      };
                      onChange(next);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
