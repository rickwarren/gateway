import { Injectable } from '@nestjs/common';
import { CharityOwnerDto, CreateCharityOwnerDto, DeleteCharityOwnerResponseDto, GetCharityOwnersResponseDto, createCharityOwner, deleteCharityOwner, getCharityOwners } from '../../../friend-rpc/src/protos/charity-owner.pb';

@Injectable()
export class CharityOwnerService {
    async getCharityOwnersService(id: string): Promise<GetCharityOwnersResponseDto> {
        return await getCharityOwners(
            { id: id },
            { baseURL: 'http://localhost:8082' },
        );
    }

    async createCharityOwnerService(data: CreateCharityOwnerDto): Promise<CharityOwnerDto> {
        return await createCharityOwner(
            data,
            { baseURL: 'http://localhost:8082' },
        );
    }

    async deleteCharityOwnerService(id: string): Promise<DeleteCharityOwnerResponseDto> {
        return await deleteCharityOwner(
            { id: id },
            { baseURL: 'http://localhost:8082' },
        );
    }
}
