// src/services/amadeusAuth.ts
import axios from "axios";

let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function getAmadeusToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) return cachedToken;

  const res = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_API_KEY!,
      client_secret: process.env.AMADEUS_API_SECRET!,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  cachedToken = res.data.access_token;
  tokenExpiry = now + (res.data.expires_in * 1000) - 5000; // small buffer
  return cachedToken!;
}
