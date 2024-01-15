import { Body, Controller, Delete, Get, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { FriendListService } from './friend-list.service';
import { FriendListDto } from './dto/friend-list.dto';
import { CreateFriendListDto } from './dto/create-friend-list.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CreateFriendListResponseDto, DeleteFriendListResponseDto, UserIds } from '../../../friend-rpc/src/protos/friend-list.pb';

@Controller('friend-list')
export class FriendListController {
  constructor(private readonly friendListService: FriendListService) {}

  /**
   * Retrieves a list of friends.
   *
   * @param {@Req()} req - The request object.
   * @returns {Promise<FriendListDto[]>} A promise that resolves to an array of FriendListDto objects representing the user's friends.
   */
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get()
  getFriends(@Req() req: any): Promise<FriendListDto[]> {
    return this.friendListService.getFriendsByUserIdService(req.user.user.id);
  }

  /**
   * Retrieves a list of friends for a given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<FriendListDto[]>} A Promise that resolves to a list of FriendListDto objects.
   */
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get(':userId')
  getFriendsByUserId(
    @Param('userId') userId: string,
  ): Promise<FriendListDto[]> {
    return this.friendListService.getFriendsByUserIdService(userId);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('friends/:userId')
  getFriendsOfFriendsByUserId(
    @Param('userId') userId: string,
  ): Promise<FriendListDto[]> {
    return this.friendListService.getFriendsOfFriendsByUserIdService(userId);
  }

  /**
   * Adds a friend to the friend list.
   *
   * @param {CreateFriendListDto} data - The data required to create a friend list.
   * @return {Promise<FriendListDto>} A promise that resolves to the friend list after the friend has been added.
   * */
  @Post()
  addFriend(@Body() data: CreateFriendListDto): Promise<CreateFriendListResponseDto> {
    return this.friendListService.addFriendService(data);
  }

  /**
   * Removes a friend from the friend list.
   *
   * @param {string} id - The ID of the friend to be removed.
   * @return {Promise<boolean>} A promise that resolves to true if the friend is successfully removed, false otherwise.
   * */
  @Delete('remove/:id')
  removeFriend(@Param('id') ids: UserIds): Promise<DeleteFriendListResponseDto> {
    return this.friendListService.removeFriendService(ids);
  }
}
