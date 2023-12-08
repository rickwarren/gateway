import { Injectable } from '@nestjs/common';
import {
  getUser,
  getUserByEmail,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  DeleteUserResponseDto,
  CreateUserDto,
  UpdateUserDto,
  UserId,
  User,
} from '../../../user-rpc/src/protos/user.pb';
import { UserLoginDto } from './dto/user-login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';
import { getPermissions } from '../../../user-rpc/src/protos/permissions.pb';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  /**
   * Performs a login operation using the provided user login data.
   *
   * @param {UserLoginDto} data - The user login data.
   * @return {Promise<TokenResponseDto | boolean>} The token response if login is successful,
   * or `false` if login fails.
   */
  async loginService(data: UserLoginDto): Promise<TokenResponseDto | boolean> {
    const user = await getUserByEmail(
      { email: data.email },
      { baseURL: 'http://localhost:8080' },
    );
    if (await this.validatePassword(data.password, user.password)) {
      return {
        token: await this.getToken(user),
        permissions: await this.assignPermissions(user.id),
        roles: user.role
      }
    } else {
      return false;
    }
  }

  /**
   * Generates a token response DTO for the given user.
   *
   * @param {User} user - The user object for which to generate the token response.
   * @return {Promise<TokenResponseDto>} - The token response DTO containing the generated token.
   */
  async getToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      id: user.id,
      role: user.role,
    };
    const token = await jwt.sign(payload, 'secretkey', {
      algorithm: 'HS256',
      expiresIn: '1day', 
    });

    return token;
  }

  async validatePassword(
    password: string,
    oldpassword: string,
  ): Promise<boolean> {
    return password === oldpassword ? true : false;
  }

  /**
   * Retrieves a list of users asynchronously.
   *
   * @return {Promise<UserDto[]>} An array of UserDto objects representing the users.
   */
  async getUsersService(): Promise<User[]> {
    try {
      const users = await getUsers({}, { baseURL: 'http://localhost:8080' });
      return users.users;
    } catch(e) {
      throw Error(e);
    }
  }

  /**
   * Retrieves a user by their ID asynchronously.
   *
   * @param {number} userId - The ID of the user.
   * @return {Promise<UserDto>} A promise that resolves to the user data.
   */
  async getUserService(userId: UserId): Promise<UserDto> {
    return await this.mapToUserDtoAsync(
      await getUser(userId, { baseURL: 'http://localhost:8080' }),
    );
  }

  /**
   * Creates a new user.
   *
   * @param {CreateUserDto} data - The data for creating the user.
   * @return {Promise<UserDto>} The created user.
   */
  async createUserService(data: CreateUserDto): Promise<UserDto> {
    return await this.mapToUserDtoAsync(
      await createUser(data, { baseURL: 'http://localhost:8080' }),
    );
  }

  /**
   * Deletes a user by their ID.
   *
   * @param {number} userId - The ID of the user to delete.
   * @return {Promise<boolean>} A boolean indicating if the user was successfully deleted.
   */
  async deleteUserService(userId: string): Promise<DeleteUserResponseDto> {
    return await deleteUser(
      { id: userId },
      { baseURL: 'http://localhost:8080' },
    );
  }

  /**
   * Updates a user with the given ID.
   *
   * @param {number} userId - The ID of the user to update.
   * @param {UpdateUserDto} data - The data to update the user with.
   * @return {Promise<UserDto>} - A promise that resolves to the updated user.
   */
  async updateUserService(data: UpdateUserDto): Promise<UserDto> {
    return await this.mapToUserDtoAsync(
      await updateUser(data, { baseURL: 'http://localhost:8080' }),
    );
  }

  async assignPermissions(userId: string): Promise<string[]> {
    const permissions = await getPermissions(
      { id: userId }, 
      { baseURL: 'http://localhost:8080' }
    );
    const perm: string[] = permissions.permissions.map((permission) => {
      return permission.permission;
    });
    return perm;
  }

  mapToUserDto(user: any): UserDto {
    const userDto = new UserDto();
    userDto.id = user?.id ? user?.id : null;
    userDto.email = user?.email;
    userDto.role = user?.role;
    userDto.profile = user?.profile;
    userDto.permissions = user?.permissions;
    return userDto;
  }

  async mapToUserDtoAsync(user: any): Promise<UserDto> {
    const userDto = new UserDto();
    userDto.id = user?.id ? user?.id : null;
    userDto.email = user?.email;
    userDto.role = user?.role;
    userDto.profile = user?.profile;
    userDto.permissions = await this.assignPermissions(userDto.id);
    return userDto;
  }
}
