import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    UseInterceptors,
  } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsDto } from './dto/permissions.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { DeletePermissionsResponseDto } from './dto/deletePermissionsResponse.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
  
  @Controller('permissions')
  export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get(':userId')
    getPermissions(@Param('userId') userId: string): Promise<PermissionsDto[]> {
      return this.permissionsService.getPermissionsService(userId);
    }

    @Post()
    createPermission(@Body() data: CreatePermissionDto): Promise<PermissionsDto> {
      return this.permissionsService.createPermissionService(data);
    }
  
    @Delete(':userId')
    deletePermissions(@Param('userId') userId: string): Promise<DeletePermissionsResponseDto> {
      return this.permissionsService.deletePermissionsService(userId);
    }
  }
  