/*
  Warnings:

  - You are about to drop the `Stockcode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Stockcode";

-- CreateTable
CREATE TABLE "public"."stockcode" (
    "id" SERIAL NOT NULL,
    "emc" TEXT NOT NULL,
    "custpn" TEXT NOT NULL,
    "mpn1" TEXT NOT NULL,
    "mpn2" TEXT NOT NULL,

    CONSTRAINT "stockcode_pkey" PRIMARY KEY ("id")
);
