/*
  Warnings:

  - You are about to drop the `ShortenedUrl` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShortenedUrl" DROP CONSTRAINT "ShortenedUrl_userId_fkey";

-- DropTable
DROP TABLE "ShortenedUrl";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "shortCode" TEXT,
    "longUrl" TEXT NOT NULL,
    "customAlias" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClickAnalytics" (
    "id" SERIAL NOT NULL,
    "urlId" INTEGER NOT NULL,
    "shortCode" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "referrer" TEXT,
    "userAgent" TEXT,
    "country" TEXT,

    CONSTRAINT "ClickAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortCode_key" ON "Url"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "Url_customAlias_key" ON "Url"("customAlias");

-- CreateIndex
CREATE INDEX "ClickAnalytics_shortCode_idx" ON "ClickAnalytics"("shortCode");

-- CreateIndex
CREATE INDEX "ClickAnalytics_urlId_idx" ON "ClickAnalytics"("urlId");

-- AddForeignKey
ALTER TABLE "ClickAnalytics" ADD CONSTRAINT "ClickAnalytics_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
