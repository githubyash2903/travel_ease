import { authClient } from "@/api/axios";

/* =========================
   GET all coupons (admin)
========================= */
export const fetchCoupons = async () => {
  const res = await authClient.get("/admin/coupons");
  return res.data;
};

/* =========================
   CREATE coupon
========================= */
export const createCoupon = async (payload: any) => {
  const res = await authClient.post("/admin/coupons", payload);
  return res.data;
};

/* =========================
   UPDATE coupon
========================= */
export const updateCoupon = async (id: string, payload: any) => {
  const res = await authClient.put(`/admin/coupons/${id}`, payload);
  return res.data;
};

/* =========================
   DELETE coupon
========================= */
export const deleteCoupon = async (id: string) => {
  const res = await authClient.delete(`/admin/coupons/${id}`);
  return res.data;
};
