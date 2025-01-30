/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `duration` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_end` to the `settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_start` to the `settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_password_key` ON `users`;

-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `duration` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `settings` ADD COLUMN `booking_end` DATETIME(0) NOT NULL,
    ADD COLUMN `booking_start` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_phone_key` ON `users`(`phone`);
