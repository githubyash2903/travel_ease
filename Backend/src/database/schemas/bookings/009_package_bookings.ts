import { Migration } from "../../migrate";

export const packageBookingDetailsTable: Migration = {
  id: 9,
  name: 'package_booking_details',
  up: `
    CREATE TABLE IF NOT EXISTS package_booking_details (
      booking_id UUID PRIMARY KEY
        REFERENCES bookings(id) ON DELETE CASCADE,

      package_id UUID NOT NULL REFERENCES holiday_packages(id),

      start_date DATE NOT NULL,
      persons INT NOT NULL CHECK (persons > 0),

      price_per_person NUMERIC(10,2) NOT NULL CHECK (price_per_person >= 0)
    );

    CREATE INDEX IF NOT EXISTS idx_package_booking_package
      ON package_booking_details(package_id);
  `,
};
