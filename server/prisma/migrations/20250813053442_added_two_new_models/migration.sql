/*
  Warnings:

  - You are about to drop the column `mpn2` on the `stockcode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emc]` on the table `stockcode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[custpn]` on the table `stockcode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."stockcode" DROP COLUMN "mpn2",
ADD COLUMN     "qty" INTEGER;

-- CreateTable
CREATE TABLE "public"."billofmaterials" (
    "bom_id" SERIAL NOT NULL,
    "customer" TEXT,
    "bom_name" TEXT NOT NULL,
    "revisionno" INTEGER,
    "revision_date" TIMESTAMP(3),
    "history" TEXT,

    CONSTRAINT "billofmaterials_pkey" PRIMARY KEY ("bom_id")
);

-- CreateTable
CREATE TABLE "public"."bomitems" (
    "id" SERIAL NOT NULL,
    "bom_id" INTEGER NOT NULL,
    "emc" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "pcb_side" TEXT,
    "processdept" TEXT,

    CONSTRAINT "bomitems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bomitems_bom_id_idx" ON "public"."bomitems"("bom_id");

-- CreateIndex
CREATE INDEX "bomitems_emc_idx" ON "public"."bomitems"("emc");

-- CreateIndex
CREATE UNIQUE INDEX "bomitems_bom_id_emc_key" ON "public"."bomitems"("bom_id", "emc");

-- CreateIndex
CREATE UNIQUE INDEX "stockcode_emc_key" ON "public"."stockcode"("emc");

-- CreateIndex
CREATE UNIQUE INDEX "stockcode_custpn_key" ON "public"."stockcode"("custpn");

-- AddForeignKey
ALTER TABLE "public"."bomitems" ADD CONSTRAINT "bomitems_bom_id_fkey" FOREIGN KEY ("bom_id") REFERENCES "public"."billofmaterials"("bom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bomitems" ADD CONSTRAINT "bomitems_emc_fkey" FOREIGN KEY ("emc") REFERENCES "public"."stockcode"("emc") ON DELETE RESTRICT ON UPDATE CASCADE;
