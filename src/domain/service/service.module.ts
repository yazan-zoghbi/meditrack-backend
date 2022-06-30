import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../category/category.schema';
import { ServiceController } from './service.controller';
import { Service, ServiceSchema } from './service.schema';
import { ClinicService } from './service.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Service.name, schema: ServiceSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [ClinicService],
  controllers: [ServiceController],
})
export class ServiceModule {}
