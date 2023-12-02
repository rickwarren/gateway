import * as protoscript from 'protoscript';

export class UpdateProfileDto {
  id: number;
  ownerId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  profession: string;
  employer: string;
  dateHired: string;
  employmentStatus: string;
  relationshipStatus: string;
  profilePhoto: string;
  bannerImage: string;
  hometown: string;
  city: string;
  province: string;
  country: string;
  language: string;
  mobilePhone: string;
  visibility: string;
  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
