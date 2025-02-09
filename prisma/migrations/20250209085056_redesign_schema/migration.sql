/*
  Warnings:

  - You are about to drop the column `booking_expire` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `court_id` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `bookings` table. All the data in the column will be lost.
  - The values [CANCELED] on the enum `bookings_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `down_payment` on the `courts` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `courts` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `courts` table. All the data in the column will be lost.
  - You are about to drop the column `time_expire_booking` on the `courts` table. All the data in the column will be lost.
  - You are about to drop the column `time_expire_canceled` on the `courts` table. All the data in the column will be lost.
  - You are about to drop the column `booking_end` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `booking_start` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `down_payment` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `global_price` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `global_time_canceled` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `global_time_expire` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `is_global_price` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `is_global_time_expire` on the `settings` table. All the data in the column will be lost.
  - You are about to alter the column `phone` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(15)`.
  - Added the required column `court_session_id` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_id` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_court_id_fkey`;

-- DropIndex
DROP INDEX `bookings_court_id_fkey` ON `bookings`;

-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `booking_expire`,
    DROP COLUMN `court_id`,
    DROP COLUMN `duration`,
    ADD COLUMN `court_session_id` INTEGER NOT NULL,
    ADD COLUMN `payment_id` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    MODIFY `down_payment` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    MODIFY `total_price` DECIMAL(65, 30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `courts` DROP COLUMN `down_payment`,
    DROP COLUMN `price`,
    DROP COLUMN `status`,
    DROP COLUMN `time_expire_booking`,
    DROP COLUMN `time_expire_canceled`;

-- AlterTable
ALTER TABLE `settings` DROP COLUMN `booking_end`,
    DROP COLUMN `booking_start`,
    DROP COLUMN `down_payment`,
    DROP COLUMN `global_price`,
    DROP COLUMN `global_time_canceled`,
    DROP COLUMN `global_time_expire`,
    DROP COLUMN `is_global_price`,
    DROP COLUMN `is_global_time_expire`;

-- AlterTable
ALTER TABLE `users` MODIFY `phone` VARCHAR(15) NOT NULL;

-- CreateTable
CREATE TABLE `court_sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `court_id` INTEGER NOT NULL,
    `start_hour` INTEGER NOT NULL,
    `end_hour` INTEGER NOT NULL,
    `status` ENUM('AVAILABLE', 'UNAVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `court_sessions_unavailable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `court_session_id` INTEGER NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `court_prices_day` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `court_id` INTEGER NOT NULL,
    `day_code` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `down_payment` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `court_sessions` ADD CONSTRAINT `court_sessions_court_id_fkey` FOREIGN KEY (`court_id`) REFERENCES `courts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `court_sessions_unavailable` ADD CONSTRAINT `court_sessions_unavailable_court_session_id_fkey` FOREIGN KEY (`court_session_id`) REFERENCES `court_sessions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `court_prices_day` ADD CONSTRAINT `court_prices_day_court_id_fkey` FOREIGN KEY (`court_id`) REFERENCES `courts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_court_session_id_fkey` FOREIGN KEY (`court_session_id`) REFERENCES `court_sessions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
