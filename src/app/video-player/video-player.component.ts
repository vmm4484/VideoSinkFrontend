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

}
