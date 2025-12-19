import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useOffers } from "@/hooks/useOffers";

const Offers = () => {
  const { offers, loading } = useOffers();

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading offers...
      </div>
    );
  }

  return (
    <main className="flex-1 w-screen ">
      {/* Hero */}
      <section className="py-20 bg-muted/40 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Special Offers & Deals
        </h1>
        <p className="text-muted-foreground text-lg">
          Book smarter with exclusive deals managed by our team
        </p>
      </section>

      {/* Offers Grid */}
      <section className="py-16">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <Card key={offer.id} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0 relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-60 w-full object-cover"
                />
                {offer.tag && (
                  <Badge className="absolute top-4 right-4">
                    {offer.tag}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="pt-6 flex-grow">
                <h3 className="text-2xl font-bold mb-2">
                  {offer.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {offer.description}
                </p>

                {offer.price && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {offer.price}
                    </span>
                    {offer.oldPrice && (
                      <span className="line-through text-muted-foreground">
                        {offer.oldPrice}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/holidays">View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Offers;
