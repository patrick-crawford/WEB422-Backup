import { Injectable } from '@angular/core';
import { Post } from './Post';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor() { }

  getStaticPost(): Post{ // return type "Post"
    return {
      userId: 1,
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
  }
}
