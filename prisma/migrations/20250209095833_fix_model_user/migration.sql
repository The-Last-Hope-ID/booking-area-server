-- AlterTable
ALTER TABLE `users` ADD COLUMN `access_token` VARCHAR(191) NULL,
    ADD COLUMN `email_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `refresh_token` VARCHAR(191) NULL;
