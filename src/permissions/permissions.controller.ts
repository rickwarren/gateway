import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
  } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsDto } from './dto/permissions.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { DeletePermissionsResponseDto } from './dto/deletePermissionsResponse.dto';
  
  @Controller('permissions')
  export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

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
  