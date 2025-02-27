/*
Run the SQL scripts in this order to initialize the schema
users_table > flights_table > carts_table > seats_table or flight_names
*/

USE `artificial_ledger_airlines_flight_booking`;

CREATE TABLE IF NOT EXISTS flights(
flight_id INT NOT NULL AUTO_INCREMENT,
departure_city VARCHAR(80) NOT NULL,
arrival_city VARCHAR(80) NOT NULL,
flight_date DATE NOT NULL,
duration_hours INT NOT NULL,
base_price DECIMAL(10, 2) NOT NULL,
flight_status ENUM('AVAILABLE', 'FULL', 'CANCELLED') NOT NULL,
PRIMARY KEY (flight_id)
);

