import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  controllers: [OrdenesController],
  providers: [OrdenesService],
  imports:[ProductosModule]
})
export class OrdenesModule {}
