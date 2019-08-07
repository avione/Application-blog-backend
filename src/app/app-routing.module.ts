import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PostListComponent } from './post-list/post-list.component';
import { FindPostComponent } from './find-post/find-post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AccueilComponent } from './accueil/accueil.component';


const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'posts',  component: PostListComponent },
  { path: 'posts/find/:findtext',  component: PostListComponent },
  { path: 'posts/new',  canActivate: [AuthGuardService], component: NewPostComponent },
  { path: 'posts/edit/:id',  canActivate: [AuthGuardService], component: EditPostComponent },
  { path: 'posts/view/:id',  canActivate: [AuthGuardService], component: ViewPostComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
