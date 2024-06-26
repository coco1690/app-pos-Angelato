

import { BadRequestException, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto, OrderStatusDto } from './dto';
import { PrismaClient } from '@prisma/client';
import { ProductosService } from 'src/productos/productos.service';




@Injectable()
export class OrdenesService extends PrismaClient implements OnModuleInit {
 
 
 
  private readonly logger = new Logger('OrdenesService')

  constructor(
    @Inject(ProductosService) private readonly prductService:ProductosService
  ){
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log( ' BASE DE DATOS CONECTADA');
    
  }
  // %%%%%%%%%%%%%%%% CREAR UNA ORDEN %%%%%%%%%%%%%%%%%%

 
   async create(createOrderDto: CreateOrderDto) {

     
     try {

      //1. Confirmar los ids de los productos
      const productIds = createOrderDto.items.map( item => item.productId);
      const products = await this.prductService.validateProducts(productIds);

      //2. Calculos de los valores
      const totalCuenta = createOrderDto.items.reduce( (acc, orderItemDto) => {
        const price = products.find( (product) => product.id === orderItemDto.productId,).price;
        return acc + (price * orderItemDto.quantity)
      }, 0);

      const totalItems = createOrderDto.items.reduce((acc,orderItemDto) =>{
        return acc + orderItemDto.quantity;
      }, 0);

    
      
      //3. crear una transaccion de base de datos
     
      if( createOrderDto.pagado !== true){

         const order = await this.ordenes.create({
        data:{
         
          totalCuenta,
          totalItems,
          OrderItem:{
            // createmany es para crear muchos y create para crear uno
            createMany:{

              data:createOrderDto.items.map((orderItemDto) =>({
                price: products.find((product) => product.id === orderItemDto.productId).price,
                productosId: orderItemDto.productId,
                quantity:orderItemDto.quantity,

              })),
            },
          },
        },
        include:{
          OrderItem:{
            select:{ productosId:true, price:true, quantity:true }
          }
        }
       
      });
      return {
        
        ...order,
        OrderItem:order.OrderItem.map((orderItem) =>({
          ...orderItem,
          name: products.find( product => product.id === orderItem.productosId ).name
        }))
      }
    } else {

      const order = await this.ordenes.create({
        data:{
          
          pagado:true,
          status:"CANCELLED",
          totalCuenta,
          totalItems,
          OrderItem:{
            // createmany es para crear muchos y create para crear uno
            createMany:{

              data:createOrderDto.items.map((orderItemDto) =>({
                price: products.find((product) => product.id === orderItemDto.productId).price,
                productosId: orderItemDto.productId,
                quantity:orderItemDto.quantity,

              })),
            },
          },
        },
        include:{
          OrderItem:{
            select:{ productosId:true, price:true, quantity:true }
          }
        }
       
      });
      return {
        
        ...order,
        OrderItem:order.OrderItem.map((orderItem) =>({
          ...orderItem,
          name: products.find( product => product.id === orderItem.productosId ).name
        }))
      }
    }

    } catch (error) {
        throw new BadRequestException({message:'check Logs'})
   }
  }


  // %%%%%%%%%%%% TRAER TODAS LAS ORDENES %%%%%%%%%%%%%%%

  async findAll( orderPaginationDto: OrderPaginationDto) {
   
    const { page, limit, status, metodOfPay} = orderPaginationDto;
    const totalPages = await this.ordenes.count( { where: {status}} );
    const lastPage = Math.ceil( totalPages / limit );

    return {
     data: await this.ordenes.findMany({
       skip:( page - 1 ) * limit,
       take: limit,
       where:{ status, metodOfPay }
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      }
    }
  }


  // %%%%%%%%%%%%%%%% TRAER ORDEN POR ID %%%%%%%%%%%%%%%%%


  async findOne(id: string) {

    
     
      const order = await this.ordenes.findFirst({
        where: {id:id},
        include:{ OrderItem:{
          select:{ productosId:true, price:true, quantity:true}
        }},
      });

      if( !order ){
        throw new BadRequestException({
          message:`el producto con id: #${id} no existe o no esta disponible`,
        })
      }   

      const productIds = order.OrderItem.map( orderItem => orderItem.productosId);
      const products = await this.prductService.validateProducts(productIds);

      return {
        ...order,
        OrderItem: order.OrderItem.map((orderItem) =>({
          ...orderItem,
        name: products.find(product => product.id === orderItem.productosId ).name
        }))
      }
  }


  // %%%%%%%%%%%%%%%%% ACTUALIZO EL STATUS DE LA ORDEN %%%%%%%%%%%%%%%
  
  async updateStatus( id: string,  orderStatusDto: OrderStatusDto){

    const { status } = orderStatusDto
    
    //NOTA: SIEMPRE MANDAR EL THIS.FINDONE PARA SABER SI EL ID EXISTE
    const order = await this.findOne( id )
    if( status === order.status ) {
      return order
    }

    return this.ordenes.update({
       where: { id:id }, 
       data:  { status: status } 
      })
    
  }
}
