import { IsNotEmpty } from 'class-validator';
import * as protoscript from "protoscript";

export class UpdatePermissionsDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  permission: string;

  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
