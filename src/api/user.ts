// src/api/user.ts
import { authClient } from "@/api/axios";

/* ----------------------------------
   GET MY PROFILE
---------------------------------- */
export const getMyProfile = async () => {
  const res = await authClient.get("/user/get-profile");
  // backend → { success, message, data }
  return res.data.data;
};

/* ----------------------------------
   UPDATE MY PROFILE
   ⚠️ EMAIL NOT SENT (frontend-only fix)
---------------------------------- */
export const updateMyProfile = async (payload: { name: string , phone_no : number }) => {
  const res = await authClient.post("/user/update-profile", payload);
  return res.data.data ?? payload;
};

/* ----------------------------------
   CHANGE PASSWORD
---------------------------------- */
export const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  const res = await authClient.post("/user/update-password", payload);
  return res.data;
};

/* ----------------------------------
   DELETE ACCOUNT
---------------------------------- */
export const deleteMyAccount = async () => {
  const res = await authClient.delete("/user/delete-account");
  return res.data;
};
