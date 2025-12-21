import { getFlight, getFlights } from "@/api/flights";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type ProfileResponse = Awaited<ReturnType<typeof getFlights>>;

export const useFlights = (
  options?: Omit<
    UseQueryOptions<ProfileResponse, Error, ProfileResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >,
  params?: any
) => {
  return useQuery({
    queryKey: ["flights", params.toString()],
    queryFn: () => getFlights(params),
    select: (data) => data.data.data,
    ...options,
  });
};
export const useFlight = (
  options?: Omit<
    UseQueryOptions<ProfileResponse, Error, ProfileResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >,
  flightId?: string,
) => {
  return useQuery({
    queryKey: ["flight",flightId],
    queryFn: () => getFlight(flightId),
    select: (data) => data.data.data,
    ...options,
  });
};
