import { Injectable } from '@nestjs/common';
import { CreateUserCorporationDto, DeleteUserCorporationResponseDto, UserCorporationDto, createUserCorporation, deleteUserCorporation, getUserCorporations } from '../../../friend-rpc/src/protos/user-corporation.pb';

@Injectable()
export class UserCorporationService {

    async getUserCorporationsService(id: string): Promise<UserCorporationDto[]> {
        const response = await getUserCorporations(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
        return response.userCorporations;
    }

    async createUserCorporationService(data: CreateUserCorporationDto): Promise<UserCorporationDto> {
        return await createUserCorporation(
            data,
            { baseURL: 'http://localhost:8080' },
        );
    }

    async deleteUserCorporationService(id: string): Promise<DeleteUserCorporationResponseDto> {
        return await deleteUserCorporation(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
    }
}
