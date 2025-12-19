// src/api/settings.ts
import { authClient, publicClient } from "@/api/axios";

/* PUBLIC → Footer / Contact */
export const getPlatformSettings = async () => {
  const res = await publicClient.get("/admin/platform-settings");
  return res.data.data;
};

/* ADMIN → GET */
export const getSettingsAPI = async () => {
  const res = await authClient.get("/admin/platform-settings");
  return res.data.data;
};

/* ADMIN → UPDATE (FormData request, Object response) */
export const updateSettingsAPI = async (payload: {
  website_name: string;
  email: string;
  contact_no: string;
  maintenance_mode: boolean;
  logo?: File | null;
}) => {
  const formData = new FormData();

  // 🔴 backend expected keys
  formData.append("websiteName", payload.website_name);
  formData.append("email", payload.email);
  formData.append("contactNo", payload.contact_no);
  formData.append(
    "maintenanceMode",
    String(payload.maintenance_mode)
  );

  if (payload.logo) {
    formData.append("logo", payload.logo);
  }

  const res = await authClient.post(
    "/admin/platform-settings",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // 🔥 IMPORTANT FIX
  return res.data.data;
};
