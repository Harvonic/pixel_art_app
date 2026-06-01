/*
  Warnings:

  - You are about to drop the column `cols` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `createrId` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `rows` on the `Artwork` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Artwork" DROP CONSTRAINT "Artwork_createrId_fkey";

-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "cols",
DROP COLUMN "createrId",
DROP COLUMN "rows",
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
