import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Get('all/:userId')
    async getPhotos(@Param('userId') userId: string) {
        return await this.photoService.getPhotosService(userId);
    }

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
