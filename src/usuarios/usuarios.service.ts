import { BadRequestException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';

import { PrismaClient, Productos } from '@prisma/client';
import * as bcrypt from 'bcrypt' //yarn add -D @types/bcrypt

import { CreateUsuarioDto, PaginacionPorRolesDto, StatusUsuarioDto, UpdateUsuarioDto } from './dto';




@Injectable()
export class UsuariosService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('UsuariosService')

  constructor(
    // @Inject( ProductosService ) private readonly productosClient: Productos
  ){
    super();
  }

   async onModuleInit() {
    await this.$connect()
    this.logger.log( 'BASE DE DATOS CONECTADA')
  }


  // !!!!!!!!!!!! CREO USUARIOS !!!!!!!!!!!!!

   async create(createUsuarioDto: CreateUsuarioDto) {

      const {  password, email, ...datosUsuario} = createUsuarioDto

  // $$$$$$ VALIDAMOS SI EL EMAIL EXISTE $$$$$$$$$
      const user = await this.usuarios.findUnique({
        where:{
         email: email,
       }
    })

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
       
          return {
            usuario: nuevoUsuario,
            token:'abc'
          }
      
  } 


  // !!!!!!!!!!!! ME RETORNA TODOS LOS USUARIOS POR BUSQUEDA !!!!!!!!!!!!!

  async findAll( paginacionPorRolesDto: PaginacionPorRolesDto) {
    
    const { page, limit } = paginacionPorRolesDto;
    const paginasTotales = await this.usuarios.count( { where: { activo:'ACTIVO' }}) 
    const ultimaPagina = Math.ceil( paginasTotales / limit );
  
    return {
      data: await this.usuarios.findMany({
        skip: ( page - 1 ) * limit,
        take: limit,
        where: { activo:'ACTIVO'},
        select:{
          id: true,
          nombre: true,
          apellido: true,
          email: true,
          rol: true,
          activo: true,
          productos:true
        }      
      }),
      meta: {
        total: paginasTotales,
        pagina: page,
        ultimaPagina: ultimaPagina
      }
    }

  }


  // !!!!!!!!!!!! ME RETORNA UN USUARIO POR BUSQUEDA POR ID  !!!!!!!!!!!!!

  async findOne(term: string) {

      const usuario = await this.usuarios.findFirst({ 
        where: { id:term},
        select:{
          id: true,
          nombre: true,
          apellido: true,
          email: true,
          rol: true,
          activo: true,
          productos:true,
        },
      });

      if( !usuario ){
        throw new BadRequestException(`El Usuario no existe en la base de datos`)
      }

      return usuario;
      
  }


  // !!!!!!!!!!!! ME ACTUALIZA UN USUARIO  !!!!!!!!!!!!!

  async update(term: string, updateUsuarioDto: UpdateUsuarioDto) {
       
    await this.findOne( term )

      return this.usuarios.update({
          where:{ id:term },
          data: updateUsuarioDto
             
      });
    
  }


  // !!!!!!!!!!!! ACTUALIZO EL STATUS DEL USUARIO ACTIVO E INACTIVO !!!!!!!!!!!!!

 async desactivarUsuario(term: string,  statusUsuarioDto:StatusUsuarioDto) {
    
   
   const  inactiveUser =  await this.findOne( term );
   
   const { activo } = statusUsuarioDto

   if( activo === inactiveUser.activo ) {
     return inactiveUser
    }
    
    return this.usuarios.update({ 
      where:{ id:term}, 
      data: activo 
    })
  }


  
   // ###################  METODO PRIVADO PARA MANEJO DE ERRORES ################### 

   private handleDBExeptions(error: any){

    if( error.code === 'P2002')
    throw new BadRequestException( 'El Usuario ya existe en Base de Datos');
  
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
