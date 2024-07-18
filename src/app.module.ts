import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { ConfigModule } from '@nestjs/config';
import { ImagesModule } from './images/images.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true}),
    ProductosModule, 
    UsuariosModule, 
    OrdenesModule, ImagesModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
