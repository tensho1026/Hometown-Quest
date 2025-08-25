-- CreateTable
CREATE TABLE "public"."MstTodaysQuest" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "timer" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "point" INTEGER NOT NULL,

    CONSTRAINT "MstTodaysQuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MstThisWeekQuest" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "timer" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "point" INTEGER NOT NULL,

    CONSTRAINT "MstThisWeekQuest_pkey" PRIMARY KEY ("id")
);
