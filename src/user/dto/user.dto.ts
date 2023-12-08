import { IsEmail, IsNotEmpty } from 'class-validator';
import * as protoscript from "protoscript";
import { PermissionsDto } from '../../permissions/dto/permissions.dto';
import { ProfileDto } from '../../profile/dto/profile.dto';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  password: string;

  role: string;

  profile: ProfileDto;

  permissions: string[];

  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
