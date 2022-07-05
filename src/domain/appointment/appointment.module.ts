import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from '../doctor/schema/doctor.schema';
import { Patient, PatientSchema } from '../patient/schema/patient.schema';
import { Service, ServiceSchema } from '../service/service.schema';
import { Appointment, appointmentSchema } from './appointment.schema';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: appointmentSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: Doctor.name, schema: DoctorSchema },
      { name: Service.name, schema: ServiceSchema },
    ]),
  ],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
