/*
Run the SQL scripts in this order to initialize the schema
users_table > flights_table > carts_table > seats_table or flight_names
*/

-- CREATE SCHEMA FIRST
CREATE DATABASE IF NOT EXISTS `artificial_ledger_airlines_flight_booking`;

USE `artificial_ledger_airlines_flight_booking`;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
user_id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(45) NOT NULL UNIQUE,
password_hash VARCHAR(100) NOT NULL,
role ENUM('admin', 'user') NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
phone_number VARCHAR(15),
PRIMARY KEY (user_id)
);
