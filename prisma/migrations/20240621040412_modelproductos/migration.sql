-- CreateTable
CREATE TABLE "Productos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuariosId" TEXT,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Productos_disponible_idx" ON "Productos"("disponible");

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_usuariosId_fkey" FOREIGN KEY ("usuariosId") REFERENCES "Usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
