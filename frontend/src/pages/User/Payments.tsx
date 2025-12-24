import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
      </CardHeader>
      <CardContent className="py-10 text-center text-muted-foreground">
        <p>No saved payment methods.</p>
        <Button className="mt-4">Add Payment Method</Button>
      </CardContent>
    </Card>
  );
}
