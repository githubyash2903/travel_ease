import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Hotel, Package, Clock, Tag, TrendingUp } from "lucide-react";

const offers = [
  {
    id: 1,
    type: "flight",
    title: "Flat 25% OFF on International Flights",
    description: "Book international flights and save big with our exclusive offer",
    discount: "25% OFF",
    code: "FLY25",
    validUntil: "March 31, 2024",
    terms: "Min booking of $500",
    image: "/src/assets/dest-city.jpg"
  },
  {
    id: 2,
    type: "hotel",
    title: "Luxury Hotels Starting at $99",
    description: "Experience luxury accommodation at unbeatable prices",
    discount: "Up to 40% OFF",
    code: "LUXURY99",
    validUntil: "April 15, 2024",
    terms: "Min 2 nights stay",
    image: "/src/assets/hero-beach.jpg"
  },
  {
    id: 3,
    type: "package",
    title: "All-Inclusive Beach Packages",
    description: "Complete beach vacation packages with flights, hotels & meals",
    discount: "Save $500",
    code: "BEACH500",
    validUntil: "May 30, 2024",
    terms: "Min 5 days package",
    image: "/src/assets/dest-coastal.jpg"
  },
  {
    id: 4,
    type: "flight",
    title: "Early Bird Domestic Flights",
    description: "Book 30 days in advance and get extra discounts",
    discount: "15% OFF",
    code: "EARLY15",
    validUntil: "December 31, 2024",
    terms: "Book 30 days ahead",
    image: "/src/assets/dest-mountains.jpg"
  },
  {
    id: 5,
    type: "hotel",
    title: "Weekend Getaway Deals",
    description: "Special rates for weekend stays at top destinations",
    discount: "30% OFF",
    code: "WEEKEND30",
    validUntil: "April 30, 2024",
    terms: "Fri-Sun bookings only",
    image: "/src/assets/dest-nature.jpg"
  },
  {
    id: 6,
    type: "package",
    title: "Family Holiday Special",
    description: "Complete family vacation packages with activities included",
    discount: "Kids Free",
    code: "FAMILY2024",
    validUntil: "June 30, 2024",
    terms: "2 adults + 2 kids",
    image: "/src/assets/dest-city.jpg"
  }
];

const bankOffers = [
  {
    bank: "HDFC Bank",
    discount: "10% OFF",
    maxDiscount: "Up to $100",
    cards: "Credit & Debit Cards"
  },
  {
    bank: "ICICI Bank",
    discount: "12% OFF",
    maxDiscount: "Up to $150",
    cards: "Credit Cards"
  },
  {
    bank: "Axis Bank",
    discount: "8% OFF",
    maxDiscount: "Up to $80",
    cards: "Credit Cards"
  },
  {
    bank: "SBI Cards",
    discount: "15% OFF",
    maxDiscount: "Up to $200",
    cards: "Credit Cards"
  }
];

export default function Offers() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 px-4">
          <div className="container text-center">
            <Badge className="mb-4" variant="secondary">
              <TrendingUp className="h-3 w-3 mr-1" />
              Hot Deals
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Exclusive Travel Offers
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Discover amazing deals and save big on your next adventure
            </p>
          </div>
        </section>

        {/* Offers Section */}
        <section className="py-12 px-4">
          <div className="container">
            <Tabs defaultValue="all" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto">
                <TabsTrigger value="all">All Offers</TabsTrigger>
                <TabsTrigger value="flight" className="gap-1">
                  <Plane className="h-4 w-4" />
                  Flights
                </TabsTrigger>
                <TabsTrigger value="hotel" className="gap-1">
                  <Hotel className="h-4 w-4" />
                  Hotels
                </TabsTrigger>
                <TabsTrigger value="package" className="gap-1">
                  <Package className="h-4 w-4" />
                  Packages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {offers.map((offer) => (
                    <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700">
                          {offer.discount}
                        </Badge>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          {offer.type === "flight" && <Plane className="h-4 w-4 text-primary" />}
                          {offer.type === "hotel" && <Hotel className="h-4 w-4 text-primary" />}
                          {offer.type === "package" && <Package className="h-4 w-4 text-primary" />}
                          <span className="text-sm text-muted-foreground capitalize">{offer.type}</span>
                        </div>
                        <CardTitle className="line-clamp-2">{offer.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {offer.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Tag className="h-4 w-4" />
                              <span>Code: <span className="font-semibold text-foreground">{offer.code}</span></span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Valid until {offer.validUntil}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{offer.terms}</p>
                          <Button className="w-full">
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="flight">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {offers.filter(o => o.type === "flight").map((offer) => (
                    <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700">
                          {offer.discount}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{offer.title}</CardTitle>
                        <CardDescription>{offer.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-1 text-sm">
                            <Tag className="h-4 w-4" />
                            <span>Code: <span className="font-semibold">{offer.code}</span></span>
                          </div>
                          <Button className="w-full">Book Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hotel">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {offers.filter(o => o.type === "hotel").map((offer) => (
                    <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700">
                          {offer.discount}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{offer.title}</CardTitle>
                        <CardDescription>{offer.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-1 text-sm">
                            <Tag className="h-4 w-4" />
                            <span>Code: <span className="font-semibold">{offer.code}</span></span>
                          </div>
                          <Button className="w-full">Book Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="package">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {offers.filter(o => o.type === "package").map((offer) => (
                    <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700">
                          {offer.discount}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{offer.title}</CardTitle>
                        <CardDescription>{offer.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-1 text-sm">
                            <Tag className="h-4 w-4" />
                            <span>Code: <span className="font-semibold">{offer.code}</span></span>
                          </div>
                          <Button className="w-full">Book Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Bank Offers Section */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Bank Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bankOffers.map((bank) => (
                <Card key={bank.bank}>
                  <CardHeader>
                    <CardTitle className="text-lg">{bank.bank}</CardTitle>
                    <div className="text-2xl font-bold text-primary">{bank.discount}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{bank.maxDiscount}</p>
                    <p className="text-sm">{bank.cards}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
