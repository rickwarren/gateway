import { Injectable } from '@nestjs/common';
import {
  CreatePostDto,
  DeletePostResponseDto,
  Post,
  UpdatePostDto,
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../../../post-rpc/src/protos/post.pb';
import { PostDto } from './dto/post.dto';
import { getCommentsForPost } from '../../../post-rpc/src/protos/comment.pb';
import { HttpService } from '@nestjs/axios';
import { Buffer } from 'buffer';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

class PostIdDto {
  id: string;
}

@Injectable()
export class PostService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Retrieves the posts.
   *
   * @param {number} userId - The ID of the user for retrieving posts.
   * @return {Promise<PostDto[]>} A Promise that resolves to an array of PostDto objects representing the retrieved posts.
   */
  async getPostsService(locationId: string): Promise<Post[]> {
    const posts = await getPosts({ id: locationId }, { baseURL: 'http://localhost:8081' });
    const results = await Promise.all(posts.posts.map(async (post) => {
      const comments = await getCommentsForPost({id: post.id}, { baseURL: 'http://localhost:8081' });
      post.comments = comments.comments;
      return post;
    }));

    return results;
  }

  /**
   * Retrieves a post by its ID.
   *
   * @param {number} id - The ID of the post to retrieve.
   * @return {Promise<PostDto>} A Promise that resolves to a PostDto object representing the retrieved post.
   */
  async getPostService(postId: string): Promise<Post> {
    const pId: PostIdDto = {
      id: postId
    };
    const post = await getPost(pId , { baseURL: 'http://localhost:8081' });
    return post;
  }

  /**
   * Creates a new post.
   *
   * @param {CreatePostDto} data - The data for creating the post.
   * @return {Promise<PostDto>} A Promise that resolves to a PostDto object representing the created post.
   */
  async createPostService(data: CreatePostDto): Promise<PostDto> {
    return await createPost(data, { baseURL: 'http://localhost:8081' });
  }

  /**
   * Updates a post by sending a request to the 'post.update.rpc' endpoint.
   *
   * @param {UpdatePostDto} data - The data object containing the post information to be updated.
   * @return {Promise<PostDto>} A Promise that resolves to a PostDto object representing the updated post data.
   */
  async updatePostService(data: UpdatePostDto): Promise<PostDto> {
    return updatePost(data, { baseURL: 'http://localhost:8081' });
  }

  /**
   * Deletes a post with the given ID.
   *
   * @param {number} id - The ID of the post to be deleted.
   * @return {Promise<boolean>} A Promise that resolves to a boolean value indicating whether the post was successfully deleted.
   */
  async deletePostService(id: string): Promise<DeletePostResponseDto> {
    return await deletePost(
      { id: id },
      { baseURL: 'http://localhost:8081' },
    );
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<any> {
    const formData = new FormData();
    formData.append('image', file.buffer.toString('base64'));
    const { data: imageData } = await firstValueFrom(
      this.httpService
        .post(
          `https://api.imgbb.com/1/upload?key=5f1f4d960336dd0a35c3b120aaa477ef`,
          formData,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
    return imageData.data.url;
  }
}
