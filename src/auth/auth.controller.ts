import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';



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

 
}
