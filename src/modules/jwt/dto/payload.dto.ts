import { Role } from 'src/modules/jwt/roles/role.enum';

// default jwt payload that will be added to the request & contain username, role
export class Payload {
  username: string;
  role: Role;
}
