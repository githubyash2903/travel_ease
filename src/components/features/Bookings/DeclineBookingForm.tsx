import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function DeclineBookingForm({
  onSubmit,
}: {
  onSubmit: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  return (
    <div className="space-y-4">
      <div>
        <Label>Reason *</Label>
        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Explain why this booking is declined"
        />
      </div>

      <Button
        className="w-full"
        disabled={reason.length < 5}
        onClick={() => onSubmit(reason)}
      >
        Decline Booking
      </Button>
    </div>
  );
}
