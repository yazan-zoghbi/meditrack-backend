import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceController } from './service.controller';
import { Service, ServiceSchema } from './service.schema';
import { ClinicService } from './service.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  providers: [ClinicService],
  controllers: [ServiceController],
})
export class ServiceModule {}
