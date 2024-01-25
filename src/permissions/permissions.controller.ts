import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    UseInterceptors,
    UseGuards,
  } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsDto } from './dto/permissions.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { DeletePermissionsResponseDto } from './dto/deletePermissionsResponse.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';
  
  @Controller('permissions')
  export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @UseGuards(AuthGuard)
    @Get(':userId')
    getPermissions(@Param('userId') userId: string): Promise<PermissionsDto[]> {
      return this.permissionsService.getPermissionsService(userId);
    }

    @UseGuards(AuthGuard)
    @Post()
    createPermission(@Body() data: CreatePermissionDto): Promise<PermissionsDto> {
      return this.permissionsService.createPermissionService(data);
    }
  
    @UseGuards(AuthGuard)
    @Delete(':userId')
    deletePermissions(@Param('userId') userId: string): Promise<DeletePermissionsResponseDto> {
      return this.permissionsService.deletePermissionsService(userId);
    }
  }
  