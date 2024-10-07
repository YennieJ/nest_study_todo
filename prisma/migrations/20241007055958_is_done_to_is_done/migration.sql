/*
  Warnings:

  - You are about to drop the column `is_done` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `todo` DROP COLUMN `is_done`,
    ADD COLUMN `isDone` BOOLEAN NOT NULL DEFAULT false;
