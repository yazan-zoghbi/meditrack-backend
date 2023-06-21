import { Role } from "src/modules/jwt/roles/role.enum";

export class UserLoginDto{
    role: Role
    username: string
    password: string
}