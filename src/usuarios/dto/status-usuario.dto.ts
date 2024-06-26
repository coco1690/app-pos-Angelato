import { IsEnum, IsOptional } from "class-validator"
import { IsActive } from "@prisma/client"
import { ListaIsActive } from "../enum"



export class StatusUsuarioDto{

  
    @IsOptional()
    @IsEnum( ListaIsActive,{
        message:`Roles Validos ${ ListaIsActive}`
    })
    activo:IsActive 

}