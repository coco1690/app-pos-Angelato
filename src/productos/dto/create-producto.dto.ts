import { Images } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";



export class CreateProductoDto {

    @IsString()
    public name: string;

    @IsNumber()
    @Min(0)
    @Type( () => Number )
    public price: number;

    @IsArray()
    @IsOptional( )
    images?: Images[]


}