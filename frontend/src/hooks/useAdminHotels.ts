import {
  getAdminHotels,
  createAdminHotel,
  updateAdminHotel,
  deleteAdminHotel,
  activateAdminHotel,
  deactivateAdminHotel,
} from "@/api/admin/hotels";
import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";

type ListResponse = Awaited<ReturnType<typeof getAdminHotels>>;

export const useAdminHotels = (
  options?: Omit<
    UseQueryOptions<ListResponse, Error, ListResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >,
  params?: any
) => {
  return useQuery({
    queryKey: ["admin-hotels", params?.toString()],
    queryFn: () => getAdminHotels(params),
    select: (res) => res.data.data,
    ...options,
  });
};

export const useAdminHotelMutations = () => {
  const qc = useQueryClient();

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["admin-hotels"] });

  return {
    create: useMutation({
      mutationFn: createAdminHotel,
      onSuccess: invalidate,
    }),
    update: useMutation({
      mutationFn: ({ id, payload }: any) =>
        updateAdminHotel(id, payload),
      onSuccess: invalidate,
    }),
    remove: useMutation({
      mutationFn: deleteAdminHotel,
      onSuccess: invalidate,
    }),
    activate: useMutation({
      mutationFn: activateAdminHotel,
      onSuccess: invalidate,
    }),
    deactivate: useMutation({
      mutationFn: deactivateAdminHotel,
      onSuccess: invalidate,
    }),
  };
};
