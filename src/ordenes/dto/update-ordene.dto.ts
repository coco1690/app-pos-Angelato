import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-ordene.dto';


export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
