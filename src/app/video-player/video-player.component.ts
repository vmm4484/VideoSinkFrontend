import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SyncService } from '../sync.service';

export interface togglePlayTime{
  of:number;
  time:number;
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})

export class VideoPlayerComponent implements OnInit,OnChanges{
  @Input() file:any;
  URL = window.URL || window.webkitURL;
  srcUrl = ''
  filename:string="";
  videoLength:any;
  currPosition:any;
  prevId: any;
  constructor(private service: SyncService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeSelected();
  }

  ngOnInit() {
  }
  
  changeSelected() {
      var urlBlob = this.URL.createObjectURL(this.file);
      this.filename=this.file.name;
      document.getElementsByTagName('video')[0].src = urlBlob;
      document.getElementsByTagName('video')[0].load();

      this.service.getNewTime().subscribe((newTime: number) => {
  
        document.getElementsByTagName('video')[0].currentTime = newTime;
      });
  
      this.service.getToggleRequest().subscribe((data:togglePlayTime) => {
        console.log(data);
        
        let video = document.getElementsByTagName('video')[0];
        video.currentTime=data.time;
        if (data.of == 0) {
          document.getElementsByTagName('video')[0].pause();
        } else {
          document.getElementsByTagName('video')[0].play();
        }
      });

    
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent1(event: KeyboardEvent) {

    let video = document.getElementsByTagName('video')[0];

    if (event.code == "ArrowRight") {
      video.currentTime += 5;
      let time = video.currentTime + 5;

      this.service.sendNewTime(time);

    } else if (event.code == "ArrowLeft") {
      video.currentTime -= 5;
      let time = video.currentTime - 5;
      this.service.sendNewTime(time);

    } else if (event.code == "Space") {
      this.toggle();
    }
  }
  toggle() {

    let video = document.getElementsByTagName('video')[0];
    let tgof={} as togglePlayTime;
    tgof.time=video.currentTime;
    if (video.paused) {
      tgof.of=1;
      this.service.requestToggle(tgof);
    } else {
      tgof.of=0;
      this.service.requestToggle(tgof);
    }
  }

  PlayPauseToggle(){
    let video=document.getElementsByTagName('video')[0];
    let playbutton=document.getElementsByClassName('play-button')[0];
    if(video.paused){
      playbutton.textContent='| |'
      video.play();
    }else{
      playbutton.textContent='▶'
      video.pause();
    }
  }

  changeButton(){
    let video=document.getElementsByTagName('video')[0];
    let playbutton=document.getElementsByClassName('play-button')[0];
    playbutton.textContent='▶'
  }
  videoVolumeChange(e:any){
    let video=document.getElementsByTagName('video')[0];
    video.volume=e.target.value;
  }
  calculateDuration(){
    let video=document.getElementsByTagName('video')[0];
    this.videoLength=Math.floor(video.duration);
    this.currPosition=Math.floor(video.currentTime);
    let currentHours=Math.floor((video.currentTime/60)/60);
    let currentMinutes=Math.floor((video.currentTime/60-currentHours*60));
    let currentSeconds=Math.floor(video.currentTime-currentMinutes*60-currentHours*60*60);
    let durationHours=Math.floor((video.duration/60)/60);
    let durationMinutes=Math.floor((video.duration/60-durationHours*60));
    let durationSeconds=Math.floor(video.duration-durationHours*60*60-durationMinutes*60);
    let val=(this.currPosition)/(this.videoLength)*100;
    document.getElementById('seeker')!.style.background='linear-gradient(to right, #ff5600 0%, #ff5600 ' + val + '%, #fff ' + val + '%, white 100%)';
    document.getElementsByClassName('current')[0].innerHTML=`${currentHours > 0 ? (currentHours < 10 ? '0'+currentHours+':':currentHours+':'):'' }${currentMinutes < 10 ? '0'+currentMinutes:currentMinutes}:${currentSeconds< 10 ? '0'+currentSeconds:currentSeconds}`;
    document.getElementsByClassName('duration')[0].innerHTML=`${durationHours > 0 ? (durationHours < 10 ? '0'+durationHours+':':durationHours+':'):'' }${durationMinutes < 10 ? '0'+durationMinutes:durationMinutes}:${durationSeconds}`;
  }

  MoveToSkip(e:any){
    console.log(e.target.value);
    
    let video=document.getElementsByTagName('video')[0];
    video.currentTime=e.target.value;
    let val=(video.currentTime)/(this.videoLength)*100;
    document.getElementById('seeker')!.style.background='linear-gradient(to right, #ff5600 0%, #ff5600 ' + val + '%, #fff ' + val + '%, white 100%)';
  }
  toggleFullScreen(){
    let elem = document.querySelector(".video-container")!;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  }
  displayOptions(){
    document.getElementById("video-controls")!.style.transform="translateY(0%)";
    if(this.prevId){
      clearTimeout(this.prevId);
      this.prevId=0;
    }
    if(document.fullscreenElement){
      const currId=setTimeout(() => {
        this.hideOptions();
      }, 4000);
      this.prevId=currId;
    }
  }
  hideOptions(){
    document.getElementById("video-controls")!.style.transform="translateY(100%) translateY(-20%)";
  }
}