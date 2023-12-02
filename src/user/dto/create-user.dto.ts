import { IsEmail, IsNotEmpty } from 'class-validator';
import { ProfileDto } from '../../profile/dto/profile.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  profile: ProfileDto;
}
