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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, DeletePostResponseDto, PostDto, UpdatePostDto } from '../../../post-rpc/src/protos/post.pb';
import { FileInterceptor } from '@nestjs/platform-express';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * Retrieves the posts.
   *
   * @return {Promise<Post[]>} The posts.
   */
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AuthGuard)
  @Get('all/:id')
  getPosts(@Param('id') id: string): Promise<PostDto[]> {
    return this.postService.getPostsService(id);
  }

  /**
   * Retrieves a post by its ID.
   *
   * @param {number} id - The ID of the post to retrieve.
   * @return {any} The retrieved post.
   */
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AuthGuard)
  @Get(':id')
  getPost(@Param('id') id: string): Promise<PostDto> {
    return this.postService.getPostService(id);
  }

  /**
   * Creates a new post with the provided data.
   *
   * @param {CreatePostDto} data - The data for creating the post.
   * @return {any} The created post.
   */
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Delete()
  deletePost(@Param() id: string): Promise<DeletePostResponseDto> {
    return this.postService.deletePostService(id);
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
  ): Promise<string> {
    return this.postService.uploadImage(file);
  }
}
