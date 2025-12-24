import {
  getAdminFlights,
  createAdminFlight,
  updateAdminFlight,
  deleteAdminFlight,
  activateAdminFlight,
  deactivateAdminFlight,
} from "@/api/admin/flights";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminFlights = (params?: any) =>
  useQuery({
    queryKey: ["admin-flights", params?.toString()],
    queryFn: () => getAdminFlights(params),
    select: (res) => res.data.data,
  });

export const useAdminFlightMutations = () => {
  const qc = useQueryClient();

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["admin-flights"] });

  return {
    create: useMutation({
      mutationFn: createAdminFlight,
      onSuccess: invalidate,
    }),
    update: useMutation({
      mutationFn: ({ id, payload }: any) =>
        updateAdminFlight(id, payload),
      onSuccess: invalidate,
    }),
    remove: useMutation({
      mutationFn: deleteAdminFlight,
      onSuccess: invalidate,
    }),
    activate: useMutation({
      mutationFn: activateAdminFlight,
      onSuccess: invalidate,
    }),
    deactivate: useMutation({
      mutationFn: deactivateAdminFlight,
      onSuccess: invalidate,
    }),
  };
};
