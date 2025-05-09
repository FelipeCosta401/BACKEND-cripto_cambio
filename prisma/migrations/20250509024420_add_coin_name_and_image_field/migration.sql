/*
  Warnings:

  - Added the required column `coin_name` to the `favorites_coins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `favorites_coins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `favorites_coins` ADD COLUMN `coin_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `image` TEXT NOT NULL;
