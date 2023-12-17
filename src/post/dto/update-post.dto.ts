import { CommentDto } from '../../comment/dto/comment.dto';

export class UpdatePostDto {
  id: string;
  authorId: string;
  locationId: string
  message: string;
  attachment: string;
  comments: CommentDto[];
  createdAt: string;
  updatedAt: string;
}
