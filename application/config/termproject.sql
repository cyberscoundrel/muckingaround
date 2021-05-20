-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: termproject
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `commentid` varchar(64) NOT NULL,
  `fkuserid` varchar(64) NOT NULL,
  `fkpostid` varchar(64) NOT NULL,
  `comment` mediumtext NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `inc` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`inc`,`commentid`),
  UNIQUE KEY `commentid_UNIQUE` (`commentid`),
  KEY `keyuserid_idx` (`fkuserid`),
  KEY `keypostid_idx` (`fkpostid`),
  CONSTRAINT `keypostid` FOREIGN KEY (`fkpostid`) REFERENCES `posts` (`postid`),
  CONSTRAINT `keyuserid` FOREIGN KEY (`fkuserid`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('c39cc7f8-3139-40cb-8f88-99fce35e1953','39113c0f-b465-11eb-876b-a8a1595018d7','209ed984-cea0-4fbf-9fee-359ee3879f0a','nice','2021-05-19 17:01:16',38),('7dc01524-235d-4fbe-bc5e-11a3735d0cc1','39113c0f-b465-11eb-876b-a8a1595018d7','209ed984-cea0-4fbf-9fee-359ee3879f0a','cool','2021-05-19 17:01:19',39),('ff1189de-3696-4cfe-9412-110696c781dd','39113c0f-b465-11eb-876b-a8a1595018d7','9a1dc014-da6d-41d9-8c86-2719c74e30f4','hello','2021-05-19 17:05:51',40),('0db2ab29-4ee1-4571-bc7f-bb06e1f4533a','e12b89b7-b83a-11eb-a925-a8a1595018d7','fbaad515-542c-4fe3-a900-0b7ed1e48e0a','wow','2021-05-19 17:06:45',41),('aba5bde9-95b4-4143-9bb6-0b99a8e4956f','e12b89b7-b83a-11eb-a925-a8a1595018d7','d82943ee-8afc-4eac-a6a1-7ab573eff31a','nice','2021-05-19 17:06:57',42);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `postid` varchar(64) NOT NULL,
  `post_title` varchar(128) NOT NULL,
  `media` varchar(128) NOT NULL,
  `thumb` varchar(128) NOT NULL,
  `userid` varchar(64) NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `comments` json DEFAULT NULL,
  `description` mediumtext,
  `username` varchar(64) DEFAULT 'pog',
  PRIMARY KEY (`postid`),
  UNIQUE KEY `postid_UNIQUE` (`postid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES ('209ed984-cea0-4fbf-9fee-359ee3879f0a','\'wow\'','public\\images\\uploads\\616a3750f9c170b91503e61352d273bc597700ecb269.png','thumbnail-616a3750f9c170b91503e61352d273bc597700ecb269.png','39113c0f-b465-11eb-876b-a8a1595018d7','2021-05-19 17:01:11',NULL,'\'niuce\'','\'master2\''),('4402385a-4dd3-421a-a60e-cfd2ccd0d2c4','\'picture\'','public\\images\\uploads\\2b07a31369194183137c81dfd50a0e8b23b3d5389b22.png','thumbnail-2b07a31369194183137c81dfd50a0e8b23b3d5389b22.png','39113c0f-b465-11eb-876b-a8a1595018d7','2021-05-19 17:04:22',NULL,'\'nice\'','\'master2\''),('512e651a-0d72-4ac5-be6c-f28cbfa26962','\'hello\'','public\\images\\uploads\\4a553f5266dcbd21647e4cd3566d95cfece78a6e4489.png','thumbnail-4a553f5266dcbd21647e4cd3566d95cfece78a6e4489.png','e12b89b7-b83a-11eb-a925-a8a1595018d7','2021-05-19 17:13:08',NULL,'\'hi\'','\'newguy2\''),('76e9a52a-9a5e-4d1d-a85d-25dffe982eaa','\'wow\'','public\\images\\uploads\\19c7bc6d3a913452704ad8926e96ec30cdfee3c461e6.jpeg','thumbnail-19c7bc6d3a913452704ad8926e96ec30cdfee3c461e6.jpeg','39113c0f-b465-11eb-876b-a8a1595018d7','2021-05-19 17:02:52',NULL,'\'cool\'','\'master2\''),('7ea87973-0091-45fa-8d5b-4cee1675aad2','\'image\'','public\\images\\uploads\\3cfe1c19883f0b838583b250e171886393e18f8d8ded.png','thumbnail-3cfe1c19883f0b838583b250e171886393e18f8d8ded.png','39113c0f-b465-11eb-876b-a8a1595018d7','2021-05-19 17:03:35',NULL,'\'hello\'','\'master2\''),('84774f08-289f-4d6a-849a-a24933a82f22','\'image\'','public\\images\\uploads\\28b3a93a2fb2c1bfd6694d53b0243ca0361ad2e10d83.jpeg','thumbnail-28b3a93a2fb2c1bfd6694d53b0243ca0361ad2e10d83.jpeg','39113c0f-b465-11eb-876b-a8a1595018d7','2021-05-19 17:05:06',NULL,'\'hello\'','\'master2\''),('9a1dc014-da6d-41d9-8c86-2719c74e30f4','\'dsf\'','public\\images\\uploads\\4a4e7fb7cd994d31575d6efc52ecbcaea94d9924745c.jpeg','thumbnail-4a4e7fb7cd994d31575d6efc52ecbcaea94d9924745c.jpeg','39113c0f-b465-11eb-876b-a8a1595018d7','2021-05-19 17:05:38',NULL,'\'sdfasdf\'','\'master2\''),('9aeaabff-d14f-4ed8-877f-560d27d61a0c','\'cool\'','public\\images\\uploads\\0e2915d9f9ec01b3cd5820a0fdbeac0c22a84ff624a7.png','thumbnail-0e2915d9f9ec01b3cd5820a0fdbeac0c22a84ff624a7.png','39113c0f-b465-11eb-876b-a8a1595018d7','2021-05-19 17:02:13',NULL,'\'nice\'','\'master2\''),('bdeecbac-7b4d-4b00-82aa-ebdfcaf8f8e1','\'nice\'','public\\images\\uploads\\c21d850182cc9900bd7e78f75782bf6edd40721c8320.jpeg','thumbnail-c21d850182cc9900bd7e78f75782bf6edd40721c8320.jpeg','39113c0f-b465-11eb-876b-a8a1595018d7','2021-05-19 17:04:39',NULL,'\'wow\'','\'master2\''),('d186b8e9-6405-46c9-8376-2d43b9523af4','\'hello\'','public\\images\\uploads\\c516c8f1aeb1f78f2a63223098968c5b83fa1ebd7673.jpeg','thumbnail-c516c8f1aeb1f78f2a63223098968c5b83fa1ebd7673.jpeg','39113c0f-b465-11eb-876b-a8a1595018d7','2021-05-19 17:03:11',NULL,'\'hey\'','\'master2\''),('d82943ee-8afc-4eac-a6a1-7ab573eff31a','\'hey\'','public\\images\\uploads\\1637edd5b01b9ea2433940797e146d62438590f62e8e.jpeg','thumbnail-1637edd5b01b9ea2433940797e146d62438590f62e8e.jpeg','39113c0f-b465-11eb-876b-a8a1595018d7','2021-05-19 17:01:51',NULL,'\'hello\'','\'master2\''),('fbaad515-542c-4fe3-a900-0b7ed1e48e0a','\'imag\'','public\\images\\uploads\\ddd7eace41387a49784cb8cfad0310ea236f674297aa.png','thumbnail-ddd7eace41387a49784cb8cfad0310ea236f674297aa.png','39113c0f-b465-11eb-876b-a8a1595018d7','2021-05-19 17:04:02',NULL,'\'pciture\'','\'master2\'');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` varchar(64) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(64) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `user_data` json DEFAULT NULL,
  `following` json DEFAULT NULL,
  `followers` json DEFAULT NULL,
  PRIMARY KEY (`username`,`idusers`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `idusers_UNIQUE` (`idusers`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('39113c0f-b465-11eb-876b-a8a1595018d7','\'master2\'','$2b$10$fonI8kqvPNP9cI7NEOfEqO0O3uq1J4gAzVMvHNX9WwIQk4T6Lv6.u','\'master2@gmail.com\'',NULL,NULL,NULL),('e12b89b7-b83a-11eb-a925-a8a1595018d7','\'newguy2\'','$2b$10$9l/pG7VTkQuoRJvzVYE62.3kx931s4ivcBLyGllQmtibPTHf.W0zC','\'newguy2@guy.com\'',NULL,NULL,NULL),('5c169a6d-b83b-11eb-a925-a8a1595018d7','\'newguy3\'','$2b$10$58i1BX0z5xvlGGtbhRuZr.6E/HxLQi7b51FsRl9GbXtg6pxWb8p3O','\'newguy3@mail.com\'',NULL,NULL,NULL),('436e58f7-b838-11eb-a925-a8a1595018d7','\'newuserguy\'','$2b$10$2CTjRVpbg7XPbiMX6KN.ve1oiBTT2Ya7dxVeEcJDVtsKU1XburBki','\'newuserguy@mail.com\'',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-19 17:27:04
