import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { FriendListService } from './friend-list.service';
import { FriendListDto } from './dto/friend-list.dto';
import { CreateFriendListDto } from './dto/create-friend-list.dto';

@Controller('friend-list')
export class FriendListController {
  constructor(private readonly friendListService: FriendListService) {}

  /**
   * Retrieves a list of friends.
   *
   * @param {@Req()} req - The request object.
   * @returns {Promise<FriendListDto[]>} A promise that resolves to an array of FriendListDto objects representing the user's friends.
   */
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
  @Get(':userId')
  getFriendsByUserId(
    @Param('userId') userId: string,
  ): Promise<FriendListDto[]> {
    return this.friendListService.getFriendsByUserIdService(userId);
  }

  /**
   * Checks if two users are friends.
   *
   * @param {string} id - The ID of the first user.
   * @param {string} userId - The ID of the second user.
   * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the two users are friends.
   * */
  @Get(':id/:userId')
  areUsersFriends(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<boolean> {
    return this.friendListService.areUsersFriendsService(id, userId);
  }

  /**
   * Adds a friend to the friend list.
   *
   * @param {CreateFriendListDto} data - The data required to create a friend list.
   * @return {Promise<FriendListDto>} A promise that resolves to the friend list after the friend has been added.
   * */
  @Post()
  addFriend(@Body() data: CreateFriendListDto): Promise<FriendListDto> {
    return this.friendListService.addFriendService(data);
  }

  /**
   * Removes a friend from the friend list.
   *
   * @param {string} id - The ID of the friend to be removed.
   * @return {Promise<boolean>} A promise that resolves to true if the friend is successfully removed, false otherwise.
   * */
  @Get('remove/:id')
  removeFriend(@Param('id') id: string): Promise<boolean> {
    return this.friendListService.removeFriendService(id);
  }
}
