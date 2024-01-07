import { Injectable } from '@nestjs/common';
import { CreateUserCharityDto, DeleteUserCharityResponseDto, UserCharityDto, createUserCharity, deleteUserCharity, getUserCharities } from '../../../friend-rpc/src/protos/user-charity.pb';

@Injectable()
export class UserCharityService {

    async getUserCharitiesService(id: string): Promise<UserCharityDto[]> {
        const response = await getUserCharities(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
        return response.userCharities;
    }

    async createUserCharityService(data: CreateUserCharityDto): Promise<UserCharityDto> {
        return await createUserCharity(
            data,
            { baseURL: 'http://localhost:8080' },
        );
    }

    async deleteUserCharityService(id: string): Promise<DeleteUserCharityResponseDto> {
        return await deleteUserCharity(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
    }
}
