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
-- Table structure for table `murmurs`
--

DROP TABLE IF EXISTS `murmurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `murmurs` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Text` text NOT NULL,
  `Images` text,
  `IsEdited` tinyint NOT NULL DEFAULT '0',
  `CreatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `UpdatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `Visibility` enum('Public','Private','Followers') NOT NULL DEFAULT 'Public',
  `userId` varchar(36) DEFAULT NULL,
  `replyToId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_d2331bf37356b3d5682b6cc1f70` (`userId`),
  KEY `FK_9e1ac1c352ee552cd9f9612e73c` (`replyToId`),
  CONSTRAINT `FK_9e1ac1c352ee552cd9f9612e73c` FOREIGN KEY (`replyToId`) REFERENCES `murmurs` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_d2331bf37356b3d5682b6cc1f70` FOREIGN KEY (`userId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `murmurs`
--

LOCK TABLES `murmurs` WRITE;
/*!40000 ALTER TABLE `murmurs` DISABLE KEYS */;
INSERT INTO `murmurs` VALUES (1,'{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"If you want to pursue a career as a web developer, it’s important to first build a strong foundation in key skills such as HTML, CSS, JavaScript, and popular frameworks like React or Vue. Familiarity with backend technologies and databases is a plus. Next, create and maintain an updated LinkedIn profile and showcase your projects on GitHub to demonstrate your skills to potential employers. Start searching for relevant job openings on popular job portals and freelance platforms, and tailor your resume and cover letter to highlight your strengths and experience. Prepare for interviews by practicing common coding problems and reviewing web development concepts. Finally, having a well-organized portfolio with live demos of your projects will help you stand out and impress recruiters.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}',NULL,0,'2025-08-09 18:40:32.637189','2025-08-09 18:40:32.637189','Public','38988582-4833-4a24-9ae7-5c1ba3d387f0',NULL),(2,'{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"To become a successful web developer, it is essential to have a solid grasp of the fundamental technologies such as HTML, CSS, and JavaScript. Additionally, learning modern frameworks like React, Angular, or Vue can significantly enhance your ability to build dynamic and responsive web applications.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}',NULL,0,'2025-08-09 18:40:54.204312','2025-08-09 18:40:54.204312','Public','38988582-4833-4a24-9ae7-5c1ba3d387f0',NULL),(3,'{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"While frontend development is important, understanding backend technologies such as Node.js, Express, or databases like MySQL and MongoDB will give you an edge. Full-stack knowledge allows you to handle both client and server-side programming, making you more versatile.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}',NULL,0,'2025-08-09 18:42:07.389137','2025-08-09 18:42:07.389137','Public','38988582-4833-4a24-9ae7-5c1ba3d387f0',NULL),(4,'{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Create a professional portfolio website that showcases your projects and skills. Include live demos, GitHub links, and detailed descriptions of your work. This helps potential employers see your practical experience and coding style.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}',NULL,0,'2025-08-09 18:42:22.387810','2025-08-09 18:42:22.387810','Public','38988582-4833-4a24-9ae7-5c1ba3d387f0',NULL),(5,'{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Proficiency with version control systems, especially Git and GitHub, is essential in modern web development. It allows you to manage code versions, collaborate with others, and demonstrate your workflow management to employers.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}',NULL,0,'2025-08-09 18:42:31.156609','2025-08-09 18:42:31.156609','Public','38988582-4833-4a24-9ae7-5c1ba3d387f0',NULL),(6,'{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Use popular job portals like LinkedIn, Indeed, and Glassdoor to find web developer openings. Also consider freelance platforms such as Upwork and Fiverr. Tailor your applications to each job by highlighting relevant skills and experience.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}',NULL,0,'2025-08-09 18:43:10.164850','2025-08-09 18:43:10.164850','Public','3f326eed-6611-46b2-8133-8dcf70373203',NULL),(7,'{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Resume and Cover Letter:\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Prepare a clear, concise resume emphasizing your technical skills, projects, and any professional experience. Write a personalized cover letter that explains your passion for web development and why you’re a good fit for the company.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1,\"textFormat\":1}}',NULL,0,'2025-08-09 18:43:23.404472','2025-08-09 18:43:23.404472','Public','3f326eed-6611-46b2-8133-8dcf70373203',NULL),(8,'{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Interview Preparation:\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Practice coding problems on platforms like HackerRank, LeetCode, and Codewars. Review common web development concepts such as the DOM, event handling, REST APIs, and asynchronous programming to confidently answer technical questions.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1,\"textFormat\":1}}',NULL,0,'2025-08-09 18:43:47.509401','2025-08-09 18:43:47.509401','Public','3f326eed-6611-46b2-8133-8dcf70373203',NULL),(9,'{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Soft Skills:\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Employers value communication, teamwork, and problem-solving skills. Be ready to demonstrate your ability to work well in a team, manage time effectively, and adapt to changing project requirements.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1,\"textFormat\":1}}',NULL,0,'2025-08-09 18:44:09.020273','2025-08-09 18:44:09.020273','Public','9a037e41-0bb5-48e9-b18c-4cd357d9ad72',NULL),(10,'{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Networking:\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Join web development communities online and attend local tech meetups or webinars. Networking can help you learn from others, stay updated with industry trends, and find job opportunities through referrals.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1,\"textFormat\":1}}',NULL,0,'2025-08-09 18:44:23.363522','2025-08-09 18:44:23.363522','Public','9a037e41-0bb5-48e9-b18c-4cd357d9ad72',NULL),(11,'{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Continuous Learning:\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Web development is a fast-evolving field. Commit to continuous learning by following blogs, watching tutorials, and experimenting with new tools and technologies. This mindset will help you stay competitive and grow your career.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1,\"textFormat\":1}}',NULL,0,'2025-08-09 18:44:37.284968','2025-08-09 18:44:37.284968','Public','9a037e41-0bb5-48e9-b18c-4cd357d9ad72',NULL);
/*!40000 ALTER TABLE `murmurs` ENABLE KEYS */;
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
