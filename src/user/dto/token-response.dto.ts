import { UserDto } from "../../../../user-rpc/src/protos/user.pb";

export class TokenResponseDto {
  id: string;
  token: string;
  permissions: string[];
  roles: string;
  userModel: UserDto
}
