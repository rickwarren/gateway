import { Injectable } from '@nestjs/common';
import { 
    CreateVidDto, 
    DeleteVidResponseDto, 
    UpdateVidDto, 
    VidDto, 
    createVid, 
    deleteVid, 
    getVid, 
    getVids, 
    updateVid
} from '../../../user-rpc/src/protos/vid.pb';

@Injectable()
export class VideoService {

    async getVideosService(userId: string): Promise<VidDto[]> {
        const response = await getVids(
            { id: userId },
            { baseURL: 'http://localhost:8080' },
        );
        return response.vids;
    }

    async getVideoService(id: string): Promise<VidDto> {
        return await getVid(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
    }

    async createVideoService(data: CreateVidDto): Promise<VidDto> {
        return await createVid(
            data,
            { baseURL: 'http://localhost:8080' },
        );
    }

    async updateVideoService(data: UpdateVidDto): Promise<VidDto> {
        return await updateVid(
            data,
            { baseURL: 'http://localhost:8080' },
        );
    }

    async deleteVideoService(id: string): Promise<DeleteVidResponseDto> {
        return await deleteVid(
            { id: id },
            { baseURL: 'http://localhost:8080' },
        );
    }
}
