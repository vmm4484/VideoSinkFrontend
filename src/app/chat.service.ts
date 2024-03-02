import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { User, message } from './chat/chat.component';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  url = environment.url;

  secretKey = 'MohanSecretKey';
  public message$: BehaviorSubject<message> = new BehaviorSubject(
    {} as message
  );
  public user$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  socket = io(this.url);
  constructor() {}

  public addToUsers = (user: User) => {
    this.socket.emit('connection', user);
  };
  public getNewUsers = () => {
    this.socket.on('connection', (RevUsers: User[]) => {
      this.user$.next(RevUsers);
    });
    return this.user$.asObservable();
  };

  public sendMessage(message: any) {
    message.message = CryptoJS.AES.encrypt(
      message.message,
      this.secretKey
    ).toString();

    this.socket.emit('message', message);
  }

  // public decrypt(message:string){
  //   return CryptoJS.AES.decrypt(message, this.secretKey).toString(CryptoJS.enc.Utf8);
  // }

  public getNewMessage = () => {
    this.socket.on('message', (data: message) => {
      this.message$.next(data);
    });

    return this.message$.asObservable();
  };
}
