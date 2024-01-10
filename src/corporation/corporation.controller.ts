import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CorporationService } from './corporation.service';
import { CreateCorporationDto, DeleteCorporationResponseDto, UpdateCorporationDto, CorporationDto } from '../../../friend-rpc/src/protos/corporation.pb';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('corporation')
export class CorporationController {
    constructor(private readonly corporationService: CorporationService) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get('all')
    async getCorporations(): Promise<CorporationDto[]> {
        return await this.corporationService.getCorporationsService();
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get(':id')
    async getCorporation(@Param('id') id: string): Promise<CorporationDto> {
        return await this.corporationService.getCorporationService(id);
    }

    @Post()
    async createCorporation(@Body() data: CreateCorporationDto): Promise<CorporationDto> {
        return await this.corporationService.createCorporationService(data);
    }

    @Put(':id')
    async updateCorporation(@Body() data: UpdateCorporationDto): Promise<CorporationDto> {
        return await this.corporationService.updateCorporationService(data);
    }
    
    @Delete(':id')
    async deleteCorporation(@Param('id') id: string): Promise<DeleteCorporationResponseDto> {
        return await this.corporationService.deleteCorporationService(id);
    }

}
