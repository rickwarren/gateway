import { IsEmail, IsNotEmpty } from 'class-validator';
import * as protoscript from 'protoscript';
import { ProfileDto } from '../../profile/dto/profile.dto';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  role: string;

  profile: ProfileDto;

  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
