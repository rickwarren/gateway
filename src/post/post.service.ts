import { Injectable } from '@nestjs/common';
import {
  CreatePostDto,
  UpdatePostDto,
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../../../post-rpc/src/protos/post.pb';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor() {}

  /**
   * Retrieves the posts.
   *
   * @param {number} userId - The ID of the user for retrieving posts.
   * @return {Promise<PostDto[]>} A Promise that resolves to an array of PostDto objects representing the retrieved posts.
   */
  async getPostsService(userId: number): Promise<PostDto[]> {
    const posts = await getPosts(userId, { baseURL: 'http://localhost:8081' });
    let postsDto: PostDto[];
    posts.posts.forEach((post) => {
      postsDto.push(this.mapToPostDto(post));
    });
    return postsDto;
  }

  /**
   * Retrieves a post by its ID.
   *
   * @param {number} id - The ID of the post to retrieve.
   * @return {Promise<PostDto>} A Promise that resolves to a PostDto object representing the retrieved post.
   */
  async getPostService(id: number): Promise<PostDto> {
    return this.mapToPostDto(
      await getPost({ id: id }, { baseURL: 'http://localhost:8081' }),
    );
  }

  /**
   * Creates a new post.
   *
   * @param {CreatePostDto} data - The data for creating the post.
   * @return {Promise<PostDto>} A Promise that resolves to a PostDto object representing the created post.
   */
  async createPostService(data: CreatePostDto): Promise<PostDto> {
    return this.mapToPostDto(
      await createPost(data, { baseURL: 'http://localhost:8081' }),
    );
  }

  /**
   * Updates a post by sending a request to the 'post.update.rpc' endpoint.
   *
   * @param {UpdatePostDto} data - The data object containing the post information to be updated.
   * @return {Promise<PostDto>} A Promise that resolves to a PostDto object representing the updated post data.
   */
  async updatePostService(data: UpdatePostDto): Promise<PostDto> {
    return this.mapToPostDto(
      await updatePost(data, { baseURL: 'http://localhost:8081' }),
    );
  }

  /**
   * Deletes a post with the given ID.
   *
   * @param {number} id - The ID of the post to be deleted.
   * @return {Promise<boolean>} A Promise that resolves to a boolean value indicating whether the post was successfully deleted.
   */
  async deletePostService(id: number): Promise<boolean> {
    const success = await deletePost(
      { id: id },
      { baseURL: 'http://localhost:8081' },
    );
    return success.success;
  }

  /**
   * Maps the response data to a PostDto object.
   *
   * @param {any} post - The response data representing a post.
   * @return {PostDto} The mapped PostDto object.
   */
  mapToPostDto(post: any): PostDto {
    const postDto = new PostDto();
    postDto.id = post.id ? post.id : null;
    postDto.authorId = post.authorId;
    postDto.message = post.message;
    postDto.attachment = post.attachment;
    return postDto;
  }
}
