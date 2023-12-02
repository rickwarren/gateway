import * as protoscript from 'protoscript';

export class CommentDto {
  id: number;
  authorId: number;
  message: string;
  attachment: string;
  postId: number;
  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
