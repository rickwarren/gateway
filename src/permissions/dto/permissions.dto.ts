import { IsNotEmpty } from 'class-validator';
import * as protoscript from "protoscript";

export class PermissionsDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  permission: string;

  createdAt: string;
  updatedAt: string;
}
