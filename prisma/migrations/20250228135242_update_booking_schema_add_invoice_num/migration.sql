/*
  Warnings:

  - A unique constraint covering the columns `[invoice_number]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoice_number` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `invoice_number` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `bookings_invoice_number_key` ON `bookings`(`invoice_number`);
