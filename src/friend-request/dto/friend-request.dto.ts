import { IsNotEmpty } from 'class-validator';
import * as protoscript from 'protoscript';

export class FriendRequestDto {
  id?: string;

  @IsNotEmpty()
  requesterId: string;

  @IsNotEmpty()
  addresseId: string;

  status: string;

  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
