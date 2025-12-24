import { authClient } from "./axios";

/* ---------------------------------------------
   GET ALL USERS
--------------------------------------------- */
export const getAllUsersAPI = async () => {
  const res = await authClient.get("/admin/users");
  

  // Backend response:
  // { success, message, data: [...] }
  return res.data.data;
};

/* ---------------------------------------------
   UPDATE USER STATUS (Activate / Block)
--------------------------------------------- */
export const updateUserStatusAPI = async (payload: {
  id: string;
  status: "Active" | "Blocked";
}) => {
  const res = await authClient.post(
    "/admin/users/deactivate",
    payload
  );

  return res.data;
};

/* ---------------------------------------------
   DELETE USER
--------------------------------------------- */
export const deleteUserAPI = async (userId: string) => {
  const res = await authClient.delete(`/admin/users/${userId}`);
  return res.data;
};

/* ---------------------------------------------
   (OPTIONAL) USER BOOKINGS
   — keep only if backend supports this route
--------------------------------------------- */
// export const getUserBookingsAPI = async (userId: string) => {
//   const res = await authClient.get(
//     `/admin/users/bookings?userId=${userId}`
//   );
//   return res.data.data ?? res.data;
// };

/* ---------------------------------------------
   ❌ REMOVE THIS (NOT NEEDED ANYMORE)
--------------------------------------------- */
// export const getUserRolesAPI = async () => {
//   const res = await authClient.get("/admin/users/roles");
//   return res.data;
// };
