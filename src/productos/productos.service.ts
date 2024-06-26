import { BadRequestException, Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginacionDto } from 'src/common/paginacion.dto';
import { CreateProductoDto, UpdateProductoDto } from './dto';

@Injectable()
export class ProductosService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('ProductosService')

  async onModuleInit() {
   await this.$connect()
   this.logger.log( 'BASE DE DATOS CONECTADA')
 }


  // #################  ME CREA EL PRODUCTO  #######################

  async create(createProductoDto: CreateProductoDto) {
    return await this.productos.create({
      data: createProductoDto
    })
  }


  // ################# TRAIGO TODOS LOS PRODUCTOS ##################

  async findAll( paginacionDto: PaginacionDto) {

    const { page, limit} = paginacionDto;
    const totalPages = await this.productos.count({ where: { disponible: true } } );
    const lastPage = Math.ceil( totalPages / limit );

    return {
     data: await this.productos.findMany({
       skip:( page - 1 ) * limit,
       take: limit,
       where:{ disponible: true},
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      }
    }
  }


  // ################# TRAIGO EL PRODUCTO POR ID #################

  async findOne(id: number ) {
    const productId =  await this.productos.findFirst({ 
      where:{ 
        id: id,
        disponible: true, 
      }
    })
    if( !productId )
      throw new BadRequestException({
        message:`el producto con id: #${id} no existe o no esta disponible`,
    
    })

    return productId
  }


  // ################# ACTUALIZO UN PRODUCTO ##################

  async update(id: number, updateProductoDto: UpdateProductoDto) {

    const {...data } = updateProductoDto

  
    await this.findOne( id );
    
    const productoActualizado =  this.productos.update({
      where:{ id: id},
      data: data,   
    });

    return productoActualizado;
    
  }

  
  // ################ ACTUALIZA LA DISPONIBILIDAD DEL PRODUCTO EN FALSE #################

  async remove(id: number) {

      await this.findOne( id );

      const productoDisponible = await this.productos.update({
        where:{ id: id },
        data:{
          disponible: false,
        }
      })
      return productoDisponible
  }

   // ###############  VALIDAMOS QUE EL PRODUCTO EXISTA ##################

   async validateProducts( ids: number[]){

      ids = Array.from (new Set(ids)); // purgo los ids duplicados

      const products = await this.productos.findMany({
        where:{
          id:{
            in: ids
          }
        }
      });

      if( products.length !== ids.length){
        throw new BadRequestException({ message:`el producto con el id ${ids} no existe!`})
      }

      return products
   }


   // ###################  METODO PRIVADO PARA MANEJO DE ERRORES ################### 

   private handleDBExeptions(error: any){

    if( error.code === 'P2002')
    throw new BadRequestException( 'El Usuario ya existe en Base de Datos');
  
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
  