import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestDto } from './dto/friend-request.dto';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';

@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  /**
   * Retrieves the friend requests for a given user.
   *
   * @param {@Req()} req - The request object.
   * @returns {Promise<FriendRequestDto[]>} A promise that resolves to an array of friend request DTOs.
   */
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get()
  getFriendRequests(@Req() req: any): Promise<FriendRequestDto[]> {
    return this.friendRequestService.getFriendRequestsByUserIdService(
      req.user.user.id,
    );
  }

  /**
   * Retrieves friend requests for a given user ID.
   *
   * @param {number} userId - The ID of the user to retrieve friend requests for.
   * @return {Promise<FriendRequestDto[]>} A promise that resolves to an array of FriendRequestDto objects representing the friend requests.
   */
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get(':userId')
  getFriendRequestsByUserId(
    @Param('userId') userId: string,
  ): Promise<FriendRequestDto[]> {
    return this.friendRequestService.getFriendRequestsByUserIdService(userId);
  }

  /**
   * Create a friend request.
   *
   * @param {CreateFriendRequestDto} data - The data for creating the friend request.
   * @return {Promise<FriendRequestDto>} A promise that resolves to the created friend request.
   * */
  @UseGuards(AuthGuard)
  @Post()
  createFriendRequest(
    @Body() data: CreateFriendRequestDto,
  ): Promise<FriendRequestDto> {
    return this.friendRequestService.createFriendRequestService(data);
  }

  /**
   * Updates a friend request.
   *
   * @param {UpdateFriendRequestDto} data - The data needed to update the friend request.
   * @return {Promise<FriendRequestDto>} A promise that resolves to the updated friend request.
   * */
  @UseGuards(AuthGuard)
  @Put()
  updateFriendRequest(
    @Body() data: UpdateFriendRequestDto,
  ): Promise<FriendRequestDto> {
    return this.friendRequestService.updateFriendRequestService(data);
  }

  /**
   * Deletes a friend request.
   *
   * @param {number} id - The ID of the friend request to be deleted.
   * @return {Promise<boolean>} - A promise that resolves to a boolean indicating whether the friend request was successfully deleted.
   * */
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteFriendRequest(@Param('id') id: string): Promise<boolean> {
    return this.friendRequestService.deleteFriendRequestService(id);
  }

  /**
   * Accepts a friend request with the specified ID.
   *
   * @param {number} id - The ID of the friend request to accept.
   * @return {Promise<boolean>} A promise that resolves to true if the friend request was accepted successfully, or false otherwise.
   * */
  @UseGuards(AuthGuard)
  @Get(':id/accept')
  acceptFriendRequest(@Param('id') id: string): Promise<boolean> {
    return this.friendRequestService.acceptFriendRequestService(id);
  }

  /**
   * Rejects a friend request.
   *
   * @param {number} id - The ID of the friend request to reject.
   * @return {Promise<boolean>} A promise that resolves to true if the friend request was successfully rejected, or false otherwise.
   * */
  @UseGuards(AuthGuard)
  @Get(':id/reject')
  rejectFriendRequest(@Param('id') id: string): Promise<boolean> {
    return this.friendRequestService.rejectFriendRequestService(id);
  }

  /**
   * Retrieves the friend request for the given requester and addressee IDs.
   *
   * @param {number} requesterId - The ID of the requester.
   * @param {number} addresseId - The ID of the addressee.
   * @return {Promise<FriendRequestDto>} A promise that resolves to the friend request DTO.
   */
  @UseGuards(AuthGuard)
  @Get('relation')
  getFriendRequest(
    @Param() requesterId: string,
    @Param() addresseId: string,
  ): Promise<FriendRequestDto> {
    return this.friendRequestService.getFriendRequestService(
      requesterId,
      addresseId,
    );
  }
}
