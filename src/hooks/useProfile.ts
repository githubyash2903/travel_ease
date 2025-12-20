import { getProfile, updateProfile } from "@/api/user";
import { useMutation, useQuery, type UseQueryOptions, } from "@tanstack/react-query";


type ProfileResponse = Awaited<ReturnType<typeof getProfile>>;

export const useProfileData = (
  options?: Omit<
    UseQueryOptions<ProfileResponse, Error, ProfileResponse["data"]["data"]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    select: (data) => data.data.data,
    ...options,
  });
};


export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};