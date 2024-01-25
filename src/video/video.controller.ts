import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVidDto, DeleteVidResponseDto, UpdateVidDto, VidDto } from '../../../user-rpc/src/protos/vid.pb';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';

@Controller('video')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get('all/:userId')
    async getVideos(@Param('userId') userId: string): Promise<VidDto[]> {
        return await this.videoService.getVideosService(userId);
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get(':id')
    async getVideo(@Param('id') id: string): Promise<VidDto> {
        return await this.videoService.getVideoService(id);
    }

    @Post()
    async createVideo(@Body() createVideoDto: CreateVidDto): Promise<VidDto> {
        return await this.videoService.createVideoService(createVideoDto);
    }

    @Put()
    async updateVideo(@Body() updateVideoDto: UpdateVidDto): Promise<VidDto> {
        return await this.videoService.updateVideoService(updateVideoDto);
    }

    @Delete(':id')
    async deleteVideo(@Param('id') id: string): Promise<DeleteVidResponseDto> {
        return await this.videoService.deleteVideoService(id);
    }
}
