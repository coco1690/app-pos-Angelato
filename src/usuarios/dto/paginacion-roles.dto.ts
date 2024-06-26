import { IsActive, Roles } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";
import { PaginacionDto } from "src/common/paginacion.dto";
import { ListaIsActive, ListadoDeRoles } from "../enum";


export class PaginacionPorRolesDto extends PaginacionDto {

    @IsOptional()
    @IsEnum( ListadoDeRoles,{
        message:`Roles Validos ${ ListadoDeRoles}`
    })
    rol:Roles;

    // @IsOptional()
    // @IsEnum( ListaIsActive,{
    //     message:`Roles Validos ${ ListaIsActive}`
    // })
    // activo:IsActive 

}