
import { getHolidayPackage, getHolidayPackages } from "@/api/holidayPackages";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type HolidayPackageResponse = Awaited<ReturnType<typeof getHolidayPackages>>;

export const useHolidayPackages = (
  options?: Omit<
    UseQueryOptions<HolidayPackageResponse, Error, HolidayPackageResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >,
  params?: any
) => {
  return useQuery({
    queryKey: ["HolidayPackages", params.toString()],
    queryFn: () => getHolidayPackages(params),
    select: (data) => data.data.data,
    ...options,
  });
};
export const useHolidayPackage = (
  options?: Omit<
    UseQueryOptions<HolidayPackageResponse, Error, HolidayPackageResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >,
  packageId?: string,
) => {
  return useQuery({
    queryKey: ["HolidayPackage",packageId],
    queryFn: () => getHolidayPackage(packageId),
    select: (data) => data.data.data,
    ...options,
  });
};
