import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { envs } from 'src/config';

@Injectable()
export class ImagesService {
    
  constructor() {
    // cloudinary.config({
    //   cloud_name: envs.cloud_name,
    //   api_key: envs.api_key,
    //   api_secret: envs.api_secret,
    // });
  }

  // async listImages( ): Promise<string[]> {
  //   try {

  //     const result = await cloudinary.api.resources();
  //     const imageUpload = result.resources.map(resource => resource.url);      

  //     return imageUpload

  //   } catch (error) {

  //     throw new HttpException('Failed to list images', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // async getImage(publicId: string): Promise<string> {
  //   try {
  //     const result = await cloudinary.api.resource(publicId);
  //     return result.secure_url;
  //   } catch (error) {
  //     throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
  //   }
  // }

  // async deleteImage(publicId: string): Promise<void> {
  //   try {
  //     await cloudinary.uploader.destroy(publicId);
  //   } catch (error) {
  //     throw new HttpException('Failed to delete image', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}