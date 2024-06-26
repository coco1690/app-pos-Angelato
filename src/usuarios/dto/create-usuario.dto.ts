import { IsActive, Roles } from "@prisma/client"
import { IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength, IsBoolean } from 'class-validator';
import { ListadoDeRoles } from "../enum/enum.roles"
import { ListaIsActive } from "../enum/enum.isactive";

export class CreateUsuarioDto {

    @IsString()
    @IsEmail()
    email:string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password:string


    @IsString()
    @MinLength(1)
    nombre: string

    @IsString()
    @MinLength(1)
    apellido: string

    @IsEnum( ListadoDeRoles,{
        message: `Posible roles ${ ListadoDeRoles }`
    })
    @IsOptional()
    rol: Roles

    @IsEnum( ListaIsActive,{
         message: `Posible roles ${ ListadoDeRoles }`
    })
    @IsOptional()
    activo: IsActive
}
