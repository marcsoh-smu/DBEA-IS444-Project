-- This file contains sql for creating total of 6 tables(`userAcc`,`userProfile`,`mealplan`,`receipeSearch`,
-- `post`,`supermarket`) under database called `dbFoodTherapy`. 3 tables(`receipeSearch`,`post`,`supermarket`)
-- have the prior data which needs to be run.

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `dbea_project` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `dbea_project`;

--
-- Table structure for table `userAcc`
--
DROP TABLE IF EXISTS `userAcc`;
CREATE TABLE IF NOT EXISTS `userAcc` (
    `username` varchar(100) NOT NULL,
    `pwd` varchar(100) NOT NULL,
    PRIMARY KEY (`username`)
) ;
-- --------------------------------------------------------

--
-- Table structure for table `userProfile`
--
DROP TABLE IF EXISTS `userProfile`;
CREATE TABLE IF NOT EXISTS `userProfile` (
    `username` varchar(100) NOT NULL,
    `email` varchar (100),
    `creditscore` varchar (10),
    `interestrate` varchar (10),
    `tbankacc` varchar (100),
    `tbankid` varchar(100),
    `tbankpin` varchar(100),
    `annualincome` varchar(100),
    `homeownership` varchar(100),
    `monthlydebt` varchar(100),
    `monthlycreditlimit` varchar(100),
    `mortacc` varchar(100),
    PRIMARY KEY (`username`)
) ;
-- --------------------------------------------------------
COMMIT;
