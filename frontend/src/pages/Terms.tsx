import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
     
      
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Terms & Conditions</h1>
            <p className="text-muted-foreground">Last updated: March 2024</p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using TravelEase's website and services, you agree to be bound by these Terms and Conditions. 
                  If you do not agree with any part of these terms, please do not use our services.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">2. Services Provided</h2>
                <p className="text-muted-foreground mb-3">
                  TravelEase provides online travel booking services including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Flight reservations and bookings</li>
                  <li>Hotel accommodations booking</li>
                  <li>Holiday package arrangements</li>
                  <li>Travel-related information and recommendations</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">3. Booking and Payment</h2>
                <p className="text-muted-foreground mb-3">
                  All bookings made through TravelEase are subject to availability and confirmation. 
                  Prices are displayed in USD and include all applicable taxes unless otherwise stated.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Full payment is required at the time of booking unless otherwise specified</li>
                  <li>We accept major credit cards and approved payment methods</li>
                  <li>All transactions are processed through secure payment gateways</li>
                  <li>Confirmation will be sent via email within 24 hours of booking</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">4. Cancellations and Refunds</h2>
                <p className="text-muted-foreground mb-3">
                  Cancellation and refund policies vary depending on the service provider (airline, hotel, etc.) and 
                  the type of booking made. Please review the specific cancellation policy before confirming your booking.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Cancellation fees may apply as per the provider's policy</li>
                  <li>Refunds will be processed within 7-14 business days</li>
                  <li>Non-refundable bookings cannot be cancelled for a refund</li>
                  <li>Service fees are typically non-refundable</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">5. User Responsibilities</h2>
                <p className="text-muted-foreground mb-3">
                  Users are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Providing accurate and complete information during booking</li>
                  <li>Ensuring passport and visa requirements are met</li>
                  <li>Arriving at departure points with adequate time</li>
                  <li>Maintaining the confidentiality of account credentials</li>
                  <li>Complying with all applicable laws and regulations</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  TravelEase acts as an intermediary between customers and service providers (airlines, hotels, etc.). 
                  We are not liable for any losses, damages, or injuries resulting from services provided by third parties. 
                  Our liability is limited to the amount paid for the booking.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">7. Travel Documents and Requirements</h2>
                <p className="text-muted-foreground">
                  Travelers are responsible for obtaining and carrying all required travel documents including passports, 
                  visas, health certificates, and any other documents required by authorities. TravelEase is not responsible 
                  for denied boarding or entry due to inadequate documentation.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">8. Force Majeure</h2>
                <p className="text-muted-foreground">
                  TravelEase shall not be held liable for any failure or delay in performance due to circumstances beyond 
                  our reasonable control, including but not limited to natural disasters, war, terrorism, civil unrest, 
                  strikes, or government actions.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">9. Privacy and Data Protection</h2>
                <p className="text-muted-foreground">
                  Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, 
                  use, and protect your personal data.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">10. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  TravelEase reserves the right to modify these Terms and Conditions at any time. Changes will be effective 
                  immediately upon posting on our website. Continued use of our services constitutes acceptance of the 
                  modified terms.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">11. Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms and Conditions, please contact us at:
                </p>
                <div className="mt-3 space-y-1 text-muted-foreground">
                  <p>Email: legal@travelease.com</p>
                  <p>Phone: 1-800-TRAVEL-00</p>
                  <p>Address: 123 Travel Street, New York, NY 10001</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
