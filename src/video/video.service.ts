import { Injectable } from '@nestjs/common';
import { CreateVideoDto, DeleteVideoResponseDto, VideoDto, createVideo, deleteVideo, getVideo, getVideos } from '../../../user-rpc/src/protos/video.pb';

@Injectable()
export class VideoService {

    async getVideosService(userId: string): Promise<VideoDto[]> {
        const response = await getVideos(
            { id: userId },
            { baseURL: 'http://localhost:8080' },
        );
        return response.videos;
    }

    async getVideoService(id: string): Promise<VideoDto> {
        return await getVideo(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
    }

    async createVideoService(data: CreateVideoDto): Promise<VideoDto> {
        return await createVideo(
            data,
            { baseURL: 'http://localhost:8080' },
        );
    }

    async deleteVideoService(id: string): Promise<DeleteVideoResponseDto> {
        return await deleteVideo(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
    }
}
