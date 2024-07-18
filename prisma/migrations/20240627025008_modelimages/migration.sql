-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productosId" INTEGER,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productosId_fkey" FOREIGN KEY ("productosId") REFERENCES "Productos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
