import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../Post';
import { DataManagerService } from '../data-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  post: Post = new Post();
  private postSub: Subscription | undefined;

  constructor(private data: DataManagerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.postSub = this.data.getPostById(this.route.snapshot.params['id']).subscribe(data => this.post = data);
  }

  ngOnDestroy(){
    this.postSub?.unsubscribe();
  }

}
