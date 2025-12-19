import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Calendar, MapPin, Users, CreditCard, Download, Mail, Phone } from "lucide-react";

export default function BookingConfirmation() {
  const location = useLocation();
  const bookingData = location.state || {};

  const handleDownloadReceipt = () => {
    // In production, this would generate and download a PDF receipt
    alert("Receipt download will be available soon!");
  };

  const handleEmailReceipt = () => {
    alert("Receipt sent to your email!");
  };

  return (
    <div className="min-h-screen flex flex-col">
  
      
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-green-900 mb-2">
                    Booking Confirmed!
                  </h1>
                  <p className="text-green-800 mb-4">
                    Your booking has been successfully confirmed. A confirmation email has been sent to your registered email address.
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={handleDownloadReceipt} variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Receipt
                    </Button>
                    <Button onClick={handleEmailReceipt} variant="outline" className="gap-2">
                      <Mail className="h-4 w-4" />
                      Email Receipt
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                    <p className="font-semibold text-lg">{bookingData.bookingId || "BK123456789"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Booking Date</p>
                    <p className="font-semibold">
                      {bookingData.paymentDate 
                        ? new Date(bookingData.paymentDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })
                        : new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })
                      }
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Trip Information
                  </h3>
                  <p className="font-medium">{bookingData.title || "Your Booking"}</p>
                  {bookingData.destination && (
                    <p className="text-sm text-muted-foreground">{bookingData.destination}</p>
                  )}
                  {bookingData.date && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      {bookingData.date}
                    </p>
                  )}
                </div>

                {bookingData.travelers && bookingData.travelers.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Traveler Information
                      </h3>
                      <div className="space-y-3">
                        {bookingData.travelers.map((traveler: any, index: number) => (
                          <div key={index} className="p-3 bg-muted rounded-lg">
                            <p className="font-medium">
                              Traveler {index + 1}: {traveler.firstName} {traveler.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">{traveler.email}</p>
                            <p className="text-sm text-muted-foreground">{traveler.phone}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Method</span>
                      <span className="capitalize">{bookingData.paymentMethod || "Card"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Price</span>
                      <span>{bookingData.basePrice || "$500"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxes & Fees</span>
                      <span>{bookingData.taxes || "$50"}</span>
                    </div>
                    {bookingData.discount && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-{bookingData.discount}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Paid</span>
                      <span className="text-primary">{bookingData.totalPrice || "$550"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our customer support team is available 24/7 to assist you
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" className="gap-2" asChild>
                      <Link to="/contact">
                        <Phone className="h-4 w-4" />
                        Contact Support
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/dashboard">
                        View My Bookings
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p>• Please arrive at least 2 hours before departure for domestic flights and 3 hours for international flights.</p>
                  <p>• Carry a valid government-issued photo ID for verification.</p>
                  <p>• Check baggage allowance and restrictions before packing.</p>
                  <p>• For any changes or cancellations, please refer to our cancellation policy.</p>
                  <p>• Keep your booking ID handy for all future correspondence.</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/">Return to Home</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">My Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
