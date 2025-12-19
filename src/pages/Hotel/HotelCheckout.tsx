import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {publicClient} from "@/api/axios";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { showToast } from "@/lib/toast";
import { Users, Calendar, Hotel, CreditCard } from "lucide-react";

export default function HotelCheckout() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Data received from HotelDetails page
  const hotel = state?.hotel;
  const room = state?.selectedRoom;
  const checkin = state?.checkin;
  const checkout = state?.checkout;
  const guests = state?.guests;

  if (!hotel || !room) {
    return (
      <div className="text-center py-20 text-xl font-bold text-red-500">
        ❌ No booking data found.
      </div>
    );
  }

  // FORM STATES
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [billing, setBilling] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [agree, setAgree] = useState(false);

  const handleConfirm = async () => {
    if (!user.name || !user.email || !user.phone) {
      return showToast.error("Enter all guest details");
    }
    if (!billing.address || !billing.city) {
      return showToast.error("Enter full billing details");
    }
    if (!agree) {
      return showToast.error("Please accept Terms & Conditions");
    }

    try {
      const res = await publicClient.post("/hotels/book", {
        hotelId: hotel.id,
        roomType: room.type,
        checkin,
        checkout,
        guests,
        user,
      });

      showToast.success("Booking Confirmed!");

      navigate("/hotel-booking-success", {
        state: { booking: res.data.booking },
      });
    } catch (err) {
      console.error(err);
      showToast.error("Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-10">
      <div className="container max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= LEFT: FORMS ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* GUEST DETAILS */}
          <Card>
            <CardHeader>
              <CardTitle>Guest Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  placeholder="Full Name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    placeholder="email@example.com"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    placeholder="Phone Number"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BILLING DETAILS */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <Label>Address</Label>
                <Input
                  value={billing.address}
                  onChange={(e) =>
                    setBilling({ ...billing, address: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    value={billing.city}
                    onChange={(e) =>
                      setBilling({ ...billing, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    value={billing.state}
                    onChange={(e) =>
                      setBilling({ ...billing, state: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>ZIP Code</Label>
                  <Input
                    value={billing.zip}
                    onChange={(e) =>
                      setBilling({ ...billing, zip: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    value={billing.country}
                    onChange={(e) =>
                      setBilling({ ...billing, country: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* TERMS */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <Label>I agree to the Terms & Conditions</Label>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full text-lg" size="lg" onClick={handleConfirm}>
            Confirm Booking
          </Button>
        </div>

        {/* ================= RIGHT: SUMMARY ================= */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex items-center gap-3">
                <Hotel className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p className="text-muted-foreground text-sm">{hotel.location}</p>
                </div>
              </div>

              <Separator />

              {/* Dates */}
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p>Check-in: {checkin}</p>
                  <p>Check-out: {checkout}</p>
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <p>{guests} Guests</p>
              </div>

              <Separator />

              {/* Room */}
              <div>
                <p className="font-semibold">{room.type}</p>
                <p className="text-muted-foreground text-sm">
                  ₹{room.price.toLocaleString()} / night
                </p>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">
                  ₹{room.price.toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-muted text-sm rounded-md flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                100% Secure Payment
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
