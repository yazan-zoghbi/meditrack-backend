import { ObjectId } from 'mongoose';

export class CreateAppointmentDto {
  PatientID: ObjectId;
  DoctorID: ObjectId;
  date: Date;
  serviceID: ObjectId;
}
