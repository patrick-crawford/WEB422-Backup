import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket | undefined; // The client instance of socket.io
  public getMessages: Subject<string> = new Subject();

  constructor() {
    
    this.socket = io('http://localhost:8080').connect(); // we can also use io.connect() to connect to the current host

    this.socket?.on('chat message', (msg: string) => {
      this.getMessages.next(msg); // send the new message
    });

  }

  sendMessage(msg: string) {
    this.socket?.emit('chat message', msg);
  }

}