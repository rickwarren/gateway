import { Injectable } from '@nestjs/common';
import {
  getPermissions,
  createPermission,
  deletePermissions,
  DeletePermissionResponseDto,
  CreatePermissionDto,
} from '../../../user-rpc/src/protos/permissions.pb';
import { PermissionsDto } from './dto/permissions.dto';


@Injectable()
export class PermissionsService {
  constructor() {}

  async getPermissionsService(userId: string): Promise<PermissionsDto[]> {
    const permissions = await getPermissions({ id: userId }, { baseURL: 'http://localhost:8080' });
    let permissionsDto: PermissionsDto[];
    permissions.permissions.forEach((permission) => {
       permissionsDto.push(this.mapToPermissionsDto(permission));
    });
    return permissionsDto;
  }

  async createPermissionService(data: CreatePermissionDto): Promise<PermissionsDto> {
    return this.mapToPermissionsDto(
      await createPermission(data, { baseURL: 'http://localhost:8080' }),
    );
  }

  async deletePermissionsService(userId: string): Promise<DeletePermissionResponseDto> {
    return await deletePermissions(
      { id: userId },
      { baseURL: 'http://localhost:8080' },
    );
  }

  mapToPermissionsDto(permission: any): PermissionsDto {
    const permissionsDto = new PermissionsDto();
    permissionsDto.id = permission?.id ? permission?.id : null;
    permissionsDto.userId = permission?.userId;
    permissionsDto.permission = permission?.permission;
    return permissionsDto;
  }
}
