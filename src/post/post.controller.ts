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
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDto } from './dto/post.dto';
import { DeletePostResponseDto, Post as Posts } from '../../../post-rpc/src/protos/post.pb';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * Retrieves the posts.
   *
   * @return {Promise<Post[]>} The posts.
   */
  @Get('all/:id')
  getPosts(@Param('id') id: string): Promise<Posts[]> {
    return this.postService.getPostsService(id);
  }

  /**
   * Retrieves a post by its ID.
   *
   * @param {number} id - The ID of the post to retrieve.
   * @return {any} The retrieved post.
   */
  @Get(':id')
  getPost(@Param('id') id: string): Promise<Posts> {
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
  deletePost(@Param() id: string): Promise<DeletePostResponseDto> {
    return this.postService.deletePostService(id);
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
  ): Promise<string> {
    return this.postService.uploadImage(file);
  }
}
