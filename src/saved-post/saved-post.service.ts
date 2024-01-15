import { Injectable } from '@nestjs/common';
import {
  PostDto,
  getPost,
} from '../../../post-rpc/src/protos/post.pb';

import { HttpService } from '@nestjs/axios';
import { CreateSavedPostDto, DeleteSavedPostResponseDto, SavedPostDto, createSavedPost, deleteSavedPost, getSavedPost, getSavedPosts } from '../../../post-rpc/src/protos/saved-post.pb';

@Injectable()
export class SavedPostService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Retrieves the posts.
   *
   * @param {number} userId - The ID of the user for retrieving posts.
   * @return {Promise<PostDto[]>} A Promise that resolves to an array of PostDto objects representing the retrieved posts.
   */
  async getSavedPostsService(userId: string): Promise<PostDto[]> {
    const savedPosts = [];
    const posts = await getSavedPosts({ id: userId }, { baseURL: 'http://localhost:8081' });
    const results = await Promise.all(posts.savedPosts.map(async (post) => {
      const p = await getPost({id: post.id}, { baseURL: 'http://localhost:8081' });
      return p;
    }));

    return results;
  }

  /**
   * Retrieves a post by its ID.
   *
   * @param {number} id - The ID of the post to retrieve.
   * @return {Promise<PostDto>} A Promise that resolves to a PostDto object representing the retrieved post.
   */
  async getSavedPostService(id: string): Promise<PostDto> {
    const savedPost = await getSavedPost({id: id} , { baseURL: 'http://localhost:8081' });
    const post = await getPost({id: savedPost.id} , { baseURL: 'http://localhost:8081' });
    return post;
  }

  /**
   * Creates a new post.
   *
   * @param {CreatePostDto} data - The data for creating the post.
   * @return {Promise<PostDto>} A Promise that resolves to a PostDto object representing the created post.
   */
  async createSavedPostService(data: CreateSavedPostDto): Promise<SavedPostDto> {
    return await createSavedPost(data, { baseURL: 'http://localhost:8081' });
  }

  /**
   * Deletes a post with the given ID.
   *
   * @param {number} id - The ID of the post to be deleted.
   * @return {Promise<boolean>} A Promise that resolves to a boolean value indicating whether the post was successfully deleted.
   */
  async deleteSavedPostService(id: string): Promise<DeleteSavedPostResponseDto> {
    return await deleteSavedPost(
      { id: id },
      { baseURL: 'http://localhost:8081' },
    );
  }
}
