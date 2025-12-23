import { authClient } from "../axios";

/* LIST */
export const getAdminStats = () =>
  authClient.get("/admin/stats");