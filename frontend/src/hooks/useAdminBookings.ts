import {
  getAdminBookings,
  approveAdminBooking,
  declineAdminBooking,
} from "@/api/admin/bookings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminBookings = (params?: any) => {
  return useQuery({
    queryKey: ["admin-bookings", params],
    queryFn: () => getAdminBookings(params),
    select: (res) => res.data.data,
  });
};

export const useAdminBookingMutations = () => {
  const qc = useQueryClient();

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["admin-bookings"] });

  return {
    approve: useMutation({
      mutationFn: approveAdminBooking,
      onSuccess: invalidate,
    }),
    decline: useMutation({
      mutationFn: ({ id, reason }: any) =>
        declineAdminBooking(id, reason),
      onSuccess: invalidate,
    }),
  };
};
