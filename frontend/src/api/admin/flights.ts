import { authClient } from "../axios";


export const getAdminFlights = async (params?: any) => {
  return await authClient.get("/admin/flights", { params });
};

export const createAdminFlight = async (payload: any) => {
  return await authClient.post("/admin/flights", payload);
};

export const updateAdminFlight = async (flightId: string, payload: any) => {
  return await authClient.put(`/admin/flights/${flightId}`, payload);
};

export const deleteAdminFlight = async (flightId: string) => {
  return await authClient.delete(`/admin/flights/${flightId}`);
};

export const activateAdminFlight = async (flightId: string) => {
  return await authClient.post(`/admin/flights/activate/${flightId}`);
};

export const deactivateAdminFlight = async (flightId: string) => {
  return await authClient.post(`/admin/flights/deactivate/${flightId}`);
};
