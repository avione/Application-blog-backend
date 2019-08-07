import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../models/post.model';
// import { PostListItemComponent } from 'src/app/post-list-item/post-list-item.component';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  post: Post;
  postsSubscription: Subscription;
  filter: string;
  nbPost: number;

  constructor(private route: ActivatedRoute, private postsService: PostsService, private router: Router) {
    if(this.route.snapshot.params['findtext'] !== '') {
      this.filter=this.route.snapshot.params['findtext'];
    }
  }

  ngOnInit() {

    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        this.nbPost=this.posts.length;
      }
    );
    this.postsService.emitPosts();
    if (this.filter!==undefined) {
      this.nbPost=this.postsService.findPosts(this.filter);
      if(this.nbPost == undefined) {
        this.nbPost=0;
      }
    }
    else {
      this.postsService.getPosts();
    }
  }
  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
