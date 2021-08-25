/*
  Warnings:

  - Added the required column `photoUrl` to the `StoryPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StoryPhoto" ADD COLUMN     "photoUrl" TEXT NOT NULL;
