import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { togglePlayTime } from './video-player/video-player.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  url = environment.url;
  public newTime$: BehaviorSubject<number> = new BehaviorSubject(0);
  public togglePlay$: BehaviorSubject<togglePlayTime> = new BehaviorSubject<togglePlayTime>({of:0,time:0} as togglePlayTime);
  constructor() { }


  socket =io(this.url)
  public sendNewTime(newtime: any) {
    this.socket.emit('setnewTime', newtime);
  }

  public requestToggle(onOff:togglePlayTime){
    this.socket.emit("togglePlay",onOff);
  }


  public getNewTime = () => {
    this.socket.on('newtime', (newTime) =>{
      this.newTime$.next(newTime);
    });

    return this.newTime$.asObservable();
  };

  public getToggleRequest = () => {
    this.socket.on('toggle', (data) =>{
      this.togglePlay$.next(data);
    });

    return this.togglePlay$.asObservable();
  };

}