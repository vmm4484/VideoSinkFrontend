import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './chat/chat.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'chat-application';
  user={} as User;
  done: boolean = false;
  file: any;

  onChange(event: any) {
    this.file = event.target.files[0];
  }
  Submit(){
    this.done=true;
  }
}
