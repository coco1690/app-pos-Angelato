import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { CreateOrderDto, OrderPaginationDto, OrderStatusDto, UpdateOrderDto } from './dto';


@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordenesService.create(createOrderDto);
  }

  @Get()
  findAll( @Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordenesService.findAll(orderPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() orderStatusDto: OrderStatusDto) {
    return this.ordenesService.updateStatus( id, orderStatusDto);
  }

}
