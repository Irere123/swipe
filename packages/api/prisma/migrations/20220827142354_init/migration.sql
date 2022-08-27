-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "displayName" TEXT,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "schoolName" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "gender" TEXT,
    "birthday" TEXT NOT NULL,
    "goal" TEXT,
    "location" TEXT,
    "lastSwipe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokenVersion" INTEGER NOT NULL DEFAULT 1,
    "pushToken" TEXT,
    "ageRangeMax" INTEGER,
    "ageRangeMin" INTEGER NOT NULL,
    "hasLoggedIn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
