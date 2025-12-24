import { getAdminProfile, getProfile, updateProfile } from "@/api/user";
import { useAuth } from "@/context/AuthContext";
import {
  useMutation,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";

type ProfileResponse = Awaited<ReturnType<typeof getProfile>>;

export const useProfileData = (
  options?: Omit<
    UseQueryOptions<ProfileResponse, Error, ProfileResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >
) => {
  const { role } = useAuth();

  return useQuery({
    queryKey: ["user"],
    queryFn: role === "admin" ? getAdminProfile : getProfile,
    select: (data) => data.data.data,
    ...options,
  });
};
export const useAdminProfileData = (
  options?: Omit<
    UseQueryOptions<ProfileResponse, Error, ProfileResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getAdminProfile,
    select: (data) => data.data.data,
    ...options,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};
