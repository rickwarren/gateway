 import * as protoscript from 'protoscript';

export class FriendListDto {
  id: string;
  requesterId: string;
  addresseId: string;
  friendType: string;
  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
