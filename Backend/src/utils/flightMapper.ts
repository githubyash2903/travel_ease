export const mapFlightData = (flight: any) => {
  // If it's already mock format → return as is
  if (flight.airline && flight.departure) {
    return flight;
  }

  // Real Amadeus API mapping
  const segment = flight.itineraries?.[0]?.segments?.[0];

  return {
    id: flight.id || "UNKNOWN",
    airline: flight.validatingAirlineCodes?.[0] || "Unknown Airline",
    flightNumber:
      (segment?.carrierCode || "XX") +
      "-" +
      (segment?.number || "000"),

    departure: {
      airport: segment?.departure?.iataCode || "N/A",
      code: segment?.departure?.iataCode || "N/A",
      time: segment?.departure?.at?.split("T")[1]?.slice(0, 5) || "00:00",
    },

    arrival: {
      airport: segment?.arrival?.iataCode || "N/A",
      code: segment?.arrival?.iataCode || "N/A",
      time: segment?.arrival?.at?.split("T")[1]?.slice(0, 5) || "00:00",
    },

    duration: segment?.duration || "PT0H0M",

    price: Number(flight.price?.total || 0),

    stops: (flight.itineraries?.[0]?.segments?.length || 1) - 1,

    cabinClass: flight.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || "Economy",
  };
};
