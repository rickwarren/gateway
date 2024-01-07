import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CorporationService } from './corporation.service';
import { CreateCorporationDto, DeleteCorporationResponseDto, UpdateCorporationDto, CorporationDto } from '../../../friend-rpc/src/protos/corporation.pb';

@Controller('corporation')
export class CorporationController {
    constructor(private readonly corporationService: CorporationService) {}

    @Get('all')
    async getCorporations(): Promise<CorporationDto[]> {
        return await this.corporationService.getCorporationsService();
    }

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
