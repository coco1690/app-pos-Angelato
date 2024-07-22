import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { ProductosModule } from 'src/productos/productos.module';
import { PrismaServices } from '../prisma.services';
import { AuthModule } from 'src/auth/auth.module';



@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaServices ],
  imports:[ ProductosModule, AuthModule],
  exports:[ UsuariosService ],
})
export class UsuariosModule {}
