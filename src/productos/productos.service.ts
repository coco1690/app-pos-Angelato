import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient} from '@prisma/client';
import { PaginacionDto } from 'src/common/paginacion.dto';
import { CreateProductoDto, UpdateProductoDto } from './dto';
import { v2 as cloudinary } from 'cloudinary';
import { envs } from 'src/config';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class ProductosService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('ProductosService')

  constructor(
    // @Inject(ImagesService) private readonly imageService:ImagesService
    private configService:ConfigService
    
  ){
    super();
    cloudinary.config({
      cloud_name: envs.cloud_name,
      api_key: envs.api_key,
      api_secret: envs.api_secret,
    });
  }

  async onModuleInit() {
   await this.$connect()
   this.logger.log( 'BASE DE DATOS CONECTADA')
 }


  // #################  ME CREA EL PRODUCTO  #######################

  async create( file: Express.Multer.File, createProductoDto: CreateProductoDto) {
    
    
    try {
     
      const { images=[], ...dataCreate} = createProductoDto 
    
      const product = await this.productos.create({
        data:{
          ...dataCreate,         
          images: {
            create:  {url: file.path }
          },
        },
        include:{
          images:{ 
            select:{url:true}
          }
        }
      });
   
        return product 
         

    } catch (error) {
      await this.deleteImage( file.filename);
      throw new BadRequestException({ message: `El producto ya existe es DB`})
    }   
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
       include:{
        images:{ 
          select:{url:true}
        }
      }
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
      },
      include:{
        images:{ 
          select:{url:true}
        }
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

    const { images=[],...data } = updateProductoDto

  
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


   //  ##################  METODO PARA ELIMINAR IMAGEN DE CLOUDINARY ###############

   async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new HttpException('Failed to delete image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


   // ###################  METODO PRIVADO PARA MANEJO DE ERRORES ################### 

   private handleDBExeptions(error: any){

    if( error.code === 'P2002')
    throw new BadRequestException( 'El Usuario ya existe en Base de Datos');
  
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
  