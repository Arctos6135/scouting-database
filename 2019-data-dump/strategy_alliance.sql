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
-- Table structure for table `alliance`
--

DROP TABLE IF EXISTS `alliance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `alliance` (
  `alliance_id` int(11) NOT NULL AUTO_INCREMENT,
  `match_id` int(11) DEFAULT NULL,
  `alliance_colour` enum('red','blue') DEFAULT NULL,
  PRIMARY KEY (`alliance_id`),
  UNIQUE KEY `match_id` (`match_id`,`alliance_colour`),
  CONSTRAINT `alliance_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `frc_match` (`match_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=595 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alliance`
--

LOCK TABLES `alliance` WRITE;
/*!40000 ALTER TABLE `alliance` DISABLE KEYS */;
INSERT INTO `alliance` VALUES (1,81,'red'),(2,81,'blue'),(3,82,'red'),(4,82,'blue'),(5,83,'red'),(6,83,'blue'),(7,84,'red'),(8,84,'blue'),(9,85,'red'),(10,85,'blue'),(11,86,'red'),(12,86,'blue'),(13,87,'red'),(14,87,'blue'),(15,88,'red'),(16,88,'blue'),(17,89,'red'),(18,89,'blue'),(19,90,'red'),(20,90,'blue'),(21,91,'red'),(22,91,'blue'),(23,92,'red'),(24,92,'blue'),(25,93,'red'),(26,93,'blue'),(27,94,'red'),(28,94,'blue'),(29,95,'red'),(30,95,'blue'),(31,96,'red'),(32,96,'blue'),(33,97,'red'),(34,97,'blue'),(35,98,'red'),(36,98,'blue'),(37,99,'red'),(38,99,'blue'),(39,100,'red'),(40,100,'blue'),(41,101,'red'),(42,101,'blue'),(43,102,'red'),(44,102,'blue'),(45,103,'red'),(46,103,'blue'),(47,104,'red'),(48,104,'blue'),(49,105,'red'),(50,105,'blue'),(51,106,'red'),(52,106,'blue'),(53,107,'red'),(54,107,'blue'),(55,108,'red'),(56,108,'blue'),(57,109,'red'),(58,109,'blue'),(59,110,'red'),(60,110,'blue'),(61,111,'red'),(62,111,'blue'),(63,112,'red'),(64,112,'blue'),(65,113,'red'),(66,113,'blue'),(67,114,'red'),(68,114,'blue'),(69,115,'red'),(70,115,'blue'),(71,116,'red'),(72,116,'blue'),(73,117,'red'),(74,117,'blue'),(75,118,'red'),(76,118,'blue'),(77,119,'red'),(78,119,'blue'),(79,120,'red'),(80,120,'blue'),(81,121,'red'),(82,121,'blue'),(83,122,'red'),(84,122,'blue'),(85,123,'red'),(86,123,'blue'),(87,124,'red'),(88,124,'blue'),(89,125,'red'),(90,125,'blue'),(91,126,'red'),(92,126,'blue'),(93,127,'red'),(94,127,'blue'),(95,128,'red'),(96,128,'blue'),(97,129,'red'),(98,129,'blue'),(99,130,'red'),(100,130,'blue'),(101,131,'red'),(102,131,'blue'),(103,132,'red'),(104,132,'blue'),(105,133,'red'),(106,133,'blue'),(107,134,'red'),(108,134,'blue'),(109,135,'red'),(110,135,'blue'),(111,136,'red'),(112,136,'blue'),(113,137,'red'),(114,137,'blue'),(115,138,'red'),(116,138,'blue'),(117,139,'red'),(118,139,'blue'),(119,140,'red'),(120,140,'blue'),(121,141,'red'),(122,141,'blue'),(123,142,'red'),(124,142,'blue'),(125,143,'red'),(126,143,'blue'),(127,144,'red'),(128,144,'blue'),(129,145,'red'),(130,145,'blue'),(131,146,'red'),(132,146,'blue'),(133,147,'red'),(134,147,'blue'),(135,148,'red'),(136,148,'blue'),(137,149,'red'),(138,149,'blue'),(139,150,'red'),(140,150,'blue'),(141,151,'red'),(142,151,'blue'),(143,152,'red'),(144,152,'blue'),(145,153,'red'),(146,153,'blue'),(147,154,'red'),(148,154,'blue'),(149,155,'red'),(150,155,'blue'),(151,156,'red'),(152,156,'blue'),(153,157,'red'),(154,157,'blue'),(155,158,'red'),(156,158,'blue'),(157,159,'red'),(158,159,'blue'),(159,160,'red'),(160,160,'blue'),(161,161,'red'),(162,161,'blue'),(163,162,'red'),(164,162,'blue'),(165,163,'red'),(166,163,'blue'),(167,164,'red'),(168,164,'blue'),(169,165,'red'),(170,165,'blue'),(171,166,'red'),(172,166,'blue'),(173,167,'red'),(174,167,'blue'),(175,168,'red'),(176,168,'blue'),(177,169,'red'),(178,169,'blue'),(179,170,'red'),(180,170,'blue'),(181,171,'red'),(182,171,'blue'),(183,172,'red'),(184,172,'blue'),(185,173,'red'),(186,173,'blue'),(187,174,'red'),(188,174,'blue'),(189,175,'red'),(190,175,'blue'),(191,176,'red'),(192,176,'blue'),(193,177,'red'),(194,177,'blue'),(195,178,'red'),(196,178,'blue'),(197,179,'red'),(198,179,'blue'),(199,180,'red'),(200,180,'blue'),(201,181,'red'),(202,181,'blue'),(203,182,'red'),(204,182,'blue'),(205,183,'red'),(206,183,'blue'),(207,184,'red'),(208,184,'blue'),(209,185,'red'),(210,185,'blue'),(211,186,'red'),(212,186,'blue'),(213,187,'red'),(214,187,'blue'),(215,188,'red'),(216,188,'blue'),(217,189,'red'),(218,189,'blue'),(219,190,'red'),(220,190,'blue'),(221,191,'red'),(222,191,'blue'),(223,192,'red'),(224,192,'blue'),(225,193,'red'),(226,193,'blue'),(227,194,'red'),(228,194,'blue'),(229,195,'red'),(230,195,'blue'),(231,196,'red'),(232,196,'blue'),(233,197,'red'),(234,197,'blue'),(235,198,'red'),(236,198,'blue'),(237,199,'red'),(238,199,'blue'),(239,200,'red'),(240,200,'blue'),(241,201,'red'),(242,201,'blue'),(243,202,'red'),(244,202,'blue'),(245,203,'red'),(246,203,'blue'),(247,204,'red'),(248,204,'blue'),(249,205,'red'),(250,205,'blue'),(251,206,'red'),(252,206,'blue'),(253,207,'red'),(254,207,'blue'),(255,208,'red'),(256,208,'blue'),(257,209,'red'),(258,209,'blue'),(259,210,'red'),(260,210,'blue'),(261,211,'red'),(262,211,'blue'),(263,212,'red'),(264,212,'blue'),(265,213,'red'),(266,213,'blue'),(267,214,'red'),(268,214,'blue'),(269,215,'red'),(270,215,'blue'),(271,216,'red'),(272,216,'blue'),(273,217,'red'),(274,217,'blue'),(275,218,'red'),(276,218,'blue'),(277,219,'red'),(278,219,'blue'),(279,220,'red'),(280,220,'blue'),(281,221,'red'),(282,221,'blue'),(283,222,'red'),(284,222,'blue'),(285,223,'red'),(286,223,'blue'),(287,224,'red'),(288,224,'blue'),(289,225,'red'),(290,225,'blue'),(291,226,'red'),(292,226,'blue'),(293,227,'red'),(294,227,'blue'),(295,228,'red'),(296,228,'blue'),(297,229,'red'),(298,229,'blue'),(299,230,'red'),(300,230,'blue'),(301,231,'red'),(302,231,'blue'),(303,232,'red'),(304,232,'blue'),(305,233,'red'),(306,233,'blue'),(307,234,'red'),(308,234,'blue'),(309,235,'red'),(310,235,'blue'),(311,236,'red'),(312,236,'blue'),(313,237,'red'),(314,237,'blue'),(315,238,'red'),(316,238,'blue'),(317,239,'red'),(318,239,'blue'),(319,240,'red'),(320,240,'blue'),(329,245,'red'),(330,245,'blue'),(331,246,'red'),(332,246,'blue'),(333,251,'red'),(334,251,'blue'),(335,252,'red'),(336,252,'blue'),(337,253,'red'),(338,253,'blue'),(339,254,'red'),(340,254,'blue'),(341,255,'red'),(342,255,'blue'),(343,256,'red'),(344,256,'blue'),(345,257,'red'),(346,257,'blue'),(347,258,'red'),(348,258,'blue'),(353,261,'red'),(354,261,'blue'),(355,262,'red'),(356,262,'blue'),(357,263,'red'),(358,263,'blue'),(359,264,'red'),(360,264,'blue'),(361,265,'red'),(362,265,'blue'),(363,266,'red'),(364,266,'blue'),(365,267,'red'),(366,267,'blue'),(367,268,'red'),(368,268,'blue'),(369,269,'red'),(370,269,'blue'),(371,270,'red'),(372,270,'blue'),(373,271,'red'),(374,271,'blue'),(375,272,'red'),(376,272,'blue'),(377,273,'red'),(378,273,'blue'),(381,275,'red'),(382,275,'blue'),(383,276,'red'),(384,276,'blue'),(387,278,'red'),(388,278,'blue'),(393,281,'red'),(394,281,'blue'),(395,282,'red'),(396,282,'blue'),(397,283,'red'),(398,283,'blue'),(399,284,'red'),(400,284,'blue'),(401,285,'red'),(402,285,'blue'),(403,286,'red'),(404,286,'blue'),(405,287,'red'),(406,287,'blue'),(407,288,'red'),(408,288,'blue'),(409,289,'red'),(410,289,'blue'),(411,290,'red'),(412,290,'blue'),(425,297,'red'),(426,297,'blue'),(587,378,'red'),(588,378,'blue'),(589,379,'red'),(590,379,'blue');
/*!40000 ALTER TABLE `alliance` ENABLE KEYS */;
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
