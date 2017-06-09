
/**
 * Created by jngue on 08/06/2017.
 */



import {Injectable} from "@angular/core";
import {APPCONFIG} from "../../config/param";
import {Http, Response, Headers} from "@angular/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class GroupChatService {
  public appConfig = new APPCONFIG();
  response : any;
  reset : any;
  private url = this.appConfig.getUrlAPI();
  private socket;
  private globalSocket;
  private responseData: any;
  constructor(private http: Http) {}

  sendMessage(group, message){
    let roomName = group._id;
    message.roomName = roomName;
    console.log("Send Message RoomName : ", roomName);
    this.socket.emit(roomName, JSON.parse(JSON.stringify(message)));
  }

  initConnection() {

  }

  joinAllGroups (user) {
    this.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.socket.emit('joinAllGroups', currentUser.user_id);
  }

  getMessages(group) {
    let roomName = group._id;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userRoom = {"user" : currentUser.user_id, "room" : roomName};
    console.log("Hey is me", userRoom);
    let observable = new Observable(
      observer => {
        this.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
        this.socket.emit('room', userRoom);
        this.socket.on(roomName, (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      })
    return observable;
  }

  disconnectSocket() {
    this.socket.disconnect();
  }

  sendNotificationWriting(sender) {
    let message = sender.username + " is typing";
    this.socket.emit('isTyping', message);
  }

  sendNotificationBlur() {
    let message = "";
    this.socket.emit('isTyping', message);
  }

  updateMessageStatus(message) {
    this.socket.emit('updateStatus', message);
  }

  getNotificationWriting(group) {
    let roomName = group._id;
    let observable = new Observable(
      observer => {
        //this.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
        //console.log('Receive message');
        //console.log(roomName);
        //this.socket.emit('room', roomName);
        this.socket.on('isTyping', (data) => {
          //console.log('Receive message');
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    return observable;
  }

  getNotificationBlur(group) {
    let observable = new Observable(
      observer => {
        //let roomName = group._id;
        //this.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
        //this.socket.emit('room', roomName);
        this.socket.on('isTyping', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    return observable;
  }

  getMessageWhenMsgStatus(group) {
    let observable = new Observable(
      observer => {
        //let roomName = group._id;
        //this.socket.emit('room', roomName);
        this.socket.on('updateStatus', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    return observable;
  }

  getAllHistoryGroupMessages(group, start, limit) {
    return this.http.get(this.appConfig.getUrlAPI() + 'groupmessages/' + group._id + '/' + start + '/' + limit)
      .map((response : Response) => {
        //console.log(response.json());
        return response.json();
      })
  }


  getNewMessagesPush(sender, group) {
    let roomName = group._id;
    let observable = new Observable(
      observer => {
        this.socket = io(this.appConfig.getUrlAPI());
        //this.socket.emit('room', roomName);
        this.socket.on('newGroupMessage', (data) => {
          //console.log("Get new messages from qwirk platform",sender, data.receiverUser);
          if(data.receiverUser.indexOf(sender._id) !== -1) {
            observer.next(data);
          }
        });
        return () => {
          this.socket.disconnect();
        };
      });
    return observable;
  }

  bindToRoom(group) {
    let roomName = group._id;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userRoom = {"user" : currentUser.user_id, "room" : roomName};
    console.log("Hey is me", userRoom);
  }

  makeFileRequest (postData: any, files: File[]) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    let formData:FormData = new FormData();
    formData.append('files', files[0], files[0].name);
    // For multiple files
    // for (let i = 0; i < files.length; i++) {
    //     formData.append(`files[]`, files[i], files[i].name);
    // }

    if(postData !=="" && postData !== undefined && postData !==null){
      for (let property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, JSON.stringify(postData[property]));
        }
      }
    }
    let returnReponse = new Promise((resolve, reject) => {
      this.http.post(this.appConfig.getUrlAPI() + "uploadMessage", formData, {
        headers: headers
      }).subscribe(
        res => {
          this.responseData = res.json();
          resolve(this.responseData);
        },
        error => {
          reject(error);
        }
      );
    });
    return returnReponse;
  }
}
