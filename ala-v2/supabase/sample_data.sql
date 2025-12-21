-- Comprehensive Sample Data for Artificial Ledger Airlines (2025/2026)

-- 1. Insert Flights with 2025 and early 2026 dates
INSERT INTO public.flights (departure_city, arrival_city, flight_date, duration_hours, base_price, flight_status)
VALUES 
-- Domestic Philippines
('Manila', 'El Nido', '2025-12-24', 1, 5500.00, 'AVAILABLE'),
('Manila', 'Boracay', '2025-12-25', 1, 4200.00, 'AVAILABLE'),
('Cebu', 'Manila', '2025-12-26', 1, 2800.00, 'AVAILABLE'),
('Davao', 'Iloilo', '2025-12-27', 2, 3500.00, 'AVAILABLE'),

-- International Asia
('Manila', 'Tokyo', '2025-12-28', 4, 15000.00, 'AVAILABLE'),
('Manila', 'Singapore', '2025-12-29', 3, 8500.00, 'AVAILABLE'),
('Manila', 'Seoul', '2025-12-30', 4, 12000.00, 'AVAILABLE'),
('Manila', 'Bangkok', '2025-12-31', 3, 7200.00, 'AVAILABLE'),

-- Early 2026 Flights
('Manila', 'London', '2026-01-05', 14, 45000.00, 'AVAILABLE'),
('Manila', 'New York', '2026-01-10', 16, 52000.00, 'AVAILABLE'),
('Manila', 'Paris', '2026-01-15', 13, 48000.00, 'AVAILABLE'),
('Manila', 'Sydney', '2026-01-20', 8, 28000.00, 'AVAILABLE');

-- 2. Insert Flight Details (Regions)
INSERT INTO public.flight_details (flight_id, region, name)
VALUES 
(1, 'Southeast Asia', 'Palawan Express'),
(2, 'Southeast Asia', 'Island Hopper'),
(3, 'Southeast Asia', 'City Link'),
(4, 'Southeast Asia', 'Southern Connect'),
(5, 'East Asia', 'Sakura Liner'),
(6, 'Southeast Asia', 'Lion City Shuttle'),
(7, 'East Asia', 'K-Wave Flight'),
(8, 'Southeast Asia', 'Siam Skyway'),
(9, 'Western Europe', 'Euro-Asia Bridge'),
(10, 'United States', 'Pacific Giant'),
(11, 'Western Europe', 'Vogue Voyage'),
(12, 'Australia and New Zealand', 'Southern Cross');
