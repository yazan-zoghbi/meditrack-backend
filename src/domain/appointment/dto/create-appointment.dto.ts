import { ObjectId } from 'mongoose';
import { Service } from 'src/domain/service/service.schema';

export class CreateAppointmentDto {
  doctorID: ObjectId;
  patientID: ObjectId;
  date: Date;
  serviceID: ObjectId;
}
