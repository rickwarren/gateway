import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CharityService } from './charity.service';
import { CharityDto, CreateCharityDto, DeleteCharityResponseDto, UpdateCharityDto } from '../../../friend-rpc/src/protos/charity.pb';

@Controller('charity')
export class CharityController {
    constructor(private readonly charityService: CharityService) {}
    
    @Get('all')
    async getCharities(): Promise<CharityDto[]> {
        return await this.charityService.getCharitiesService();
    }

    @Get(':id')
    async getCharity(@Param('id') id: string): Promise<CharityDto> {
        return await this.charityService.getCharityService(id);
    }

    @Post()
    async createCharity(@Body() createCharityDto: CreateCharityDto): Promise<CharityDto> {
        return await this.charityService.createCharityService(createCharityDto);
    }

    @Put()
    async updateCharity(@Body() updateCharityDto: UpdateCharityDto): Promise<CharityDto> {
        return await this.charityService.updateCharityService(updateCharityDto);
    }

    @Delete(':id')
    async deleteCharity(@Param('id') id: string): Promise<DeleteCharityResponseDto> {
        return await this.charityService.deleteCharityService(id);
    }

}
