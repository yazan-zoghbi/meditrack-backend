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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('services')
export class ServiceController {
  constructor(private readonly service: ClinicService) {}

  @Get('')
  @ApiOperation({ summary: 'List all the clinic services' })
  async getAll() {
    return this.service.getAll();
  }

  @Get('/{serviceID}')
  @ApiOperation({ summary: 'Get a specific service by its ID' })
  @ApiParam({ name: 'serviceID', description: 'The ID of the service' })
  async getByID(@Param('serviceID') serviceID: string) {
    return this.service.getByID(serviceID);
  }

  @UseGuards(AdminJwtGuard)
  @Post('')
  @ApiOperation({ summary: 'Create a new service by the admin' })
  @ApiBody({ type: CreateServiceDto })
  async create(@Body() body: CreateServiceDto) {
    return this.service.create(body);
  }

  @UseGuards(AdminJwtGuard)
  @Put('/{serviceID}')
  @ApiOperation({ summary: 'Update a specific service by its ID' })
  @ApiParam({ name: 'serviceID', description: 'The ID of the service' })
  @ApiBody({ type: UpdateServiceDto })
  async update(@Param('serviceID') serviceID: string, @Body() body: UpdateServiceDto) {
    return this.service.update(serviceID, body);
  }

  @UseGuards(AdminJwtGuard)
  @Delete('/{serviceID}')
  @ApiOperation({ summary: 'Delete a specific service by its ID' })
  @ApiParam({ name: 'serviceID', description: 'The ID of the service' })
  async delete(@Param('serviceID') serviceID: string) {
    return this.service.delete(serviceID);
  }
}
