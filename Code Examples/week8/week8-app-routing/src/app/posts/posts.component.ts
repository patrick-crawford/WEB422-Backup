import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { Post } from '../Post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Array<Post>;

  private postsSub; // make the subscription reference "private"

  constructor(private data: DataManagerService, private router: Router){ }

  navigateToPost(e,id){
    this.router.navigate(['/post', id]);
  }

  ngOnInit(){
    this.postsSub = this.data.getPosts().subscribe(data => this.posts = data);
  }

}
