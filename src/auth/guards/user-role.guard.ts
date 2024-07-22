import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorator/role-protected.decorator';
import { Usuarios } from '@prisma/client';


@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    // se inyecta el reflector de @nest/core
    private readonly reflector: Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // VALIDO LOS ROLESQUE VIENEN DE @SetMetada()
    const validRoles: string[] = this.reflector.get( META_ROLES, context.getHandler())

    // para validar, se puede borrar
    // if( !validRoles ) return true;
    // if( validRoles.length === 0 ) return true;

    // TRAIGO EL USUARIO DE LA REQUEST
    const req = context.switchToHttp().getRequest();
    const user = req.user as Usuarios
   
    
    
    if( !user )//valido si el usuario no existe
      throw new BadRequestException('user no found');
    
    // me recorre los roles que esxiste en el user.roles y 
    // luego valida si validRoles incluye algunos de los roles del user.roles
      const rol  = user.rol
      if( validRoles.includes( rol ) ) {
        return true
      }
         
    
       
    throw new ForbiddenException( `El Usuario ${ user.nombre } necesita un rol valido: [${ validRoles }]`);
    
  }
}
