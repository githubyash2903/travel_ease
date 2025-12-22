import { publicClient } from "./axios";

export const getHolidayPackages = async (params?: any) =>
  publicClient.get("/public/holiday-packages", { params });

export const getHolidayPackage = async (packageId) => {
  return await publicClient.get(`/public/holiday-packages/${packageId}`);
};
