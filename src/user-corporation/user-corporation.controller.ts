import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UserCorporationService } from './user-corporation.service';
import { CreateUserCorporationDto, DeleteUserCorporationResponseDto, UserCorporationDto } from '../../../friend-rpc/src/protos/user-corporation.pb';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('user-corporation')
export class UserCorporationController {
    constructor(private readonly userCorporationService: UserCorporationService) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get('all/:id')
    getUserCorporations(@Param('id') id: string): Promise<UserCorporationDto[]> {
        return this.userCorporationService.getUserCorporationsService(id);
    }

    @Post()
    createUserCorporation(@Body() data: CreateUserCorporationDto): Promise<UserCorporationDto> {
        return this.userCorporationService.createUserCorporationService(data);
    }

    @Delete(':id')
    deleteUserCorporation(@Param('id') id: string): Promise<DeleteUserCorporationResponseDto> {
        return this.userCorporationService.deleteUserCorporationService(id);
    }
}
