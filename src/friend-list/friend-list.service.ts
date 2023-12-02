import { Injectable } from '@nestjs/common';
import {
  CreateFriendListDto,
  FriendList,
  addFriend,
  areUsersFriends,
  getFriendsByUserId,
  removeFriend,
} from '../../../friend-rpc/src/protos/friend-list.pb';
import { FriendListDto } from './dto/friend-list.dto';

@Injectable()
export class FriendListService {
  constructor() {}

  /**
   * Retrieves a list of friends for a given user ID.
   *
   * @param {number} userId - The ID of the user.
   * @return {Promise<FriendListDto[]>} A Promise that resolves to a list of FriendListDto objects.
   */
  async getFriendsByUserIdService(userId: number): Promise<FriendListDto[]> {
    const friends = await getFriendsByUserId(
      { id: userId },
      { baseURL: 'http://localhost:8082' },
    );
    let friendListsDto: FriendListDto[];
    friends.friends.forEach((friend) => {
      friendListsDto.push(this.mapFriendListToDto(friend));
    });
    return friendListsDto;
  }

  /**
   * Checks if two users are friends.
   *
   * @param {number} id - The ID of the first user.
   * @param {number} userId - The ID of the second user.
   * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the two users are friends.
   * */
  async areUsersFriendsService(id: number, userId: number): Promise<boolean> {
    const result = await areUsersFriends(
      { id: id, userId: userId },
      { baseURL: 'http://localhost:8082' },
    );
    return result.success;
  }

  /**
   * Adds a friend to the friend list.
   *
   * @param {CreateFriendListDto} data - The data required to create a friend list.
   * @return {Promise<FriendListDto>} A promise that resolves to the friend list after the friend has been added.
   * */
  async addFriendService(data: CreateFriendListDto): Promise<FriendListDto> {
    return this.mapFriendListToDto(
      await addFriend(data, { baseURL: 'http://localhost:8082' }),
    );
  }

  /**
   * Removes a friend from the friend list.
   *
   * @param {number} id - The ID of the friend to be removed.
   * @return {Promise<boolean>} A promise that resolves to true if the friend is successfully removed, false otherwise.
   * */
  async removeFriendService(id: number): Promise<boolean> {
    const result = await removeFriend(
      { id: id },
      { baseURL: 'http://localhost:8082' },
    );
    return result.success;
  }

  mapFriendListToDto(friendList: FriendList): FriendListDto {
    const friendListDto = new FriendListDto();
    friendListDto.id = friendList.id ? friendList.id : null;
    friendListDto.requesterId = friendList.requesterId;
    friendListDto.addresseId = friendList.addresseId;
    friendListDto.friendType = friendList.friendType;
    return friendListDto;
  }
}
