/**
 * Created by Housseini  Maiga on 3/13/2017.
 */
import {
  Component, OnInit, EventEmitter, ViewEncapsulation, OnDestroy, AfterViewChecked,
  ElementRef, ViewChild, HostListener, HostBinding, Renderer
} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import { PrivateChatService } from './../services/private_chat.service';
import {IUser} from "../models/user";
import {Subscription} from "rxjs";
import {Message} from "../models/message";
import {MessageStatus} from "../models/messageStatus";
import {PeerConnectionService} from "../services/peerConnection.service";
import {APPCONFIG} from "../../config/param";
import {GroupService} from "../services/group.service";
import {GroupChatService} from "../services/group_chat.service";
import * as moment from 'moment/moment';

/*import * as wdtEmojiBundle from 'wdt-emoji-bundle';*/

@Component({
  selector: 'workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [PrivateChatService, PeerConnectionService, GroupChatService]
})
export class WorkbenchComponent implements OnInit, OnDestroy, AfterViewChecked {
  isCollapse: boolean = false;
  onChanged: string = 'slide-out';
  isSendFileOpen: boolean;
  contacts: Object[];/* = [
    {"userId" : 0, "firstName": "Housseini", "lastName" : "Maiga", "description" : "Mess with the best.. Die with the rest.", "profilePicture" : "http://bit.ly/2n4OzaM", "username" : "fouss maiga"},
    {"userId" : 1, "firstName": "Jennyfer", "lastName" : "Ngueno", "description" : "Never give up settle", "profilePicture" : "http://bit.ly/2nJ25ln", "username" : "jngueno"},
    {"userId" : 2, "firstName": "Ervin", "lastName" : "Larry", "description" : "Autre est en Nous ..!", "profilePicture" : "http://bit.ly/2onErh0", "username" : "TBS"}
  ];*/
  chips : string[] = [];
  chipsInit = {
    data: [{
      tag: 'Apple',
    }, {
      tag: 'Microsoft',
    }, {
      tag: 'Google',
    }],
  };

  chipsPlaceholder = {
    placeholder: '+Username/Email',
    secondaryPlaceholder: 'Enter username or email',
  };
  chipsAutoComplete = {
    'data': {
      'Jennyfer Ngueno': null,
      'Ervin Larry': null,
      'Ario Maiga': null,
      'Fouss Maiga': null
    },
    limit: Infinity,
    minLength: 2
  };
  params: string[] = [];
  modalActions1 = new EventEmitter<string|MaterializeAction>();
  modalIdentifier;
  sizeStatus = "tiny";
  user : any;
  contact : any;/*
  receiver = {
    "_id": "58d722a3aa2cce3c7c9d785e",
    "updatedAt": "2017-05-06T20:56:50.551Z",
    "createdAt": "2017-03-26T02:08:35.724Z",
    "status": "58d72244aa2cce3c7c9d785a",
    "hash": "b4facdc12f3c70abc23e77c1ee9fa8972ebe5f90660f8ce50dc55d4022e01fc88d0d6afd6c50c634098047691495b396f9db26abc9c1ac83a0c7bb9cea22795b",
    "salt": "efb412300f8f6c5698ebbd1ff371b5f0",
    "username": "aFokam",
    "email": "jennyferngueno@gmail.com",
    "lastName": "FOKAM",
    "firstName": "Ange",
    "contacts": [],
    "__v": 0,
    "password": "aFokam",
    "resetPasswordToken": "60cbc6bc267ca2c488fb7ebc97116ea59ddbe3ba",
    "resetPasswordExpires": "2017-05-07T08:56:50.542Z",
    "isActivated": true,
    "isModerator": false,
    "statusData": {
      "name": "Hidden",
      "color": "black"
    },
    "invitedGroups": [],
    "groups": []
  };
  sender = {
    "_id": "58ee7efe54d7d72e1c3d060a",
    "updatedAt": "2017-05-02T22:00:12.533Z",
    "createdAt": "2017-04-12T19:24:46.794Z",
    "resetPasswordToken": null,
    "resetPasswordExpires": null,
    "status": "58d72244aa2cce3c7c9d785a",
    "hash": "65a16d2d522584d3e968bf348c39d96c29df91d60bd18472c1e8ddb686f5520232684b011a6377b710ef6503bb7ca022d58d2d1e9916d83bbd179c855bf10ca1",
    "salt": "cc17a2bdd44d52a2fe07191afc90c9a9",
    "username": "toto",
    "email": "toto@email.fr",
    "lastName": "Totototo",
    "firstName": "Toto",
    "contacts": [],
    "__v": 0,
    "isActivated": true,
    "isModerator": false,
    "statusData": {
      "name": "Hidden",
      "color": "black"
    }
  }*/
  messages = [];
  receivedMessages = [];
  connection;
  msg;
  invitations;
  private imessage = new Message();
  public appConfig = new APPCONFIG();
  profileImg;
  typings: any;
  private notifyTypings: any;
  private notifyTypingsBlur: Subscription;

