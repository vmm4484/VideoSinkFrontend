import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

const routes: Routes = [
  // {
  //   path:'',
  //   pathMatch:"full",
  //   redirectTo:"/chat"
  // },
  {path:"chat",component:ChatComponent},
  {path:"video",component:VideoPlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
