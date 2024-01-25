import { Injectable } from '@nestjs/common';
import { CharityDto, CreateCharityDto, DeleteCharityResponseDto, UpdateCharityDto, createCharity, deleteCharity, getCharities, getCharity, getCharityByName, updateCharity } from '../../../friend-rpc/src/protos/charity.pb';

@Injectable()
export class CharityService {

    async getCharitiesService(): Promise<CharityDto[]> {
        const response = await getCharities(
            { },
            { baseURL: 'http://localhost:8082' },
        );
        return response.charities;
    }

    async getCharityService(id: string): Promise<CharityDto> {
        return await getCharity(
            { id: id },
            { baseURL: 'http://localhost:8082' },
        );
    }

    async getCharityByNameService(name: string): Promise<CharityDto> {
        return await getCharityByName(
            { name: name },
            { baseURL: 'http://localhost:8082' },
        );
    }

    async createCharityService(data: CreateCharityDto): Promise<CharityDto> {
        return await createCharity(
            data,
            { baseURL: 'http://localhost:8082' },
        );
    }

    async updateCharityService(data: UpdateCharityDto): Promise<CharityDto> {
        return await updateCharity(
            data,
            { baseURL: 'http://localhost:8082' },
        );
    }

    async deleteCharityService(id: string): Promise<DeleteCharityResponseDto> {
        return await deleteCharity(
            { id: id },
            { baseURL: 'http://localhost:8082' },
        );
    }
}
