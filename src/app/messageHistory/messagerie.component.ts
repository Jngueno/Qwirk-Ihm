import {
  AfterViewChecked, OnInit, OnDestroy, ViewEncapsulation, Component, Renderer, EventEmitter,
  ElementRef, ViewChild, Input
} from "@angular/core";
import {PrivateChatService} from "../shared/services/private_chat.service";
import {Message} from "../shared/models/message";
import {APPCONFIG} from "../config/param";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../shared/services/authentication.service";
import {UserService} from "../shared/services/user.service";
import {MaterializeAction} from "angular2-materialize";
import {MessageStatus} from "../shared/models/messageStatus";
/**
 * Created by jngue on 07/06/2017.
 */


@Component({
  selector: 'messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css'],
  providers: [PrivateChatService]
})
export class MessagerieComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input("messages")
  messages = [];

  @Input("receivedMessages")
  receivedMessages = [];

  connection;
  contacts: Object[];
  msg;
  private imessage = new Message();
  public appConfig = new APPCONFIG();
  profileImg;
  typings: any;
  private notifyTypings: any;
  private notifyTypingsBlur: Subscription;
  private fullContact: any;
  //private renderer: Renderer;
  private counterUnread : Object;
  onUpdateMessageStatus: Subscription;
  onNewMessagesPush: Subscription;
  unreadMessages: any;
  fileMsg: any;
  isSendFileOpen: boolean;

  params: string[] = [];
  modalActions1 = new EventEmitter<string|MaterializeAction>();
  sizeStatus = "tiny";

  @Input("user")
  user : any;

  @Input("contact")
  contact : any;
  constructor(private userService: UserService,
              private authService : AuthenticationService,
              private renderer : Renderer,
              private pcService:PrivateChatService) {
    this.user = {};
    this.unreadMessages = {};
    this.counterUnread = {};
    this.isSendFileOpen = false;
  }
  @ViewChild('messageHistory') private messageHistoryContainer: ElementRef;

  ngOnInit(): void {
    let self = this;
    self.getCurrentProfile(function () {
      self.onNewMessagesPush = self.pcService.getNewMessagesPush(self.user).subscribe(
        newMsg => {
          //console.log("WorkBench Component, New messages on qwirk app contacts", self.contacts[0].userObject._id);
          for (let contact of newMsg["receiverUser"]) {
            if(!self.unreadMessages[contact]) {
              self.unreadMessages[contact] = [];
              self.counterUnread[contact] = 0;
            }
            self.unreadMessages[contact].push(newMsg);
            self.counterUnread[contact] += 1;
            console.log("WorkBench Component, New messages on qwirk app", self.unreadMessages[contact].length);
          }
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.connection.unsubscribe();
    this.notifyTypings.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageHistoryContainer.nativeElement.scrollTop = this.messageHistoryContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage() {
    this.imessage.content = this.msg;
    this.imessage.receiverUser.push(this.contact);
    this.imessage.sender = this.user._id;
    this.imessage.sendTime = new Date();
    this.imessage.contact = this.fullContact;
    this.imessage.messageStatus = new MessageStatus('pending');
    this.pcService.sendMessage(this.user, this.contact, this.imessage);
    this.messages.push(JSON.parse(JSON.stringify(this.imessage)));
    this.imessage = new Message();
    this.msg = '';
  }

  getCurrentProfile(callback) {
    this.authService.getCurrentUserProfile().subscribe(result => {
      this.user = result;
      callback();
      return result;
    })
  }

  getAllUserContacts() {
    this.userService.getAllContacts(this.user).subscribe(contacts => {
      //console.log(contacts);
      let newContacts = [];
      for(let c of contacts) {
        if(c.userObject) {
          newContacts.push(c);
          this.unreadMessages[c.userObject._id] = [];
        }
      }
      console.log("Get all contacts", newContacts);
      this.contacts = newContacts;
      return contacts;
    })
  }

  bindCheckMessages(contact) {
    let self = this;
    self.contact = contact.userObject;
    self.fullContact = contact;
    self.getMessagesContact(self.fullContact._id);
    if(self.connection) {
      self.connection.unsubscribe();
      self.notifyTypings.unsubscribe();
      self.notifyTypingsBlur.unsubscribe();
      self.onUpdateMessageStatus.unsubscribe();
    }
    self.connection = self.pcService.getMessages(self.user, contact.userObject).subscribe(
      message => {
        self.messages.push(message);
        if(message["messageStatus"]) {
          message["messageStatus"].status = 'delivered';
        }
        self.receivedMessages.push(message);
        self.pcService.updateMessageStatus(self.user, self.contact, message);
      });
    self.notifyTypings = self.pcService.getNotificationWriting(self.user, self.contact).subscribe(
      typ => {
        self.typings = typ;
      }
    );
    self.notifyTypingsBlur = self.pcService.getNotificationBlur(self.user, self.contact).subscribe(
      typ => {
        self.typings = typ;
      }
    );
    self.onUpdateMessageStatus = self.pcService.getMessageWhenMsgStatus(self.user, self.contact).subscribe(
      newMsg => {
        let newMessages = [];
        for(let msg of self.messages) {
          if (msg._id === newMsg["_id"]) {
            newMessages.push(newMsg);
          }
          else {
            newMessages.push(msg);
          }
        }
      }
    );/*
     self.onNewMessagesPush = self.pcService.getNewMessagesPush(self.user).subscribe(
     newMsg => {
     console.log("WorkBench Component, New messages on qwirk app", newMsg);
     }
     );*/
  }

  notifyContactWriting() {
    let self = this;
    self.pcService.sendNotificationWriting(self.user, self.contact);
  }

  fullTypings() {
    let self = this;
    self.pcService.getNotificationWriting(self.user, self.contact).subscribe(
      typ => {
        self.typings = typ;
      }
    );
  }

  blurTypings() {
    this.typings = "";
    this.pcService.sendNotificationBlur(this.user, this.contact);
  }

  getMessagesContact(contact) {
    this.pcService.getAllHistoryContactMessages(contact, 0, 15).subscribe(
      messages => {
        this.messages = messages.reverse();
        console.info("Get messages in workbench", this.contact);
        for (let msg of this.messages) {
          if (msg.sender !== this.user._id) {
            msg.messageStatus.status = "seen";
            this.receivedMessages.push(msg);
          }
          this.pcService.updateMessageStatus(this.user, this.contact, msg);
        }
      }
    )
  }

  updateUnreadStatus() {
    for(let receivedMsg of this.receivedMessages) {
      //console.log("Update Unread Status :", receivedMsg.messageStatus.status !== "seen")
      if (receivedMsg.messageStatus.status !== "seen") {
        //console.log("Update Unread Status : ", this.receivedMessages);
        receivedMsg.messageStatus._id = "";
        receivedMsg.messageStatus.status = "seen";
        this.pcService.updateMessageStatus(this.user, this.contact, receivedMsg);
      }
    }
  }

  toggleIsSendFile() {
    this.isSendFileOpen = !this.isSendFileOpen;
  }

  changeFileMessage(fileInput: any) {
    let self = this;
    if (fileInput.target.files && fileInput.target.files[0]) {
      self.fileMsg = fileInput.target.files;
      let reader = new FileReader();

      reader.onload = function (e : any) {
        self.profileImg = e.target.result;
      };
    }

    this.imessage.content = "File uploaded";
    this.imessage.receiverUser.push(this.contact);
    this.imessage.sender = this.user._id;
    this.imessage.sendTime = new Date();
    this.imessage.contact = this.fullContact;
    this.imessage.messageStatus = new MessageStatus('pending');
    let mes = JSON.parse(JSON.stringify(this.imessage));
    this.pcService.makeFileRequest(mes, this.fileMsg);
    this.messages.push(JSON.parse(JSON.stringify(this.imessage)));
    this.imessage = new Message();
  }
}
