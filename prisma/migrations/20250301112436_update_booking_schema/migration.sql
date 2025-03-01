-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_admin_id_fkey`;

-- DropIndex
DROP INDEX `bookings_admin_id_fkey` ON `bookings`;

-- AlterTable
ALTER TABLE `bookings` MODIFY `admin_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
