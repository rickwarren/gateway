import * as protoscript from 'protoscript';

export class UpdateCommentDto {
  id: string;
  authorId: string;
  message: string;
  attachment: string;
  postId: string;
  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
