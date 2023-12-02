import { IsNotEmpty } from 'class-validator';

export class TokenResponseDto {
  @IsNotEmpty()
  token: string;
}
