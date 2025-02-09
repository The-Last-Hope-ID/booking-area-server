/*
  Warnings:

  - You are about to alter the column `day_code` on the `court_prices_day` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(7)`.

*/
-- AlterTable
ALTER TABLE `court_prices_day` MODIFY `day_code` VARCHAR(7) NOT NULL;
