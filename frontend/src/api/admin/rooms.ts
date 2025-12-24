import { authClient } from "../axios";


/* ROOMS */
export const getAdminRooms = async (params?: any) => {
  return await authClient.get("/admin/rooms", { params });
};

export const getAdminRoomsByHotel = async (hotelId: string, params?: any) => {
  return await authClient.get(`/admin/rooms/hotel/${hotelId}`, { params });
};

export const getAdminRoom = async (roomId: string) => {
  return await authClient.get(`/admin/rooms/${roomId}`);
};

export const createAdminRoom = async (payload: any) => {
  return await authClient.post("/admin/rooms", payload);
};

export const updateAdminRoom = async (roomId: string, payload: any) => {
  return await authClient.put(`/admin/rooms/${roomId}`, payload);
};

export const deleteAdminRoom = async (roomId: string) => {
  return await authClient.delete(`/admin/rooms/${roomId}`);
};

export const activateAdminRoom = async (roomId: string) => {
  return await authClient.post(`/admin/rooms/activate/${roomId}`);
};

export const deactivateAdminRoom = async (roomId: string) => {
  return await authClient.post(`/admin/rooms/deactivate/${roomId}`);
};
