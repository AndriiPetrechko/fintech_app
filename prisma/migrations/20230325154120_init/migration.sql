-- CreateEnum
CREATE TYPE "CryptoCurrency" AS ENUM ('BTC', 'BCH', 'ETH');

-- CreateEnum
CREATE TYPE "FiatCurrency" AS ENUM ('USD', 'EUR', 'CAD', 'JPY', 'GBP', 'CHF', 'AUD');

-- CreateTable
CREATE TABLE "currency" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pair" TEXT NOT NULL,
    "value" DOUBLE PRECISION,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cryptoCurrency" "CryptoCurrency" DEFAULT 'BTC',
    "cryptoBalance" DOUBLE PRECISION,
    "fiatCurrency" "FiatCurrency" DEFAULT 'USD',
    "fiatBalance" DOUBLE PRECISION,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "currency_pair_key" ON "currency"("pair");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
