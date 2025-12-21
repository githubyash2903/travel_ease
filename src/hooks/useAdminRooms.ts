import {
  getAdminRooms,
  getAdminRoomsByHotel,
  createAdminRoom,
  updateAdminRoom,
  deleteAdminRoom,
  activateAdminRoom,
  deactivateAdminRoom,
} from "@/api/admin/rooms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminRooms = (params?: any) =>
  useQuery({
    queryKey: ["admin-rooms", params?.toString()],
    queryFn: () => getAdminRooms(params),
    select: (res) => res.data.data,
  });

export const useAdminRoomsByHotel = (hotelId?: string) =>
  useQuery({
    enabled: !!hotelId,
    queryKey: ["admin-rooms", hotelId],
    queryFn: () => getAdminRoomsByHotel(hotelId!),
    select: (res) => res.data.data,
  });

export const useAdminRoomMutations = () => {
  const qc = useQueryClient();

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["admin-rooms"] });

  return {
    create: useMutation({
      mutationFn: createAdminRoom,
      onSuccess: invalidate,
    }),
    update: useMutation({
      mutationFn: ({ id, payload }: any) =>
        updateAdminRoom(id, payload),
      onSuccess: invalidate,
    }),
    remove: useMutation({
      mutationFn: deleteAdminRoom,
      onSuccess: invalidate,
    }),
    activate: useMutation({
      mutationFn: activateAdminRoom,
      onSuccess: invalidate,
    }),
    deactivate: useMutation({
      mutationFn: deactivateAdminRoom,
      onSuccess: invalidate,
    }),
  };
};
