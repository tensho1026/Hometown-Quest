/*
  Warnings:

  - Added the required column `category` to the `MstThisWeekQuest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `MstTodaysQuest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MstThisWeekQuest" ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."MstTodaysQuest" ADD COLUMN     "category" TEXT NOT NULL;
