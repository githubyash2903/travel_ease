import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet, Building2, Shield, Lock } from "lucide-react";
import { showToast } from "@/lib/toast";



export default function Payment() {
 

  const navigate = useNavigate();
  const location = useLocation();
  // const { toast } = useToast();
  const bookingData = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      showToast.success("Payment successfull");
      
      navigate("/booking-confirmation", {
        state: {
          ...bookingData,
          paymentMethod,
          bookingId: `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          paymentDate: new Date().toISOString()
        }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container">
          <div className="max-w-6xl text-center mx-auto">
            <h1 className="text-3xl font-bold mb-2">Payment Details</h1>
            <p className="text-muted-foreground mb-8">Choose your payment method and complete the transaction</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Payment Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="card" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card" onClick={() => setPaymentMethod("card")}>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Card
                        </TabsTrigger>
                        <TabsTrigger value="upi" onClick={() => setPaymentMethod("upi")}>
                          <Wallet className="h-4 w-4 mr-2" />
                          UPI
                        </TabsTrigger>
                        <TabsTrigger value="netbanking" onClick={() => setPaymentMethod("netbanking")}>
                          <Building2 className="h-4 w-4 mr-2" />
                          Net Banking
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="card" className="space-y-4 mt-6">
                        <form onSubmit={handlePayment}>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number *</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                required
                                maxLength={19}
                                value={cardDetails.cardNumber}
                                onChange={(e) => {
                                  let value = e.target.value.replace(/\s/g, '');
                                  value = value.match(/.{1,4}/g)?.join(' ') || value;
                                  setCardDetails({ ...cardDetails, cardNumber: value });
                                }}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cardName">Cardholder Name *</Label>
                              <Input
                                id="cardName"
                                placeholder="JOHN DOE"
                                required
                                value={cardDetails.cardName}
                                onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value.toUpperCase() })}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date *</Label>
                                <Input
                                  id="expiry"
                                  placeholder="MM/YY"
                                  required
                                  maxLength={5}
                                  value={cardDetails.expiryDate}
                                  onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, '');
                                    if (value.length >= 2) {
                                      value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                    }
                                    setCardDetails({ ...cardDetails, expiryDate: value });
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvv">CVV *</Label>
                                <Input
                                  id="cvv"
                                  type="password"
                                  placeholder="123"
                                  required
                                  maxLength={3}
                                  value={cardDetails.cvv}
                                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                                />
                              </div>
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={processing}>
                              {processing ? "Processing..." : `Pay ${bookingData.totalPrice || "$550"}`}
                            </Button>
                          </div>
                        </form>
                      </TabsContent>

                      <TabsContent value="upi" className="space-y-4 mt-6">
                        <form onSubmit={handlePayment}>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="upiId">UPI ID *</Label>
                              <Input
                                id="upiId"
                                placeholder="yourname@upi"
                                required
                              />
                            </div>

                            <div className="p-4 bg-muted rounded-lg">
                              <p className="text-sm text-muted-foreground">
                                Popular UPI Apps: Google Pay, PhonePe, Paytm, BHIM
                              </p>
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={processing}>
                              {processing ? "Processing..." : `Pay ${bookingData.totalPrice || "$550"}`}
                            </Button>
                          </div>
                        </form>
                      </TabsContent>

                      <TabsContent value="netbanking" className="space-y-4 mt-6">
                        <form onSubmit={handlePayment}>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Select Your Bank</Label>
                              <RadioGroup defaultValue="hdfc">
                                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                  <RadioGroupItem value="hdfc" id="hdfc" />
                                  <Label htmlFor="hdfc" className="flex-1 cursor-pointer">HDFC Bank</Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                  <RadioGroupItem value="icici" id="icici" />
                                  <Label htmlFor="icici" className="flex-1 cursor-pointer">ICICI Bank</Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                  <RadioGroupItem value="sbi" id="sbi" />
                                  <Label htmlFor="sbi" className="flex-1 cursor-pointer">State Bank of India</Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                  <RadioGroupItem value="axis" id="axis" />
                                  <Label htmlFor="axis" className="flex-1 cursor-pointer">Axis Bank</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={processing}>
                              {processing ? "Processing..." : "Continue to Bank"}
                            </Button>
                          </div>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Security Notice */}
                <Card className="mt-6 border-green-200 bg-green-50/50">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-900 mb-1">Secure Payment</h4>
                        <p className="text-sm text-green-800">
                          Your payment information is encrypted and secure. We never store your card details.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">{bookingData.title || "Your Booking"}</p>
                      {bookingData.destination && (
                        <p className="text-sm text-muted-foreground">{bookingData.destination}</p>
                      )}
                      {bookingData.date && (
                        <p className="text-sm text-muted-foreground">{bookingData.date}</p>
                      )}
                    </div>

                    <Separator />

                    {bookingData.travelers && (
                      <>
                        <div>
                          <p className="text-sm font-medium mb-2">Travelers</p>
                          {bookingData.travelers.map((traveler: any, index: number) => (
                            <p key={index} className="text-sm text-muted-foreground">
                              {traveler.firstName} {traveler.lastName}
                            </p>
                          ))}
                        </div>
                        <Separator />
                      </>
                    )}

                    <div className="space-y-2">
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
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Amount</span>
                      <span className="text-primary">{bookingData.totalPrice || "$550"}</span>
                    </div>

                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Lock className="h-4 w-4 inline mr-2" />
                        256-bit SSL encrypted
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
