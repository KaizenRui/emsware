/*
  Warnings:

  - Added the required column `mpn1` to the `bomitems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."bomitems" ADD COLUMN     "mpn1" TEXT NOT NULL;