  groupTypings: any;
  private groupNotifyTypings: any;
  private groupNotifyTypingsBlur: Subscription;
  private fullContact: any;
  private openModalClass;
  //private renderer: Renderer;
  private counterUnread : Object;
  onUpdateMessageStatus: Subscription;
  onNewMessagesPush: Subscription;
  unreadMessages: any;
  fileMsg: any;
  private groups: any;
  private channels:any;
  group: any;
  constructor(private userService: UserService,
              private authService : AuthenticationService,
              private renderer : Renderer,
              private pcService:PrivateChatService,
              private groupService : GroupService,
              private peerConService : PeerConnectionService,
              private gcService: GroupChatService) {
    this.user = {};
    this.openModalClass = '';
    this.unreadMessages = {};
    this.counterUnread = {};
    this.groups = [];
    this.channels = [];
    this.isSendFileOpen = false;
    this.notifyTypings = null;
  }
  @ViewChild('messageHistory') private messageHistoryContainer: ElementRef;

  ngOnInit() {
    let self = this;
    self.getCurrentProfile(function () {
      self.getAllUserContacts();
      self.getAllUserGroups(function (groups) {
        for (let group of groups) {
        }
      });

      self.scrollToBottom();
      //self.gcService.joinAllGroups(self.user);
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

      /*
      self.renderer.listen(self.messageHistoryContainer.nativeElement, "scroll", (event: Event) => {
        console.log(event);
      });*/
      //console.log(self.messageHistoryContainer.nativeElement);
      /*
      this.messageHistoryContainer.nativeElement. = (event: Event) => {
        console.log(event);
      };*/
      //wdtEmojiBundle.init('.wdt-emoji-bundle-enabled');
      //self.fullTypings();
    });
  }

  ngAfterViewChecked() {
  }

  scrollToBottom(): void {
    /*try {
      this.messageHistoryContainer.nativeElement.scrollTop = this.messageHistoryContainer.nativeElement.scrollHeight;
    } catch(err) { }*/
    let objDiv = document.getElementById("messageHistory");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.notifyTypings.unsubscribe();
  }

  createGroup() {
    this.groupService.createGroup(this.group)
  }

  addContact(){
    if(this.contacts.length > 0)
    //this.userService.addContact(this.contacts);
      console.log("test");
    else
      console.log("Aucun contact n'a été ajouté");
  }

  openContactPopin(id) {
    this.modalIdentifier = id
    this.modalActions1.emit({action:"modal",params:['open']});
    this.openModalClass = 'open';
  }

  closeContactopIn() {
    this.modalActions1.emit({action:"modal",params:['close']});
    this.openModalClass = 'close';
    console.log();
  }

  onModalActionChanged(data : any){
    console.log("test ", data);
  }

  onToggle() {
    this.onChanged = this.isCollapse ? "slide-out" : "slide-in";
    this.isCollapse = !this.isCollapse;
  }

