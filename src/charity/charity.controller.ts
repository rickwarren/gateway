import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CharityService } from './charity.service';
import { CharityDto, CreateCharityDto, DeleteCharityResponseDto, UpdateCharityDto } from '../../../friend-rpc/src/protos/charity.pb';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';

@Controller('charity')
export class CharityController {
    constructor(private readonly charityService: CharityService) {}
    
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @UseGuards(AuthGuard)
    @Get('all')
    async getCharities(): Promise<CharityDto[]> {
        return await this.charityService.getCharitiesService();
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @UseGuards(AuthGuard)
    @Get(':id')
    async getCharity(@Param('id') id: string): Promise<CharityDto> {
        return await this.charityService.getCharityService(id);
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @UseGuards(AuthGuard)
    @Get('name/:name')
    async getCharityByName(@Param('name') name: string): Promise<CharityDto> {
        return await this.charityService.getCharityByNameService(name);
    }

    @UseGuards(AuthGuard)
    @Post()
    async createCharity(@Body() createCharityDto: CreateCharityDto): Promise<CharityDto> {
        return await this.charityService.createCharityService(createCharityDto);
    }

    @UseGuards(AuthGuard)
    @Put()
    async updateCharity(@Body() updateCharityDto: UpdateCharityDto): Promise<CharityDto> {
        return await this.charityService.updateCharityService(updateCharityDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteCharity(@Param('id') id: string): Promise<DeleteCharityResponseDto> {
        return await this.charityService.deleteCharityService(id);
    }

}
