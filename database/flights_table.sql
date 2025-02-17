DROP TABLE IF EXISTS `flights`;
CREATE TABLE `flights` (
  `flight_id` INT NOT NULL AUTO_INCREMENT,
  `departure_city` VARCHAR(45) NOT NULL,
  `arrival_city` VARCHAR(45) NOT NULL,
  `flight_date` DATE NOT NULL,
  `duration_hours` INT NOT NULL,
  `base_price` DECIMAL(10, 2) NOT NULL,
  `flight_status` ENUM('Available', 'Full', 'Cancelled') NOT NULL,
  PRIMARY KEY (`flight_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