  add(chip) {
    console.log("Chip added: " + chip.tag + " And chips list length is " + this.chips.length);
    this.chips.push(chip.tag);
    console.log("Chip added: " + chip.tag + " And chips list length is " + this.chips.length);

  }

  delete(chip) {
    let index = this.chips.indexOf(chip.tag);
    if(index > -1) {
      this.chips.splice(index, 1);
      console.log("Chips list ", this.chips.length);
    }
    //console.log("Test Chip deleted: " + chip.tag + " And chips list length is " + this.chips.length);
  }

  select(chip) {
    console.log("Chip selected: " + chip.tag);
  }

  bindModalToOpen() {
    console.log('Workbench status');
  }

  sendMessage() {
    this.imessage.content = this.msg;
    this.imessage.sender = this.user._id;
    this.imessage.sendTime = new Date();
    this.imessage.messageStatus = new MessageStatus('pending');
    console.log("Send message fullcontact", this.fullContact);
    if(this.fullContact !== null && this.fullContact !== undefined) {
      this.imessage.contact = this.fullContact;
      this.imessage.receiverUser.push(this.contact);
      console.log("Send message work user", this.imessage, this.group);
      this.pcService.sendMessage(this.user, this.contact, this.imessage);
    }
    else if(this.group !== null && this.group !== undefined) {
      this.imessage.receiverGroup = this.group;
      console.log("Send message work well", this.imessage, this.group);
      this.gcService.sendMessage(this.group, this.imessage);
    }

    console.log("Send message work", this.imessage, this.group);
    this.messages.push(JSON.parse(JSON.stringify(this.imessage)));

    this.scrollToBottom();
    this.imessage = new Message();
    this.msg = '';
  }

