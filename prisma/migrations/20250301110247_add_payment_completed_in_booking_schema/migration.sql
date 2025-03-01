/*
  Warnings:

  - You are about to drop the column `payment_id` on the `bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `payment_id`,
    ADD COLUMN `payment_completed` BOOLEAN NOT NULL DEFAULT false;
