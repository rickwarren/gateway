import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * Retrieves the posts.
   *
   * @return {Promise<Post[]>} The posts.
   */
  @Get('all')
  getPosts(@Req() req: any): Promise<PostDto[]> {
    return this.postService.getPostsService(req.user.user.id);
  }

  /**
   * Retrieves a post by its ID.
   *
   * @param {number} id - The ID of the post to retrieve.
   * @return {any} The retrieved post.
   */
  @Get(':id')
  getPost(@Param() id: number): Promise<PostDto> {
    return this.postService.getPostService(id);
  }

  /**
   * Creates a new post with the provided data.
   *
   * @param {CreatePostDto} data - The data for creating the post.
   * @return {any} The created post.
   */
  @Post()
  createPost(@Body() data: CreatePostDto): Promise<PostDto> {
    return this.postService.createPostService(data);
  }

  /**
   * Updates a post with the given data.
   *
   * @param {UpdatePostDto} data - The data to update the post with.
   * @return {any} The updated post.
   */
  @Put()
  updatePost(@Body() data: UpdatePostDto): Promise<PostDto> {
    return this.postService.updatePostService(data);
  }

  /**
   * Deletes a post with the given ID.
   *
   * @param {number} id - The ID of the post to delete.
   * @return {void} - Returns nothing.
   */
  @Delete()
  deletePost(@Param() id: number): Promise<boolean> {
    return this.postService.deletePostService(id);
  }
}
