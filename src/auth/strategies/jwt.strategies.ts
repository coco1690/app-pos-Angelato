
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Usuarios } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { envs } from "src/config";
import { PrismaServices } from "src/prisma.services";
import { JwtPayload } from "../interface/jwt-payload.interface";



// EN EL AUTH.MODULES IMPORTO Y EXPORTO EL JWTSTRATEGIE EN LOS PROVIDERS
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
       private readonly prismaSevice : PrismaServices
    ){ 
        super({
            secretOrKey: envs.jwt_secret_key,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }); 
    }

// ESTE METODO SE VA LLAMAR SI EL JWT NO HA EXPIRADO Y SI LA FIRMA DEL JWT HACE MATCH CON EL PAYLOAD
    async validate( payload: JwtPayload ): Promise<Usuarios> {

        const { id } = payload
        const user = await this.prismaSevice.usuarios.findFirst({ where:{ id }})

        if( !user )
            throw new UnauthorizedException(' Token not valid ')
        if( !user.activo)
            throw new UnauthorizedException(' User is inactive, talk with an admin ')
            
        return user;
    }
}