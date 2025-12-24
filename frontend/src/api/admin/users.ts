import { authClient } from "../axios";

export const fetchAllUsers = async (): Promise<any[]> => {
  return await authClient.get("/admin/users");
};