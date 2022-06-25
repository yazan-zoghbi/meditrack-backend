import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type DoctorCredentialDocument = DoctorCredential & Document;

@Schema()
export class DoctorCredential {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const DoctorCredentialSchema =
  SchemaFactory.createForClass(DoctorCredential);
