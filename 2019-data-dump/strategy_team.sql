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
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `team` (
  `team_number` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`team_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (188,'Blizzard'),(610,'Crescent Coyotes'),(746,'Gearheads'),(748,'Kingsville CavalGears'),(771,'SWAT'),(772,'Sabre Bytes Robotics '),(773,'Kingsville CavalGears'),(781,'Kinetic Knights'),(854,'Iron Bears'),(865,'WARP7'),(886,'Wildcats'),(907,'East York Cybernetics \"The Cybernauts\"'),(914,'Flashpoint'),(919,'Tiger Techs'),(1075,'Sprockets'),(1114,'Simbotics'),(1241,'THEORY6'),(1246,'Agincourt Skunkworks'),(1285,'The Big Bang'),(1305,'Ice Cubed'),(1310,'Runnymede Robotics'),(1325,'Inverse Paradox'),(1334,'Red Devils'),(1360,'Orbit Robotics'),(1374,'Amped Up'),(1547,'\"Where\'s Waldo?\"'),(1815,'Black Scots'),(1846,'Le Vortex'),(2013,'Cybergnomes'),(2056,'OP Robotics'),(2185,'RAMAZOIDZ'),(2198,'Paradigm Shift'),(2200,'MMRambotics'),(2386,'Trojans'),(2609,'BeaverworX'),(2634,'The Gryphons'),(2702,'Rebels'),(2706,'Merge Robotics'),(2708,'Lake Effect Robotics'),(2809,'K-Botics'),(2852,'DM High Voltage'),(2935,'NACI Robotics'),(2994,'ASTECHZ'),(3161,'Tronic Titans'),(3541,'Brebotics'),(3543,'C4 Robotics'),(3560,'Chingbotics'),(3571,'Mustang Robotics'),(3683,'Team DAVE'),(3705,'Arrowbots'),(3710,'FSS Cyber Falcons'),(3739,'Oakbotics'),(3756,'RamFerno'),(3949,'d\'Y Robotics'),(4001,'RAMS ROBOTICS'),(4015,'Jag'),(4039,'MakeShift Robotics'),(4069,'Lo-Ellen Robotics'),(4152,'Hoya Robotics'),(4248,'Bits & Pieces'),(4252,'Cardinal Robotics'),(4308,'ABSOLUTE ROBOTICS'),(4343,'MaxTech'),(4357,'Spartans'),(4476,'W.A.F.F.L.E.S.'),(4519,'King\'s Robotics'),(4525,'Renaissance Robotics'),(4595,'Infinity'),(4617,'DAUN'),(4618,'Newman Robotics'),(4678,'CyberCavs'),(4688,'Saints Bot'),(4704,'Northern Lights Robotics'),(4716,'Purple Raiders'),(4718,'RoboPanthers'),(4732,'SWC Robotics'),(4777,'Spirit Robotics'),(4783,'RoboRavens'),(4814,'WE MARS Incubator'),(4825,'The Coltenoids'),(4902,'The Wildebots'),(4903,'Mustangs'),(4907,'Thunderstamps'),(4914,'Panthers'),(4917,'Sir Lancerbot'),(4920,'Belle River Automatons'),(4921,'HDHS HAWKTOBOTS'),(4923,'LaserBots'),(4932,'Cougar Robotics'),(4936,'Viral Vortex'),(4938,'Falcons'),(4939,'Allspark9'),(4940,'Knight Vision'),(4943,'\"R Cubed\"  '),(4946,'The Alpha Dogs'),(4951,'CDS Cyclones'),(4968,'RoboHawks'),(4976,'Revolt Robotics'),(4992,'Sparbotics'),(5024,'Raider Robotics'),(5031,' Full Metal Mustangs'),(5032,'Falcons'),(5033,'Beavertronics'),(5035,'eNimkii'),(5036,'The Robo Devils'),(5039,'Irish Iron'),(5051,'Fast Eddie Community Robotics'),(5076,'Richardson Stormbots'),(5092,'Titanium Tigers'),(5094,'Blizzard'),(5157,'Roboprime Cardinals'),(5158,'Richmond Hill'),(5164,'Robusters'),(5191,'LANCERobotics'),(5288,'Spartan Robotics'),(5324,'Hawks'),(5406,'Celt-X'),(5408,'KENNEDYcache'),(5409,'Chargers'),(5426,'E.J. Lajeunesse'),(5428,'Breaking Bots'),(5483,'GD-Bots'),(5519,'LASS Robotics'),(5580,'BRAEZEN KNIGHTS'),(5581,'Hornets'),(5589,'Red Devils'),(5596,'Wolverines'),(5598,'sjmp'),(5631,'SpartanDroids'),(5652,'Eagles'),(5672,'First Nations-STEM'),(5680,'KYS Robotics'),(5689,'CK Cyber Pack'),(5699,'Robo Sapiens'),(5719,'Pink Titans'),(5759,'TroBotics'),(5776,'Phoenix'),(5807,'CANbotics'),(5821,'The Saunders Robotics Club'),(5834,'R3P2'),(5870,'League of Logic'),(5885,'Villanova WiredCats'),(5911,'PARAGON'),(5912,'Heritage Robotics'),(5921,'Binary Power'),(6009,'CYBERHEART'),(6046,'Tecking'),(6052,'Clarke Road Trojans'),(6070,'Gryphon Machine'),(6110,'Doc Botics'),(6125,'Jagbots'),(6130,'Vipers'),(6135,'Arctos'),(6140,'SMT Titans'),(6141,'O\'Connor Robotics'),(6162,'Cap Alpaca'),(6202,'The Centurions'),(6323,'Hayden Robotics'),(6330,'6330 - Arc Angels'),(6331,'Sabotage'),(6336,'Javawockies'),(6339,'Pelican Falls First Nations High School'),(6342,'BT Robotics'),(6347,'St. James Lions'),(6378,'LYNX'),(6387,'Discobots Canada'),(6397,'Romero Robotics'),(6427,'Glendale'),(6461,'Iron Stallions'),(6481,'Deus Ex Machina'),(6513,'Wyvern Robotics'),(6514,'Sutton Robotics League'),(6537,'WIHS Robotics'),(6544,'A-Team Robotics'),(6564,'TDSS Titans'),(6632,'Northview Robotics'),(6661,'Polaris'),(6725,'Westminster WildBOTS'),(6854,'Viking Robotics'),(6856,'RoboRaptors'),(6859,'BML Robotics'),(6864,'Gravenhurst High School'),(6865,'Manitoulin Metal'),(6866,'The Space Invaders'),(6867,'Panthera Tech'),(6875,'Amazon Warriors  -  Build A Dream Robotics'),(6876,'UHS Wolfpack'),(6878,'SJB Odyssey '),(6881,'South Lions Roarbotics'),(6917,'Voyageur Robotics'),(6924,'Hogarth Hornets'),(6975,'Neil McNeil Maroonotics'),(6977,'Cyber Squad'),(6978,'QuickStrike Niagara'),(6987,'Falcon Automation'),(6992,'FrancoBots'),(7013,'ACCN Techtronix'),(7022,'ACE Robotics'),(7052,'Falcotronix'),(7058,'StrathDroids'),(7131,'Mavericks'),(7132,'Axeman'),(7136,'Thistletown Scot Bots'),(7176,'ROC'),(7200,'Banting Memorial high school'),(7267,'Lisgar Robotics Club'),(7456,'Aurobots'),(7475,'WIRED'),(7476,'EOM Lions'),(7480,'Machine Mavericks'),(7509,'Six Nations Polytechnic STEAMTeam Robotics'),(7520,'Team MineKee'),(7558,'ALT-F4'),(7564,'Lakers'),(7603,'Bill Hogarth Secondary School'),(7614,'NHS Robotics'),(7623,'Morebotics'),(7659,'HNMCS Robotics'),(7664,'Big Celtic 6'),(7690,'Iron Works Robotics'),(7710,'Mowat Mustangs'),(7711,'Applewood Axemen '),(7712,'ACCN UMOJA'),(7721,'UHS Wolfpack'),(7722,'Resurrection Fire Birds'),(7723,'Tiger Robotics'),(7735,'Milliken Mills Knights'),(7745,'College Heights'),(7757,'Atomic Dishwashers'),(7800,'Electric Comets'),(7806,'KDHS Kolts'),(7902,'Markham FireBirds'),(8052,'Water Bears'),(8072,'TechnoTigers'),(8073,'Blyth Academy Ottawa'),(8081,'UMEI Lightning Robotics'),(8089,'Rockway'),(8106,'Toronto French School'),(8113,'Royal Thunder Robotics'),(8120,'YORK MEMORIAL JAEGERS'),(8258,'Les dragons '),(8296,'Bengals'),(8305,'Nepean Robotics'),(8316,'Les Cougars de L\'Escale'),(8320,'Columbia International College 1'),(8345,'John McCrae Secondary School'),(8349,'Newbotics'),(8350,'TISS Pirates'),(8384,'Fulford Bots'),(8403,'Glendale');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
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
