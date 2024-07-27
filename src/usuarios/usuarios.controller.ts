import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto, PaginacionPorRolesDto, StatusUsuarioDto, UpdateUsuarioDto } from './dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ValidRoles } from 'src/auth/interface/valid-roles';
import { GetUserDecorators } from 'src/auth/decorator/get-user.decorator';
import { Usuarios } from '@prisma/client';






@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService
  
  ) {}

  @Post()
  @Auth( ValidRoles.ADMIN ) 
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);

  }
 
  @Get()
  @Auth( ValidRoles.ADMIN )
  findAll(
  
    @Query() paginacionPorRolesDto: PaginacionPorRolesDto) {
    return this.usuariosService.findAll(paginacionPorRolesDto);
  }

  @Get(':term')
  @Auth( ValidRoles.ADMIN )
  findOne(@Param('term') term: string) {
    return this.usuariosService.findOne(term);
  }

  @Patch(':term')
  @Auth( ValidRoles.ADMIN )
  update(@Param('term') term: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update( term, updateUsuarioDto);
  }

  @Patch(':term')
  @Auth( ValidRoles.ADMIN )
  InactiveUser(@Param('term') term: string, @Body() statusUsuarioDto: StatusUsuarioDto) {
    return this.usuariosService.desactivarUsuario(term, statusUsuarioDto);
  }
}
