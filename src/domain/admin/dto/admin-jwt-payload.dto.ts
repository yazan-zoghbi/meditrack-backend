import { Payload } from 'src/modules/jwt/dto/payload.dto';
import { Role } from 'src/modules/jwt/roles/role.enum';

export class AdminJwtPayload extends Payload {
  role: Role = Role.Admin;
}
