import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaServices } from '../prisma.services';
import { AuthModule } from 'src/auth/auth.module';



@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaServices ],
  imports:[ AuthModule],
  exports:[ UsuariosService ],
})
export class UsuariosModule {}
