DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `cart_id` INT NOT NULL AUTO_INCREMENT,
  `flight_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`cart_id`),
  FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
