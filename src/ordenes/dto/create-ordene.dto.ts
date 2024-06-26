import { ArrayMinSize, IsArray, IsBoolean, ValidateNested } from "class-validator"

import { Type } from "class-transformer"
import { OrderItemDto } from "./orden-item.dto"


export class CreateOrderDto {
    
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true}) //me valida el array de items internamente
    @Type(() => OrderItemDto)
    items:OrderItemDto[]

    @IsBoolean()
    pagado:boolean

   
}
