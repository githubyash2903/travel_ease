// @ts-ignore: no declaration file for 'amadeus'
import Amadeus from "amadeus";
import dotenv from "dotenv";
dotenv.config();

export const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY!,
  clientSecret: process.env.AMADEUS_API_SECRET!,
});


console.log("🔑 AMADEUS_API_KEY =", process.env.AMADEUS_API_KEY);
console.log("🔑 AMADEUS_API_SECRET =", process.env.AMADEUS_API_SECRET);

