/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `MstThisWeekQuest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `MstTodaysQuest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MstThisWeekQuest_title_key" ON "public"."MstThisWeekQuest"("title");

-- CreateIndex
CREATE UNIQUE INDEX "MstTodaysQuest_title_key" ON "public"."MstTodaysQuest"("title");
