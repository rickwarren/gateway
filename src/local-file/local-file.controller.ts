import { Controller, Delete, Get, Param, Post, StreamableFile, UploadedFile, UseInterceptors, Response } from '@nestjs/common';
import { LocalFileService } from './local-file.service';
import { DeleteLocalFileResponseDto } from './dto/deleteLocalFileResponse.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response as Res } from 'express';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('upload')
export class LocalFileController {
    constructor(private readonly localFileService: LocalFileService) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get(':id')
    async getLocalFile(@Param('id') id: string, @Response({ passthrough: true }) res: Res) {
        const file = await this.localFileService.getLocalFileService(id);
        const stream = createReadStream(join(process.cwd(), file.path));
     
        res.set({
          'Content-Disposition': `inline; filename="${file.filename}"`,
          'Content-Type': file.mimetype
        })

        return new StreamableFile(stream);
    }

    @Post('dummy')
    createDummy() {
        return { success: true };
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads'
        })
    }))
    createLocalFile(@UploadedFile() file: Express.Multer.File) {
        return this.localFileService.createLocalFileService(file);
    }

    @Post('video')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads'
        })
    }))
    createLocalVideoFile(@UploadedFile() file: Express.Multer.File) {
        return this.localFileService.createLocalVideoFileService(file);
    }

    @Delete(':id')
    deleteLocalFile(@Param('id') id: string): Promise<DeleteLocalFileResponseDto> {
        return this.localFileService.deleteLocalFileService(id);
    }
}
