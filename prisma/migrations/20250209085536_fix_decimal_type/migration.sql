/*
  Warnings:

  - You are about to alter the column `down_payment` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,0)`.
  - You are about to alter the column `total_price` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,0)`.
  - You are about to alter the column `price` on the `court_prices_day` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,0)`.
  - You are about to alter the column `down_payment` on the `court_prices_day` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,0)`.

*/
-- AlterTable
ALTER TABLE `bookings` MODIFY `down_payment` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    MODIFY `total_price` DECIMAL(10, 0) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `court_prices_day` MODIFY `price` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    MODIFY `down_payment` DECIMAL(10, 0) NOT NULL DEFAULT 0;
