// hooks/useRegisterUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser, registerUser } from "../api/auth";
import { loginUser } from "../api/auth";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear all cached data on logout
      queryClient.clear();
    },
  });
};
