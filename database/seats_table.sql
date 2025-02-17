DROP TABLE IF EXISTS `seats`;
CREATE TABLE `seats` (
  `seat_id` INT NOT NULL AUTO_INCREMENT,
  `flight_id` INT NOT NULL,
  `seat_number` VARCHAR(5) NOT NULL,
  `class` ENUM('Economy', 'Premium', 'Business') NOT NULL,
  `status` ENUM('Available', 'Booked') NOT NULL,
  `seat_price` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`seat_id`),
  FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
