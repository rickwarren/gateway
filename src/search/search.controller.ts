import { Controller, UseInterceptors, UseGuards, Param, Get } from '@nestjs/common';
import { SearchService } from './search.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from 'src/auth/auth.guard';
import { SearchResultsDto } from './dto/searchResults.dto';
import { UserDto } from '../../../user-rpc/src/protos/user.pb';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @UseGuards(AuthGuard)
    @Get(':query')
    getUsers(@Param('query') query: string): Promise<SearchResultsDto> {
      return this.searchService.searchQueryService(query);
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @UseGuards(AuthGuard)
    @Get('friends/:query/:userId')
    getFriendUsers(
      @Param('query') query: string, 
      @Param('userId') userId: string
    ): Promise<UserDto[]> {
      return this.searchService.searchFriendsQueryService(query, userId);
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @UseGuards(AuthGuard)
    @Get('friends/friends/:query/:userId')
    getFriendOfFriendUsers(
      @Param('query') query: string, 
      @Param('userId') userId: string
    ): Promise<UserDto[]> {
      return this.searchService.searchFriendsOfFriendsQueryService(query, userId);
    }
}
