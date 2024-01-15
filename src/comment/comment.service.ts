import { Injectable } from '@nestjs/common';
import {
  CreateCommentDto,
  UpdateCommentDto,
  createComment,
  deleteComment,
  getComments,
  updateComment,
  CommentDto,
  getCommentsForPost,
} from '../../../post-rpc/src/protos/comment.pb';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CommentService {
  constructor(private readonly httpService: HttpService) {}

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
    return comments.comments;
  }

  /**
       * Retrieves comments for a specific post by making a request to the server.
       * 
       * @param id - The ID of the post for which to retrieve the comments.
       * @returns An array of CommentDto objects representing the comments for the specified post.
       * @throws Error if there is an error retrieving the comments.
       * 
       * @example
       * const commentService = new CommentService();
       * const postId = '12345';
       * const comments = await commentService.getCommentsForPostService(postId);
       * console.log(comments);
       * 
       * In this example, we create an instance of the CommentService class and call the getCommentsForPostService method with a post ID.
       * The method makes a request to the server to retrieve the comments for the specified post.
       * The returned comments are then logged to the console.
       */
  async getCommentsForPostService(postId: string): Promise<CommentDto[]> {
      const comments = await getCommentsForPost(
          { id: postId },
          { baseURL: 'http://localhost:8081' },
      );
      return comments.comments;
  }

  /**
   * Creates a comment.
   *
   * @param {CreateCommentDto} data - The data for creating the comment.
   * @returns {Promise<any>} A promise that resolves with the created comment.
   */
  async createCommentService(data: CreateCommentDto): Promise<CommentDto> {
    return await createComment(data, { baseURL: 'http://localhost:8081' });
  }

  /**
   * Updates a comment.
   *
   * @param {UpdateCommentDto} data - The data for updating the comment.
   * @return {Promise<any>} A promise that resolves with the updated comment.
   */
  async updateCommentService(data: UpdateCommentDto): Promise<CommentDto> {
    return await updateComment(data, { baseURL: 'http://localhost:8081' });

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

  async uploadCommentImage(
    image: Express.Multer.File,
  ): Promise<any> {
    const formData = new FormData();
    formData.append('image', image.buffer.toString('base64'));
    return await this.httpService.post<any>(`https://api.imgbb.com/1/upload?key=${process.env.IMG_API_KEY}`, formData);
  }
}
