-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conversions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coin_name` VARCHAR(255) NOT NULL,
    `coin_amount` DECIMAL(18, 8) NOT NULL,
    `converted_value_brl` DECIMAL(10, 2) NOT NULL,
    `converted_value_usd` DECIMAL(10, 2) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_conversion_fk`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorites_coins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coin_symbol` VARCHAR(15) NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `user_favorites_coins_fk`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `conversions` ADD CONSTRAINT `user_conversion_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favorites_coins` ADD CONSTRAINT `user_favorites_coins_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
