-- CreateTable
CREATE TABLE "Wish" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wish" TEXT NOT NULL,
    "krathong" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationLat" DOUBLE PRECISION,
    "locationLng" DOUBLE PRECISION,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isCouple" BOOLEAN NOT NULL DEFAULT false,
    "partnerName" TEXT,
    "partnerWish" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Wish_isPublic_createdAt_idx" ON "Wish"("isPublic", "createdAt");

-- CreateIndex
CREATE INDEX "Wish_location_idx" ON "Wish"("location");
