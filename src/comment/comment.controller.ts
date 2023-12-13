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
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { Comment } from '../../../post-rpc/src/protos/comment.pb';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * Retrieves the comments from the comment service.
   *
   * @return {any} The comments retrieved from the comment service.
   */
  @Get('all')
  getComments(): Promise<Comment[]> {
    return this.commentService.getCommentsService();
  }

  @Get('post/:id')
  getCommentsForPost(@Param('id') id: string): Promise<Comment[]> {
    return this.commentService.getCommentsForPostService(id);
  }

  /**
   * Creates a comment.
   *
   * @param {CreateCommentDto} data - The data needed to create the comment.
   * @return {any} Returns the created comment.
   */
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
  @Delete(':id')
  deleteComment(@Param('id') id: string): Promise<boolean> {
    return this.commentService.deleteCommentService(id);
  }

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
