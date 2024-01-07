import { Injectable } from '@nestjs/common';
import { CorporationDto, CreateCorporationDto, DeleteCorporationResponseDto, UpdateCorporationDto, createCorporation, deleteCorporation, getCorporation, getCorporations, updateCorporation } from '../../../friend-rpc/src/protos/corporation.pb';

@Injectable()
export class CorporationService {

    async getCorporationsService(): Promise<CorporationDto[]> {
        const response = await getCorporations(
            {},
            { baseURL: 'http://localhost:8080' },
        );
        return response.corporations;
    }

    async getCorporationService(id: string): Promise<CorporationDto> {
        return await getCorporation(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
    }

    async createCorporationService(data: CreateCorporationDto): Promise<CorporationDto> {
        return await createCorporation(
            data,
            { baseURL: 'http://localhost:8080' },
        );
    }

    async updateCorporationService(data: UpdateCorporationDto): Promise<CorporationDto> {
        return await updateCorporation(
            data,
            { baseURL: 'http://localhost:8080' },
        );
    }

    async deleteCorporationService(id: string): Promise<DeleteCorporationResponseDto> {
        return await deleteCorporation(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
    }
}
