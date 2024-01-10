import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SavedPostService } from './saved-post.service';
import { PostDto } from './dto/post.dto';
import { CreateSavedPostDto, DeleteSavedPostResponseDto, SavedPostDto } from '../../../post-rpc/src/protos/saved-post.pb';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('post')
export class SavedPostController {
  constructor(private readonly savedPostService: SavedPostService) {}

  /**
   * Retrieves the posts.
   *
   * @return {Promise<Post[]>} The posts.
   */
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('all/:id')
  getSavedPosts(@Param('id') id: string): Promise<PostDto[]> {
    return this.savedPostService.getSavedPostsService(id);
  }

  /**
   * Retrieves a post by its ID.
   *
   * @param {number} id - The ID of the post to retrieve.
   * @return {any} The retrieved post.
   */
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get(':id')
  getSavedPost(@Param('id') id: string): Promise<PostDto> {
    return this.savedPostService.getSavedPostService(id);
  }

  /**
   * Creates a new post with the provided data.
   *
   * @param {CreatePostDto} data - The data for creating the post.
   * @return {any} The created post.
   */
  @Post()
  createSavedPost(@Body() data: CreateSavedPostDto): Promise<SavedPostDto> {
    return this.savedPostService.createSavedPostService(data);
  }

  /**
   * Deletes a post with the given ID.
   *
   * @param {number} id - The ID of the post to delete.
   * @return {void} - Returns nothing.
   */
  @Delete()
  deleteSavedPost(@Param() id: string): Promise<DeleteSavedPostResponseDto> {
    return this.savedPostService.deleteSavedPostService(id);
  }
}
