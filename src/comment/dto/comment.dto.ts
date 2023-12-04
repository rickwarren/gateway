import * as protoscript from 'protoscript';

export class CommentDto {
  id: string;
  authorId: string;
  message: string;
  attachment: string;
  postId: string;
  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
