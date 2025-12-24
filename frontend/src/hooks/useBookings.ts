import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bookFlight,
  bookHotel,
  bookPackage,
  getMyBookings,
} from "@/api/booking";

export const useBooking = () => {
  const qc = useQueryClient();

  return {
    flight: useMutation({
      mutationFn: bookFlight,
      onSuccess: () => qc.invalidateQueries({ queryKey: ["my-bookings"] }),
    }),
    hotel: useMutation({
      mutationFn: bookHotel,
      onSuccess: () => qc.invalidateQueries({ queryKey: ["my-bookings"] }),
    }),
    package: useMutation({
      mutationFn: bookPackage,
      onSuccess: () => qc.invalidateQueries({ queryKey: ["my-bookings"] }),
    }),
  };
};

export const useMyBookings = () =>
  useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
    select: (res) => res.data.data,
  });
