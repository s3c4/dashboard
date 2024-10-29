import { Component, effect, signal, Signal } from '@angular/core';
import { PostType } from '../../types/post.type';
import { PostsService } from '../../services/posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CommentType } from '../../types/comments.type';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  public posts: Signal<PostType[] | undefined> = signal([]);
  public isLoading: Signal<boolean> = signal(true);
  public isLoadingSubject = new BehaviorSubject(false);
  public comments: Signal<CommentType[] | undefined> = signal([]);

  constructor(private readonly postsService: PostsService, private readonly route: ActivatedRoute) {
    if (this.route.snapshot.paramMap.get('id')) {
      const { data, isLoading } = this.postsService.getUsersPosts(+(this.route.snapshot?.paramMap?.get('id') as string));
      this.isLoading = isLoading;
      this.posts = data;
      effect(() => {
        this.isLoadingSubject.next(true);
      });
      this.isLoadingSubject.subscribe(() => {
        this.posts()?.map((post: PostType) => {
          this.postsService.getPostComments(post.id).then((comments: CommentType[]) => {
            this.comments()?.push(...comments);
          });
        });
      })
    }
  }
}
