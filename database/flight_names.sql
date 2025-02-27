/*
Run the SQL scripts in this order to initialize the schema
users_table > flights_table > carts_table > seats_table or flight_names
*/

-- Added more common regions


USE `artificial_ledger_airlines_flight_booking`;
DROP TABLE IF EXISTS flight_names;

CREATE TABLE IF NOT EXISTS flight_names(
 flight_name_id INT NOT NULL,
 region ENUM(
        -- Africa
        'Northern Africa', 'Sub-Saharan Africa', 
        'East Africa', 'West Africa', 'Central Africa', 'Southern Africa',

        -- Asia
        'East Asia', 'South Asia', 'Southeast Asia', 'Central Asia', 'Western Asia (Middle East)',

        -- Europe
        'Northern Europe', 'Western Europe', 'Southern Europe', 'Eastern Europe',

        -- North America
        'United States', 'Canada', 'Mexico', 'Central America', 'Caribbean',

        -- South America
        'Brazil and Southern South America', 'Andean Region', 'The Southern Cone', 'Northern South America',

        -- Oceania
        'Australia and New Zealand', 'Melanesia', 'Micronesia', 'Polynesia',

        -- Antarctica
        'Antarctica'
    ) NOT NULL,
    
name VARCHAR(150) NOT NULL,
flight_id INT NOT NULL,
PRIMARY KEY (flight_name_id),
FOREIGN KEY (flight_id) REFERENCES flights(flight_id)
);
