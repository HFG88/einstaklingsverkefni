/*
  Warnings:

  - You are about to drop the column `longDescription` on the `CharacterDetails` table. All the data in the column will be lost.
  - You are about to drop the column `longDescription` on the `EventDetails` table. All the data in the column will be lost.
  - You are about to drop the column `longDescription` on the `FactionDetails` table. All the data in the column will be lost.
  - You are about to drop the column `longDescription` on the `LocationDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CharacterDetails" DROP COLUMN "longDescription";

-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "longDescription" TEXT;

-- AlterTable
ALTER TABLE "EventDetails" DROP COLUMN "longDescription";

-- AlterTable
ALTER TABLE "FactionDetails" DROP COLUMN "longDescription";

-- AlterTable
ALTER TABLE "LocationDetails" DROP COLUMN "longDescription";
