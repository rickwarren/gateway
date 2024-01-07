import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserCorporationService } from './user-corporation.service';
import { CreateUserCorporationDto, DeleteUserCorporationResponseDto, UserCorporationDto } from '../../../friend-rpc/src/protos/user-corporation.pb';

@Controller('user-corporation')
export class UserCorporationController {
    constructor(private readonly userCorporationService: UserCorporationService) {}

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
