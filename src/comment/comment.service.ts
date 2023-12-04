import { Injectable } from '@nestjs/common';
import {
  CreateCommentDto,
  UpdateCommentDto,
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from '../../../post-rpc/src/protos/comment.pb';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor() {}

  /**
   * Retrieves the comments.
   *
   * @return {Promise<any>} A promise that resolves to an array of comments.
   */
  async getCommentsService(): Promise<CommentDto[]> {
    const comments = await getComments(
      {},
      { baseURL: 'http://localhost:8081' },
    );
    comments.comments.map((comment) => {
      const temp = this.mapToCommentDto(comment);
      return temp;
    });
    return comments.comments;
  }

  /**
   * Retrieves a comment by its ID.
   *
   * @param {string} id - The ID of the comment.
   * @return {Promise<any>} A Promise that resolves to the comment.
   */
  async getCommentService(id: string): Promise<CommentDto> {
    return this.mapToCommentDto(
      await getComment({ id: id }, { baseURL: 'http://localhost:8081' }),
    );
  }

  /**
   * Creates a comment.
   *
   * @param {CreateCommentDto} data - The data for creating the comment.
   * @returns {Promise<any>} A promise that resolves with the created comment.
   */
  async createCommentService(data: CreateCommentDto): Promise<CommentDto> {
    return this.mapToCommentDto(
      await createComment(data, { baseURL: 'http://localhost:8081' }),
    );
  }

  /**
   * Updates a comment.
   *
   * @param {UpdateCommentDto} data - The data for updating the comment.
   * @return {Promise<any>} A promise that resolves with the updated comment.
   */
  async updateCommentService(data: UpdateCommentDto): Promise<CommentDto> {
    return this.mapToCommentDto(
      await updateComment(data, { baseURL: 'http://localhost:8081' }),
    );
  }

  /**
   * Deletes a comment.
   *
   * @param {string} id - The ID of the comment to be deleted.
   * @return {any} A promise that resolves with the result of the delete operation.
   */
  async deleteCommentService(id: string): Promise<boolean> {
    const success = await deleteComment(
      { id: id },
      { baseURL: 'http://localhost:8081' },
    );
    return success.success;
  }

  mapToCommentDto(comment: any): CommentDto {
    const commentDto = new CommentDto();
    commentDto.id = comment?.id ? comment?.id : null;
    commentDto.authorId = comment?.authorId;
    commentDto.message = comment?.message;
    commentDto.attachment = comment?.attachment;
    commentDto.postId = comment?.postId;
    return commentDto;
  }
}
