import { Injectable } from '@nestjs/common';
import { CorporationOwnerDto, CreateCorporationOwnerDto, DeleteCorporationOwnerResponseDto, GetCorporationOwnersResponseDto, createCorporationOwner, deleteCorporationOwner, getCorporationOwners } from '../../../friend-rpc/src/protos/corporation-owner.pb';

@Injectable()
export class CorporationOwnerService {
    async getCorporationOwnersService(id: string): Promise<GetCorporationOwnersResponseDto> {
        return await getCorporationOwners(
            { id: id },
            { baseURL: 'http://localhost:8082' },
        );
    }

    async createCorporationOwnerService(data: CreateCorporationOwnerDto): Promise<CorporationOwnerDto> {
        return await createCorporationOwner(
            data,
            { baseURL: 'http://localhost:8082' },
        );
    }

    async deleteCorporationOwnerService(id: string): Promise<DeleteCorporationOwnerResponseDto> {
        return await deleteCorporationOwner(
            { id: id },
            { baseURL: 'http://localhost:8082' },
        );
    }
}
