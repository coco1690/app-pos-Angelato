import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Delete, ParseFilePipeBuilder, HttpStatus, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    
  });

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  // @Post('upload')
  // @UseInterceptors( FileInterceptor( 'file', { storage } ))
  //  async uploadImage( 
  //    @Body() //body: SampleDto
  //    @UploadedFile(
  //       new ParseFilePipeBuilder().addFileTypeValidator({  
  //       fileType: /(jpg|jpeg|png)$/,           
  //     })
  //     .build({
  //       // exceptionFactory: error =>{ return new BadRequestException('el archivo es requerido')},
  //       fileIsRequired: true,
  //       errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  //     })

  //   )
  //   file: Express.Multer.File
  //   ){
      
  //     // const fileExtension = file.mimetype.split('/')[1];
  //     // console.log(fileExtension);
  //     // const fileName = `${uuid()}.${fileExtension}`
  //     // console.log({ nameFile: fileName});
  //     return { 
  //       url: file.path 
  //     }
  //   }

  // @Get()
  // async listImages() {
  //   const images = await this.imagesService.listImages();
  //   return { images };
  // }

  // @Get(':publicId')
  // async getImage(@Param('publicId') publicId: string) {
  //   const imageUrl = await this.imagesService.getImage(publicId);
  //   return { imageUrl };
  // }

  // @Delete(':publicId')
  // async deleteImage(@Param('publicId') publicId: string) {
  //   await this.imagesService.deleteImage(publicId);
  //   return { message: 'Image deleted successfully' };
  // }
}