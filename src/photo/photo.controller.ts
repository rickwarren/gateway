import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get('all/:userId')
    async getPhotos(@Param('userId') userId: string) {
        return await this.photoService.getPhotosService(userId);
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get(':id')
    async getPhoto(@Param('id') id: string) {
        return await this.photoService.getPhotoService(id);
    }

    @Post()
    async createPhoto(@Body() createPhotoDto: CreatePhotoDto) {
        return await this.photoService.createPhotoService(createPhotoDto);
    }

    @Delete(':id')
    async deletePhoto(@Param('id') id: string) {
        return await this.photoService.deletePhotoService(id);
    }
}
