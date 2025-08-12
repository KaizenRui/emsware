-- CreateTable
CREATE TABLE "public"."Stockcode" (
    "id" SERIAL NOT NULL,
    "emc" TEXT NOT NULL,
    "custpn" TEXT NOT NULL,
    "mpn1" TEXT NOT NULL,
    "mpn2" TEXT NOT NULL,

    CONSTRAINT "Stockcode_pkey" PRIMARY KEY ("id")
);
