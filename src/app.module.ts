import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true}),
    ProductosModule, 
    UsuariosModule, 
    OrdenesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
