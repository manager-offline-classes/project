-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.1.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for f8_project_manager_classes
CREATE DATABASE IF NOT EXISTS `f8_project_manager_classes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `f8_project_manager_classes`;

-- Dumping structure for table f8_project_manager_classes.classes
CREATE TABLE IF NOT EXISTS `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `schedule` varchar(50) DEFAULT NULL,
  `timeLearn` varchar(50) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.classes: ~6 rows (approximately)
INSERT INTO `classes` (`id`, `name`, `quantity`, `startDate`, `endDate`, `schedule`, `timeLearn`, `courseId`, `createdAt`, `updatedAt`) VALUES
	(3, 'font-end-k1', 3, '2024-01-30 07:00:00', '2024-06-18 00:00:00', '2', '21:44,22:44', 3, '2024-01-30 21:44:20', '2024-02-20 17:19:38'),
	(4, 'full-stack-2', 2, '2024-01-25 07:00:00', '2024-08-22 00:00:00', '4', '21:44,23:44', 1, '2024-01-30 21:44:34', '2024-02-20 17:27:02'),
	(5, 'Back-end-1', 3, '2024-02-01 07:00:00', '2024-06-20 00:00:00', '4', '10:26,11:26', 2, '2024-02-01 10:27:00', '2024-02-21 17:46:55'),
	(6, 'full-stack-5', 2, '2024-02-15 07:00:00', '2024-09-12 00:00:00', '4', '15:23,19:23', 1, '2024-02-07 15:23:12', '2024-02-20 17:19:52'),
	(7, 'tetst', 0, '2024-02-20 07:00:00', '2024-10-01 00:00:00', '2', '21:19,22:19', 5, '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(8, 'adsfdalskfjhla', 0, '2024-02-20 07:00:00', '2024-04-30 00:00:00', '1,2', '21:57,22:57,21:57,22:57', 2, '2024-02-20 21:57:35', '2024-02-20 21:57:35');

-- Dumping structure for table f8_project_manager_classes.classesteacher
CREATE TABLE IF NOT EXISTS `classesteacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  KEY `classId` (`classId`),
  CONSTRAINT `classesteacher_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `classesteacher_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.classesteacher: ~6 rows (approximately)
INSERT INTO `classesteacher` (`id`, `teacherId`, `classId`, `createdAt`, `updatedAt`) VALUES
	(2, 104, 3, '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(3, 103, 4, '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(4, 103, 5, '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(5, 103, 6, '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(6, 103, 7, '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(7, 103, 8, '2024-02-20 21:57:35', '2024-02-20 21:57:35');

-- Dumping structure for table f8_project_manager_classes.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.comments: ~0 rows (approximately)

-- Dumping structure for table f8_project_manager_classes.coursemodules
CREATE TABLE IF NOT EXISTS `coursemodules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `coursemodules_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.coursemodules: ~7 rows (approximately)
INSERT INTO `coursemodules` (`id`, `name`, `courseId`, `createdAt`, `updatedAt`) VALUES
	(1, 'Giới thiệu', 1, '2024-02-01 10:39:50', '2024-02-02 10:43:06'),
	(2, 'Nhập môn lập trình', 1, '2024-02-01 10:39:56', '2024-02-02 10:43:22'),
	(3, 'HTML là gì', 1, '2024-02-01 10:50:23', '2024-02-01 10:50:23'),
	(4, 'Javascript là gì ?', 1, '2024-02-01 11:06:15', '2024-02-01 11:06:15'),
	(6, 'Giới thiệu', 2, '2024-02-02 10:39:10', '2024-02-02 10:39:10'),
	(7, 'Giới thiệu chung', 3, '2024-02-21 19:30:33', '2024-02-21 19:30:33'),
	(8, 'Font-End là gì', 3, '2024-02-21 19:30:43', '2024-02-21 19:30:43');

-- Dumping structure for table f8_project_manager_classes.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `price` int(11) DEFAULT 0,
  `teacherId` int(11) DEFAULT NULL,
  `tryLearn` int(11) DEFAULT 0,
  `quantity` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.courses: ~5 rows (approximately)
INSERT INTO `courses` (`id`, `name`, `price`, `teacherId`, `tryLearn`, `quantity`, `duration`, `createdAt`, `updatedAt`) VALUES
	(1, 'Full-stack', 15000000, 103, 3, 30, 80, '2024-01-30 21:41:31', '2024-01-30 21:41:31'),
	(2, 'Back-end', 13000000, 103, 2, 20, 40, '2024-01-30 21:41:31', '2024-02-01 10:16:57'),
	(3, 'Font-end', 12000000, 104, 2, 20, 35, '2024-01-30 21:41:31', '2024-01-30 21:41:31'),
	(4, 'PHP', 11000000, 107, NULL, 20, 50, '2024-01-30 21:41:31', '2024-01-30 21:41:31'),
	(5, 'tesst', 12, 103, 1, 32, 32, '2024-02-01 10:17:16', '2024-02-01 10:17:16');

-- Dumping structure for table f8_project_manager_classes.exercises
CREATE TABLE IF NOT EXISTS `exercises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.exercises: ~4 rows (approximately)
INSERT INTO `exercises` (`id`, `classId`, `title`, `content`, `attachment`, `createdAt`, `updatedAt`) VALUES
	(6, 3, 'Bài tập 3', 'Cho tam giác ABC; \\hat{B} = 600, AB = 7cm, BC = 15cm.Trên cạnh BC lấy điểm D sao cho \\hat{BAD} = 600. Gọi H là trung điểm của BD.\r\n\r\na.Tính độ dài HD\r\n\r\nb.Tính độ dài AC.\r\n\r\nc.Tam giác ABC có phải là tam giác vuông hay không?', 'https://momentjs.com/', '2024-02-22 11:46:08', '2024-02-22 16:44:37'),
	(7, 3, 'bai tap 4', 'Phi Vụ Triệu Đô (Phần 5) Vietsub - HD\r\nMoney Heist (Season 5)\r\n\r\n 2021  50 phút / tập\r\n\r\nĐang phát: Hoàn Tất (10/10)\r\n\r\nTập mới nhất: 1098\r\n\r\nQuốc gia: Âu Mỹ\r\n\r\nDiễn viên: Alba FloresÁlvaro MorteEnrique ArceEsther AceboItziar ItuñoJaime LorenteMiguel HerránPedro AlonsoÚrsula Corberó\r\n\r\nThể loại: Chiến Tranh, Hành Động, Hình Sự, Phiêu Lưu\r\n\r\n1.45/ 5 2 lượt\r\nNỘI DUNG PHIM\r\nPhi Vụ Triệu Đô (Phần 5) này kể về cả nhóm đã ở Ngân hàng Tây Ban Nha hơn 100 giờ và Giáo Sư đang gặp nguy. Tệ hơn nữa, họ sắp phải đối mặt với một kẻ địch mới: quân đội.\r\n\r\nMở rộng...', 'https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators', '2024-02-23 08:55:37', '2024-02-23 08:55:37'),
	(9, 4, 'Bài tập 1', '[ HƯỚNG DẪN LUYỆN NGHE ]\r\n\r\nĐây phần luyện nghe tiếng anh cơ bản dành cho bạn mất gốc.\r\nHôm nay mình hướng dẫn các bạn luyện nghe theo giáo trình Tactics For Listening\r\n\r\n1. Tactics for Listening là gì ?\r\n', 'https://www.youtube.com/watch?v=Fnvp2EO79aw&list=PL58hfP3cNthqKkVWLFJ3_DuoJziQNGGKL', '2024-02-23 09:29:27', '2024-02-23 09:29:27'),
	(11, 4, 'test', 'Chẳng hạn, bạn có thể nghe trong khi bạn đang rửa chén, lau nhà hay khi đang nấu ăn. Làm những công việc này sẽ khiến tâm trí bạn không còn tập trung vào âm thanh. Tuy nhiên, hãy đảm bảo rằng bạn vẫn có thể nghe thấy những gì đang được nói.\r\n', 'https://www.youtube.com/watch?v=KYk0MXjCmyA', '2024-02-23 09:31:24', '2024-02-23 09:31:38');

-- Dumping structure for table f8_project_manager_classes.exercisessubmits
CREATE TABLE IF NOT EXISTS `exercisessubmits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) DEFAULT NULL,
  `exerciseId` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `exercisessubmits_ibfk_2` (`exerciseId`),
  CONSTRAINT `exercisessubmits_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `exercisessubmits_ibfk_2` FOREIGN KEY (`exerciseId`) REFERENCES `exercises` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.exercisessubmits: ~8 rows (approximately)
INSERT INTO `exercisessubmits` (`id`, `studentId`, `exerciseId`, `content`, `attachment`, `parentId`, `createdAt`, `updatedAt`) VALUES
	(1, 18, 6, 'Em nộp bài tập ạ ', NULL, NULL, '2024-02-22 14:23:54', '2024-02-22 14:23:55'),
	(21, 1, 7, 'hihi dung roi', NULL, NULL, '2024-02-23 08:56:01', '2024-02-23 08:56:01'),
	(24, 103, 11, 'ĐÂY LÀ TEST GIÁO VIÊN', NULL, NULL, '2024-02-23 09:32:51', '2024-02-23 09:32:51'),
	(25, 1, 11, 'TEST ADM', NULL, 24, '2024-02-23 09:33:04', '2024-02-23 09:33:04'),
	(26, 105, 6, 'Em nộp bài tập đây ạ https://www.youtube.com/watch?v=s6n7IL4WXHg', NULL, NULL, '2024-02-23 09:52:55', '2024-02-23 09:52:55'),
	(27, 1, 6, 'ok chuẩn đó', NULL, 26, '2024-02-23 09:53:08', '2024-02-23 09:53:08'),
	(28, 105, 9, 'Tớ nộp bài đây https://www.youtube.com/watch?v=s6n7IL4WXHg', NULL, NULL, '2024-02-23 09:54:00', '2024-02-23 09:54:00'),
	(29, 103, 9, 'ok chuẩn đó', NULL, 28, '2024-02-23 09:55:07', '2024-02-23 09:55:07');

-- Dumping structure for table f8_project_manager_classes.learningstatuses
CREATE TABLE IF NOT EXISTS `learningstatuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.learningstatuses: ~4 rows (approximately)
INSERT INTO `learningstatuses` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Đang Học', '2024-01-30 21:41:31', '2024-01-30 21:41:31'),
	(2, 'Hoàn Thành', '2024-01-30 21:41:31', '2024-01-30 21:41:31'),
	(3, 'Nghỉ Học', '2024-01-30 21:41:31', '2024-01-30 21:41:31'),
	(4, 'Bảo Lưu', '2024-01-30 21:41:31', '2024-01-30 21:41:31');

-- Dumping structure for table f8_project_manager_classes.logintokens
CREATE TABLE IF NOT EXISTS `logintokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `logintokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.logintokens: ~5 rows (approximately)
INSERT INTO `logintokens` (`id`, `userId`, `token`, `createdAt`, `updatedAt`) VALUES
	(119, 105, '0c8f57d6a9275eb38bc41ad1c84adcbd', '2024-02-23 09:42:34', '2024-02-23 09:42:34'),
	(141, 2, 'baf2d76aba8a9b92b9378a9a4745e522', '2024-02-24 11:33:38', '2024-02-24 11:33:38'),
	(148, 1, 'ed0e564cc44cf81a6f490b005c15745d', '2024-02-24 15:53:33', '2024-02-24 15:53:33'),
	(152, 103, 'f30daf3e82a7669f8499bab4ac874e9c', '2024-02-24 16:04:17', '2024-02-24 16:04:17'),
	(153, 108, '0a17b197a9b6ad7d08e040faa8e8a499', '2024-02-24 16:06:58', '2024-02-24 16:06:58');

-- Dumping structure for table f8_project_manager_classes.moduledocuments
CREATE TABLE IF NOT EXISTS `moduledocuments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text DEFAULT NULL,
  `pathName` varchar(200) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `moduleId` (`moduleId`),
  CONSTRAINT `moduledocuments_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `coursemodules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.moduledocuments: ~8 rows (approximately)
INSERT INTO `moduledocuments` (`id`, `content`, `pathName`, `moduleId`, `createdAt`, `updatedAt`) VALUES
	(1, 'Giới thiệu về lập trình', 'https://codepen.io/hahcntt/pen/BepQVE', 1, '2024-02-01 10:40:14', '2024-02-01 10:40:14'),
	(2, 'Giới thiệu html', 'https://poe.com/chat/1zmh2fo4c122qdmo5ea', 1, '2024-02-01 10:40:25', '2024-02-01 10:40:25'),
	(3, 'Cấu trúc dữ liệu', 'https://codepen.io/hahcntt/pen/BepQVE', 2, '2024-02-01 10:40:47', '2024-02-01 10:40:47'),
	(4, 'Nodejs là gì', 'https://codepen.io/hahcntt/pen/BepQVE', 1, '2024-02-02 10:46:45', '2024-02-02 10:46:45'),
	(5, 'Gioi thieu ve javasss', 'https://codepen.io/hahcntt/pen/BepQVE', 1, '2024-02-02 10:46:57', '2024-02-02 10:49:40'),
	(6, 'Bạn là ai', 'https://codepen.io/hahcntt/pen/BepQVE', 7, '2024-02-21 19:30:52', '2024-02-21 19:30:52'),
	(7, 'Tôi là ai', 'https://fontawesome.com/v5/icons/plus-square?f=classic&s=solid&sz=lg', 7, '2024-02-21 19:31:02', '2024-02-21 19:31:02'),
	(8, 'Tại sao ?', 'https://poe.com/chat/1zmh2fo4c122qdmo5ea', 8, '2024-02-21 19:31:13', '2024-02-21 19:31:13');

-- Dumping structure for table f8_project_manager_classes.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(150) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.permissions: ~17 rows (approximately)
INSERT INTO `permissions` (`id`, `value`, `createdAt`, `updatedAt`) VALUES
	(1, 'users.read', '2024-02-23 16:14:24', '2024-02-23 16:14:24'),
	(2, 'roles.read', '2024-02-23 16:14:24', '2024-02-23 16:14:24'),
	(3, 'users.add', '2024-02-23 16:17:29', '2024-02-23 16:17:29'),
	(4, 'users.update', '2024-02-23 18:11:28', '2024-02-23 18:11:28'),
	(5, 'roles.add', '2024-02-23 18:11:28', '2024-02-23 18:11:28'),
	(6, 'users.delete', '2024-02-23 18:12:30', '2024-02-23 18:12:30'),
	(7, 'users.permission', '2024-02-23 18:12:30', '2024-02-23 18:12:30'),
	(8, 'roles.update', '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(9, 'courses.update', '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(10, 'courses.delete', '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(11, 'roles.delete', '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(12, 'courses.read', '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(13, 'courses.add', '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(14, 'classes.read', '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(15, 'classes.add', '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(16, 'classes.update', '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(17, 'classes.delete', '2024-02-23 18:13:10', '2024-02-23 18:13:10');

-- Dumping structure for table f8_project_manager_classes.rolepermissions
CREATE TABLE IF NOT EXISTS `rolepermissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permissionId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `permissionId` (`permissionId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `rolepermissions_ibfk_1` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rolepermissions_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.rolepermissions: ~24 rows (approximately)
INSERT INTO `rolepermissions` (`id`, `permissionId`, `roleId`, `createdAt`, `updatedAt`) VALUES
	(11, 1, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(12, 3, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(13, 6, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(14, 7, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(15, 2, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(16, 5, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(17, 4, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(18, 8, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(19, 9, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(20, 13, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(21, 12, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(22, 15, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(23, 16, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(24, 17, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(25, 10, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(26, 14, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(27, 11, 5, '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(32, 2, 6, '2024-02-24 08:42:57', '2024-02-24 08:42:57'),
	(36, 1, 7, '2024-02-24 09:24:55', '2024-02-24 09:24:55'),
	(37, 3, 7, '2024-02-24 09:24:55', '2024-02-24 09:24:55'),
	(38, 4, 7, '2024-02-24 09:24:55', '2024-02-24 09:24:55'),
	(39, 6, 7, '2024-02-24 09:24:55', '2024-02-24 09:24:55'),
	(40, 7, 7, '2024-02-24 09:24:55', '2024-02-24 09:24:55'),
	(43, 1, 6, '2024-02-24 10:19:03', '2024-02-24 10:19:03');

-- Dumping structure for table f8_project_manager_classes.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.roles: ~3 rows (approximately)
INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(5, 'Super Admin', '2024-02-23 18:13:10', '2024-02-23 18:13:10'),
	(6, 'tét', '2024-02-24 08:42:57', '2024-02-24 11:38:56'),
	(7, 'Only User', '2024-02-24 09:24:55', '2024-02-24 09:24:55');

-- Dumping structure for table f8_project_manager_classes.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table f8_project_manager_classes.sequelizemeta: ~24 rows (approximately)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20231122023420-create-type.js'),
	('20231122023421-create-user.js'),
	('20231122032135-create-login-token.js'),
	('20231122032700-create-user-social.js'),
	('20231122033153-create-role.js'),
	('20231122033229-create-permission.js'),
	('20231122033629-UserRole.js'),
	('20231122033939-RolePermission.js'),
	('20231122034145-UserPermission.js'),
	('20231122035154-create-user-otp.js'),
	('20231122040447-create-course.js'),
	('20231122151446-create-course-module.js'),
	('20231122152113-create-module-document.js'),
	('20231122153721-create-class.js'),
	('20231122154151-ClassesTeacher.js'),
	('20231122154547-create-teacher-calendar.js'),
	('20231125021049-create-learning-status.js'),
	('20231125021050-create-students-classes.js'),
	('20231125022617-create-students-attendance.js'),
	('20231125024153-create-settings.js'),
	('20231125024413-create-exercises.js'),
	('20231125024815-create-exercises-submit.js'),
	('20231125025212-create-comment.js'),
	('20231125025803-create-users-column.js');

-- Dumping structure for table f8_project_manager_classes.settings
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `optKey` varchar(200) DEFAULT NULL,
  `optValue` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.settings: ~0 rows (approximately)

-- Dumping structure for table f8_project_manager_classes.studentsattendances
CREATE TABLE IF NOT EXISTS `studentsattendances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateLearning` datetime DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `statusId` (`statusId`),
  KEY `studentId` (`studentId`),
  KEY `classId` (`classId`),
  CONSTRAINT `studentsattendances_ibfk_1` FOREIGN KEY (`statusId`) REFERENCES `learningstatuses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `studentsattendances_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `studentsattendances_ibfk_3` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.studentsattendances: ~16 rows (approximately)
INSERT INTO `studentsattendances` (`id`, `dateLearning`, `statusId`, `studentId`, `classId`, `status`, `createdAt`, `updatedAt`) VALUES
	(183, '2024-01-25 07:00:00', 1, 8, 4, 0, '2024-02-21 19:38:40', '2024-02-21 19:38:40'),
	(184, '2024-02-01 07:00:00', 1, 8, 4, 2, '2024-02-21 19:38:40', '2024-02-21 19:38:40'),
	(185, '2024-02-08 07:00:00', 1, 8, 4, 0, '2024-02-21 19:38:40', '2024-02-21 19:38:40'),
	(186, '2024-02-15 07:00:00', 1, 8, 4, 1, '2024-02-21 19:38:40', '2024-02-21 19:38:40'),
	(187, '2024-02-22 07:00:00', 1, 8, 4, 2, '2024-02-21 19:38:40', '2024-02-21 19:38:40'),
	(188, '2024-03-14 07:00:00', 1, 8, 4, 1, '2024-02-21 19:38:40', '2024-02-21 19:38:40'),
	(189, '2024-01-25 07:00:00', 1, 105, 4, 0, '2024-02-21 19:38:40', '2024-02-21 19:38:40'),
	(190, '2024-02-01 07:00:00', 1, 105, 4, 1, '2024-02-21 19:38:40', '2024-02-21 19:38:40'),
	(191, '2024-02-08 07:00:00', 1, 105, 4, 1, '2024-02-21 19:38:40', '2024-02-21 19:38:40'),
	(192, '2024-02-22 07:00:00', 1, 105, 4, 1, '2024-02-21 19:38:40', '2024-02-21 19:38:40'),
	(205, '2024-02-06 07:00:00', 1, 8, 3, 1, '2024-02-21 21:44:26', '2024-02-21 21:44:26'),
	(206, '2024-02-13 07:00:00', 1, 8, 3, 2, '2024-02-21 21:44:26', '2024-02-21 21:44:26'),
	(207, '2024-01-30 07:00:00', 1, 9, 3, 2, '2024-02-21 21:44:26', '2024-02-21 21:44:26'),
	(208, '2024-02-13 07:00:00', 1, 9, 3, 1, '2024-02-21 21:44:26', '2024-02-21 21:44:26'),
	(209, '2024-01-30 07:00:00', 1, 105, 3, 2, '2024-02-21 21:44:26', '2024-02-21 21:44:26'),
	(210, '2024-02-13 07:00:00', 1, 105, 3, 1, '2024-02-21 21:44:26', '2024-02-21 21:44:26');

-- Dumping structure for table f8_project_manager_classes.studentsclasses
CREATE TABLE IF NOT EXISTS `studentsclasses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `completedDate` datetime DEFAULT NULL,
  `dropDate` datetime DEFAULT NULL,
  `recover` datetime DEFAULT NULL,
  `reasonStatus` text DEFAULT NULL,
  `dateStatus` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `classId` (`classId`),
  KEY `statusId` (`statusId`),
  CONSTRAINT `studentsclasses_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `studentsclasses_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `studentsclasses_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `learningstatuses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.studentsclasses: ~10 rows (approximately)
INSERT INTO `studentsclasses` (`id`, `studentId`, `classId`, `statusId`, `completedDate`, `dropDate`, `recover`, `reasonStatus`, `dateStatus`, `createdAt`, `updatedAt`) VALUES
	(11, 8, 3, 1, NULL, NULL, NULL, NULL, NULL, '2024-02-20 17:19:38', '2024-02-20 17:19:38'),
	(12, 9, 3, 1, NULL, NULL, NULL, NULL, NULL, '2024-02-20 17:19:38', '2024-02-20 17:19:38'),
	(13, 105, 3, 1, NULL, NULL, NULL, NULL, NULL, '2024-02-20 17:19:38', '2024-02-20 17:19:38'),
	(16, 105, 6, 1, NULL, NULL, NULL, NULL, NULL, '2024-02-20 17:19:52', '2024-02-20 17:19:52'),
	(17, 106, 6, 1, NULL, NULL, NULL, NULL, NULL, '2024-02-20 17:19:52', '2024-02-20 17:19:52'),
	(20, 8, 4, 1, NULL, NULL, NULL, NULL, NULL, '2024-02-20 17:27:02', '2024-02-20 17:27:02'),
	(21, 105, 4, 1, NULL, NULL, NULL, NULL, NULL, '2024-02-20 17:27:02', '2024-02-20 17:27:02'),
	(28, 9, 5, 1, NULL, NULL, NULL, NULL, NULL, '2024-02-21 17:46:55', '2024-02-21 17:46:55'),
	(29, 105, 5, 1, NULL, NULL, NULL, NULL, NULL, '2024-02-21 17:46:55', '2024-02-21 17:46:55'),
	(30, 106, 5, 1, NULL, NULL, NULL, NULL, NULL, '2024-02-21 17:46:55', '2024-02-21 17:46:55');

-- Dumping structure for table f8_project_manager_classes.teachercalendars
CREATE TABLE IF NOT EXISTS `teachercalendars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `scheduleStartDate` datetime DEFAULT NULL,
  `scheduleEndDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  KEY `classId` (`classId`),
  CONSTRAINT `teachercalendars_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `teachercalendars_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.teachercalendars: ~158 rows (approximately)
INSERT INTO `teachercalendars` (`id`, `teacherId`, `classId`, `scheduleStartDate`, `scheduleEndDate`, `createdAt`, `updatedAt`) VALUES
	(32, 104, 3, '2024-01-30 21:44:00', '2024-01-30 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(33, 104, 3, '2024-02-06 21:44:00', '2024-02-06 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(34, 104, 3, '2024-02-13 21:44:00', '2024-02-13 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(35, 104, 3, '2024-02-20 21:44:00', '2024-02-20 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(36, 104, 3, '2024-02-27 21:44:00', '2024-02-27 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(37, 104, 3, '2024-03-05 21:44:00', '2024-03-05 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(38, 104, 3, '2024-03-12 21:44:00', '2024-03-12 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(39, 104, 3, '2024-03-19 21:44:00', '2024-03-19 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(40, 104, 3, '2024-03-26 21:44:00', '2024-03-26 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(41, 104, 3, '2024-04-02 21:44:00', '2024-04-02 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(42, 104, 3, '2024-04-09 21:44:00', '2024-04-09 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(43, 104, 3, '2024-04-16 21:44:00', '2024-04-16 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(44, 104, 3, '2024-04-23 21:44:00', '2024-04-23 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(45, 104, 3, '2024-04-30 21:44:00', '2024-04-30 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(46, 104, 3, '2024-05-07 21:44:00', '2024-05-07 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(47, 104, 3, '2024-05-14 21:44:00', '2024-05-14 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(48, 104, 3, '2024-05-21 21:44:00', '2024-05-21 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(49, 104, 3, '2024-05-28 21:44:00', '2024-05-28 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(50, 104, 3, '2024-06-04 21:44:00', '2024-06-04 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(51, 104, 3, '2024-06-11 21:44:00', '2024-06-11 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(52, 104, 3, '2024-06-18 21:44:00', '2024-06-18 22:44:00', '2024-01-30 21:44:20', '2024-01-30 21:44:20'),
	(53, 103, 4, '2024-01-25 21:44:00', '2024-01-25 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(54, 103, 4, '2024-02-01 21:44:00', '2024-02-01 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(55, 103, 4, '2024-02-08 21:44:00', '2024-02-08 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(56, 103, 4, '2024-02-15 21:44:00', '2024-02-15 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(57, 103, 4, '2024-02-22 21:44:00', '2024-02-22 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(58, 103, 4, '2024-02-29 21:44:00', '2024-02-29 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(59, 103, 4, '2024-03-07 21:44:00', '2024-03-07 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(60, 103, 4, '2024-03-14 21:44:00', '2024-03-14 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(61, 103, 4, '2024-03-21 21:44:00', '2024-03-21 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(62, 103, 4, '2024-03-28 21:44:00', '2024-03-28 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(63, 103, 4, '2024-04-04 21:44:00', '2024-04-04 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(64, 103, 4, '2024-04-11 21:44:00', '2024-04-11 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(65, 103, 4, '2024-04-18 21:44:00', '2024-04-18 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(66, 103, 4, '2024-04-25 21:44:00', '2024-04-25 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(67, 103, 4, '2024-05-02 21:44:00', '2024-05-02 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(68, 103, 4, '2024-05-09 21:44:00', '2024-05-09 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(69, 103, 4, '2024-05-16 21:44:00', '2024-05-16 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(70, 103, 4, '2024-05-23 21:44:00', '2024-05-23 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(71, 103, 4, '2024-05-30 21:44:00', '2024-05-30 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(72, 103, 4, '2024-06-06 21:44:00', '2024-06-06 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(73, 103, 4, '2024-06-13 21:44:00', '2024-06-13 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(74, 103, 4, '2024-06-20 21:44:00', '2024-06-20 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(75, 103, 4, '2024-06-27 21:44:00', '2024-06-27 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(76, 103, 4, '2024-07-04 21:44:00', '2024-07-04 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(77, 103, 4, '2024-07-11 21:44:00', '2024-07-11 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(78, 103, 4, '2024-07-18 21:44:00', '2024-07-18 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(79, 103, 4, '2024-07-25 21:44:00', '2024-07-25 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(80, 103, 4, '2024-08-01 21:44:00', '2024-08-01 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(81, 103, 4, '2024-08-08 21:44:00', '2024-08-08 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(82, 103, 4, '2024-08-15 21:44:00', '2024-08-15 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(83, 103, 4, '2024-08-22 21:44:00', '2024-08-22 23:44:00', '2024-01-30 21:44:34', '2024-01-30 21:44:34'),
	(84, 103, 5, '2024-02-01 10:26:00', '2024-02-01 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(85, 103, 5, '2024-02-08 10:26:00', '2024-02-08 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(86, 103, 5, '2024-02-15 10:26:00', '2024-02-15 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(87, 103, 5, '2024-02-22 10:26:00', '2024-02-22 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(88, 103, 5, '2024-02-29 10:26:00', '2024-02-29 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(89, 103, 5, '2024-03-07 10:26:00', '2024-03-07 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(90, 103, 5, '2024-03-14 10:26:00', '2024-03-14 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(91, 103, 5, '2024-03-21 10:26:00', '2024-03-21 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(92, 103, 5, '2024-03-28 10:26:00', '2024-03-28 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(93, 103, 5, '2024-04-04 10:26:00', '2024-04-04 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(94, 103, 5, '2024-04-11 10:26:00', '2024-04-11 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(95, 103, 5, '2024-04-18 10:26:00', '2024-04-18 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(96, 103, 5, '2024-04-25 10:26:00', '2024-04-25 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(97, 103, 5, '2024-05-02 10:26:00', '2024-05-02 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(98, 103, 5, '2024-05-09 10:26:00', '2024-05-09 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(99, 103, 5, '2024-05-16 10:26:00', '2024-05-16 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(100, 103, 5, '2024-05-23 10:26:00', '2024-05-23 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(101, 103, 5, '2024-05-30 10:26:00', '2024-05-30 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(102, 103, 5, '2024-06-06 10:26:00', '2024-06-06 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(103, 103, 5, '2024-06-13 10:26:00', '2024-06-13 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(104, 103, 5, '2024-06-20 10:26:00', '2024-06-20 11:26:00', '2024-02-01 10:27:00', '2024-02-01 10:27:00'),
	(105, 103, 6, '2024-02-15 15:23:00', '2024-02-15 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(106, 103, 6, '2024-02-22 15:23:00', '2024-02-22 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(107, 103, 6, '2024-02-29 15:23:00', '2024-02-29 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(108, 103, 6, '2024-03-07 15:23:00', '2024-03-07 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(109, 103, 6, '2024-03-14 15:23:00', '2024-03-14 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(110, 103, 6, '2024-03-21 15:23:00', '2024-03-21 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(111, 103, 6, '2024-03-28 15:23:00', '2024-03-28 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(112, 103, 6, '2024-04-04 15:23:00', '2024-04-04 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(113, 103, 6, '2024-04-11 15:23:00', '2024-04-11 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(114, 103, 6, '2024-04-18 15:23:00', '2024-04-18 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(115, 103, 6, '2024-04-25 15:23:00', '2024-04-25 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(116, 103, 6, '2024-05-02 15:23:00', '2024-05-02 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(117, 103, 6, '2024-05-09 15:23:00', '2024-05-09 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(118, 103, 6, '2024-05-16 15:23:00', '2024-05-16 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(119, 103, 6, '2024-05-23 15:23:00', '2024-05-23 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(120, 103, 6, '2024-05-30 15:23:00', '2024-05-30 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(121, 103, 6, '2024-06-06 15:23:00', '2024-06-06 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(122, 103, 6, '2024-06-13 15:23:00', '2024-06-13 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(123, 103, 6, '2024-06-20 15:23:00', '2024-06-20 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(124, 103, 6, '2024-06-27 15:23:00', '2024-06-27 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(125, 103, 6, '2024-07-04 15:23:00', '2024-07-04 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(126, 103, 6, '2024-07-11 15:23:00', '2024-07-11 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(127, 103, 6, '2024-07-18 15:23:00', '2024-07-18 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(128, 103, 6, '2024-07-25 15:23:00', '2024-07-25 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(129, 103, 6, '2024-08-01 15:23:00', '2024-08-01 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(130, 103, 6, '2024-08-08 15:23:00', '2024-08-08 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(131, 103, 6, '2024-08-15 15:23:00', '2024-08-15 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(132, 103, 6, '2024-08-22 15:23:00', '2024-08-22 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(133, 103, 6, '2024-08-29 15:23:00', '2024-08-29 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(134, 103, 6, '2024-09-05 15:23:00', '2024-09-05 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(135, 103, 6, '2024-09-12 15:23:00', '2024-09-12 19:23:00', '2024-02-07 15:23:12', '2024-02-07 15:23:12'),
	(136, 103, 7, '2024-02-20 21:19:00', '2024-02-20 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(137, 103, 7, '2024-02-27 21:19:00', '2024-02-27 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(138, 103, 7, '2024-03-05 21:19:00', '2024-03-05 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(139, 103, 7, '2024-03-12 21:19:00', '2024-03-12 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(140, 103, 7, '2024-03-19 21:19:00', '2024-03-19 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(141, 103, 7, '2024-03-26 21:19:00', '2024-03-26 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(142, 103, 7, '2024-04-02 21:19:00', '2024-04-02 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(143, 103, 7, '2024-04-09 21:19:00', '2024-04-09 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(144, 103, 7, '2024-04-16 21:19:00', '2024-04-16 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(145, 103, 7, '2024-04-23 21:19:00', '2024-04-23 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(146, 103, 7, '2024-04-30 21:19:00', '2024-04-30 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(147, 103, 7, '2024-05-07 21:19:00', '2024-05-07 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(148, 103, 7, '2024-05-14 21:19:00', '2024-05-14 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(149, 103, 7, '2024-05-21 21:19:00', '2024-05-21 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(150, 103, 7, '2024-05-28 21:19:00', '2024-05-28 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(151, 103, 7, '2024-06-04 21:19:00', '2024-06-04 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(152, 103, 7, '2024-06-11 21:19:00', '2024-06-11 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(153, 103, 7, '2024-06-18 21:19:00', '2024-06-18 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(154, 103, 7, '2024-06-25 21:19:00', '2024-06-25 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(155, 103, 7, '2024-07-02 21:19:00', '2024-07-02 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(156, 103, 7, '2024-07-09 21:19:00', '2024-07-09 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(157, 103, 7, '2024-07-16 21:19:00', '2024-07-16 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(158, 103, 7, '2024-07-23 21:19:00', '2024-07-23 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(159, 103, 7, '2024-07-30 21:19:00', '2024-07-30 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(160, 103, 7, '2024-08-06 21:19:00', '2024-08-06 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(161, 103, 7, '2024-08-13 21:19:00', '2024-08-13 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(162, 103, 7, '2024-08-20 21:19:00', '2024-08-20 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(163, 103, 7, '2024-08-27 21:19:00', '2024-08-27 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(164, 103, 7, '2024-09-03 21:19:00', '2024-09-03 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(165, 103, 7, '2024-09-10 21:19:00', '2024-09-10 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(166, 103, 7, '2024-09-17 21:19:00', '2024-09-17 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(167, 103, 7, '2024-09-24 21:19:00', '2024-09-24 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(168, 103, 7, '2024-10-01 21:19:00', '2024-10-01 22:19:00', '2024-02-20 21:19:03', '2024-02-20 21:19:03'),
	(169, 103, 8, '2024-02-20 21:57:00', '2024-02-20 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(170, 103, 8, '2024-02-26 21:57:00', '2024-02-26 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(171, 103, 8, '2024-02-27 21:57:00', '2024-02-27 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(172, 103, 8, '2024-03-04 21:57:00', '2024-03-04 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(173, 103, 8, '2024-03-05 21:57:00', '2024-03-05 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(174, 103, 8, '2024-03-11 21:57:00', '2024-03-11 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(175, 103, 8, '2024-03-12 21:57:00', '2024-03-12 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(176, 103, 8, '2024-03-18 21:57:00', '2024-03-18 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(177, 103, 8, '2024-03-19 21:57:00', '2024-03-19 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(178, 103, 8, '2024-03-25 21:57:00', '2024-03-25 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(179, 103, 8, '2024-03-26 21:57:00', '2024-03-26 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(180, 103, 8, '2024-04-01 21:57:00', '2024-04-01 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(181, 103, 8, '2024-04-02 21:57:00', '2024-04-02 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(182, 103, 8, '2024-04-08 21:57:00', '2024-04-08 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(183, 103, 8, '2024-04-09 21:57:00', '2024-04-09 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(184, 103, 8, '2024-04-15 21:57:00', '2024-04-15 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(185, 103, 8, '2024-04-16 21:57:00', '2024-04-16 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(186, 103, 8, '2024-04-22 21:57:00', '2024-04-22 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(187, 103, 8, '2024-04-23 21:57:00', '2024-04-23 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(188, 103, 8, '2024-04-29 21:57:00', '2024-04-29 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35'),
	(189, 103, 8, '2024-04-30 21:57:00', '2024-04-30 22:57:00', '2024-02-20 21:57:35', '2024-02-20 21:57:35');

-- Dumping structure for table f8_project_manager_classes.types
CREATE TABLE IF NOT EXISTS `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.types: ~3 rows (approximately)
INSERT INTO `types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Học viên', '2024-01-30 21:41:25', '2024-01-30 21:41:25'),
	(2, 'Giảng viên', '2024-01-30 21:41:25', '2024-01-30 21:41:25'),
	(3, 'Admin', '2024-01-30 21:41:25', '2024-01-30 21:41:25');

-- Dumping structure for table f8_project_manager_classes.userotps
CREATE TABLE IF NOT EXISTS `userotps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otp` varchar(10) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `otp` (`otp`),
  KEY `userId` (`userId`),
  CONSTRAINT `userotps_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.userotps: ~5 rows (approximately)
INSERT INTO `userotps` (`id`, `otp`, `userId`, `expires`, `createdAt`, `updatedAt`) VALUES
	(3, '8333', 105, '2024-02-20 16:57:24', '2024-02-20 16:56:24', '2024-02-20 16:56:24'),
	(6, '1384', 2, '2024-02-24 10:19:04', '2024-02-24 10:18:04', '2024-02-24 10:18:04'),
	(12, '9939', 108, '2024-02-24 15:54:55', '2024-02-24 15:53:55', '2024-02-24 15:53:55'),
	(13, '8993', 103, '2024-02-24 16:04:41', '2024-02-24 16:03:41', '2024-02-24 16:03:41'),
	(14, '1613', 1, '2024-02-24 16:05:57', '2024-02-24 16:04:57', '2024-02-24 16:04:57');

-- Dumping structure for table f8_project_manager_classes.userpermissions
CREATE TABLE IF NOT EXISTS `userpermissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permissionId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `permissionId` (`permissionId`),
  KEY `userId` (`userId`),
  CONSTRAINT `userpermissions_ibfk_1` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userpermissions_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.userpermissions: ~0 rows (approximately)

-- Dumping structure for table f8_project_manager_classes.userroles
CREATE TABLE IF NOT EXISTS `userroles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `userroles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userroles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.userroles: ~3 rows (approximately)
INSERT INTO `userroles` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`) VALUES
	(5, 2, 6, '2024-02-24 09:51:12', '2024-02-24 09:51:12'),
	(6, 1, 5, '2024-02-24 09:52:14', '2024-02-24 09:52:14'),
	(7, 108, 5, '2024-02-24 15:53:44', '2024-02-24 15:53:44');

-- Dumping structure for table f8_project_manager_classes.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `firstLogin` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.users: ~108 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `typeId`, `firstLogin`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin', 'admin@gmail.com', '$2b$10$rmQ/CRftXSlsCsxqSvrb3OJnC5.ErdzA8pV6qhUT8VUCmm7wGC9h.', NULL, NULL, 3, 1, '2024-01-30 21:41:25', '2024-01-30 21:42:02'),
	(2, 'nguyen thanh nam', 'nam2002bv@gmail.com', '$2b$10$cHtVFfo898JZv6egHbrOgecbgOIrmeEgsPan/S2pvP8DSHHEuCzru', NULL, NULL, 3, 1, '2024-01-30 21:41:25', '2024-02-24 09:51:31'),
	(3, 'nguyen van 0', 'nguyenvan0@gmail.com', '$2b$10$5q09V4nc7gD0S640g4sGoet3KwV7OjmE/T6w63gg76vuoVqtfcYym', '0943996675', NULL, 3, 0, '2024-01-30 21:41:25', '2024-01-30 21:41:25'),
	(4, 'nguyen van 1', 'nguyenvan1@gmail.com', '$2b$10$B.a0LmwwSl8KE7R3a8kCs.iYAZLAGQfy.3Kjg9Mua.BKh/M0Gpvhi', '0927016896', NULL, 2, 0, '2024-01-30 21:41:25', '2024-01-30 21:41:25'),
	(5, 'nguyen van 2', 'nguyenvan2@gmail.com', '$2b$10$l3XjDybrh8XLGeDmvsCPt.2pLRnNPzVSWRTyZfZ4ArcPSeRnpB4qy', '0978038882', NULL, 3, 0, '2024-01-30 21:41:25', '2024-01-30 21:41:25'),
	(6, 'nguyen van 3', 'nguyenvan3@gmail.com', '$2b$10$liTbDyI.pKUtOHVS2q683O2vEqPAiDvFhOtRBlH28kuZp.dy670i.', '0970432075', NULL, 3, 0, '2024-01-30 21:41:25', '2024-01-30 21:41:25'),
	(7, 'nguyen van 4', 'nguyenvan4@gmail.com', '$2b$10$tNLOvdAIsIbTRcXsXQ51meNrjqHszz/Ovi8J0WLCcBIfxRtf.yQXy', '0962767375', NULL, 3, 0, '2024-01-30 21:41:25', '2024-01-30 21:41:25'),
	(8, 'nguyen van 5', 'nguyenvan5@gmail.com', '$2b$10$GA5AflBfmIGMTnaUvWNLS..h1u1ffj3zJAX/8w0/WmQD9T3.bFfz.', '0952000262', NULL, 1, 0, '2024-01-30 21:41:25', '2024-01-30 21:41:25'),
	(9, 'nguyen van 6', 'nguyenvan6@gmail.com', '$2b$10$.HxiNUTDzYGsVbSjvUGm9OjtR4/NBk1Ya1KGkInsqlb8T3aaIk4gS', '0951678330', NULL, 1, 0, '2024-01-30 21:41:25', '2024-01-30 21:41:25'),
	(10, 'nguyen van 7', 'nguyenvan7@gmail.com', '$2b$10$n94eGHllW8X9vCAK6Le0vOvCdakYP6rO78HeI5EkXAzw.fbKoGIQy', '0932344501', NULL, 2, 0, '2024-01-30 21:41:25', '2024-01-30 21:41:25'),
	(11, 'nguyen van 8', 'nguyenvan8@gmail.com', '$2b$10$pYd83sJtXdL50Kknnc.BA.iqTqEjisMu8Ob05CwZPloEhbdzapaHi', '0972280583', NULL, 2, 0, '2024-01-30 21:41:25', '2024-01-30 21:41:25'),
	(12, 'nguyen van 9', 'nguyenvan9@gmail.com', '$2b$10$Rg.Ga4NUU6Yxnt/72dB2jOxY4AU3yi7krQZJegCPlt3uOmyYPKUH6', '0982849224', NULL, 1, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(13, 'nguyen van 10', 'nguyenvan10@gmail.com', '$2b$10$2wCPAX3cAwP2fV/mpeVdGuf.qrI0VFmmFfuJuwddE13jM1zWvieDG', '0933964664', NULL, 2, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(14, 'nguyen van 11', 'nguyenvan11@gmail.com', '$2b$10$IpxtLhSqsNiPtBeUnu3h.e2k.tbPcsPtw7UEl5QVjhnDtXgbDy2KK', '0965984241', NULL, 1, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(15, 'nguyen van 12', 'nguyenvan12@gmail.com', '$2b$10$NeH/AK6R7jxzRX4BqLBRluqd3wM0i7n.vn.XJwxSEwZ5hT.mPibDi', '0952689616', NULL, 2, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(16, 'nguyen van 13', 'nguyenvan13@gmail.com', '$2b$10$EC1Gg5hcB3BZTN7ytp7VfeSTAM6qf46GOboY0OZ9cHGfgCFk3GxkS', '0961090700', NULL, 3, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(17, 'nguyen van 14', 'nguyenvan14@gmail.com', '$2b$10$19ah8wQKXXoBFK92yZ3/5uV2rCMXkwO6xPuxgEhAjEqVdgNH93mnC', '0953401278', NULL, 1, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(18, 'nguyen van 15', 'nguyenvan15@gmail.com', '$2b$10$77nGZ6FZrwm872ER6u7I4.b9GzDhIeqcciAoCP1HBVnrzvOuEOpRy', '0961886976', NULL, 1, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(19, 'nguyen van 16', 'nguyenvan16@gmail.com', '$2b$10$Cbn2OA40qneKWJGfVxiLBeR11.d1q9swYCen2StIwHmN6I4X2xUQm', '0945820556', NULL, 3, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(20, 'nguyen van 17', 'nguyenvan17@gmail.com', '$2b$10$k6DzEIYM3zEW61T3Cwhs9ueBhAEiMsas5.24ha3YGFZ1HO2tB/Va2', '0993184927', NULL, 2, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(21, 'nguyen van 18', 'nguyenvan18@gmail.com', '$2b$10$s.zPjc6iu2UK6peT2QX4aObVdY/9R/imxxiBMSfNDTSont1xUmDTK', '0995073401', NULL, 2, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(22, 'nguyen van 19', 'nguyenvan19@gmail.com', '$2b$10$h3MsZfUVsWcAEiMI29ftb.a/8gcUabp6SfDdFVSnZy4vIc1d/B6ea', '0918045816', NULL, 3, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(23, 'nguyen van 20', 'nguyenvan20@gmail.com', '$2b$10$RGfVctvpFz0UvDZsVJeiwOOJHa2ezf/mNWILLCfIrO9cpy5gxgAGi', '0962322369', NULL, 2, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(24, 'nguyen van 21', 'nguyenvan21@gmail.com', '$2b$10$AEauFRsSf4HYeUBNB5E2Hu9EhN.0BkcDmtQWDYa/9i12hO2EL3LNa', '0919436932', NULL, 2, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(25, 'nguyen van 22', 'nguyenvan22@gmail.com', '$2b$10$PNl6hWIaOploajYMxusD5uZLy4IbDcjgSPft.yPqaS/yG7qi8IqnS', '0961362659', NULL, 2, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(26, 'nguyen van 23', 'nguyenvan23@gmail.com', '$2b$10$ucZ2z74Z.J5O9RcfhJjo6u/WwDnrnvWNPbrrqTFLSxopZfMiKuCX6', '0919223009', NULL, 2, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(27, 'nguyen van 24', 'nguyenvan24@gmail.com', '$2b$10$yvHjWDm3D1y/zmzNy5Fun.h3kk0VwqWw5gE.gxFGHO2kTDUlYjQ8e', '0985277186', NULL, 3, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(28, 'nguyen van 25', 'nguyenvan25@gmail.com', '$2b$10$Ubc8N1PH92U9QqS8K0uiMu9d/74RU6EdNyU0C1Xzyx1muegmSunFu', '0934913778', NULL, 1, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(29, 'nguyen van 26', 'nguyenvan26@gmail.com', '$2b$10$qkbfjhI3SMqzeBqXOk3cV.sKPS4g8Kbjb4DK4l9/R2tITPQ.Ud98m', '0914254308', NULL, 3, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(30, 'nguyen van 27', 'nguyenvan27@gmail.com', '$2b$10$YGcK.oceS7yjg0D.44uWXeqdtbRo51Lk1Zpj73BWfbBjuS6csYYYy', '0957281556', NULL, 1, 0, '2024-01-30 21:41:26', '2024-01-30 21:41:26'),
	(31, 'nguyen van 28', 'nguyenvan28@gmail.com', '$2b$10$arjGJoIz1SZjQtcgRq4zouSm6icO4IcZteNIndgVVFJpSui0l8Il6', '0947600330', NULL, 3, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(32, 'nguyen van 29', 'nguyenvan29@gmail.com', '$2b$10$nW2teiE/Uk9lAtAGlbeSAesQUZQFF46h.6VeHpqTEKAq7H3Zd4I4.', '0957979916', NULL, 2, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(33, 'nguyen van 30', 'nguyenvan30@gmail.com', '$2b$10$qbNsxnvF1N6HJHrqRCbosOkrgABeypNayHqCb5U4un2pTmI33wKj6', '0943595401', NULL, 3, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(34, 'nguyen van 31', 'nguyenvan31@gmail.com', '$2b$10$HnKWEpQCQl/sNcj5VCm4aee5w5xP86.DlBgucgEqRKTA5lX23z1F.', '0916417817', NULL, 1, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(35, 'nguyen van 32', 'nguyenvan32@gmail.com', '$2b$10$JJrqnsh4/hwRUW9CjeLF1umefvmvtj.CIxBlT.wk9m7AUvGUCqWe6', '0996680091', NULL, 1, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(36, 'nguyen van 33', 'nguyenvan33@gmail.com', '$2b$10$uVr6.Wtwfvd/qnPt9Nx.he5r6Xjz8d4N2.dELmX8cbYJyeeY9u3My', '0946396627', NULL, 1, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(37, 'nguyen van 34', 'nguyenvan34@gmail.com', '$2b$10$HQJn5w6af2p525nLxgQstuPzxLrg31P4Zaa8wpSouycwOI0gvwoyS', '0964866376', NULL, 1, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(38, 'nguyen van 35', 'nguyenvan35@gmail.com', '$2b$10$gUCoQz9ud8V9Zwd5yA1jQ.cZ1YHD2MGj9RW/A75mSrDDPjRbuYW9G', '0944759623', NULL, 3, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(39, 'nguyen van 36', 'nguyenvan36@gmail.com', '$2b$10$AVK/EBi.ojOa7Wb/mm13ReHTJ89q5X.5yKFuVRckux0SROIYnxcRK', '0997873216', NULL, 1, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(40, 'nguyen van 37', 'nguyenvan37@gmail.com', '$2b$10$ghk3JlnPCQQfZ65RYhbyiOEjwAL8SykLXcbNTwcF5ELfp4UW8xMru', '0915854562', NULL, 1, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(41, 'nguyen van 38', 'nguyenvan38@gmail.com', '$2b$10$l1myPu/lDAozX198zTv2Mu8Eki1VkYBZbbX4Zyh7ap1xlwdCegqq.', '0970894443', NULL, 1, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(42, 'nguyen van 39', 'nguyenvan39@gmail.com', '$2b$10$02h3DSpULBKOAwJPOhvGZOEbgSnIrdJJyY92UXlAUlLL.vC4ZMUyS', '0910646096', NULL, 2, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(43, 'nguyen van 40', 'nguyenvan40@gmail.com', '$2b$10$ivXAf6ykGWuYnE.1zhDKVuaM.I9RC6dfrXmJEBqIqx8BwYCJEozjS', '0967567713', NULL, 2, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(44, 'nguyen van 41', 'nguyenvan41@gmail.com', '$2b$10$Xdex4DXvhZgYI3t1gY4cq.eNwb9nnqsNXSooiCkI9tEaqF84qjN5W', '0960373734', NULL, 3, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(45, 'nguyen van 42', 'nguyenvan42@gmail.com', '$2b$10$fOl/XvTmAE72sjunGTmm3utL2l7KOrwBaUx9.du.ODwU2bKLhiYwa', '0954699742', NULL, 1, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(46, 'nguyen van 43', 'nguyenvan43@gmail.com', '$2b$10$.kbEgRrZ7YzZwYZboUXeHep6njMSEfoc5aWDhO4p2A5pxKF04lIv2', '0918433383', NULL, 2, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(47, 'nguyen van 44', 'nguyenvan44@gmail.com', '$2b$10$/YraDZZ5Hj7Wt4iApz5G4eaQsfbzAt1DspqjBdMDQbmChX6YONLZq', '0970303688', NULL, 2, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(48, 'nguyen van 45', 'nguyenvan45@gmail.com', '$2b$10$pfoQNGY5LAJ5eGY6Z9SIqeRPFMPPZHGkXzCIZOuej5mLI4HnGZbWe', '0913431663', NULL, 2, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(49, 'nguyen van 46', 'nguyenvan46@gmail.com', '$2b$10$l134102y.yTWuLFGg1WKGOathJG9bg0mXv4zCxNyI4k9KBT9pHVoW', '0968717415', NULL, 3, 0, '2024-01-30 21:41:27', '2024-01-30 21:41:27'),
	(50, 'nguyen van 47', 'nguyenvan47@gmail.com', '$2b$10$9R1k2pEPKvcSMY9QhxH2LODvgpHylNF2SPjR5th7g/HzS0E7d5teC', '0974312129', NULL, 3, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(51, 'nguyen van 48', 'nguyenvan48@gmail.com', '$2b$10$pOLMkUFH5sXiZETvyvl52.kp.8EslhH06kRUKXuIN0q3i8BWEqFdK', '0924321774', NULL, 1, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(52, 'nguyen van 49', 'nguyenvan49@gmail.com', '$2b$10$6km6FZsjqWx3BsjtIcbcqeOqHH64TBDjF.bskZc0pLX8a1EO.l5o.', '0912191055', NULL, 1, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(53, 'nguyen van 50', 'nguyenvan50@gmail.com', '$2b$10$MHB4PEqPC0qfy8rBRB1FlOQ3OjOHGSps5Si1ykWvI5nnPF8EiXRL6', '0979284536', NULL, 3, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(54, 'nguyen van 51', 'nguyenvan51@gmail.com', '$2b$10$hNm/Jiy3CV.JHHasIdqbeehTeuM.49oc8l9mHmMmjlvP9rD9X/Yf6', '0940191966', NULL, 1, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(55, 'nguyen van 52', 'nguyenvan52@gmail.com', '$2b$10$mCv7BZUTfnJ4m6O.mMc6.uf.7IO0LygO7QLr/yVbU3ReKAjugwnBa', '0966558612', NULL, 1, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(56, 'nguyen van 53', 'nguyenvan53@gmail.com', '$2b$10$HLvOFRET4de7RBjSgrSn6u58HK.Zxa1wLF1ZevJ4WCSYUelTj/ARW', '0972004692', NULL, 2, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(57, 'nguyen van 54', 'nguyenvan54@gmail.com', '$2b$10$g3IiT/HuJRap26376aBDjefzdFfvCtfMRTJKudhCMqEdAK0r6ho5W', '0947812852', NULL, 3, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(58, 'nguyen van 55', 'nguyenvan55@gmail.com', '$2b$10$E7sXiUFWJPxZJ64ql0Qg2.BnSz7XZ4681BBy0vQlz7yDyafuZsXei', '0925623401', NULL, 1, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(59, 'nguyen van 56', 'nguyenvan56@gmail.com', '$2b$10$sBEdy6r97mL1PlSG.iSXceaSk8KI2JNrkD5M.GzZQuvj7Mhpb2.D6', '0940010576', NULL, 3, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(60, 'nguyen van 57', 'nguyenvan57@gmail.com', '$2b$10$DdL63VP7UlVMf//jRDu1b.cSf/XVa5wm63WBvuvS0cBkNR2nNj8Mq', '0963823032', NULL, 2, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(61, 'nguyen van 58', 'nguyenvan58@gmail.com', '$2b$10$E/SZGqbPWvx318L5z5au6OOBUoCYcf29P562QwPSHA0WBHUn8XPU2', '0916239762', NULL, 2, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(62, 'nguyen van 59', 'nguyenvan59@gmail.com', '$2b$10$GOsIQRPBmyuxLDekrpvaDO.YEK.s4BP3iLT9nb4pjNsk4GonJyCL.', '0964613779', NULL, 3, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(63, 'nguyen van 60', 'nguyenvan60@gmail.com', '$2b$10$SUu8aELiXKwLpcKXrX5xkOiK4rqBrt3QfdsiWJdrK6KEIfcyPmaN.', '0916196420', NULL, 2, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(64, 'nguyen van 61', 'nguyenvan61@gmail.com', '$2b$10$kbICeNxwDcWNPqv7tUmn3eW37y3mFggBPfpMDW4c94LBfffcXQlCu', '0967483374', NULL, 2, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(65, 'nguyen van 62', 'nguyenvan62@gmail.com', '$2b$10$tfJMAbYYSDssp64WyIoKxOxg9HPPSy90Lrwxew7r1tJkwXbjQcU3K', '0939691574', NULL, 1, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(66, 'nguyen van 63', 'nguyenvan63@gmail.com', '$2b$10$1iqggC20285F/929hlprv.vpV7JKVUmltoxhPZ/XhakJMHrjUkjaq', '0941283883', NULL, 3, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(67, 'nguyen van 64', 'nguyenvan64@gmail.com', '$2b$10$G1ec0fDOFizYuV9aYg9ufuReIbW/2OUs5poLzb6ivuFYcfwlbeWNC', '0993963475', NULL, 3, 0, '2024-01-30 21:41:28', '2024-01-30 21:41:28'),
	(68, 'nguyen van 65', 'nguyenvan65@gmail.com', '$2b$10$G3xiwb4f2nLSONajhzi/ie3lOuVPwB4cmIwFuRLoXVoLG6s0JG.EW', '0976257622', NULL, 1, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(69, 'nguyen van 66', 'nguyenvan66@gmail.com', '$2b$10$gKh8nCLmzn9K67xIedrYzeRFjZ5hd/YBv7ft0bEtKojQYD7.MQpTy', '0915304946', NULL, 3, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(70, 'nguyen van 67', 'nguyenvan67@gmail.com', '$2b$10$7K/FEa010vvn.e/E/DLBkeeBHnj/uLkYuW8Riv0DJI.IH5/fZAqdu', '0913487343', NULL, 3, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(71, 'nguyen van 68', 'nguyenvan68@gmail.com', '$2b$10$kZnn6D0iQXLGLBFpYS6oj.BW/3K0wfNnA/09wg4.ykkolLLL5lECm', '0911541912', NULL, 3, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(72, 'nguyen van 69', 'nguyenvan69@gmail.com', '$2b$10$3SXPwjOYcp9AqDZqd0OO9OIa6CFClsIo25nLar.PSZ30sEy6JL2tO', '0935945851', NULL, 3, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(73, 'nguyen van 70', 'nguyenvan70@gmail.com', '$2b$10$cdWwiZWnPSQt728MGQIoB./nhUdXvuvC9.xNV7tmPH2DAbo2jZ0rK', '0953258366', NULL, 1, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(74, 'nguyen van 71', 'nguyenvan71@gmail.com', '$2b$10$r1bCMr.IGWVo9/mTVcWMLeqM9dXuqf1pTrdkVIDoriJdOYnOtMj8G', '0966726690', NULL, 1, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(75, 'nguyen van 72', 'nguyenvan72@gmail.com', '$2b$10$vmMiDd4A0Xk.g4Ztr3nZkuxXFBVI7yqgTUsG0fvz6aSfvh/ARGrvO', '0941436036', NULL, 2, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(76, 'nguyen van 73', 'nguyenvan73@gmail.com', '$2b$10$nhwGPgx8gsottwNlNU5u7uMu.7PRtIizDYtHE9r42NONXHruUPMpW', '0943570736', NULL, 3, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(77, 'nguyen van 74', 'nguyenvan74@gmail.com', '$2b$10$XSGy0x6nZJlMum0Yd3l/ieJbqH5JjbkY2VJuC4CuM/eT6rbPwwaz.', '0988687873', NULL, 2, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(78, 'nguyen van 75', 'nguyenvan75@gmail.com', '$2b$10$oB7Ij/E0KXlY0Pm0wm75QeE3ncx4M9ViD5isbFctrRGaFloc4RkEG', '0943301662', NULL, 1, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(79, 'nguyen van 76', 'nguyenvan76@gmail.com', '$2b$10$msSJkrqBbsXhJu3yTcnoI.CsOI5cY4LSm0AU0DGHXIgGB6.YfPpTm', '0963593935', NULL, 1, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(80, 'nguyen van 77', 'nguyenvan77@gmail.com', '$2b$10$kiq2ZixGFXb09npb/zFC7.S299eQ/mHDP9zQxLacJlpadgsLNRdge', '0936230683', NULL, 2, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(81, 'nguyen van 78', 'nguyenvan78@gmail.com', '$2b$10$HVg3Kp025Gt4oAiOIPXkKuNUnbzidYEKymVaq8l3yWGKPn2/2ONSa', '0920958681', NULL, 2, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(82, 'nguyen van 79', 'nguyenvan79@gmail.com', '$2b$10$ssSoUEUDDz/qlOcKA/N5S.hJXgUw5av03xgik9QRLQ9h5iQUrdB02', '0961873383', NULL, 3, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(83, 'nguyen van 80', 'nguyenvan80@gmail.com', '$2b$10$R0t7fBYlP4MRWUhAuovE2.n2VL/IzpM965C8tXNqLNKBhfoqAZFha', '0922041373', NULL, 3, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(84, 'nguyen van 81', 'nguyenvan81@gmail.com', '$2b$10$ascwxQ2I9nUVIqQma./nTuyzn.Je0NQOY3vaGp0tUlKUIQU5OMDQO', '0928671207', NULL, 3, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(85, 'nguyen van 82', 'nguyenvan82@gmail.com', '$2b$10$5UOAcKZx3A3XBhpYJZuBGunSWXI.6Kk3qBkZjtgVIoBOCSwOpGEWa', '0914117293', NULL, 2, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(86, 'nguyen van 83', 'nguyenvan83@gmail.com', '$2b$10$mEEsz9kVGoZc.HODFM12.OVTrpeX/cW3xJ9EW0kOk8RIm5XK.b48q', '0946990002', NULL, 3, 0, '2024-01-30 21:41:29', '2024-01-30 21:41:29'),
	(87, 'nguyen van 84', 'nguyenvan84@gmail.com', '$2b$10$KjF.eFEdTJ3ojrRi44NS1uzmSVRufkGwLeHB3/H/WK6DBvxVUeUh.', '0962613312', NULL, 2, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(88, 'nguyen van 85', 'nguyenvan85@gmail.com', '$2b$10$cCCP5b5y4qYRLVMM3GiWQOM.4lwZflq1WkgCli9gqD3K4.5F11kCe', '0927847431', NULL, 2, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(89, 'nguyen van 86', 'nguyenvan86@gmail.com', '$2b$10$U/qpisDopRssI9kYizny8ue9NvRVQIGVtvZwoESD.5FhvctfyFV2a', '0949734953', NULL, 1, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(90, 'nguyen van 87', 'nguyenvan87@gmail.com', '$2b$10$2cShAKZU4v/lY9XKjLYPoO4Wk0aXyZPZeGKELKLHd.UDajv4qwl6i', '0911184670', NULL, 2, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(91, 'nguyen van 88', 'nguyenvan88@gmail.com', '$2b$10$uDAWZImWjR0plgMRua85C.T8PPUE4MbfmSusiKFsxPqCjF7VNYGtO', '0942348397', NULL, 2, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(92, 'nguyen van 89', 'nguyenvan89@gmail.com', '$2b$10$ZT/V.zX.hvcRDanlJ4m6I.Jn5lJe130gg1vKtS.z4oiF/8xHDjQ0C', '0918140828', NULL, 3, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(93, 'nguyen van 90', 'nguyenvan90@gmail.com', '$2b$10$TUKYI4HtCvqTBdjFsAqel.H14Qov/EGCewnXX6RnDIN4oV.C55zB6', '0970755263', NULL, 1, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(94, 'nguyen van 91', 'nguyenvan91@gmail.com', '$2b$10$LOYFUzEOAOCQaDZgNWLsgOkYWsdsii3XSQ/SyDsWBM6yLMfOF6mZy', '0998698232', NULL, 2, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(95, 'nguyen van 92', 'nguyenvan92@gmail.com', '$2b$10$dvWQMmDyqcn7LSQufaphUOW/4gWOWNpOPXPg2wFW/dmLwsBIfUIiK', '0988778727', NULL, 1, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(96, 'nguyen van 93', 'nguyenvan93@gmail.com', '$2b$10$FQvhvx1fPHM5cUJgU1g8aejymw/qaZRHV1wgyvY.8NN8aZ0/ajrS2', '0988116184', NULL, 2, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(97, 'nguyen van 94', 'nguyenvan94@gmail.com', '$2b$10$j1Eq./YsbDIE7JqSa4/WuuQ8FYjjiJ34SBC1aUF83bFZjHF678tpu', '0932851264', NULL, 2, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(98, 'nguyen van 95', 'nguyenvan95@gmail.com', '$2b$10$qrww6sCNhS1hm434XqoNEegVbzKcBrkSiZM5jFpExYvG57obuQCty', '0990021901', NULL, 1, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(99, 'nguyen van 96', 'nguyenvan96@gmail.com', '$2b$10$TtdS5CzZfUqyuX73dgNumOaXh.kCz4x0X5teBAcsuJjwynhlkNely', '0917892655', NULL, 1, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(100, 'nguyen van 97', 'nguyenvan97@gmail.com', '$2b$10$BSxfEYzGgMRuVazNfZT1Vui.HhxxYKCeTfd1LkXuYvXtGvIt/9vWS', '0952214067', NULL, 1, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(101, 'nguyen van 98', 'nguyenvan98@gmail.com', '$2b$10$S.esjLOFO2NN4J6CYDUknOfhGIqtGE.LHThyH0jHHf2JIL3PrUrBq', '0966774893', NULL, 3, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(102, 'nguyen van 99', 'nguyenvan99@gmail.com', '$2b$10$jDIFoiDR.MGHdBkK00EQueB0OHhC0TGBn/fT2YjKK/0/tUyeE4hHW', '0976558026', NULL, 2, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(103, 'giang vien test', 'giangvien@gmail.com', '$2b$10$QfaKWuokVwzAI3zzVgVp2OQevDp97ulWuY3tu6Zi.aefxSPcsGrdq', '06498445432', 'Hai Phong', 2, 1, '2024-01-30 21:41:30', '2024-01-30 21:45:46'),
	(104, 'tran lan', 'lanst2333@gmail.com', '$2b$10$zNbEuXZwDgQN7m5srhfNuemFo3fn5XjPITjKRGOJFSWGNLYvHfhCC', '091545432', 'Hai Phong', 2, 0, '2024-01-30 21:41:30', '2024-01-30 21:41:30'),
	(105, 'test hoc vien', 'hocvien@gmail.com', '$2b$10$TRZncmhm51D5lGTfctPvZOlv6oCkD1ohzFzvWRL2SH8Eot/wBD7La', '09848445432', 'Quang Ninh', 1, 1, '2024-01-30 21:41:30', '2024-02-20 16:49:11'),
	(106, 'tran long', 'tranlong8448@gmail.com', '$2b$10$Eb4eB9gll3lKgzW7/fn6Ce1RkxtgZqQC3hQOEiQOkzPHpwBzKDSbO', NULL, NULL, 1, 0, '2024-01-30 21:41:31', '2024-01-30 21:41:31'),
	(107, 'hoang an', 'an2000@gmail.com', '$2b$10$2HGswSlsDV5gP2UKUE8qhugrbkpao5cFEnUSNasBQSM2X/kasx1Oe', '0844543002', 'Hai Duong', 2, 0, '2024-01-30 21:41:31', '2024-01-30 21:41:31'),
	(108, 'test admin', 'admin1@gmail.com', '$2b$10$ZyrOVzN1/0.QgAUSrHDfHuGTlpVzLwh4XV03Oa50th6laQLEc1hMi', '0630146514', 'Hai phong', 3, 1, '2024-02-24 15:48:57', '2024-02-24 15:52:08');

-- Dumping structure for table f8_project_manager_classes.userscolumns
CREATE TABLE IF NOT EXISTS `userscolumns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `featureName` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `userscolumns_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.userscolumns: ~0 rows (approximately)

-- Dumping structure for table f8_project_manager_classes.usersocials
CREATE TABLE IF NOT EXISTS `usersocials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `provider` varchar(100) DEFAULT NULL,
  `providerId` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `usersocials_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_manager_classes.usersocials: ~4 rows (approximately)
INSERT INTO `usersocials` (`id`, `userId`, `provider`, `providerId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'google', '106813759271647600540', '2024-01-30 21:42:11', '2024-01-30 21:42:11'),
	(2, 103, 'github', '78036237', '2024-01-30 21:46:37', '2024-01-30 21:46:37'),
	(3, 105, 'google', '116387464926304599050', '2024-02-20 16:56:35', '2024-02-20 16:56:35'),
	(4, 2, 'google', '107058906095727553246', '2024-02-24 10:18:42', '2024-02-24 10:18:42');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
