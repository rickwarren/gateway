import * as protoscript from 'protoscript';

export class UpdateCommentDto {
  id: number;
  authorId: number;
  message: string;
  attachment: string;
  postId: number;
  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
