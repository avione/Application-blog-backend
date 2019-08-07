import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  post: Post;
  posts: Post[] = [];

  postsSubject = new Subject<Post[]>();

  postsfind = new Array<Post>();

  constructor() { }

  initPosts() {
    this.posts = new Array<Post>();
    this.post = new Post('Mon premier post', 1, 'Administrator',
      'créez un type pour les post, appelé Post, afin de rendre votre code plus lisible.  Vous pouvez même y intégrer un constructeur qui attribue automatiquement la date !');
    this.posts.push(this.post);
    this.post = new Post('Mon deuxième post', -1, 'Administrator',
      'créez un type pour les post, appelé Post, afin de rendre votre code plus lisible.  Vous pouvez même y intégrer un constructeur qui attribue automatiquement la date !');
    this.posts.push(this.post);
    this.post = new Post('Encore un post', 0, 'Administrator',
      'créez un type pour les post, appelé Post, afin de rendre votre code plus lisible.  Vous pouvez même y intégrer un constructeur qui attribue automatiquement la date !');
    this.posts.push(this.post);
    this.savePosts();
    this.emitPosts();
  }
  emitPosts() {
    this.postsSubject.next(this.posts);
  //  this.postService.getPosts();
    if (this.posts.length == 0 ) {
      this.initPosts();
    }

  }
  savePosts() {
    firebase.database().ref('/posts/').set(this.posts);
  }
  findPosts(filter: string) {
    firebase.database().ref('/posts')
    .on('value', (data) => {
      this.posts = data.val() ? data.val() : [];
      this.postsfind = new Array<Post>();
      this.posts.forEach((postEl:Post) => {
          if((postEl.title.indexOf(filter)>0)||(postEl.content.indexOf(filter)>0)) {
            this.postsfind.push(postEl);
          }
      });
      if(this.postsfind.length>0) {
        this.posts=this.postsfind;
      }
    this.emitPosts();
    });
    return this.postsfind.length;
  }
  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data) => {
        this.posts = data.val() ? data.val() : [];
        this.emitPosts();
      });
  }
  getSinglePost(id: number) {
    return new Promise(
      (resolve,reject) => {
        firebase.database().ref('/posts/' + id)
          .once('value').then((data) => {
              resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewPost(newpost: Post) {
    this.posts.push(newpost);
    this.savePosts();
    this.emitPosts();
  }
  savePost(post: Post, id: number) {
    this.posts[id] = post;
    this.savePosts();
    this.emitPosts();
  }
  removePost(post: Post) {
    //retirer l'image si elle existe
    if(post.photo) {
      const storageRef = firebase.storage().refFromURL(post.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    //permet de supprimer le post de l'array posts
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }
  getIdPost(post: Post) {
    const idPost = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    return idPost;
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
