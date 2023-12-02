import { Injectable } from '@nestjs/common';
import {
  getProfile,
  getProfiles,
  createProfile,
  deleteProfile,
  updateProfile,
  DeleteProfileResponseDto,
  UpdateProfileDto,
  CreateProfileDto,
} from '../../../user-rpc/src/protos/profile.pb';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor() {}

  /**
   * Retrieves the profile information for a given ID.
   *
   * @param {number} id - The ID of the profile to retrieve.
   * @return {Promise<any>} A promise that resolves to the profile information.
   */
  async getProfileService(id: number): Promise<ProfileDto> {
    return this.mapToProfileDto(
      await getProfile({ id: id }, { baseURL: 'http://localhost:8080' }),
    );
  }

  /**
   * Find profiles with the given data.
   *
   * @param {any} data - The data used to find profiles.
   * @return {any} The result of the find operation.
   */
  async getProfilesService(): Promise<ProfileDto[]> {
    const profiles = await getProfiles(
      {},
      { baseURL: 'http://localhost:8080' },
    );
    profiles.profiles.map((profile) => {
      profile = this.mapToProfileDto(profile);
      return profile;
    });
    return profiles.profiles;
  }

  /**
   * Creates a profile using the given data.
   *
   * @param {any} data - The data for creating the profile.
   * @return {any} - A promise that resolves with the result of creating the profile.
   */
  async createProfileService(data: CreateProfileDto): Promise<ProfileDto> {
    return this.mapToProfileDto(
      await createProfile(data, { baseURL: 'http://localhost:8080' }),
    );
  }

  /**
   * Updates the profile with the given data.
   *
   * @param {any} data - The data to update the profile with.
   * @return {any} Returns the result of the update.
   */
  async updateProfileService(data: UpdateProfileDto): Promise<ProfileDto> {
    return this.mapToProfileDto(
      await updateProfile(data, { baseURL: 'http://localhost:8080' }),
    );
  }

  /**
   * Deletes a profile based on the given ID.
   *
   * @param {number} id - The ID of the profile to be deleted.
   * @return {Promise<any>} A promise that resolves with the result of the delete operation.
   */
  async deleteProfileService(id: number): Promise<DeleteProfileResponseDto> {
    return await deleteProfile(
      { id: id },
      { baseURL: 'http://localhost:8080' },
    );
  }

  mapToProfileDto(data: any): ProfileDto {
    const profileDto = new ProfileDto();
    profileDto.id = data.id ? data.id : null;
    profileDto.firstName = data.firstName;
    profileDto.lastName = data.lastName;
    profileDto.dateOfBirth = data.dateOfBirth;
    profileDto.profession = data.profession;
    profileDto.employer = data.employer;
    profileDto.dateHired = data.dateHired;
    profileDto.employmentStatus = data.employmentStatus;
    profileDto.relationshipStatus = data.relationshipStatus;
    profileDto.hometown = data.hometown;
    profileDto.city = data.city;
    profileDto.province = data.province;
    profileDto.country = data.country;
    profileDto.language = data.language;
    profileDto.mobilePhone = data.mobilePhone;
    return profileDto;
  }
}
