import { IsNotEmpty } from 'class-validator';

export class FriendRequestDto {
  id?: string;

  @IsNotEmpty()
  requesterId: string;

  @IsNotEmpty()
  addresseId: string;

  status: string;

  createdAt: string;
  updatedAt: string;
}
