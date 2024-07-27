import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { PaginacionDto } from 'src/common/paginacion.dto';
import { CreateProductoDto, UpdateProductoDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ValidRoles } from 'src/auth/interface/valid-roles';


import { Usuarios } from '@prisma/client';
import { GetUserDecorators } from 'src/auth/decorator/get-user.decorator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});
 

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productosService: ProductosService,
  ) {}
  
  @Auth( ValidRoles.ADMIN)
  @Post()
  @UseInterceptors( FileInterceptor(  'file', {storage} ))
  async uploadImage( 
    @GetUserDecorators() user:Usuarios,
    @Body() createProductoDto: CreateProductoDto, //body: SampleDto
    // @GetUserDecorators() user: Usuarios,
    @UploadedFile(
      new ParseFilePipeBuilder().addFileTypeValidator({  
        fileType: /(jpg|jpeg|png)$/,           
      })
      .build({
        // exceptionFactory: error =>{ return new BadRequestException('el archivo es requerido')},
        fileIsRequired: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      })
    ) file: Express.Multer.File
  ){
    
    console.log( {file: file.path, fileId: file.filename });
    return this.productosService.create( file , createProductoDto, user );
    
    
    // const fileExtension = file.mimetype.split('/')[1];
    // console.log(fileExtension);
    // const fileName = `${uuid()}.${fileExtension}`
    // console.log({ nameFile: fileName});
    // return { 
    //   url: file.path 
    // }
  }


  @Get()
  @Auth( ValidRoles.ADMIN, ValidRoles.USER)
  findAll(@Query() paginacionDto: PaginacionDto) {
    return this.productosService.findAll(paginacionDto);
  }

  @Get(':id')
  @Auth( ValidRoles.ADMIN, ValidRoles.USER)
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }


  //######### PRUEBA ###############
  @Get('prueba/:id')
  @Auth( ValidRoles.USER)
  productUserId(
    // @GetUserDecorators() user:Usuarios,
    @Param('id') id: string) {
    return this.productosService.productUserId( id );
  }

  @Patch(':id')
  @Auth( ValidRoles.ADMIN, ValidRoles.USER)
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  @Auth( ValidRoles.ADMIN)
  remove(@Param('id') id: number) {
    return this.productosService.remove(id);
  }

  validateProduct(@Query() ids:number[]){
    return this.productosService.validateProducts( ids )
  }

  
}
 