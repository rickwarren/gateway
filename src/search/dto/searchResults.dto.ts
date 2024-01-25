import { CharityDto } from "../../../../friend-rpc/src/protos/charity.pb";
import { CorporationDto } from "../../../../friend-rpc/src/protos/corporation.pb";
import { CommentDto } from "../../../../post-rpc/src/protos/comment.pb";
import { PostDto } from "../../../../post-rpc/src/protos/post.pb";
import { ProfileDto } from "../../../../user-rpc/src/protos/user.pb";

export class SearchResultsDto {
    profiles: ProfileDto[] | null;
    posts: PostDto[] | null;
    charities: CharityDto[] | null;
    corporations: CorporationDto[] | null;
}