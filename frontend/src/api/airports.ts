import axios from "axios";

export const searchAirportAPI = async (keyword: string) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/airports/search`,
      { params: { keyword } }
    );
    return res.data;
  } catch (err) {
    return [];
  }
};
