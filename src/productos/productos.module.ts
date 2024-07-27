import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaServices } from 'src/prisma.services';
import { UsuariosModule } from 'src/usuarios/usuarios.module';



@Module({
  controllers: [ProductosController],
  providers: [ProductosService, PrismaServices],
  exports:[ProductosService],
  imports:[ AuthModule, UsuariosModule]
})
export class ProductosModule {}
