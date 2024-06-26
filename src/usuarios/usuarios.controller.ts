import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, ParseBoolPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto, PaginacionPorRolesDto, StatusUsuarioDto, UpdateUsuarioDto } from './dto';



@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll(@Query() paginacionPorRolesDto: PaginacionPorRolesDto) {
    return this.usuariosService.findAll(paginacionPorRolesDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.usuariosService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update( term, updateUsuarioDto);
  }

  @Patch(':term')
  InactiveUser(@Param('term') term: string, @Body() statusUsuarioDto: StatusUsuarioDto) {
    return this.usuariosService.desactivarUsuario(term, statusUsuarioDto);
  }
}
