import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataManagerService } from './data-manager.service'
import { Post } from './Post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  staticPost: Post;
  posts: Array<Post>;

  private livePostsSub; // make the subscription reference "private"

  constructor(private data: DataManagerService){ }

  ngOnInit(){
    this.staticPost = this.data.getStaticPost();
    this.livePostsSub = this.data.getLivePosts().subscribe(data => this.posts = data);
  }

  ngOnDestroy(){
    this.livePostsSub.unsubscribe();
  }
}
