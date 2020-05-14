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
-- Table structure for table `alliance_outcome`
--

DROP TABLE IF EXISTS `alliance_outcome`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `alliance_outcome` (
  `alliance_id` int(11) NOT NULL,
  `score` decimal(10,0) DEFAULT NULL,
  `RP1_rocket` tinyint(1) DEFAULT NULL,
  `RP2_climbed` tinyint(1) DEFAULT NULL,
  KEY `alliance_id` (`alliance_id`),
  CONSTRAINT `alliance_outcome_ibfk_1` FOREIGN KEY (`alliance_id`) REFERENCES `alliance` (`alliance_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alliance_outcome`
--

LOCK TABLES `alliance_outcome` WRITE;
/*!40000 ALTER TABLE `alliance_outcome` DISABLE KEYS */;
INSERT INTO `alliance_outcome` VALUES (1,82,0,1),(2,70,0,0),(3,80,0,1),(4,89,1,1),(5,60,0,1),(6,62,0,1),(7,64,0,1),(8,60,0,1),(9,113,1,1),(10,41,0,0),(11,65,0,1),(12,74,0,1),(13,65,0,1),(14,68,0,1),(15,53,0,0),(16,59,1,0),(17,83,0,1),(18,76,0,1),(19,78,0,1),(20,96,1,1),(21,57,0,1),(22,61,0,1),(23,72,0,1),(24,70,0,1),(25,52,0,1),(26,83,1,1),(27,61,0,1),(28,93,1,1),(29,77,0,1),(30,78,0,0),(31,50,0,0),(32,82,0,0),(33,48,0,0),(34,85,1,1),(35,73,0,1),(36,62,0,1),(37,73,1,1),(38,68,0,1),(39,74,0,1),(40,72,0,1),(41,69,0,1),(42,66,0,0),(43,60,0,1),(44,102,1,1),(45,49,0,1),(46,62,0,1),(47,92,0,1),(48,51,0,0),(49,76,0,1),(50,90,1,1),(51,71,0,1),(52,75,0,1),(53,67,0,1),(54,57,0,1),(55,77,0,1),(56,74,0,1),(57,90,0,1),(58,73,0,1),(59,73,0,1),(60,64,0,1),(61,62,0,1),(62,75,0,1),(63,57,0,1),(64,91,0,1),(65,65,0,1),(66,68,0,1),(67,65,0,0),(68,84,0,1),(69,75,0,1),(70,64,0,1),(71,85,0,1),(72,57,0,1),(73,80,0,1),(74,76,0,0),(75,67,0,1),(76,79,1,0),(77,86,1,1),(78,88,0,1),(79,67,0,1),(80,78,0,0),(81,97,0,1),(82,61,0,0),(83,69,0,0),(84,70,0,1),(85,74,0,1),(86,57,0,0),(87,85,0,1),(88,68,0,1),(89,80,0,1),(90,58,0,0),(91,63,0,1),(92,92,1,1),(93,62,0,1),(94,66,0,0),(95,63,0,0),(96,74,0,1),(97,64,0,1),(98,68,0,1),(99,65,1,1),(100,89,0,1),(101,70,0,0),(102,65,0,0),(103,70,0,0),(104,71,0,1),(105,50,0,0),(106,74,0,0),(107,64,0,1),(108,69,0,0),(109,100,0,1),(110,59,0,1),(111,75,1,1),(112,61,0,1),(113,82,0,1),(114,87,1,1),(115,76,0,1),(116,64,0,0),(117,73,0,1),(118,59,0,1),(119,75,0,1),(120,102,1,1),(121,78,0,1),(122,48,0,0),(123,80,0,1),(124,60,0,1),(125,74,0,1),(126,79,0,1),(127,77,0,1),(128,64,0,0),(129,58,0,1),(130,57,0,1),(131,79,0,1),(132,61,0,1),(133,58,0,1),(134,83,0,1),(135,88,0,1),(136,62,0,0),(137,59,0,1),(138,86,1,1),(139,83,0,1),(140,81,1,1),(141,92,0,1),(142,70,0,1),(143,62,0,0),(144,47,0,1),(145,70,0,1),(146,77,0,1),(147,50,0,1),(148,79,0,1),(149,54,0,0),(150,59,0,1),(151,76,0,1),(152,69,0,0),(153,91,1,1),(154,55,0,0),(155,43,0,0),(156,77,0,1),(157,99,1,1),(158,64,1,1),(159,80,1,1),(160,70,0,1),(335,38,0,0),(336,39,0,0),(338,38,0,0),(337,61,0,0),(339,57,0,0),(340,36,0,0),(341,40,0,0),(342,49,0,0),(344,57,0,1),(343,37,0,0),(345,48,0,0),(346,44,0,0),(346,44,0,0),(348,48,0,0),(348,48,0,0),(347,56,0,0),(353,51,0,0),(353,51,0,0),(354,40,0,0),(356,67,0,0),(355,53,0,0),(357,62,0,1),(358,56,0,1),(360,35,0,0),(359,59,1,1),(361,52,0,0),(362,37,0,0),(364,57,0,1),(363,42,0,1),(365,43,0,0),(366,33,0,0),(368,51,0,0),(367,58,0,1);
/*!40000 ALTER TABLE `alliance_outcome` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-14 15:58:12
