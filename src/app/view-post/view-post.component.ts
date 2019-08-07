import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  post: Post;
  idpost: number;
  loveIts: number;
  photo: string;
  author: string;
  title: string;
  content: string;
  create_at: string;
  id: number;

  constructor(private route: ActivatedRoute, private postsService: PostsService,
    private router: Router) {
      this.idpost = this.route.snapshot.params['id'];
      this.id=this.idpost*1+1;
      this.postsService.getSinglePost(+this.idpost).then(
        (post: Post) => {
          this.post = post;
          this.title=post.title;
          this.author=post.author;
          this.content=post.content;
          this.loveIts=post.loveIts;
          this.photo=post.photo;
          this.create_at=post.create_at;
        }
      );

    }

  ngOnInit() {
  }
  getStyleClass() {
    if (this.post.loveIts > 0) {
      return  'list-group-item-success';
    } else if (this.post.loveIts < 0) {
      return  'list-group-item-danger';
    }
  }
  getColor() {
    if (this.loveIts > 0) {
      return 'green';
    } else if (this.loveIts < 0) {
      return 'red';
    }
  }
  onBack() {
    this.router.navigate(['/posts']);
  }
}
