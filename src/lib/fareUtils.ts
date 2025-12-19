// src/lib/fareUtils.ts
export type Fare = {
  baseFarePerPax: number;
  taxesPerPax: number;
  feesPerPax?: number;
  feesPerBooking?: number;
};

export function calcFareForTravellers(fare: Fare, travellers: number) {
  const feesPerPax = fare.feesPerPax ?? 0;
  const subtotalPerPax = fare.baseFarePerPax + (fare.taxesPerPax ?? 0) + feesPerPax;
  const subtotal = subtotalPerPax * travellers;
  const bookingFee = fare.feesPerBooking ?? 0;
  const total = subtotal + bookingFee;
  return {
    travellers,
    subtotalPerPax,
    subtotal,
    bookingFee,
    total,
  };
}
