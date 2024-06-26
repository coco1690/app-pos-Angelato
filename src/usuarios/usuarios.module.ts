import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { ProductosModule } from 'src/productos/productos.module';


@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports:[ ProductosModule]
})
export class UsuariosModule {}
