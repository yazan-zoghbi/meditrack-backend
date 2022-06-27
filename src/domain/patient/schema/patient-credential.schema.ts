import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type PatientCredentialDocument = PatientCredential & Document;

@Schema()
export class PatientCredential {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const PatientCredentialSchema =
  SchemaFactory.createForClass(PatientCredential);
