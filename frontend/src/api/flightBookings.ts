import { publicClient } from "./axios";

export const bookFlightAPI = async (payload: {
  flightId: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: string;
  totalPrice: number;
}) => {
  const res = await publicClient.post("/flight-bookings", payload);
  return res.data;
};
