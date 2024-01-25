import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CorporationOwnerService } from './corporation-owner.service';
import { AuthGuard } from '../auth/auth.guard';
import { CorporationOwnerDto, CreateCorporationOwnerDto, DeleteCorporationOwnerResponseDto, GetCorporationOwnersResponseDto } from '../../../friend-rpc/src/protos/corporation-owner.pb';

@Controller('corporation-owner')
export class CorporationOwnerController {
    constructor(private readonly corporationOwnerService: CorporationOwnerService) {}

    @UseGuards(AuthGuard)
    @Get(':id')
    async getCorporationOwners(@Param('id') id: string): Promise<GetCorporationOwnersResponseDto> {
        return await this.corporationOwnerService.getCorporationOwnersService(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async createCorporationOwner(@Body() createCorporationOwnerDto: CreateCorporationOwnerDto): Promise<CorporationOwnerDto> {
        return await this.corporationOwnerService.createCorporationOwnerService(createCorporationOwnerDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteCorporationOwner(@Param('id') id: string): Promise<DeleteCorporationOwnerResponseDto> {
        return await this.corporationOwnerService.deleteCorporationOwnerService(id);
    }
}