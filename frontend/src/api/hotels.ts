import { publicClient } from "./axios";

export const getHotels = async (params) => {
  return await publicClient.get("/public/hotels", { params });
};
export const getHotel = async (hotelId) => {
  return await publicClient.get(`/public/hotels/${hotelId}`);
};
export const getHotelRooms = async (params,hotelId) => {
  return await publicClient.get(`/public/room/${hotelId}`, { params });
};
export const getRoom = async (roomId) => {
  return await publicClient.get(`/public/room/${roomId}`);
};

/* -------------------------------------------------
   SEARCH HOTELS (LISTING PAGE)
------------------------------------------------- */
export const searchHotelsAPI = async (params: {
  city: string;
  checkin?: string;
  checkout?: string;
  guests?: number;
  rooms?: number;
  priceMin?: number;
  priceMax?: number;
  stars?: string; // "5,4"
  amenities?: string; // "Wifi,Pool"
  propertyType?: string;
  roomType?: string;
  page?: number;
  limit?: number;
}) => {
  const res = await publicClient.get("/hotels", { params });
  return res.data;
};

/* -------------------------------------------------
   HOTEL DETAIL
------------------------------------------------- */
export const getHotelByIdAPI = async (id: string) => {
  const res = await publicClient.get(`/hotels/${id}`);
  return res.data;
};

/* -------------------------------------------------
   HOTEL CITIES (SEARCH DROPDOWN)
------------------------------------------------- */
export const getHotelCitiesAPI = async () => {
  const res = await publicClient.get("/hotels/cities");
  return res.data.cities;
};

/* -------------------------------------------------
   ROOM TYPES (FILTER)
------------------------------------------------- */
export const getRoomTypesAPI = async () => {
  const res = await publicClient.get("/hotels/room-types");
  return res.data.roomTypes;
};

/* -------------------------------------------------
   BOOK HOTEL
------------------------------------------------- */
export const bookHotelAPI = async (payload: {
  hotelId: string;
  roomId: string;
  checkin: string;
  checkout: string;
  guests: number;
}) => {
  const res = await publicClient.post("/hotels/book", payload);
  return res.data;
};
