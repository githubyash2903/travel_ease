import { authClient } from "../axios";


/* LIST */
export const getAdminHotels = async (params?: any) => {
  return await authClient.get("/admin/hotels", { params });
};

/* CREATE */
export const createAdminHotel = async (payload: any) => {
  return await authClient.post("/admin/hotels", payload);
};

/* UPDATE */
export const updateAdminHotel = async (hotelId: string, payload: any) => {
  return await authClient.put(`/admin/hotels/${hotelId}`, payload);
};

/* DELETE */
export const deleteAdminHotel = async (hotelId: string) => {
  return await authClient.delete(`/admin/hotels/${hotelId}`);
};

/* ACTIVATE / DEACTIVATE */
export const activateAdminHotel = async (hotelId: string) => {
  return await authClient.post(`/admin/hotels/activate/${hotelId}`);
};

export const deactivateAdminHotel = async (hotelId: string) => {
  return await authClient.post(`/admin/hotels/deactivate/${hotelId}`);
};
