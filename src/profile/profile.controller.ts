import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { DeleteProfileResponseDto } from './dto/deleteProfileResponse.dto';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';


@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Get the profile of a user.
   *
   * @param {number} userId - The ID of the user.
   * @return {any} The profile of the user.
   */ /*
  @Get()
  getMyProfile(@Req() req: any): Promise<ProfileDto> {
    return this.profileService.getMyProfile(req.user.user.id);
  }

  /**
   * Retrieves the profile for a given user ID.
   *
   * @param {number} userId - The ID of the user.
   * @return {any} The profile of the user.
   */
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get(':userId')
  getProfile(@Param('userId') userId: string): Promise<ProfileDto> {
    return this.profileService.getProfileService(userId);
  }

  /**
   * Finds profiles based on the provided data.
   *
   * @param {any} data - The data used to find profiles.
   * @return {any} The profiles found based on the provided data.
   */
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('all')
  getProfiles(): Promise<ProfileDto[]> {
    return this.profileService.getProfilesService();
  }

  /**
   * Creates a profile using the provided data.
   *
   * @param {CreateProfileDto} data - The data used to create the profile.
   * @return {any} The created profile.
   */
  @Post()
  createProfile(@Body() data: CreateProfileDto): Promise<ProfileDto> {
    return this.profileService.createProfileService(data);
  }

  /**
   * Updates the profile with the provided data.
   *
   * @param {UpdateProfileDto} data - The data used to update the profile.
   * @return {Promise<ProfileDto>} The updated profile.
   */
  @Put()
  updateProfile(@Body() data: UpdateProfileDto): Promise<ProfileDto> {
    return this.profileService.updateProfileService(data);
  }

  /**
   * Deletes a profile.
   *
   * @param {number} id - The ID of the profile to be deleted.
   * @return {Promise<boolean>} A promise that resolves to true if the profile is successfully deleted, or false otherwise.
   */
  @Delete(':id')
  deleteProfile(@Param('id') id: string): Promise<DeleteProfileResponseDto> {
    return this.profileService.deleteProfileService(id);
  }
}
