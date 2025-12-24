import { useEffect, useState } from "react";
import { getAllOffers } from "@/api/offers";

export interface Offer {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  price?: string;
  oldPrice?: string;
  tag?: string;
  code?: string;
}

export const useOffers = () => {

  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOffers()
      .then((data) => setOffers(data))
      .finally(() => setLoading(false));
  }, []);
console.log(offers);
  return { offers, loading };
  
};
