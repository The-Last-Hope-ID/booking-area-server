/*
  Warnings:

  - You are about to drop the `court_sessions_unavailable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `court_sessions_unavailable` DROP FOREIGN KEY `court_sessions_unavailable_court_session_id_fkey`;

-- DropTable
DROP TABLE `court_sessions_unavailable`;

-- CreateTable
CREATE TABLE `court_unavailables` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `court_id` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `court_unavailables` ADD CONSTRAINT `court_unavailables_court_id_fkey` FOREIGN KEY (`court_id`) REFERENCES `courts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
