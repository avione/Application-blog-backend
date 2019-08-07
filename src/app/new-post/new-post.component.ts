import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  username: string;

  constructor(private formBuilder: FormBuilder, private postsService: PostsService, private router: Router) {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          const s = user.email.split('@');
          this.username = s[0];
        }
      });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: new FormControl({value: this.username,disabled: true}, Validators.required),
      content: ['', Validators.required]
    });
  }

  onSavePost() {
    const title = this.postForm.get('title').value;
    const author = this.postForm.get('author').value;
    const content = this.postForm.get('content').value;
    const newPost = new Post(title, 0, author, content);
    newPost.content = content;
    if(this.fileUrl && this.fileUrl !== '') {
      newPost.photo = this.fileUrl;
    }
    this.postsService.createNewPost(newPost);
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
}

