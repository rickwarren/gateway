import * as protoscript from 'protoscript';
import { CommentDto } from '../../comment/dto/comment.dto';

export class PostDto {
  id: string;
  authorId: string;
  message: string;
  attachment: string;
  comments: CommentDto[];
  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
