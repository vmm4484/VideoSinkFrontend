import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChatService } from '../chat.service';

export interface message{
  fromId:number;
  fromName:string;
  toId:number;
  message:string
}
export interface messagingList{
  receiverId:number;
  userMessages:message[];
}

export interface User{
  id:number;
  name:string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnChanges{
  @Input() userId!:number;
  @Input() userName!:string;
  categories:string[]=['people']
  public isEmojiPickerVisible: boolean=false;
  colorslist:string[]=["#9966cc","#0000ff","#007ba7","#1560bd","#c2b280","#ff00ff","#00ff00","#df73ff","#00416a","#00a86b","#c3b091","#b57edc","#21421e","#ffdead","#ff7f00","#ffc0cb","#6c6961","#ff0000","#ff8c69","#66023c","#120a8f","#8b00ff","#c9a0dc","#eeed09","#ffff00","#506022"]
  // colors:Map<string,string>=new Map();
  currUser={} as User;
  enable:boolean=false;
  newMessage={} as message;
  messageList: message[] = [];
  UsersData:User[]=[];
  constructor(private chatService: ChatService){}

  ngOnInit(){
    this.currUser.id=this.userId;
    this.currUser.name=this.userName;
    this.newMessage.message=''
  }
  ngOnChanges(changes:SimpleChanges){
    this.registerUser();
  }

  public addEmoji(event:any) {
    this.newMessage.message = `${this.newMessage.message}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
 }

  setReceiver(event:any){    
    this.newMessage.toId=event.target.value;
    this.newMessage.fromId=this.userId;
    this.newMessage.fromName=this.userName;
  }
  registerUser(){
    this.chatService.addToUsers(this.currUser);

    this.chatService.getNewUsers().subscribe((RevUsers:User[])=>{
      console.log(RevUsers);
      
      this.UsersData=RevUsers.filter(data => this.currUser.id.toString()!=data.id.toString());
    });

    this.enable=true;

    this.chatService.getNewMessage().subscribe((data:message) => {
      if(data.message!=null && data.message!=''){
        this.messageList.push(data);
        setTimeout(() => {
          var ele = document.getElementById("allMessages")!;
          ele.scrollTop = ele.scrollHeight;
        }, 100);
      }
    })
  }
  sendMessage() {
    this.newMessage.fromId=this.userId;
    this.newMessage.fromName=this.userName;
    if(this.newMessage.message)
    this.chatService.sendMessage(this.newMessage);
    // this.messageList.push(this.newMessage);
    let newMsg={} as message;
    newMsg.fromId=this.newMessage.fromId;
    newMsg.fromName=this.newMessage.fromName;
    newMsg.toId=this.newMessage.toId;
    newMsg.message=''
    this.newMessage=newMsg;
    this.newMessage.fromId=this.currUser.id;
  }

}
