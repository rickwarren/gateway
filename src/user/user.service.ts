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
  UserDto,
  getUserByUrlString
} from '../../../user-rpc/src/protos/user.pb';
import { UserLoginDto } from './dto/user-login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { getPermissions } from '../../../user-rpc/src/protos/permissions.pb';
import { getProfile } from '../../../user-rpc/src/protos/profile.pb';
import { jwtDecode } from "jwt-decode";

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
    try {
      const user = await getUserByEmail(
        { email: data.email },
        { baseURL: 'http://localhost:8080' },
      );
      if(user) {
        user.profile = await getProfile(
          { id: user.id },
          { baseURL: 'http://localhost:8080' },
        );
        if (await this.validatePassword(data.password, user.password)) {
          return {
            id: user.id,
            token: await this.getToken(user),
            permissions: await this.assignPermissions(user.id),
            roles: user.role,
            userModel: user
          }
        } else {
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async userAuthService(data: jwt.JwtPayload) {
    const decoded = jwtDecode(data.token);
    try {
      const user = await getUser(
        { id: decoded.sub},
        { baseURL: 'http://localhost:8080' },
      );
      if(user == undefined) { return }
      user.profile = await getProfile(
        { id: user.id },
        { baseURL: 'http://localhost:8080' },
      );
      return {
        id: user.id,
        userModel: user,
        token:  data.token,
        permissions: await this.assignPermissions(user.id),
        role: user.role
      };
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Generates a token response DTO for the given user.
   *
   * @param {User} user - The user object for which to generate the token response.
   * @return {Promise<TokenResponseDto>} - The token response DTO containing the generated token.
   */
  async getToken(user: UserDto): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      id: user.id,
      role: user.role,
    };
    try {
      const token = await jwt.sign(payload, 'secretkey', {
        algorithm: 'HS256',
        expiresIn: '1day', 
      });
      return token;
    } catch (error) {
      console.log(error);
    }
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
    const user = await getUser(
      { id: userId.id },
      { baseURL: 'http://localhost:8080' },
    );
    if(user == undefined) { return }
    user.profile = await getProfile(
      { id: user.id },
      { baseURL: 'http://localhost:8080' },
    );
    return user;
  }

  async getUserByUrlStringService(urlString: string): Promise<UserDto> {
    try {
    const user = await getUserByUrlString(
      { urlString: urlString },
      { baseURL: 'http://localhost:8080' },
    );
    if(user == undefined) { return }
    user.profile = await getProfile(
      { id: user.id },
      { baseURL: 'http://localhost:8080' },
    );
    return user;
    } catch(e) {
      throw Error(e);
    }
  }

  /**
   * Creates a new user.
   *
   * @param {CreateUserDto} data - The data for creating the user.
   * @return {Promise<UserDto>} The created user.
   */
  async createUserService(data: CreateUserDto): Promise<UserDto> {
    return await createUser(data, { baseURL: 'http://localhost:8080' });
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
    return await updateUser(data, { baseURL: 'http://localhost:8080' });
  }

  async assignPermissions(userId: string): Promise<string[]> {
    const permissions = await getPermissions(
      { id: userId }, 
      { baseURL: 'http://localhost:8080' }
    );
    if(permissions) {
      const perm: string[] = permissions.permissions.map((permission) => {
        return permission.permission;
      });
      return perm;
    }
  }

  urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            // tslint:disable-next-line:no-string-throw
            throw 'Illegal base64url string!';
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
}

decodeToken(token: string = '') {
    if (token === null || token === '') { return { 'upn': '' }; }
    const parts = token.split('.');
    if (parts.length !== 3) {

        throw new Error('JWT must have 3 parts');
    }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
        throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }
}
