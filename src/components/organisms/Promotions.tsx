import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Percent, CreditCard, Plane, Hotel } from "lucide-react";

const promotions = [
  {
    id: 1,
    icon: Percent,
    title: "Flat 25% Off",
    subtitle: "On International Flights",
    description: "Book now and save big on your next international trip",
    color: "from-primary to-primary/80",
    code: "INTFLY25",
  },
  {
    id: 2,
    icon: CreditCard,
    title: "Bank Offer",
    subtitle: "Up to ₹5,000 Off",
    description: "Use HDFC credit cards and get instant discount",
    color: "from-accent to-accent/80",
    code: "HDFC5000",
  },
  {
    id: 3,
    icon: Plane,
    title: "Domestic Deals",
    subtitle: "Starting at ₹2,999",
    description: "Fly to your favorite destinations at unbeatable prices",
    color: "from-primary to-primary/70",
    code: "DOMESTIC",
  },
  {
    id: 4,
    icon: Hotel,
    title: "Hotel Stays",
    subtitle: "Up to 40% Off",
    description: "Luxurious stays at incredible prices",
    color: "from-accent/90 to-accent/70",
    code: "HOTEL40",
  },
];

export const Promotions = () => {
  return (
    <section className="py-16 px-4">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Exclusive Offers
          </h2>
          <p className="text-muted-foreground text-lg">
            Save more with our limited-time deals and promotions
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {promotions.map((promo) => (
              <CarouselItem key={promo.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-medium transition-shadow cursor-pointer border-0">
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-br ${promo.color} p-6 text-white`}>
                      <promo.icon className="h-12 w-12 mb-4" />
                      <h3 className="text-2xl font-bold mb-1">{promo.title}</h3>
                      <p className="text-white/90 text-lg mb-3">{promo.subtitle}</p>
                      <p className="text-sm text-white/80 mb-4">{promo.description}</p>
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        Code: {promo.code}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};
