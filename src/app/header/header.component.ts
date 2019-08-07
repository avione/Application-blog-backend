import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  errorMessage: string;
  findtext: FormControl;

  posts: Post[] = [];
  post: Post;
  postsSubscription: Subscription;
  filter: string;
  nbPost: number;
  email: string;
  username: string;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService, private postsService: PostsService,
              private router: Router) { }

  ngOnInit() {
    // Pour la subscription des posts
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.findtext = new FormControl();
    // Pour la souscrire au changement de valeur du champ de recherche
    this.findtext.valueChanges
      .pipe(debounceTime(400),distinctUntilChanged()
      )
      .subscribe(filter => {
        console.log('text recherche:'+filter);
        this.filter=filter;
        if (this.filter!==undefined) {
          this.nbPost=this.postsService.findPosts(this.filter);
          if(this.nbPost == undefined) {
            this.errorMessage='Aucun post trouvé!!!'
          }
        }
        else
            this.nbPost=0;
      });
    // controle utilisateur authorisé
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
          this.email = user.email;
          const s = user.email.split('@');
          this.username = s[0];
        } else {
          this.isAuth = false;
          this.email = '';
        }
      }
    );
  }
  onFormSubmit() {
  //  Submit pour formulaire de recherche
    if((this.findtext.value !== '')&&(this.findtext.value !== undefined)) {
        this.router.navigate(['/posts', 'find', this.findtext.value]);
    }
  }
  onSignOut() {
    // Déconnexion
    this.authService.signOutUser();
  }
  onKeydown(event) {
    // test key pressé = "Enter"
    if (event.key === "Enter") {
      console.log(event);
      this.onFormSubmit();
    }
  }
  onChange(event) {
  // détection de changement sur le champ recherche
   console.log("event:"+ event.returnValue);
  // return this.onFormSubmit();
  }
}
