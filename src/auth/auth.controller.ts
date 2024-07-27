import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { Auth } from './decorator/auth.decorator';
import { ValidRoles } from './interface/valid-roles';
import { GetUserDecorators } from './decorator/get-user.decorator';
import { Usuarios } from '@prisma/client';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  RegisterUser(@Body() registerAuthDto: RegisterAuthDto  ) {
    return this.authService.RegisterUser( registerAuthDto );
  }

  @Post('login')
  LoginUser(@Body() loginAuthDto:LoginAuthDto  ) {
    return this.authService.LoginUser( loginAuthDto );
  }

  @Get('check-status')
  @Auth( ValidRoles.USER, ValidRoles.ADMIN )
  checkAuthStatus(
    @GetUserDecorators() user:Usuarios
  ){
    return this.authService.checkAuthStatus(user)
  }

 
}
