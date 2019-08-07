import { Component, Input, OnInit, Inject } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

   @Input() post: Post;
   @Input() idpost: number;

   isAuth: boolean;
   username: string;


  constructor(private postService: PostsService, private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
          const s = user.email.split('@');
          this.username = s[0].toLocaleLowerCase();
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  getColor() {
    if (this.post.loveIts > 0) {
      return 'green';
    } else if (this.post.loveIts < 0) {
      return 'red';
    }
  }
  onLoveIts() {
    this.post.loveIts++;
    this.postService.savePosts();
  }
  onDontLoveIts() {
    this.post.loveIts--;
    this.postService.savePosts();
  }
  onDeletePost() {
    this.postService.removePost(this.post);
  }
  onViewPost() {
    this.router.navigate(['/posts', 'view', this.idpost]);
  }

  onEditPost() {
    this.router.navigate(['/posts', 'edit',  this.idpost]);
  }

}
