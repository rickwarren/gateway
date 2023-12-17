import { IsEmail, IsNotEmpty } from 'class-validator';
import { ProfileDto } from '../../profile/dto/profile.dto';

export class UserDt {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  password: string;

  role: string;

  profile: ProfileDto;

  permissions: string[];

  urlString: string;

  createdAt: string;
  updatedAt: string;
}
