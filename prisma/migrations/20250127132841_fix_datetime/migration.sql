/*
  Warnings:

  - You are about to alter the column `created_at` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updated_at` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `created_at` on the `courts` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updated_at` on the `courts` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `created_at` on the `permissions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updated_at` on the `permissions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `created_at` on the `role_permissions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updated_at` on the `role_permissions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `created_at` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updated_at` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `created_at` on the `settings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updated_at` on the `settings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `bookings` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `courts` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `permissions` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `role_permissions` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `roles` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `settings` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` DATETIME(0) NOT NULL;
