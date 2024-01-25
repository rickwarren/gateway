import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto, CreateCommentDto, UpdateCommentDto } from '../../../post-rpc/src/protos/comment.pb';
import { FileInterceptor } from '@nestjs/platform-express';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * Retrieves the comments from the comment service.
   *
   * @return {any} The comments retrieved from the comment service.
   */
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AuthGuard)
  @Get('all')
  getComments(): Promise<CommentDto[]> {
    return this.commentService.getCommentsService();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AuthGuard)
  @Get('post/:id')
  getCommentsForPost(@Param('id') id: string): Promise<CommentDto[]> {
    return this.commentService.getCommentsForPostService(id);
  }

  /**
   * Creates a comment.
   *
   * @param {CreateCommentDto} data - The data needed to create the comment.
   * @return {any} Returns the created comment.
   */
  @UseGuards(AuthGuard)
  @Post()
  createComment(@Body() data: CreateCommentDto): Promise<CommentDto> {
    return this.commentService.createCommentService(data);
  }

  /**
   * Updates a comment.
   *
   * @param {UpdateCommentDto} data - The data for updating the comment.
   * @return {any} - The updated comment.
   */
  @UseGuards(AuthGuard)
  @Put()
  updateComment(@Body() data: UpdateCommentDto): Promise<CommentDto> {
    return this.commentService.updateCommentService(data);
  }

  /**
   * Deletes a comment with the given ID.
   *
   * @param {string} id - The ID of the comment to delete.
   * @return {any} - The result of the delete operation.
   */
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteComment(@Param('id') id: string): Promise<boolean> {
    return this.commentService.deleteCommentService(id);
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.commentService.uploadCommentImage(file);
  }
}
