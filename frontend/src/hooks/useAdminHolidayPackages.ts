import {
  getAdminHolidayPackages,
  createAdminHolidayPackage,
  updateAdminHolidayPackage,
  deleteAdminHolidayPackage,
  activateAdminHolidayPackage,
  deactivateAdminHolidayPackage,
} from "@/api/admin/holidayPackages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminHolidayPackages = (params?: any) =>
  useQuery({
    queryKey: ["admin-holiday-packages", params?.toString()],
    queryFn: () => getAdminHolidayPackages(params),
    select: (res) => res.data.data,
  });

export const useAdminHolidayPackageMutations = () => {
  const qc = useQueryClient();
  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["admin-holiday-packages"] });

  return {
    create: useMutation({ mutationFn: createAdminHolidayPackage, onSuccess: invalidate }),
    update: useMutation({
      mutationFn: ({ id, payload }: any) => updateAdminHolidayPackage(id, payload),
      onSuccess: invalidate,
    }),
    remove: useMutation({ mutationFn: deleteAdminHolidayPackage, onSuccess: invalidate }),
    activate: useMutation({ mutationFn: activateAdminHolidayPackage, onSuccess: invalidate }),
    deactivate: useMutation({ mutationFn: deactivateAdminHolidayPackage, onSuccess: invalidate }),
  };
};
