import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  //  CLOUDINARY_URL:string
  CLOUDINARY_CLOUD_NAME: string;
  CLAOUDINARY_API_KEY:   string;
  CLOUDINARY_API_SECRET: string;
  JWT_SECRET_KEY: string;

}

const envsSchema = joi.object({
  // CLOUDINARY_URL: joi.string().required(),
  PORT:                  joi.number().required(),
  CLOUDINARY_CLOUD_NAME: joi.string().required(),
  CLAOUDINARY_API_KEY:   joi.string().required(),
  CLOUDINARY_API_SECRET: joi.string().required(),
  JWT_SECRET_KEY:        joi.string().required(),

})
.unknown(true);

const { error, value } = envsSchema.validate( process.env );

if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  port: envVars.PORT,
  // cloud_url: envVars.CLOUDINARY_URL,
  cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
  api_key:    envVars.CLAOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET,
  jwt_secret_key: envVars.JWT_SECRET_KEY
}