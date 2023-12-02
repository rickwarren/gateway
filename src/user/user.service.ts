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
      return this.getToken(user);
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
  async getToken(user: User): Promise<TokenResponseDto> {
    const payload = {
      sub: user.id,
      email: user.email,
      user: user.id,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload);

    return { token: token };
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
  async getUsersService(): Promise<UserDto[]> {
    const users = await getUsers({}, { baseURL: 'http://localhost:8080' });
    let usersDto: UserDto[];
    users.users.forEach((user) => {
      usersDto.push(this.mapToUserDto(user));
    });
    return usersDto;
  }

  /**
   * Retrieves a user by their ID asynchronously.
   *
   * @param {number} userId - The ID of the user.
   * @return {Promise<UserDto>} A promise that resolves to the user data.
   */
  async getUserService(userId: UserId): Promise<UserDto> {
    return this.mapToUserDto(
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
    return this.mapToUserDto(
      await createUser(data, { baseURL: 'http://localhost:8080' }),
    );
  }

  /**
   * Deletes a user by their ID.
   *
   * @param {number} userId - The ID of the user to delete.
   * @return {Promise<boolean>} A boolean indicating if the user was successfully deleted.
   */
  async deleteUserService(userId: number): Promise<DeleteUserResponseDto> {
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
    return this.mapToUserDto(
      await updateUser(data, { baseURL: 'http://localhost:8080' }),
    );
  }

  mapToUserDto(user: any): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id ? user.id : null;
    userDto.email = user.email;
    userDto.role = user.role;
    return userDto;
  }
}
