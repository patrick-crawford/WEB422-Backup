import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPostById(id:any): Observable<Post>{
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
}
