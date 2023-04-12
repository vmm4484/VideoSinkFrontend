import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";
import { User, message } from './chat/chat.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  public message$: BehaviorSubject<message> = new BehaviorSubject({} as message);
  public user$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // socket = io('https://node-api-1wbx.onrender.com');
  socket = io('http://localhost:3000');
  constructor() { }

  public addToUsers=(user:User)=>{
    this.socket.emit('connection',user);
  }
  public getNewUsers=()=>{
    this.socket.on('connection',(RevUsers:User[])=>{
      this.user$.next(RevUsers);
    });
    return this.user$.asObservable();
  }

  public sendMessage(message: any) {
    console.log('sendMessage: ', message)
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (data:message) =>{
      this.message$.next(data);
    });

    return this.message$.asObservable();
  };

}
