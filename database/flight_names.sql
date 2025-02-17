DROP TABLE IF EXISTS `flight_names`;
CREATE TABLE `flight_names` (
  `flight_name_id` INT NOT NULL AUTO_INCREMENT,
  `flight_id` INT NOT NULL,
  `region` ENUM('Asia', 'Europe', 'America', 'Middle East', 'Oceania') NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`flight_name_id`),
  FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
