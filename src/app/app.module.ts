import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { DecryptPipe } from './decrypt.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    VideoPlayerComponent,
    DecryptPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
