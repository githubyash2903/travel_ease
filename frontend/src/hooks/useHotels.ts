import { getHotel, getHotels } from "@/api/hotels";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type ProfileResponse = Awaited<ReturnType<typeof getHotels>>;

export const useHotels = (
  options?: Omit<
    UseQueryOptions<ProfileResponse, Error, ProfileResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >,
  params?: any
) => {
  return useQuery({
    queryKey: ["hotels", params.toString()],
    queryFn: () => getHotels(params),
    select: (data) => data.data.data,
    ...options,
  });
};
export const useHotel = (
  options?: Omit<
    UseQueryOptions<ProfileResponse, Error, ProfileResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >,
  hotelId?: string,
) => {
  return useQuery({
    queryKey: ["hotel",hotelId],
    queryFn: () => getHotel(hotelId),
    select: (data) => data.data.data,
    ...options,
  });
};
