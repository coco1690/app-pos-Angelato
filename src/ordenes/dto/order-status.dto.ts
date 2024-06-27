import { MetodOfPay, OrderStatus } from "@prisma/client"
import { IsEnum, IsOptional } from "class-validator"
import { MetodOfPayList, OrderStatusList } from "../enum"




export class OrderStatusDto{


    @IsEnum( OrderStatusList,{
        message:`los estatus validos son ${ OrderStatusList }`
    })
    status: OrderStatus

    @IsOptional()
    @IsEnum( MetodOfPayList, {
        message: `Status validos ${ MetodOfPayList }`
    })
    metodOfPay: MetodOfPay
}