import { Service } from 'src/domain/service/service.schema';

export class CreateAppointmentDto {
  doctorID: string;
  patientID: string;
  date: Date;
  service: Service;
}
