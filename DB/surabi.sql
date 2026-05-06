-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 06, 2026 at 03:24 AM
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
-- Database: `surabi`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(2, 'Clothing'),
(1, 'Electronics'),
(4, 'Furniture'),
(3, 'Groceries'),
(5, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `sku`, `price`, `stock`, `category`) VALUES
(1, 'MacBook Pro M2', 'LAP-001', 1999.99, 15, 'Electronics'),
(2, 'iPhone 15 Pro', 'PHN-001', 999.00, 25, 'Electronics'),
(3, 'Sony WH-1000XM5', 'AUD-001', 349.99, 40, 'Electronics'),
(4, 'Cotton Crew Neck T-Shirt', 'TSH-001', 24.50, 100, 'Clothing'),
(5, 'Slim Fit Denim Jeans', 'JNS-001', 59.99, 60, 'Clothing'),
(6, 'Whole Grain Bread', 'GRO-001', 3.49, 50, 'Groceries'),
(7, 'Organic Grade A Eggs (12pk)', 'GRO-002', 5.99, 30, 'Groceries'),
(9, 'Minimalist Coffee Table', 'FUR-002', 149.50, 10, 'Furniture'),
(16, 'Gaming Mouse', 'GAM-001', 1500.00, 20, 'Electronics'),
(18, 'Wireless Keyboard', 'KYB-001', 2500.00, 13, 'Electronics');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `invoice_no` varchar(50) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `invoice_no`, `total`, `created_at`) VALUES
(1, 'INV-3QBN0BL4Z', 5000.00, '2026-05-05 23:39:09');

-- --------------------------------------------------------

--
-- Table structure for table `sales_return`
--

CREATE TABLE `sales_return` (
  `id` int(11) NOT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sales_return_items`
--

CREATE TABLE `sales_return_items` (
  `id` int(11) NOT NULL,
  `return_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sale_items`
--

CREATE TABLE `sale_items` (
  `id` int(11) NOT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sale_items`
--

INSERT INTO `sale_items` (`id`, `sale_id`, `product_id`, `qty`, `price`) VALUES
(1, 1, 18, 2, 2500.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','staff') DEFAULT 'staff',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Admin User', 'admin@example.com', '$2b$10$/gzOHySLck1qIwl.JkguSOpGthTHU0d7y3/H4Ovbh7uZHG96cA3o2', 'admin', '2026-05-05 04:48:24'),
(2, 'Staff User', 'staff@example.com', '$2b$10$q25U9.AfD8gggmSrRe9/U.fBSOy5arRFV.U.gtrBPpXeALGUwtU3y', 'staff', '2026-05-05 23:50:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_return`
--
ALTER TABLE `sales_return`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_return_items`
--
ALTER TABLE `sales_return_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `return_id` (`return_id`);

--
-- Indexes for table `sale_items`
--
ALTER TABLE `sale_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sale_id` (`sale_id`);

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
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sales_return`
--
ALTER TABLE `sales_return`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales_return_items`
--
ALTER TABLE `sales_return_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sale_items`
--
ALTER TABLE `sale_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sales_return_items`
--
ALTER TABLE `sales_return_items`
  ADD CONSTRAINT `sales_return_items_ibfk_1` FOREIGN KEY (`return_id`) REFERENCES `sales_return` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sale_items`
--
ALTER TABLE `sale_items`
  ADD CONSTRAINT `sale_items_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
