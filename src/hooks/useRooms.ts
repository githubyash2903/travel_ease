import { getHotel, getHotelRooms, getHotels, getRoom } from "@/api/hotels";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type ProfileResponse = Awaited<ReturnType<typeof getHotels>>;

export const useRooms = (
  options?: Omit<
    UseQueryOptions<ProfileResponse, Error, ProfileResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >,
  params?: any,
  hotelId?: string
) => {
  return useQuery({
    queryKey: ["rooms", params.toString()],
    queryFn: () => getHotelRooms(params,hotelId),
    select: (data) => data.data.data,
    ...options,
  });
};
export const useRoom = (
  options?: Omit<
    UseQueryOptions<ProfileResponse, Error, ProfileResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >,
  roomId?: string,
) => {
  return useQuery({
    queryKey: ["room",roomId],
    queryFn: () => getRoom(roomId),
    select: (data) => data.data.data,
    ...options,
  });
};
