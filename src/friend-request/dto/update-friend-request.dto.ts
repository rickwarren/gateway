import { IsNotEmpty } from 'class-validator';
import * as protoscript from 'protoscript';

export class UpdateFriendRequestDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  requesterId: number;

  @IsNotEmpty()
  addresseId: number;

  status: string;

  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
