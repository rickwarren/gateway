import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserCharityService } from './user-charity.service';
import { CreateUserCharityDto, DeleteUserCharityResponseDto, UserCharityDto } from '../../../friend-rpc/src/protos/user-charity.pb';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user-charity')
export class UserCharityController {
    constructor(private readonly userCharityService: UserCharityService) {}

    @UseGuards(AuthGuard)
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get('all/:id')
    getUserCharities(@Param('id') id: string): Promise<UserCharityDto[]> {
        return this.userCharityService.getUserCharitiesService(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    createUserCharity(@Body() data: CreateUserCharityDto): Promise<UserCharityDto> {
        return this.userCharityService.createUserCharityService(data);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteUserCharity(@Param('id') id: string): Promise<DeleteUserCharityResponseDto> {
        return this.userCharityService.deleteUserCharityService(id);
    }
}
