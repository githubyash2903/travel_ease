import {publicClient} from "./axios";

export const getMyBookings = async () => {
  const res = await publicClient.get("/bookings/my");
  return res.data.bookings;
};
