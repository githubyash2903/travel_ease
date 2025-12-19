// src/publicClient/flights.ts
import { publicClient } from "./axios";

/* --------------------------------------------------
   SEARCH FLIGHTS (DB BASED)
   Backend: GET /api/flights
-------------------------------------------------- */
export const searchFlightsAPI = async (params: {
  from: string;
  to: string;
  departDate: string;
}) => {
  const res = await publicClient.get("/flights", {
    params: {
      from: params.from,
      to: params.to,
      departDate: params.departDate,
    },
  });

  // backend returns { meta, data }
  return res.data;
};

/* --------------------------------------------------
   SEARCH AIRPORTS
   Backend: GET /api/airports?keyword=
-------------------------------------------------- */
export const getAirports = async (query: string) => {
  const res = await publicClient.get("/airports/search", {
    params: { keyword: query },
  });

  return res.data || [];
};

/* --------------------------------------------------
   GET SINGLE FLIGHT (OPTIONAL / FUTURE)
-------------------------------------------------- */
export const getSingleFlightpublicClient = async (id: string) => {
  const res = await publicClient.get(`/flights/${id}`);
  return res.data;
};
