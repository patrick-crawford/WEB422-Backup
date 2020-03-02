import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';


const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'post/:id', component: PostComponent },
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
