import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BookingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
      </CardHeader>
      <CardContent className="py-10 text-center text-muted-foreground">
        No bookings found.
      </CardContent>
    </Card>
  );
}
