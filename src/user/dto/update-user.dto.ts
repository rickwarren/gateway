import { IsEmail, IsNotEmpty } from 'class-validator';
import { ProfileDto } from '../../profile/dto/profile.dto';

export class UpdateUserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  role: string;

  profile: ProfileDto;

  permissions: string[];

  urlString: string;

  createdAt: string;
  updatedAt: string;
}
