/*
  Warnings:

  - The `activo` column on the `Usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "IsActive" AS ENUM ('ACTIVO', 'INACTIVO');

-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "activo",
ADD COLUMN     "activo" "IsActive" NOT NULL DEFAULT 'ACTIVO';

-- CreateIndex
CREATE INDEX "Usuarios_activo_idx" ON "Usuarios"("activo");
