import { Injectable } from '@nestjs/common';
import { PhotoDto } from './dto/photo.dto';
import { getPhotos, getPhoto, createPhoto, deletePhoto } from '../../../user-rpc/src/protos/photo.pb';
import { DeletePhotoResponseDto } from './dto/DeletePhotoResponse.dto';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotoService {
    async getPhotosService(userId: string): Promise<PhotoDto[]> {
        const photos = await getPhotos(
            { id: userId },
            { baseURL: 'http://localhost:8080' },
        );
        return photos.photos;
    }

    async getPhotoService(id: string): Promise<PhotoDto> {
        return await getPhoto({ id }, { baseURL: 'http://localhost:8080' });
    }

    async createPhotoService(data: CreatePhotoDto): Promise<PhotoDto> {
        return await createPhoto(data, { baseURL: 'http://localhost:8080' });
    }

    async deletePhotoService(id: string): Promise<DeletePhotoResponseDto> {
        const result = await deletePhoto({ id }, { baseURL: 'http://localhost:8080' });
        if(!result) {
            return;
        }
        return { success: true };
    }
}
