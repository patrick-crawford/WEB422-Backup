import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { Post } from '../Post';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Array<Post> = [];

  private postsSub: Subscription | undefined; // make the subscription reference "private"

  constructor(private data: DataManagerService, private router: Router){ }

  navigateToPost(e:any,id:any){
    this.router.navigate(['/post', id]);
  }

  ngOnInit(){
    this.postsSub = this.data.getPosts().subscribe(data => this.posts = data);
  }

  ngOnDestroy(){
    this.postsSub?.unsubscribe();
  }

}
