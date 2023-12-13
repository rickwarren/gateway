import * as protoscript from 'protoscript';

export class UpdateFriendListDto {
  id: string;
  requesterId: string;
  addresseId: string;
  friendType: string;
  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
