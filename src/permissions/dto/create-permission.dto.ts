import { IsNotEmpty } from 'class-validator';
import * as protoscript from "protoscript";

export class CreatePermissionDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  permission: string;

  createdAt: string;
  updatedAt: string;
}
