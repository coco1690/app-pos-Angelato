import { BadRequestException, HttpStatus, Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt' //yarn add -D @types/bcrypt

import { LoginAuthDto, RegisterAuthDto } from './dto';


@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('AuthService');
 

  constructor(
    private jwtService: JwtService
   
  ){
    super();
  }

   async onModuleInit() {
    await this.$connect()
    this.logger.log( 'BASE DE DATOS CONECTADA')
  }



 async RegisterUser(registerAuthDto: RegisterAuthDto ) {

    const {  password, email, ...datosUsuario} = registerAuthDto

    // $$$$$$ VALIDAMOS SI EL EMAIL EXISTE $$$$$$$$$
    
        const user = await this.usuarios.findUnique({ where:{ email }})
  
      if( user ){
          throw new BadRequestException({message:`El usuario ${email} ya existe en la DB`, status: HttpStatus.BAD_REQUEST} )
        }  
  
        const nuevoUsuario = await this.usuarios.create({ 
          data:{ 
            ...datosUsuario, 
            email: email,
            password: bcrypt.hashSync(password, 10)       
           },
           select:{
            id:true, nombre: true, apellido:true, email:true, rol:true, activo:true
           }
         });
         
          const payLoad = { id: nuevoUsuario.id, name: nuevoUsuario.nombre }
            return {
              usuario: nuevoUsuario,
              token: this.jwtService.sign(payLoad),
            }
  }



 async LoginUser( loginAuthDto:LoginAuthDto ) {

    const {  password, email, } = loginAuthDto

    // $$$$$$ VALIDAMOS SI EL EMAIL EXISTE $$$$$$$$$

        const user = await this.usuarios.findUnique({ where:{ email } })
  
      if( !user ){
          throw new UnauthorizedException ({message:`El usuario o el password no es valido`, status: HttpStatus.BAD_REQUEST} )
        }  
  
       const  isValidPassword = bcrypt.compareSync( password, user.password)

       if( !isValidPassword ){
        throw new UnauthorizedException ({message:`El usuario o el password no es valido`, status: HttpStatus.BAD_REQUEST})
       }
         const {createdAt:_, updateAt:__, password:___, ...rest } = user;
         const payLoad = { id: user.id }

            return {
              usuario: rest,
              token: this.jwtService.sign(payLoad),
            }
  }

 
}
