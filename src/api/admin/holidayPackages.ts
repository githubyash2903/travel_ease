import { authClient } from "../axios";

export const getAdminHolidayPackages = async (params?: any) =>
  authClient.get("/admin/holiday-packages", { params });

export const createAdminHolidayPackage = async (payload: any) =>
  authClient.post("/admin/holiday-packages", payload);

export const updateAdminHolidayPackage = async (id: string, payload: any) =>
  authClient.put(`/admin/holiday-packages/${id}`, payload);

export const deleteAdminHolidayPackage = async (id: string) =>
  authClient.delete(`/admin/holiday-packages/${id}`);

export const activateAdminHolidayPackage = async (id: string) =>
  authClient.post(`/admin/holiday-packages/activate/${id}`);

export const deactivateAdminHolidayPackage = async (id: string) =>
  authClient.post(`/admin/holiday-packages/deactivate/${id}`);
