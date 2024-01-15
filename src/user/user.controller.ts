import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/user-login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserResponseDto } from './dto/deleteUserResponse.dto';
import { UpdateUserDto, UserDto } from '../../../user-rpc/src/protos/user.pb';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AuthGuard)
  @Get('current')
  getCurrentUser(@Req() req: any): Promise<UserDto> {
    return this.userService.getUserService(req.user.id);
  }

  /**
   * Retrieves a list of users.
   *
   * @return {Promise<UserDto[]>} The list of users.
   */
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AuthGuard)
  @Get('all')
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsersService();
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param {number} userId - The ID of the user to retrieve.
   * @return {Promise<UserDto>} A promise that resolves to the user data.
   */
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getUserService({ id: id });
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AuthGuard)
  @Get('/urlstring/:urlString')
  getUserBySlug(@Param('urlString') urlString: string): Promise<UserDto> {
    return this.userService.getUserBySlugService(urlString);
  }
  
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AuthGuard)
  @Get('name/:name')
  getUserByUrlString(@Param('name') name: string): Promise<UserDto> {
    return this.userService.getUserByUrlStringService(name);
  }

    /**
   * Retrieves a user by their ID.
   *
   * @param {number} userId - The ID of the user to retrieve.
   * @return {Promise<UserDto>} A promise that resolves to the user data.
   */
  
    @Post('auth')
    userAuth(@Body() data: any): Promise<any> {
      return this.userService.userAuthService(data);
    }

  /**
   * Creates a new user.
   *
   * @param {CreateUserDto} data - The data for creating a new user.
   * @return {Promise<UserDto>} The created user.
   */
  @UseGuards(AuthGuard)
  @Post('register')
  createUser(@Body() data: CreateUserDto): Promise<UserDto> {
    return this.userService.createUserService(data);
  }

  /**
   * Deletes a user from the system.
   *
   * @param {number} userId - The ID of the user to be deleted.
   * @return {Promise<boolean>} A boolean indicating whether the user was successfully deleted.
   */
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<DeleteUserResponseDto> {
    return this.userService.deleteUserService(id);
  }

  /**
   * Updates a user with the specified ID.
   *
   * @param {number} userId - The ID of the user to update.
   * @param {UpdateUserDto} data - The data to update the user with.
   * @return {Promise<UserDto>} The updated user.
   */
  @UseGuards(AuthGuard)
  @Put()
  updateUser(@Body() data: UpdateUserDto): Promise<UserDto> {
    return this.userService.updateUserService(data);
  }

  /**
   * Performs a login operation with the given user login data.
   *
   * @param {UserLoginDto} data - The user login data.
   * @return {Promise<TokenResponseDto | boolean>} The token response or a boolean value indicating success or failure.
   */
  @Post('login')
  login(@Body() data: UserLoginDto): Promise<TokenResponseDto | boolean> {
    return this.userService.loginService(data);
  }
}