  expand_sidebar() {
    this.isCollapse = !this.isCollapse;
    this.isCollapse ? this.sizeStatus = "very-tiny" : this.sizeStatus = "tiny";
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

  getAllUserGroups(callback) {
    this.groupService.getGroups().subscribe(groups => {
      //console.log(contacts);/
      /*
      let newContacts = [];
      for(let c of contacts) {
        if(c.userObject) {
          newContacts.push(c);
          this.unreadMessages[c.userObject._id] = [];
        }
      }*/
      //console.log("Get all contacts", newContacts);
      for(let group of groups) {
        if(group.isPublic) {
          this.channels.push(group);
        }
        else {
          this.groups.push(group);
        }
      }
      callback(groups);
    })
  }

  getUserProfile(userIdentifier) {
    let profileImg = "";
    this.userService.getUserProfile(userIdentifier).subscribe(
      result => {
        if (!result) {
          profileImg = "../../assets/img/avatar.png";
          return profileImg;
        }
        else {
          profileImg = result;
          return profileImg;
        }
      },
      err => {
        profileImg = "../../assets/img/avatar.png";
        return profileImg;
      }
    )
  }

  bindCheckMessages(contact) {
    let self = this;
    self.contact = contact.userObject;
    self.group = null;
    self.fullContact = contact;
    self.getMessagesContact(self.fullContact._id);
    if(self.notifyTypings) {
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
        console.log("New message for me : ", message);
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
    );
    /*
    self.onNewMessagesPush = self.pcService.getNewMessagesPush(self.user).subscribe(
      newMsg => {
        console.log("WorkBench Component, New messages on qwirk app", newMsg);
      }
    );*/
  }

  bindCheckGroupMessages(group) {
    let self = this;
    self.group = group;
    self.contact = null;
    self.fullContact = null;
    self.gcService.bindToRoom(self.group);
    self.getMessagesGroup(self.group);
    if(self.notifyTypings) {
      self.notifyTypings.unsubscribe();
      self.notifyTypingsBlur.unsubscribe();
      self.onUpdateMessageStatus.unsubscribe();
    }
    self.connection = self.gcService.getMessages(group).subscribe(
      message => {
        self.messages.push(message);
        if(message["messageStatus"]) {
          message["messageStatus"].status = 'delivered';
        }
        self.receivedMessages.push(message);
        self.gcService.updateMessageStatus(message);
      });
    self.notifyTypings = self.gcService.getNotificationWriting(group).subscribe(
      typ => {
        self.typings = typ;
      }
    );
    self.notifyTypingsBlur = self.gcService.getNotificationBlur(group).subscribe(
      typ => {
        self.typings = typ;
      }
    );
    self.onUpdateMessageStatus = self.gcService.getMessageWhenMsgStatus(group).subscribe(
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
    );
  }

  notifyWriting() {

    if(this.fullContact !== null && this.fullContact !== undefined) {
      this.notifyContactWriting();
    }
    else if(this.group !== null && this.group !== undefined) {
      this.notifyGroupWriting();
    }

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
    if(this.fullContact !== null && this.fullContact !== undefined) {

      this.typings = "";
      this.pcService.sendNotificationBlur(this.user, this.contact);
    }
    else if(this.group !== null && this.group !== undefined) {

      this.typings = "";
      this.gcService.sendNotificationBlur();
    }
  }

  notifyGroupWriting() {
    let self = this;
    self.gcService.sendNotificationWriting(self.user);
  }

  fullGroupTypings() {
    let self = this;/*
    self.gcService.getNotificationWriting().subscribe(
      typ => {
        self.typings = typ;
      }
    );*/
  }

  blurGroupTypings() {
    this.typings = "";
    this.gcService.sendNotificationBlur();
  }

  getMessagesContact(contact) {
    let self = this;
    this.pcService.getAllHistoryContactMessages(contact, 0, 1000).subscribe(
      messages => {
        this.messages = messages.reverse();
        self.scrollToBottom();
        console.info("Get messages in contact", this.messages[0].sendTime);
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

  getMessagesGroup(group) {
    this.gcService.getAllHistoryGroupMessages(group, 0, 1000).subscribe(
      messages => {
        this.messages = messages.reverse();
        console.info("Get messages in group", this.messages);
        for (let msg of this.messages) {
          if (msg.sender !== this.user._id) {
            msg.messageStatus.status = "seen";
            this.receivedMessages.push(msg);
          }
          this.gcService.updateMessageStatus(msg);
        }
        this.scrollToBottom();
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
        if(this.fullContact !== null && this.fullContact !== undefined) {
          this.pcService.updateMessageStatus(this.user, this.contact, receivedMsg);
        }
        else if(this.group !== null && this.group !== undefined) {
          this.gcService.updateMessageStatus(receivedMsg);
        }
      }
    }

  }

  updateGroupUnreadStatus() {
    for(let receivedMsg of this.receivedMessages) {
      //console.log("Update Unread Status :", receivedMsg.messageStatus.status !== "seen")
      if (receivedMsg.messageStatus.status !== "seen") {
        //console.log("Update Unread Status : ", this.receivedMessages);
        receivedMsg.messageStatus._id = "";
        receivedMsg.messageStatus.status = "seen";
        this.gcService.updateMessageStatus(receivedMsg);
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
    this.imessage.sender = this.user._id;
    this.imessage.sendTime = new Date();
    this.imessage.messageStatus = new MessageStatus('pending');
    console.log("Group file", this.group);
    if (this.fullContact) {
      this.imessage.contact = this.fullContact;
      this.imessage.receiverUser.push(this.contact);
      console.log("User file", this.fullContact, this.contact);
    }

    else if (this.group){
      this.imessage.receiverGroup = this.group;
      console.log("Group file", this.group);
    }
    let mes = JSON.parse(JSON.stringify(this.imessage));
    this.pcService.makeFileRequest(mes, this.fileMsg);
    this.messages.push(JSON.parse(JSON.stringify(this.imessage)));
    this.imessage = new Message();
  }
  //@HostBinding('class.message-history')
  /*@HostListener('class.message-history:scroll', ['$event'])
  onScroll(event) {
    console.log(event);
  }*/
}
