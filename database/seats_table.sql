/*
Run the SQL scripts in this order to initialize the schema
users_table > flights_table > carts_table > seats_table or flight_names
*/

-- Added PREMIUM ECONOMY to class

USE `artificial_ledger_airlines_flight_booking`;
DROP TABLE IF EXISTS seats;

CREATE TABLE IF NOT EXISTS seats(
seat_id INT NOT NULL AUTO_INCREMENT,
flight_id INT NOT NULL,
seat_number VARCHAR(5) NOT NULL,
class ENUM ('ECONOMY', 'PREMIUM ECONOMY', 'BUSINESS', 'FIRST'),
seat_status ENUM('AVAILABLE', 'BOOKED') NOT NULL,
seat_price DECIMAL(10, 2) NOT NULL,
PRIMARY KEY (seat_id),
FOREIGN KEY (flight_id) REFERENCES flights(flight_id)
);





