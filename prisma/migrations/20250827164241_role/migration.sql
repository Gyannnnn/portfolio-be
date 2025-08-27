-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('Admin', 'Visitor');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'Visitor';
