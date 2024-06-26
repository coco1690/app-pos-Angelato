import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { OrdenesModule } from './ordenes/ordenes.module';


@Module({
  imports: [ProductosModule, UsuariosModule, OrdenesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
