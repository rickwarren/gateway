import { Injectable } from '@nestjs/common';
import { CharityDto, CreateCharityDto, UpdateCharityDto, createCharity, getCharities, getCharity, updateCharity } from '../../../friend-rpc/src/protos/charity.pb';
import { DeleteVideoResponseDto, deleteVideo } from '../../../user-rpc/src/protos/video.pb';

@Injectable()
export class CharityService {

    async getCharitiesService(): Promise<CharityDto[]> {
        const response = await getCharities(
            { },
            { baseURL: 'http://localhost:8080' },
        );
        return response.charities;
    }

    async getCharityService(id: string): Promise<CharityDto> {
        return await getCharity(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
    }

    async createCharityService(data: CreateCharityDto): Promise<CharityDto> {
        return await createCharity(
            data,
            { baseURL: 'http://localhost:8080' },
        );
    }

    async updateCharityService(data: UpdateCharityDto): Promise<CharityDto> {
        return await updateCharity(
            data,
            { baseURL: 'http://localhost:8080' },
        );
    }

    async deleteCharityService(id: string): Promise<DeleteVideoResponseDto> {
        return await deleteVideo(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
    }
}
