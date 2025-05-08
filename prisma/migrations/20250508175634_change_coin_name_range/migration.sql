/*
  Warnings:

  - Made the column `createdAt` on table `conversions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `conversions` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `favorites_coins` MODIFY `coin_symbol` VARCHAR(255) NOT NULL;
