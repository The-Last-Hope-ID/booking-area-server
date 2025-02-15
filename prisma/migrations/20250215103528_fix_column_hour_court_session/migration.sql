/*
  Warnings:

  - Changed the type of `start_hour` on the `court_sessions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_hour` on the `court_sessions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `court_sessions` DROP COLUMN `start_hour`,
    ADD COLUMN `start_hour` TIME NOT NULL,
    DROP COLUMN `end_hour`,
    ADD COLUMN `end_hour` TIME NOT NULL;
