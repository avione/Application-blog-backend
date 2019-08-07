import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: Post;
  postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  idpost: number;
  photo: string;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private postsService: PostsService,
              private router: Router) {
                this.idpost = this.route.snapshot.params['id'];
                this.postsService.getSinglePost(+this.idpost).then(
                  (post: Post) => {
                    this.post = post;
                  });
              }

  ngOnInit() {
        this.initForm(this.post);
  }

  initForm(post: Post) {
    this.postForm = new FormGroup({
      title: new FormControl(post.title,Validators.required), //['', Validators.required],
      author: new FormControl({value:post.author,disabled: true},Validators.required), //['', Validators.required],
      content: new FormControl(post.content,Validators.required), // ['', Validators.required]
    });
    this.photo=post.photo;
  }
  setValue() {
    this.postForm.setValue({title: this.post.title, author: this.post.author, content: this.post.content, photo: this.post.photo });
  }
  onSavePost() {
    this.post.title = this.postForm.get('title').value;
    this.post.author = this.postForm.get('author').value;
    this.post.content = this.postForm.get('content').value;

    if(this.fileUrl && this.fileUrl !== '') {
      this.post.photo = this.fileUrl;
    }
    else if ((this.photo !== '')&&(this.photo !== undefined)) {
      this.post.photo=this.photo;
    }
    this.post.create_at = formatDate( new Date(),'short', 'en-US');
    this.postsService.savePost(this.post, this.idpost);
    this.router.navigate(['/posts']);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.postsService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
  onBack() {
    this.router.navigate(['/posts']);
  }
}

