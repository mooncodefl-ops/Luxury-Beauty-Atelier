/*
# Create bookings table for MAISON atelier

1. New Tables
- `bookings`
  - `id` (uuid, primary key)
  - `category` (text, not null) — "Hair" or "Beauty"
  - `service_name` (text, not null) — chosen service
  - `stylist_id` (text, not null) — chosen stylist
  - `stylist_name` (text, not null) — stylist display name
  - `appointment_date` (date, not null) — chosen date
  - `appointment_time` (text, not null) — chosen time slot
  - `client_name` (text, not null) — contact name
  - `client_email` (text, not null) — contact email
  - `client_phone` (text) — optional phone
  - `notes` (text) — optional notes
  - `status` (text, default 'pending') — pending, confirmed, cancelled
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `bookings`.
- Single-tenant app (no sign-in): allow anon + authenticated CRUD.
- Anyone can submit a booking request; anyone can read booking listings.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  service_name text NOT NULL,
  stylist_id text NOT NULL,
  stylist_name text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings" ON bookings FOR DELETE
  TO anon, authenticated USING (true);
