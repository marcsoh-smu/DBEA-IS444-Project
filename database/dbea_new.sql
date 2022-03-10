SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `dbea_is444_project` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `dbea_is444_project`;


--
-- Database: `dbea_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `given_name` varchar(255) NOT NULL,
  `account_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `pword` varchar(255) NOT NULL,
  `pin` varchar(6) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `creditscore` varchar(50) NULL,
  `interest_rate` float(10) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `given_name`, `account_id`, `email`, `username`, `pword`, `pin`, `userid`) VALUES
(1, 'SuperMan', '8472', 'superman@gmail.com', 'super', '123123', '111111', 'S9711111A');
