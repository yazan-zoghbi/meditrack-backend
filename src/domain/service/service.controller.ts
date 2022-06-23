import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ClinicService } from './service.service';
import { UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from 'src/modules/jwt/jwt.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly service: ClinicService) {}

  @Get('get/all')
  async getAll() {
    return this.service.getAll();
  }

  @Get('get/:id')
  async getByID(@Param('id') id: string) {
    return this.service.getByID(id);
  }

  @UseGuards(AdminJwtGuard)
  @Post('create')
  async create(@Body() body: CreateServiceDto) {
    return this.service.create(body);
  }

  @UseGuards(AdminJwtGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateServiceDto) {
    return this.service.update(id, body);
  }

  @UseGuards(AdminJwtGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
