-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2025 at 09:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `events_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendees`
--

CREATE TABLE `attendees` (
  `id` int(10) UNSIGNED NOT NULL,
  `registration_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `registration_number` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendees`
--

INSERT INTO `attendees` (`id`, `registration_id`, `name`, `contact`, `registration_number`, `created_at`) VALUES
(1, 1, 'Noor Fatima', '+923001234567', 'REG-1745748927-1', '2025-04-27 10:15:27'),
(2, 1, 'Charlie Friend', '+923009876543', 'REG-1745748927-2', '2025-04-27 10:15:27');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Art'),
(6, 'Comedy'),
(4, 'Concert'),
(5, 'Education'),
(3, 'Food'),
(2, 'Music'),
(7, 'Tech');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT 0.00,
  `total_seats` int(10) UNSIGNED DEFAULT 0,
  `available_seats` int(10) UNSIGNED DEFAULT 0,
  `category_id` int(10) UNSIGNED NOT NULL,
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `date`, `city`, `location`, `image_url`, `price`, `total_seats`, `available_seats`, `category_id`, `created_by`, `created_at`) VALUES
(1, 'Future Fest 2025', 'Future Fest 2025 is the largest tech and innovation event in Pakistan, bringing together visionaries from over 50 countries.  \r\n\r\nLocation: Expo Center, Lahore  \r\nDates: January 24 – 26, 2025  \r\n\r\nWhy Attend?  \r\n- Experience cutting-edge technology and revolutionary ideas.  \r\n- Connect with global tech leaders, investors, and entrepreneurs.  \r\n- Explore the latest innovations in AI, startups, and digital transformation.  \r\n\r\nSupported by industry giants such as Hashoo Group, Graana, EasyPaisa, and Google Cloud, Future Fest has generated over $200M in investments and created 30,000+ jobs.  \r\n\r\nMark your calendars and be part of the movement!', '2025-01-24', 'Lahore', 'Expo Center, Lahore', '/images/event1.png', 0.00, 200, 150, 7, 1, '2025-04-27 10:15:27'),
(2, 'Ramazaar - Chaand Raat', 'Ramazaar returns this Chaand Raat for a night filled with shopping, food, and entertainment!  \r\n\r\nLocation: Model Town Community Center, Lahore  \r\nDates: April 30 – 31, 2025  \r\nTimings: 6:00 PM – Sehri  \r\n\r\nEvent Highlights:  \r\n- Food stalls featuring a variety of cuisines.  \r\n- Shopping booths with Eid essentials and trendy fashion.  \r\n- Gaming zone with fun activities for all ages.  \r\n- Art workshop by Mashghalay.  \r\n- Mehndi stalls for the perfect Eid look.  \r\n\r\nJoin us for a festive celebration like never before!', '2025-05-30', 'Lahore', 'Model Town Community Center, Lahore', '/images/event2.jpg', 0.00, 300, 280, 3, 1, '2025-04-27 10:15:27'),
(3, 'Mashion Bazaar: Chaand Raat', 'Mashion Bazaar returns with a grand Chaand Raat celebration, blending fashion, food, and entertainment in a vibrant atmosphere.  \r\n\r\nLocation: Lahore Polo Club  \r\nDates: April 18 – 29, 2025  \r\nTimings: 5:00 PM – 12:00 AM  \r\n\r\nWhat’s in Store?  \r\n- 150+ vendors featuring fashion, beauty, and home décor brands.  \r\n- Beauty activations for makeup and skincare enthusiasts.  \r\n- Interactive workshops, including bouquet making and creative activities.  \r\n- Kids and adult zones with games and entertainment.  \r\n- Photo booths to capture your festival moments.  \r\n- Food stalls offering delicious festival treats.  \r\n\r\nTicket Details:  \r\n- Both Days (28th & 29th): Rs. 1,400  \r\n- Single Day (28th or 29th): Rs. 750  \r\n- Student Discount: Rs. 650 per day  \r\n\r\nNote: Families only – No stags allowed.  \r\n\r\nShop, eat, and celebrate at Mashion Bazaar! Mark your calendars for an unforgettable experience.', '2025-04-18', 'Lahore', 'Lahore Polo Club', '/images/event3.webp', 0.00, 250, 240, 1, 1, '2025-04-27 10:15:27');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`user_id`, `event_id`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `user_id`, `event_id`, `quantity`, `created_at`) VALUES
(1, 2, 1, 2, '2025-04-27 10:15:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','organizer') NOT NULL DEFAULT 'user',
  `bio` text DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `bio`, `profile_image`, `created_at`) VALUES
(1, 'Maryam Shahid', 'bsce21040@itu.edu.pk', 'noornoor', 'organizer', 'I create awesome events.', NULL, '2025-04-27 10:15:27'),
(2, 'Noor Fatima', 'bsce21038@itu.edu.pk', 'noornoor', 'user', 'Music lover and foodie.', NULL, '2025-04-27 10:15:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendees`
--
ALTER TABLE `attendees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `registration_number` (`registration_number`),
  ADD KEY `registration_id` (`registration_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`user_id`,`event_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_user_event` (`user_id`,`event_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendees`
--
ALTER TABLE `attendees`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendees`
--
ALTER TABLE `attendees`
  ADD CONSTRAINT `attendees_ibfk_1` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `registrations_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
