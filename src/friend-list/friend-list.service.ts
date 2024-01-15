import { Injectable } from '@nestjs/common';
import {
  CreateFriendListDto,
  CreateFriendListResponseDto,
  DeleteFriendListResponseDto,
  FriendListDto,
  UserIds,
  addFriend,
  getFriendsByUserId,
  getFriendsOfFriendsByUserId,
  removeFriend,
} from '../../../friend-rpc/src/protos/friend-list.pb';

@Injectable()
export class FriendListService {
  constructor() {}

  /**
   * Retrieves a list of friends for a given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<FriendListDto[]>} A Promise that resolves to a list of FriendListDto objects.
   */
  async getFriendsByUserIdService(userId: string): Promise<FriendListDto[]> {
    const friends = await getFriendsByUserId(
      { id: userId },
      { baseURL: 'http://localhost:8082' },
    );
    return friends.friends;
  }

  async getFriendsOfFriendsByUserIdService(userId: string): Promise<FriendListDto[]> {
    const friends = await getFriendsOfFriendsByUserId(
      { id: userId },
      { baseURL: 'http://localhost:8082' },
    );
    return friends.friends;
  }

  /**
   * Adds a friend to the friend list.
   *
   * @param {CreateFriendListDto} data - The data required to create a friend list.
   * @return {Promise<FriendListDto>} A promise that resolves to the friend list after the friend has been added.
   * */
  async addFriendService(data: CreateFriendListDto): Promise<CreateFriendListResponseDto> {
    return await addFriend(data, { baseURL: 'http://localhost:8082' });

  }

  /**
   * Removes a friend from the friend list.
   *
   * @param {string} id - The ID of the friend to be removed.
   * @return {Promise<boolean>} A promise that resolves to true if the friend is successfully removed, false otherwise.
   * */
  async removeFriendService(ids: UserIds): Promise<DeleteFriendListResponseDto> {
    return await removeFriend(
      { id: ids.id, id2: ids.id2 },
      { baseURL: 'http://localhost:8082' },
    );
  }
}
