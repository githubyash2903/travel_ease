import { authClient } from "./axios";

/* CREATE */
export const bookFlight = (payload: any) =>
  authClient.post("/user/bookings/flight", payload);

export const bookHotel = (payload: any) =>
  authClient.post("/user/bookings/hotel", payload);

export const bookPackage = (payload: any) =>
  authClient.post("/user/bookings/package", payload);

/* LIST / DETAIL */
export const getMyBookings = () =>
  authClient.get("/user/bookings");

export const getMyBookingById = (id: string) =>
  authClient.get(`/user/bookings/${id}`);
