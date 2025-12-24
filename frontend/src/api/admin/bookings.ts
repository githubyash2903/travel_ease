import { authClient } from "../axios";

/* LIST */
export const getAdminBookings = async (params?: any) => {
  return await authClient.get("/admin/bookings", { params });
};

/* APPROVE */
export const approveAdminBooking = async (bookingId: string) => {
  return await authClient.post(`/admin/bookings/${bookingId}/approve`);
};

/* DECLINE */
export const declineAdminBooking = async (
  bookingId: string,
  reason: string
) => {
  return await authClient.post(`/admin/bookings/${bookingId}/decline`, {
    reason,
  });
};
