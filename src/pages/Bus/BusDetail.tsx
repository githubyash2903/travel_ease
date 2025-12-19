import { useParams, useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Clock, Users, Wifi, Zap, Tv, Coffee, Shield } from "lucide-react";

export default function BusDetail() {
  const { id } = useParams();
   const navigate = useNavigate();

  const busDetails = {
    id: id,
    operator: "Volvo Express",
    busType: "AC Sleeper (2+1)",
    busNumber: "DL01-AB-1234",
    from: "Delhi",
    to: "Jaipur",
    departureTime: "22:00",
    arrivalTime: "06:00",
    date: "2024-03-25",
    duration: "8h",
    price: 1200,
    rating: 4.5,
    totalRatings: 245,
    seats: 15,
    totalSeats: 30,
    amenities: ["WiFi", "Blanket", "Water Bottle", "Charging Point", "Entertainment", "Reading Light"],
    boardingPoints: [
      { location: "Kashmere Gate", time: "22:00" },
      { location: "Majnu Ka Tilla", time: "22:15" },
      { location: "Azadpur", time: "22:30" }
    ],
    droppingPoints: [
      { location: "Sindhi Camp", time: "05:45" },
      { location: "Jaipur Railway Station", time: "06:00" },
      { location: "Ajmeri Gate", time: "06:15" }
    ],
    policies: [
      "Cancellation charges apply as per policy",
      "Partial cancellation not allowed",
      "Luggage limit: 2 bags per person (max 15kg each)",
      "ID proof mandatory for boarding"
    ],
    facilities: [
      { icon: Wifi, label: "WiFi" },
      { icon: Zap, label: "Charging Port" },
      { icon: Tv, label: "Entertainment" },
      { icon: Coffee, label: "Water Bottle" },
      { icon: Shield, label: "GPS Tracking" }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
   
      
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{busDetails.operator}</CardTitle>
                      <Badge variant="secondary" className="mb-2">{busDetails.busType}</Badge>
                      <p className="text-sm text-muted-foreground">Bus No: {busDetails.busNumber}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{busDetails.rating}</span>
                      <span className="text-sm text-muted-foreground">({busDetails.totalRatings})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Departure</p>
                      <p className="font-semibold text-lg">{busDetails.departureTime}</p>
                      <p className="text-sm">{busDetails.from}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <Clock className="h-5 w-5 text-muted-foreground mb-1" />
                      <p className="text-sm font-medium">{busDetails.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Arrival</p>
                      <p className="font-semibold text-lg">{busDetails.arrivalTime}</p>
                      <p className="text-sm">{busDetails.to}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{busDetails.seats} seats available</span>
                    </div>
                    <Badge variant="outline">{busDetails.totalSeats} Total Seats</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Amenities & Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {busDetails.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                        <facility.icon className="h-5 w-5 text-primary" />
                        <span className="text-sm">{facility.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Boarding & Dropping Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        Boarding Points
                      </h3>
                      <div className="space-y-3">
                        {busDetails.boardingPoints.map((point, index) => (
                          <div key={index} className="flex justify-between items-center p-2 rounded bg-muted/50">
                            <span className="text-sm">{point.location}</span>
                            <span className="text-sm font-medium">{point.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        Dropping Points
                      </h3>
                      <div className="space-y-3">
                        {busDetails.droppingPoints.map((point, index) => (
                          <div key={index} className="flex justify-between items-center p-2 rounded bg-muted/50">
                            <span className="text-sm">{point.location}</span>
                            <span className="text-sm font-medium">{point.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cancellation & Policies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {busDetails.policies.map((policy, index) => (
                      <li key={index} className="flex gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>{policy}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Journey Date</p>
                    <p className="font-semibold">{busDetails.date}</p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Route</p>
                    <p className="font-semibold">{busDetails.from} → {busDetails.to}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Base Fare</span>
                      <span className="font-semibold">₹{busDetails.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Taxes & Fees</span>
                      <span className="font-semibold">₹{Math.round(busDetails.price * 0.05)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{busDetails.price + Math.round(busDetails.price * 0.05)}
                    </span>
                  </div>

                    <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      const total = busDetails.price + Math.round(busDetails.price * 0.05);
                      navigate("/checkout", {
                        state: {
                          title: `${busDetails.operator} - ${busDetails.busType}`,
                          destination: `${busDetails.from} → ${busDetails.to}`,
                          date: busDetails.date,
                          basePrice: `₹${busDetails.price}`,
                          taxes: `₹${Math.round(busDetails.price * 0.05)}`,
                          totalPrice: `₹${total}`,
                          type: "bus"
                        }
                      });
                    }}
                  >
                    Select Seats & Proceed
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By proceeding, you agree to our Terms & Conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}