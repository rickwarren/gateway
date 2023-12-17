import { IsNotEmpty } from 'class-validator';

export class UpdateFriendRequestDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  requesterId: string;

  @IsNotEmpty()
  addresseId: string;

  status: string;

  createdAt: string;
  updatedAt: string;
}
