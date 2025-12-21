// api/auth.ts
import { publicClient } from './axios';

/* ---------------- REGISTER ---------------- */
export const registerUser = async (payload: any) => {
  return await publicClient.post('/auth/register', payload);
};

/* ---------------- LOGIN ---------------- */
export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  return await publicClient.post('/auth/login', payload);
};

/* ---------------- LOGOUT ---------------- */
export const logoutUser = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
