/*
  Warnings:

  - The primary key for the `MstThisWeekQuest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MstThisWeekQuest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `MstTodaysQuest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MstTodaysQuest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."MstThisWeekQuest" DROP CONSTRAINT "MstThisWeekQuest_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MstThisWeekQuest_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."MstTodaysQuest" DROP CONSTRAINT "MstTodaysQuest_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MstTodaysQuest_pkey" PRIMARY KEY ("id");
