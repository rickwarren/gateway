import { Injectable } from '@nestjs/common';
import {
  FriendRequest,
  acceptFriendRequest,
  createFriendRequest,
  deleteFriendRequest,
  getFriendRequest,
  getFriendRequestsByUserId,
  rejectFriendRequest,
  updateFriendRequest,
} from '../../../friend-rpc/src/protos/friend-request.pb';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { FriendRequestDto } from './dto/friend-request.dto';

@Injectable()
export class FriendRequestService {
  constructor() {}

  /**
   * Retrieves friend requests by user ID.
   *
   * @param {number} userId - The ID of the user.
   * @return {Promise<FriendRequestDto[]>} The list of friend requests.
   */
  async getFriendRequestsByUserIdService(
    userId: string,
  ): Promise<FriendRequestDto[]> {
    const result = await getFriendRequestsByUserId(
      { id: userId },
      { baseURL: 'http://localhost:8082' },
    );
    let friends: FriendRequestDto[];
    result.requests.forEach((req) => {
      friends.push(this.maptoFriendRequestDto(req));
    });
    return friends;
  }

  /**
   * Accepts a friend request.
   *
   * @param {number} id - The ID of the friend request to accept.
   * @return {Promise<boolean>} A promise that resolves to true if the friend request was accepted successfully, or false otherwise.
   * */
  async acceptFriendRequestService(id: string): Promise<boolean> {
    const result = await acceptFriendRequest(
      { id: id },
      { baseURL: 'http://localhost:8082' },
    );
    return result.success;
  }

  /**
   * Rejects a friend request.
   *
   * @param {number} id - The ID of the friend request to reject.
   * @return {Promise<boolean>} A promise that resolves to true if the friend request was rejected successfully, or false otherwise.
   * */
  async rejectFriendRequestService(id: string): Promise<boolean> {
    const result = await rejectFriendRequest(
      { id: id },
      { baseURL: 'http://localhost:8082' },
    );
    return result.success;
  }

  /**
   * Creates a friend request.
   *
   * @param {CreateFriendRequestDto} data - The data for creating the friend request.
   * @return {Promise<FriendRequestDto>} A promise that resolves to the created friend request.
   * */
  async createFriendRequestService(
    data: CreateFriendRequestDto,
  ): Promise<FriendRequestDto> {
    return this.maptoFriendRequestDto(
      await createFriendRequest(data, {
        baseURL: 'http://localhost:8082',
      }),
    );
  }
  /**
   * Updates a friend request.
   *
   * @param {UpdateFriendRequestDto} data - The data needed to update the friend request.
   * @return {Promise<FriendRequestDto>} A promise that resolves to the updated friend request.
   * */
  async updateFriendRequestService(
    data: UpdateFriendRequestDto,
  ): Promise<FriendRequestDto> {
    return this.maptoFriendRequestDto(
      await updateFriendRequest(data, {
        baseURL: 'http://localhost:8082',
      }),
    );
  }

  /**
   * Deletes a friend request.
   *
   * @param {number} id - The ID of the friend request to be deleted.
   * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the friend request was successfully deleted.
   * */
  async deleteFriendRequestService(id: string): Promise<boolean> {
    const result = await deleteFriendRequest(
      { id: id },
      { baseURL: 'http://localhost:8082' },
    );
    return result.success;
  }

  /**
   * Retrieves a friend request for the given requester ID and addressee ID.
   *
   * @param {number} requesterId - The ID of the user sending the friend request.
   * @param {number} addresseId - The ID of the user receiving the friend request.
   * @return {Promise<FriendRequestDto>} - A promise that resolves to the friend request DTO.
   */
  async getFriendRequestService(
    requesterId: string,
    addresseId: string,
  ): Promise<FriendRequestDto> {
    return this.maptoFriendRequestDto(
      await getFriendRequest(
        {
          requesterId: requesterId,
          addresseId: addresseId,
        },
        { baseURL: 'http://localhost:8082' },
      ),
    );
  }

  maptoFriendRequestDto(friendRequest: FriendRequest): FriendRequestDto {
    const friendRequestDto = new FriendRequestDto();
    friendRequestDto.id = friendRequest?.id ? friendRequest?.id : null;
    friendRequestDto.requesterId = friendRequest?.requesterId;
    friendRequestDto.addresseId = friendRequest?.addresseId;
    friendRequestDto.status = friendRequest?.status;
    return friendRequestDto;
  }
}
