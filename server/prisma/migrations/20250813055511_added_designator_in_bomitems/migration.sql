/*
  Warnings:

  - Added the required column `designators` to the `bomitems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."bomitems" ADD COLUMN     "designators" TEXT NOT NULL;
