-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: murmur
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` varchar(36) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `AvatarUrl` text,
  `Bio` text,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `UpdatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `CoverPhotoUrl` text,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IDX_8542bfce8271ad2e1f2a7d2e45` (`Username`),
  UNIQUE KEY `IDX_f73ebcea50dd1c375f20260dbe` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('38988582-4833-4a24-9ae7-5c1ba3d387f0','abdur1','abdur1@gmail.com','abdur1@','abdur1','rahman1','https://res.cloudinary.com/dshjbnuup/image/upload/v1754772675/uploads/cfkqbn9ynngx0wqmqvch.jpg','Full Stack Developer driven by a love for creating impactful digital experiences. Skilled in React, Next.js, Node.js, NestJS, JavaScript, and .NET, I bridge the gap between intuitive design and robust backend systems. Whether building from scratch or optimizing existing projects, I focus on performance, scalability, and clean code to bring ideas to life.',NULL,'2025-08-06 11:53:43.990200','2025-08-10 02:51:17.000000','https://res.cloudinary.com/dshjbnuup/image/upload/v1754772677/uploads/akadkgm3pyrv8xdfbcfz.jpg'),('3f326eed-6611-46b2-8133-8dcf70373203','abdur','abdur@gmail.com','abdur@','Abdur','Rahman','https://res.cloudinary.com/dshjbnuup/image/upload/v1754772790/uploads/wlb1epas7h851ev4hqda.jpg','Full Stack Developer with expertise in React, Next.js, Node.js, NestJS, JavaScript, and .NET. I specialize in designing and developing high-performance, scalable, and secure web applications from concept to deployment. With a strong foundation in both frontend and backend technologies, I deliver solutions that combine seamless user experiences with robust system architecture.',NULL,'2025-08-06 11:53:55.449806','2025-08-10 02:53:13.000000','https://res.cloudinary.com/dshjbnuup/image/upload/v1754772793/uploads/vhgxvy9ielga8fky4fly.png'),('9a037e41-0bb5-48e9-b18c-4cd357d9ad72','admin','admin@gmail.com','admin@','admin','rahman','https://res.cloudinary.com/dshjbnuup/image/upload/v1754735407/uploads/q2extlfvawuarpigt3ow.jpg','I am a passionate Full Stack Developer with expertise in React, Next.js, Node.js, NestJS, JavaScript, and .NET. I specialize in building high-performance, scalable, and user-friendly web applications. With a strong understanding of both frontend and backend development, I deliver clean, efficient, and maintainable code while keeping up with the latest technologies and best practices.',NULL,'2025-08-06 11:54:06.204044','2025-08-10 02:49:57.000000','https://res.cloudinary.com/dshjbnuup/image/upload/v1754735901/uploads/x4gcn1a061zlaniw6cin.png'),('a4aade49-5c92-4f40-bdb7-d58bb4d6bf3e','admin1','admin1@gmail.com','admin1@','admin1','','https://res.cloudinary.com/dshjbnuup/image/upload/v1754742534/uploads/lhkbjssyxyseaa2jx1i3.jpg','Passionate Web Developer crafting modern, responsive, and user-friendly websites with clean code and creative solutions.',NULL,'2025-08-06 11:54:19.944295','2025-08-09 18:28:56.000000','https://res.cloudinary.com/dshjbnuup/image/upload/v1754742535/uploads/bw52rcaxacwyrw87vb5q.jpg');
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

-- Dump completed on 2025-08-10  2:57:08
