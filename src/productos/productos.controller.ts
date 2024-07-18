import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { PaginacionDto } from 'src/common/paginacion.dto';
import { CreateProductoDto, UpdateProductoDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});
 

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productosService: ProductosService,
  ) {}
  
  
  @Post()
  @UseInterceptors( FileInterceptor(  'file', {storage} ))
  async uploadImage( 
    @Body() createProductoDto: CreateProductoDto, //body: SampleDto
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
    return this.productosService.create( file , createProductoDto);
    
    
    // const fileExtension = file.mimetype.split('/')[1];
    // console.log(fileExtension);
    // const fileName = `${uuid()}.${fileExtension}`
    // console.log({ nameFile: fileName});
    // return { 
    //   url: file.path 
    // }
  }


  @Get()
  findAll(@Query() paginacionDto: PaginacionDto) {
    return this.productosService.findAll(paginacionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productosService.remove(id);
  }

  validateProduct(@Query() ids:number[]){
    return this.productosService.validateProducts( ids )
  }
}
 