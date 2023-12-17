import { Injectable } from '@nestjs/common';
import {
  getProfile,
  getProfiles,
  createProfile,
  deleteProfile,
  updateProfile,
  DeleteProfileResponseDto,
  CreateProfileDto,
} from '../../../user-rpc/src/protos/profile.pb';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor() {}

  /**
   * Retrieves the profile information for a given ID.
   *
   * @param {number} id - The ID of the profile to retrieve.
   * @return {Promise<any>} A promise that resolves to the profile information.
   */
  async getProfileService(userId: string): Promise<ProfileDto> {
    try {
      return await getProfile({ id: userId }, { baseURL: 'http://localhost:8080' });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find profiles with the given data.
   *
   * @param {any} data - The data used to find profiles.
   * @return {any} The result of the find operation.
   */
  async getProfilesService(): Promise<ProfileDto[]> {
    try {
      const profiles = await getProfiles(
        {},
        { baseURL: 'http://localhost:8080' },
      );
      return profiles.profiles;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a profile using the given data.
   *
   * @param {any} data - The data for creating the profile.
   * @return {any} - A promise that resolves with the result of creating the profile.
   */
  async createProfileService(data: CreateProfileDto): Promise<ProfileDto> {
    try {
      return createProfile(data, { baseURL: 'http://localhost:8080' });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates the profile with the given data.
   *
   * @param {any} data - The data to update the profile with.
   * @return {any} Returns the result of the update.
   */
  async updateProfileService(data: UpdateProfileDto): Promise<ProfileDto> {
    try {
      return await updateProfile(data, { baseURL: 'http://localhost:8080' });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a profile based on the given ID.
   *
   * @param {number} id - The ID of the profile to be deleted.
   * @return {Promise<any>} A promise that resolves with the result of the delete operation.
   */
  async deleteProfileService(id: string): Promise<DeleteProfileResponseDto> {
    try {
      return await deleteProfile(
        { id: id },
        { baseURL: 'http://localhost:8080' },
      );
    } catch (error) {
      throw error;
    }
  }
}
