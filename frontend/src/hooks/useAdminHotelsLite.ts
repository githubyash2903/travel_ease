import { getAdminHotels } from "@/api/admin/hotels";
import { useQuery } from "@tanstack/react-query";

export const useAdminHotelsLite = () =>
  useQuery({
    queryKey: ["admin-hotels-lite"],
    queryFn: () => getAdminHotels({ type: "all" }),
    select: (res) => res.data.data,
  });
