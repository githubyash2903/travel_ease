// src/pages/Checkout.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, MapPin, CreditCard, Trash2 } from "lucide-react";
import { showToast } from "@/lib/toast";
import { bookFlightAPI } from "@/api/flightBookings";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const flight = (location.state as any)?.flight || null;
  const searchData = (location.state as any)?.searchData || {};
  const formRef = useRef<HTMLDivElement>(null);

  if (!flight) {
    return <div className="text-center py-20 text-xl font-semibold">❌ No flight selected.</div>;
  }

  const initialTravellers = Math.max(1, Number(searchData?.travellers || 1));
  const [travelers, setTravelers] = useState(() => Array(initialTravellers).fill(0).map(()=>({
    firstName:"", lastName:"", email:"", phone:"", dateOfBirth:"", gender:"", nationality:"", idType:"", idNumber:"", mealPreference:"", specialAssistance:""
  })));
  const [billingInfo, setBillingInfo] = useState({ address:"", city:"", state:"", zipCode:"", country:"" });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const newCount = Math.max(1, Number(searchData?.travellers || 1));
    setTravelers(prev => {
      if (prev.length === newCount) return prev;
      if (prev.length < newCount) {
        return [...prev, ...Array(newCount - prev.length).fill(0).map(()=>({
          firstName:"", lastName:"", email:"", phone:"", dateOfBirth:"", gender:"", nationality:"", idType:"", idNumber:"", mealPreference:"", specialAssistance:""
        }))];
      }
      return prev.slice(0, newCount);
    });
  }, [searchData?.travellers]);
  

  const validateForm = () => {
    const newErrors: any = {};
    travelers.forEach((t, i) => {
      if (!t.firstName) newErrors[`firstName-${i}`] = "Required";
      if (!t.lastName) newErrors[`lastName-${i}`] = "Required";
      if (!t.email) newErrors[`email-${i}`] = "Required";
      if (!t.phone) newErrors[`phone-${i}`] = "Required";
    });
    if (!billingInfo.address) newErrors.address = "Required";
    if (!agreeToTerms) newErrors.terms = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


const handleProceedToPayment = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    showToast.error("Fix the errors to continue");
    return;
  }

  try {
    await bookFlightAPI({
      flightId: flight.id,
      adults: travelers.length,
      children: searchData?.children || 0,
      infants: searchData?.infants || 0,
      cabinClass: searchData?.cabinClass || flight.cabinClass,
      totalPrice: flight.fare?.total || flight.price,
    });

    navigate("/payment", {
      state: { travelers, billingInfo, flight, searchData },
    });

  } catch (err) {
    console.error(err);
    showToast.error("Failed to create booking");
  }
};


  const priceCurrency = flight.fare?.currency || "INR";
  const total = flight.fare?.total ?? flight.priceTotal ?? 0;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Complete Your Booking</h1>
            <p className="text-muted-foreground text-center mb-8">Fill traveler details to proceed</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" ref={formRef}>
              <div className="lg:col-span-2 space-y-6">
                {travelers.map((t, index) => (
                  <Card key={index}>
                    <CardHeader className="flex justify-between flex-row">
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" /> Traveler {index + 1}
                      </CardTitle>
                      {travelers.length > 1 && (
                        <Button variant="destructive" size="sm" onClick={() => setTravelers(prev=>prev.filter((_,i)=>i!==index))}>
                          <Trash2 className="h-4 w-4 mr-1" />Remove
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>First Name *</Label>
                          <Input value={t.firstName} onChange={(e)=>{ const a=[...travelers]; a[index].firstName=e.target.value; setTravelers(a); }} />
                          {errors[`firstName-${index}`] && <p className="text-red-600 text-xs">{errors[`firstName-${index}`]}</p>}
                        </div>
                        <div>
                          <Label>Last Name *</Label>
                          <Input value={t.lastName} onChange={(e)=>{ const a=[...travelers]; a[index].lastName=e.target.value; setTravelers(a); }} />
                          {errors[`lastName-${index}`] && <p className="text-red-600 text-xs">{errors[`lastName-${index}`]}</p>}
                        </div>
                      </div>
                      {/* ... other fields same pattern ... */}
                    </CardContent>
                  </Card>
                ))}

                <Button type="button" variant="outline" onClick={()=>setTravelers(prev=>[...prev,{ firstName:"", lastName:"", email:"", phone:"", dateOfBirth:"", gender:"", nationality:"", idType:"", idNumber:"", mealPreference:"", specialAssistance:"" }])}>Add Another Traveler</Button>

                <Card>
                  <CardHeader><CardTitle><MapPin className="inline h-5 w-5 mr-2" />Billing Information</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Address *</Label>
                      <Input value={billingInfo.address} onChange={(e)=>setBillingInfo({...billingInfo,address:e.target.value})} />
                      {errors.address && <p className="text-red-600 text-xs">{errors.address}</p>}
                    </div>
                    {/* city/state/zip/country */}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-2">
                      <Checkbox checked={agreeToTerms} onCheckedChange={(v:any)=>setAgreeToTerms(v)} />
                      <div>
                        <Label>I agree to Terms and Conditions</Label>
                        {errors.terms && <p className="text-red-600 text-xs">{errors.terms}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button size="lg" className="w-full" onClick={handleProceedToPayment}>Proceed to Payment</Button>
              </div>

              <div>
                <Card className="sticky top-24">
                  <CardHeader><CardTitle>Booking Summary</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold">{flight.airline} — {flight.flightNumber}</p>
                      <p className="text-sm text-muted-foreground">{searchData?.from} → {searchData?.to}</p>
                      <p className="text-sm text-muted-foreground">{searchData?.departureDate} • {flight.departure?.time?.slice(11,16) || "-"}</p>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>Travellers</span><span>{travelers.length}</span></div>
                      <div className="flex justify-between"><span>Class</span><span>{searchData?.cabinClass || flight.cabinClass}</span></div>
                      <div className="flex justify-between"><span>Total</span><span>{priceCurrency} {total}</span></div>
                    </div>

                    <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">
                      <CreditCard className="inline h-4 w-4 mr-2" />
                      Your payment is 100% secure.
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
