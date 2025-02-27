/*
Run the SQL scripts in this order to initialize the schema
users_table > flights_table > carts_table > seats_table or flight_names
*/

USE `artificial_ledger_airlines_flight_booking`;
DROP TABLE IF EXISTS carts;

CREATE TABLE IF NOT EXISTS carts(
cart_id INT NOT NULL auto_increment,
flight_id INT NOT NULL,
user_id INT NOT NULL,

PRIMARY KEY (cart_id),
FOREIGN KEY (flight_id) REFERENCES flights(flight_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
);
