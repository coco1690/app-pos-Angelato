import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { ImagesModule } from 'src/images/images.module';



@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  exports:[ProductosService],
  // imports:[ ImagesModule]
})
export class ProductosModule {}
