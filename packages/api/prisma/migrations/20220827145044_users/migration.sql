/*
  Warnings:

  - You are about to drop the column `ageRangeMax` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `ageRangeMin` on the `users` table. All the data in the column will be lost.
  - Changed the type of `birthday` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "ageRangeMax",
DROP COLUMN "ageRangeMin",
DROP COLUMN "birthday",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;
