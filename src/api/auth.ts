import { publicClient } from "./axios";

/* ---------------- REGISTER ---------------- */
export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await publicClient.post("/auth/register", payload);

  const { token, ...user } = res.data.data;

  // ✅ STORE TOKEN & USER
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return res.data.data;
};

/* ---------------- LOGIN ---------------- */
export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await publicClient.post("/auth/login", payload);

  const { token, ...user } = res.data.data;

  // ✅ STORE TOKEN & USER
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return res.data.data;
};

/* ---------------- LOGOUT ---------------- */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
