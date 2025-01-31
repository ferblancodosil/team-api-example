/*
  Warnings:

  - Added the required column `budget` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Coach` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "budget" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Coach" ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL;
