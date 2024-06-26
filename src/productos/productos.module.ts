import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { OrdenesModule } from 'src/ordenes/ordenes.module';


@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  exports:[ProductosService ],
})
export class ProductosModule {}
