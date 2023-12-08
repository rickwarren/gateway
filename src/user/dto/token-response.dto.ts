import { PermissionsDto } from '../../permissions/dto/permissions.dto';

export class TokenResponseDto {
  token: string;
  permissions: string[];
  roles: string;
}
