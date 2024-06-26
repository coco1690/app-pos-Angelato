import { OrderStatus, MetodOfPay } from '@prisma/client';
import { IsEnum, IsOptional } from "class-validator";
import { PaginacionDto } from "src/common/paginacion.dto";
import { MetodOfPayList, OrderStatusList } from "../enum";




export class OrderPaginationDto extends PaginacionDto {

    @IsOptional()
    @IsEnum( OrderStatusList, {
        message: `Status validos ${ OrderStatusList }`
    })
    status: OrderStatus;

    @IsOptional()
    @IsEnum( MetodOfPayList, {
        message: `Status validos ${ MetodOfPayList }`
    })
    metodOfPay: MetodOfPay

}   