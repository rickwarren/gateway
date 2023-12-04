import { IsEmail, IsNotEmpty } from 'class-validator';
import { ProfileDto } from '../../profile/dto/profile.dto';
import * as protoscript from 'protoscript';

export class UpdateUserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  role: string;

  profile: ProfileDto;

  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
