import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserCorporationService } from './user-corporation.service';
import { CreateUserCorporationDto, DeleteUserCorporationResponseDto, UserCorporationDto } from '../../../friend-rpc/src/protos/user-corporation.pb';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user-corporation')
export class UserCorporationController {
    constructor(private readonly userCorporationService: UserCorporationService) {}

    @UseGuards(AuthGuard)
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get('all/:id')
    getUserCorporations(@Param('id') id: string): Promise<UserCorporationDto[]> {
        return this.userCorporationService.getUserCorporationsService(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    createUserCorporation(@Body() data: CreateUserCorporationDto): Promise<UserCorporationDto> {
        return this.userCorporationService.createUserCorporationService(data);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteUserCorporation(@Param('id') id: string): Promise<DeleteUserCorporationResponseDto> {
        return this.userCorporationService.deleteUserCorporationService(id);
    }
}
