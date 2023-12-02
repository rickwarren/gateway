import * as protoscript from 'protoscript';
import { CommentDto } from '../../comment/dto/comment.dto';

export class PostDto {
  id: number;
  authorId: number;
  message: string;
  attachment: string;
  comments: CommentDto[];
  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
