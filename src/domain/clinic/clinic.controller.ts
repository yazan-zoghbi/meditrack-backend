import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { Role } from 'src/enum/role.enum';
import { ClinicService } from './clinic.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './interfaces/service.interface';
import { Roles } from './roles.decorator';

@Controller('/services')
export class clinicController {
  constructor(private readonly ClinicService: ClinicService) {}
  @Get()
  getAll(): Service[] {
    return this.ClinicService.findAll();
  }

  @Get('findServiceById')
  async getOne(@Query('id') id: number) {
    console.log(id);
    return this.ClinicService.findOne(id);
  }

  @Post('create')
  @Roles(Role.Admin)
  createService(@Body() createServiceDto: CreateServiceDto) {
    return this.ClinicService.create(createServiceDto);
  }

  @Put('update')
  @Roles(Role.Admin)
  updateService(@Body() createServiceDto: CreateServiceDto) {
    return this.ClinicService.update(createServiceDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin)
  deleteService(@Param('id') id: number) {
    return this.ClinicService.delete(id);
  }
}
