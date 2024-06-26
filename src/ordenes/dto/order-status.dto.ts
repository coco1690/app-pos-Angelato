import { OrderStatus } from "@prisma/client"
import { IsBoolean, IsEnum } from "class-validator"
import { OrderStatusList } from "../enum/enum.order"




export class OrderStatusDto{


    @IsEnum( OrderStatusList,{
        message:`los estatus validos son ${ OrderStatusList }`
    })
    status: OrderStatus

}