import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto, DeleteVideoResponseDto, VideoDto } from '../../../user-rpc/src/protos/video.pb';

@Controller('video')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}

    @Get('all/:userId')
    async getVideos(@Param('userId') userId: string): Promise<VideoDto[]> {
        return await this.videoService.getVideosService(userId);
    }

    @Get(':id')
    async getVideo(@Param('id') id: string): Promise<VideoDto> {
        return await this.videoService.getVideoService(id);
    }

    @Post()
    async createVideo(@Body() createVideoDto: CreateVideoDto): Promise<VideoDto> {
        return await this.videoService.createVideoService(createVideoDto);
    }

    @Delete(':id')
    async deleteVideo(@Param('id') id: string): Promise<DeleteVideoResponseDto> {
        return await this.videoService.deleteVideoService(id);
    }
}
