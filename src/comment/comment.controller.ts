import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * Retrieves the comments from the comment service.
   *
   * @return {any} The comments retrieved from the comment service.
   */
  @Get('all')
  getComments(): Promise<CommentDto[]> {
    return this.commentService.getCommentsService();
  }

  /**
   * Retrieves a comment by its ID.
   *
   * @param {string} id - The ID of the comment to retrieve.
   * @return {Comment} The retrieved comment.
   */
  @Get(':id')
  getComment(@Param('id') id: string): Promise<CommentDto> {
    return this.commentService.getCommentService(id);
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
}
