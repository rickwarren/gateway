import { Injectable } from '@nestjs/common';
import { getProfile, getProfiles } from '../../../user-rpc/src/protos/profile.pb';
import { getAllPosts, getPost, getPosts } from '../../../post-rpc/src/protos/post.pb';
import { getComments, getCommentsForPost } from '../../../post-rpc/src/protos/comment.pb';
import { SearchResultsDto } from './dto/searchResults.dto';
import { getCharities } from '../../../friend-rpc/src/protos/charity.pb';
import { getCorporations } from '../../../friend-rpc/src/protos/corporation.pb';
import { getFriendsByUserId, getFriendsOfFriendsByUserId } from '../../../friend-rpc/src/protos/friend-list.pb';
import { UserDto, getUser } from '../../../user-rpc/src/protos/user.pb';
import { NullValue } from 'protoscript/dist/runtime/well-known-types';
import e from 'express';

@Injectable()
export class SearchService {
    async searchQueryService(query: string): Promise<SearchResultsDto> {
        try {
            const profiles = await getProfiles({}, { baseURL: 'http://localhost:8080' });
            const posts = await getAllPosts({}, { baseURL: 'http://localhost:8081' });
            const comments = await getComments({}, { baseURL: 'http://localhost:8081' });
            const charities = await getCharities({}, { baseURL: 'http://localhost:8082' });
            const corporations = await getCorporations({}, { baseURL: 'http://localhost:8082' });
            const pattern = RegExp(query.toLowerCase(), 'gi');
            const profileResults = profiles.profiles.map(profile => {
            if(pattern.test(profile.firstName.toLowerCase())) return profile;
            if(pattern.test(profile.lastName.toLowerCase())) return profile;
            if(pattern.test(profile.city.toLowerCase())) return profile;
            if(pattern.test(profile.country.toLowerCase())) return profile;
            if(pattern.test(profile.hometown.toLowerCase())) return profile;
            if(pattern.test(profile.employer.toLowerCase())) return profile;
            if(pattern.test(profile.mobilePhone.toLowerCase())) return profile;
            if(pattern.test(profile.profession.toLowerCase())) return profile;
            if(pattern.test(profile.province.toLowerCase())) return profile;
            if(pattern.test(profile.relationshipStatus.toLowerCase())) return profile;
                return null;
            });
            const postResults = posts.posts.map((post) => {
                if(pattern.test(post.message.toLowerCase())) return post;
                return null;
            })
            const commentResults = comments.comments.map((comment) => {
                if(pattern.test(comment.message.toLowerCase())) return comment;
                return null;
            })
            const charityResults = charities.charities.map((charity) => {
                if(pattern.test(charity.name.toLowerCase())) return charity;
                return null;
            })
            const corporationResults = corporations.corporations.map((corporation) => {
                if(pattern.test(corporation.name.toLowerCase())) return corporation;
                return null;
            })
            const postCommentResults = await Promise.all(postResults.map(async (post) => {
                if(post === null) {
                    return null;
                }
                const comments = await getCommentsForPost({ id: post.id }, { baseURL: 'http://localhost:8081' });
                post.comments = comments.comments;
                return post;
            }))
            return {
                profiles: profileResults.filter(profile => profile !== null),
                posts: postResults.filter(post => post !== null),
                charities: charityResults.filter(charity => charity !== null),
                corporations: corporationResults.filter(corporation => corporation!== null),
            }
        } catch(e) {
            console.log(e);
        }
    }
    

    
    async searchFriendsQueryService(query: string, userId: string): Promise<UserDto[]> {
        try {
            const results = await getFriendsByUserId({ id: userId }, { baseURL: 'http://localhost:8082' });
            const users: any = await Promise.all(results.friends.map(async (friend) => {
                const user = await getUser(
                    { id: friend.id },
                    { baseURL: 'http://localhost:8080' },
                );
                if(user == undefined) { return }
                user.profile = await getProfile(
                    { id: user.id },
                    { baseURL: 'http://localhost:8080' },
                );
                return user !== null ? user : false;
            }));
            const pattern = RegExp(query.toLowerCase(), 'gi');
            const userResults = users.map(user => {
                if(pattern.test(user.profile.firstName.toLowerCase())) return user;
                if(pattern.test(user.profile.lastName.toLowerCase())) return user;
                if(pattern.test(user.profile.city.toLowerCase())) return user;
                if(pattern.test(user.profile.country.toLowerCase())) return user;
                if(pattern.test(user.profile.hometown.toLowerCase())) return user;
                if(pattern.test(user.profile.employer.toLowerCase())) return user;
                if(pattern.test(user.profile.mobilePhone.toLowerCase())) return user;
                if(pattern.test(user.profile.profession.toLowerCase())) return user;
                if(pattern.test(user.profile.province.toLowerCase())) return user;
                if(pattern.test(user.profile.relationshipStatus.toLowerCase())) return user;
                return null;
            });
            return userResults.filter(user => user !== null);
        } catch(e) {
            console.log(e);
        }
    }

    async searchFriendsOfFriendsQueryService(query: string, userId: string): Promise<UserDto[]> {
        try {
            const results = await getFriendsOfFriendsByUserId({ id: userId }, { baseURL: 'http://localhost:8082' });
            const users: any = await Promise.all(results.friends.map(async (friend) => {
                const user = await getUser(
                    { id: friend.id },
                    { baseURL: 'http://localhost:8080' },
                );
                if(user == undefined) { return }
                user.profile = await getProfile(
                    { id: user.id },
                    { baseURL: 'http://localhost:8080' },
                );
                return user !== null ? user : false;
            }));
            const pattern = RegExp(query.toLowerCase(), 'gi');
            const userResults = users.map(user => {
                if(pattern.test(user.profile.firstName.toLowerCase())) return user;
                if(pattern.test(user.profile.lastName.toLowerCase())) return user;
                if(pattern.test(user.profile.city.toLowerCase())) return user;
                if(pattern.test(user.profile.country.toLowerCase())) return user;
                if(pattern.test(user.profile.hometown.toLowerCase())) return user;
                if(pattern.test(user.profile.employer.toLowerCase())) return user;
                if(pattern.test(user.profile.mobilePhone.toLowerCase())) return user;
                if(pattern.test(user.profile.profession.toLowerCase())) return user;
                if(pattern.test(user.profile.province.toLowerCase())) return user;
                if(pattern.test(user.profile.relationshipStatus.toLowerCase())) return user;
                return null;
            });
            return userResults.filter(user => user !== null);
        } catch(e) {
            console.log(e);
        }
    }
}