import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UserCharityService } from './user-charity.service';
import { CreateUserCharityDto, DeleteUserCharityResponseDto, UserCharityDto } from '../../../friend-rpc/src/protos/user-charity.pb';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('user-charity')
export class UserCharityController {
    constructor(private readonly userCharityService: UserCharityService) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get('all/:id')
    getUserCharities(@Param('id') id: string): Promise<UserCharityDto[]> {
        return this.userCharityService.getUserCharitiesService(id);
    }

    @Post()
    createUserCharity(@Body() data: CreateUserCharityDto): Promise<UserCharityDto> {
        return this.userCharityService.createUserCharityService(data);
    }

    @Delete(':id')
    deleteUserCharity(@Param('id') id: string): Promise<DeleteUserCharityResponseDto> {
        return this.userCharityService.deleteUserCharityService(id);
    }
}
