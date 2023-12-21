import { Injectable } from '@nestjs/common';
import { getLocalFile, createLocalFile, deleteLocalFile } from '../../../user-rpc/src/protos/local-file.pb';
import { LocalFileDto } from './dto/local-file.dto';
import { DeleteLocalFileResponseDto } from './dto/deleteLocalFileResponse.dto';

@Injectable()
export class LocalFileService {
    async getLocalFileService(fileId: string): Promise<LocalFileDto> {
        return await getLocalFile(
            { id: fileId },
            { baseURL: 'http://localhost:8080' },
        );
    }

    async createLocalFileService(file: Express.Multer.File): Promise<LocalFileDto> {
        return await createLocalFile({ 
                filename: file.originalname,
                path: file.path,
                mimetype: file.mimetype,
            },
            { baseURL: 'http://localhost:8080' },
        );
    }

    async deleteLocalFileService(fileId: string): Promise<DeleteLocalFileResponseDto> {
        return await deleteLocalFile(
            { id: fileId },
            { baseURL: 'http://localhost:8080' },
        );
    }
}
