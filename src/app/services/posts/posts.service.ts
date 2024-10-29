import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { PostType } from '../../types/post.type';
import { CommentType } from '../../types/comments.type';

const API = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private readonly http: HttpClient) { }

  public getUsersPosts = (userId: number) => {
    return injectQuery(() => ({
      queryKey: ['getPosts'],
      queryFn: () =>
        lastValueFrom(
          this.http.get<PostType[]>(API + '/users/' + userId + '/posts'),
        ),
      staleTime: 1000 * 60 * 60 // 1 hour
    }));
  }

  public getPostComments = (postId: number) => {
    return lastValueFrom(
      this.http.get<CommentType[]>(API + '/posts/' + postId + '/comments')
    );
  }
}
