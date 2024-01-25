import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CharityOwnerService } from './charity-owner.service';
import { AuthGuard } from '../auth/auth.guard';
import { CharityOwnerDto, CreateCharityOwnerDto, DeleteCharityOwnerResponseDto, GetCharityOwnersResponseDto } from '../../../friend-rpc/src/protos/charity-owner.pb';

@Controller('charity-owner')
export class CharityOwnerController {
    constructor(private readonly charityOwnerService: CharityOwnerService) {}

    @UseGuards(AuthGuard)
    @Get(':id')
    async getCharityOwners(@Param('id') id: string): Promise<GetCharityOwnersResponseDto> {
        return await this.charityOwnerService.getCharityOwnersService(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async createCharityOwner(@Body() createCharityOwnerDto: CreateCharityOwnerDto): Promise<CharityOwnerDto> {
        return await this.charityOwnerService.createCharityOwnerService(createCharityOwnerDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteCharityOwner(@Param('id') id: string): Promise<DeleteCharityOwnerResponseDto> {
        return await this.charityOwnerService.deleteCharityOwnerService(id);
    }
}
