import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategies';
import { PrismaServices } from '../prisma.services';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaServices ],
  imports:[
    // UsuariosModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),

    //registerAsync es para volver cualquier modulo asincrono
    JwtModule.registerAsync({
      imports:[],
      inject:[],
      useFactory: () => {
        return {
          secret: envs.jwt_secret_key,
          signOptions: {expiresIn: '2h'}
        }
      }
    })
  ],
  exports:[ JwtStrategy, PassportModule, JwtModule ]
})
export class AuthModule {}
