DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `password_hash` VARCHAR(100) NOT NULL,
  `role` ENUM('admin', 'user') NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `phone_number` VARCHAR(15),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
