import { useNavigate } from "react-router-dom";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useOffers } from "@/hooks/useOffers";

export const Promotions = () => {
  const navigate = useNavigate();
  const { offers, loading } = useOffers();

  if (loading) return null;

  return (
    <section className="py-16 px-4">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Exclusive Offers
          </h2>
          <p className="text-muted-foreground text-lg">
            Save more with our limited-time deals
          </p>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="max-w-6xl mx-auto">
          <CarouselContent>
            {offers.map((offer) => (
              <CarouselItem
                key={offer.id}
                className="md:basis-1/2 lg:basis-1/3 cursor-pointer"
                onClick={() => navigate("/offers")}
              >
                <CardContent className="p-0 h-full">
                  <div className="bg-primary p-6 text-white h-full flex flex-col justify-between rounded-lg hover:scale-[1.02] transition">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">
                        {offer.title}
                      </h3>
                      {offer.subtitle && (
                        <p className="text-lg mb-3">{offer.subtitle}</p>
                      )}
                      <p className="text-sm opacity-90">
                        {offer.description}
                      </p>
                    </div>

                    {offer.code && (
                      <Badge className="bg-white/20 text-white mt-6">
                        Code: {offer.code}
                      </Badge>
                    )}
                  </div>
                </CardContent>
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
