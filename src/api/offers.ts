import { publicClient } from "./axios";

export const getAllOffers = async () => {
  const res = await publicClient.get("/offers");
  return res.data;
};






