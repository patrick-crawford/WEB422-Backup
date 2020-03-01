import { Component, OnInit } from '@angular/core';
import { DataManagerService } from './data-manager.service'
import { Post } from './Post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  staticPost: Post;

  constructor(private data: DataManagerService){ }

  ngOnInit(){
    this.staticPost = this.data.getStaticPost()
  }
}
