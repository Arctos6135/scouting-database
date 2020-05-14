-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: localhost    Database: strategy
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `frc_match`
--

DROP TABLE IF EXISTS `frc_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `frc_match` (
  `match_id` int(11) NOT NULL AUTO_INCREMENT,
  `match_number` decimal(10,0) DEFAULT NULL,
  `event_code` varchar(32) DEFAULT NULL,
  `match_type` enum('p','qm','qf','sf','f') DEFAULT NULL,
  PRIMARY KEY (`match_id`),
  UNIQUE KEY `match_number` (`match_number`,`event_code`,`match_type`),
  KEY `event_code` (`event_code`),
  CONSTRAINT `frc_match_ibfk_1` FOREIGN KEY (`event_code`) REFERENCES `frc_event` (`event_code`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=382 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frc_match`
--

LOCK TABLES `frc_match` WRITE;
/*!40000 ALTER TABLE `frc_match` DISABLE KEYS */;
INSERT INTO `frc_match` VALUES (81,1,'2019oncmp1','qm'),(289,1,'2019oncmp1','qf'),(378,1,'2019oncmp1','sf'),(287,1,'2019oncmp1','f'),(252,1,'2019onha3','qm'),(272,1,'2019onha3','qf'),(161,1,'2019onosh','qm'),(92,2,'2019oncmp1','qm'),(290,2,'2019oncmp1','qf'),(379,2,'2019oncmp1','sf'),(288,2,'2019oncmp1','f'),(253,2,'2019onha3','qm'),(172,2,'2019onosh','qm'),(245,3,'2019onbar','qm'),(249,3,'2019onbar','f'),(103,3,'2019oncmp1','qm'),(297,3,'2019oncmp1','qf'),(254,3,'2019onha3','qm'),(183,3,'2019onosh','qm'),(246,4,'2019onbar','qm'),(247,4,'2019onbar','qf'),(248,4,'2019onbar','f'),(114,4,'2019oncmp1','qm'),(255,4,'2019onha3','qm'),(194,4,'2019onosh','qm'),(125,5,'2019oncmp1','qm'),(256,5,'2019onha3','qm'),(205,5,'2019onosh','qm'),(136,6,'2019oncmp1','qm'),(257,6,'2019onha3','qm'),(216,6,'2019onosh','qm'),(147,7,'2019oncmp1','qm'),(258,7,'2019onha3','qm'),(227,7,'2019onosh','qm'),(158,8,'2019oncmp1','qm'),(261,8,'2019onha3','qm'),(238,8,'2019onosh','qm'),(160,9,'2019oncmp1','qm'),(262,9,'2019onha3','qm'),(240,9,'2019onosh','qm'),(82,10,'2019oncmp1','qm'),(263,10,'2019onha3','qm'),(162,10,'2019onosh','qm'),(83,11,'2019oncmp1','qm'),(264,11,'2019onha3','qm'),(163,11,'2019onosh','qm'),(84,12,'2019oncmp1','qm'),(265,12,'2019onha3','qm'),(164,12,'2019onosh','qm'),(250,13,'2019onbar','qm'),(85,13,'2019oncmp1','qm'),(266,13,'2019onha3','qm'),(165,13,'2019onosh','qm'),(86,14,'2019oncmp1','qm'),(267,14,'2019onha3','qm'),(166,14,'2019onosh','qm'),(87,15,'2019oncmp1','qm'),(268,15,'2019onha3','qm'),(167,15,'2019onosh','qm'),(88,16,'2019oncmp1','qm'),(269,16,'2019onha3','qm'),(168,16,'2019onosh','qm'),(89,17,'2019oncmp1','qm'),(270,17,'2019onha3','qm'),(169,17,'2019onosh','qm'),(90,18,'2019oncmp1','qm'),(271,18,'2019onha3','qm'),(170,18,'2019onosh','qm'),(91,19,'2019oncmp1','qm'),(171,19,'2019onosh','qm'),(93,20,'2019oncmp1','qm'),(173,20,'2019onosh','qm'),(94,21,'2019oncmp1','qm'),(174,21,'2019onosh','qm'),(95,22,'2019oncmp1','qm'),(175,22,'2019onosh','qm'),(96,23,'2019oncmp1','qm'),(176,23,'2019onosh','qm'),(97,24,'2019oncmp1','qm'),(177,24,'2019onosh','qm'),(98,25,'2019oncmp1','qm'),(178,25,'2019onosh','qm'),(99,26,'2019oncmp1','qm'),(179,26,'2019onosh','qm'),(100,27,'2019oncmp1','qm'),(180,27,'2019onosh','qm'),(101,28,'2019oncmp1','qm'),(181,28,'2019onosh','qm'),(102,29,'2019oncmp1','qm'),(182,29,'2019onosh','qm'),(104,30,'2019oncmp1','qm'),(184,30,'2019onosh','qm'),(105,31,'2019oncmp1','qm'),(185,31,'2019onosh','qm'),(106,32,'2019oncmp1','qm'),(186,32,'2019onosh','qm'),(107,33,'2019oncmp1','qm'),(187,33,'2019onosh','qm'),(108,34,'2019oncmp1','qm'),(188,34,'2019onosh','qm'),(109,35,'2019oncmp1','qm'),(189,35,'2019onosh','qm'),(110,36,'2019oncmp1','qm'),(190,36,'2019onosh','qm'),(111,37,'2019oncmp1','qm'),(191,37,'2019onosh','qm'),(112,38,'2019oncmp1','qm'),(192,38,'2019onosh','qm'),(113,39,'2019oncmp1','qm'),(193,39,'2019onosh','qm'),(115,40,'2019oncmp1','qm'),(195,40,'2019onosh','qm'),(116,41,'2019oncmp1','qm'),(196,41,'2019onosh','qm'),(117,42,'2019oncmp1','qm'),(197,42,'2019onosh','qm'),(118,43,'2019oncmp1','qm'),(198,43,'2019onosh','qm'),(119,44,'2019oncmp1','qm'),(199,44,'2019onosh','qm'),(120,45,'2019oncmp1','qm'),(200,45,'2019onosh','qm'),(121,46,'2019oncmp1','qm'),(201,46,'2019onosh','qm'),(122,47,'2019oncmp1','qm'),(202,47,'2019onosh','qm'),(123,48,'2019oncmp1','qm'),(203,48,'2019onosh','qm'),(124,49,'2019oncmp1','qm'),(204,49,'2019onosh','qm'),(126,50,'2019oncmp1','qm'),(206,50,'2019onosh','qm'),(127,51,'2019oncmp1','qm'),(207,51,'2019onosh','qm'),(128,52,'2019oncmp1','qm'),(208,52,'2019onosh','qm'),(129,53,'2019oncmp1','qm'),(209,53,'2019onosh','qm'),(130,54,'2019oncmp1','qm'),(210,54,'2019onosh','qm'),(131,55,'2019oncmp1','qm'),(211,55,'2019onosh','qm'),(132,56,'2019oncmp1','qm'),(212,56,'2019onosh','qm'),(133,57,'2019oncmp1','qm'),(213,57,'2019onosh','qm'),(134,58,'2019oncmp1','qm'),(214,58,'2019onosh','qm'),(135,59,'2019oncmp1','qm'),(215,59,'2019onosh','qm'),(137,60,'2019oncmp1','qm'),(217,60,'2019onosh','qm'),(138,61,'2019oncmp1','qm'),(218,61,'2019onosh','qm'),(139,62,'2019oncmp1','qm'),(219,62,'2019onosh','qm'),(140,63,'2019oncmp1','qm'),(220,63,'2019onosh','qm'),(141,64,'2019oncmp1','qm'),(221,64,'2019onosh','qm'),(142,65,'2019oncmp1','qm'),(222,65,'2019onosh','qm'),(143,66,'2019oncmp1','qm'),(223,66,'2019onosh','qm'),(144,67,'2019oncmp1','qm'),(224,67,'2019onosh','qm'),(145,68,'2019oncmp1','qm'),(225,68,'2019onosh','qm'),(146,69,'2019oncmp1','qm'),(226,69,'2019onosh','qm'),(148,70,'2019oncmp1','qm'),(228,70,'2019onosh','qm'),(149,71,'2019oncmp1','qm'),(229,71,'2019onosh','qm'),(150,72,'2019oncmp1','qm'),(230,72,'2019onosh','qm'),(151,73,'2019oncmp1','qm'),(231,73,'2019onosh','qm'),(152,74,'2019oncmp1','qm'),(232,74,'2019onosh','qm'),(153,75,'2019oncmp1','qm'),(233,75,'2019onosh','qm'),(154,76,'2019oncmp1','qm'),(234,76,'2019onosh','qm'),(155,77,'2019oncmp1','qm'),(235,77,'2019onosh','qm'),(156,78,'2019oncmp1','qm'),(236,78,'2019onosh','qm'),(157,79,'2019oncmp1','qm'),(237,79,'2019onosh','qm'),(159,80,'2019oncmp1','qm'),(239,80,'2019onosh','qm'),(251,100,'2019onha3','qm'),(273,101,'2019onha3','qf'),(276,102,'2019onha3','qf'),(278,103,'2019onha3','qf'),(275,104,'2019onha3','qf'),(281,105,'2019onha3','qf'),(282,106,'2019onha3','qf'),(283,107,'2019onha3','qf'),(284,108,'2019onha3','qf'),(285,109,'2019onha3','qf'),(286,110,'2019onha3','qf');
/*!40000 ALTER TABLE `frc_match` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-14 15:58:11
