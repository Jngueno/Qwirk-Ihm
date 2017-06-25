/**
 * Created by TBS on 26/03/2017.
 */
import {Router} from "@angular/router";
import { Headers, Http } from '@angular/http';
import {APPCONFIG} from '../../config/param';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
let queryString = require('query-string');
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class GroupService {
  // private baseURL = 'http://localhost:8000/'
  protected headers = new Headers({'Content-Type': 'application/json'});

  private url: string;
  private appConfig: APPCONFIG;
  private socket;
  constructor(private http: Http) {
    this.appConfig = new APPCONFIG();
    this.url = this.appConfig.urlAPI;
  }

  getGroups() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return this.http.get(this.url + 'groups/' + currentUser.user_id)
      .map( res => res.json())
  }

  addGroup(content) {
    let body = content || '{}';
    let self = this;
    return this.http.post(this.url + 'groups', body).map(
      res => {
        return res;
      }
    )
  }

  updateGroup(content) {
    let body = content || '{}';
    return this.http.put(this.url + 'groups', JSON.stringify(body))
  }

  triggerGetInvitation() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let userId = currentUser.user_id;
    // io.set('origins', 'http://localhost:* http://127.0.0.1:*')
    this.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
    this.socket.emit('getInvites', userId);
    console.log(this.socket)
  }

  // inv (callback) {
  //   this.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
  //   // this.socket.emit('test', 'test')
  //   console.log(this.socket)
  //   this.socket.on('test', (data) => {
  //     console.log('INVITATIONS', data)
  //     return callback(data)
  //   })
  // }

  getInvitations() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let userId = currentUser.user_id

    console.log('USERID : ', userId, typeof userId)
    // this.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
    // this.socket.on(userId, (data) => {
    //   console.log('INVITATIONS', data)
    // })
    let self = this
    let observable = new Observable(
      observer => {

        console.log('BEFORE retrieve invites')
        console.log(this.socket)
        self.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
        // this.socket.emit('test', 'test')
        self.socket.on('test', (data) => {
          console.log('INVITATIONS', data)
          observer.next(data);
        })
        return () => {
          this.socket.disconnect();
          console.log('TESSST')
        };
      })
    console.log('RETURN OBSERVABLE')
    return observable;
  }

  getErrors(sender, receiver) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let roomName = currentUser.user_id;
    let observable = new Observable(
      observer => {
        this.socket.on(roomName, (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      })
    return observable;
  }

  connectToGroupsChannels () {
    // this.socket.emit('joinAllGroups', re)
  }

  createGroup(group){
    // console.log("Emit group :", group)
    // this.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
    this.socket.emit('createGroupRoom', group);
    console.log("Emit group SUCCESS:", group)
  }

  triggerJoinGroup(group) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let observable = new Observable(
      observer => {
        this.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
        this.socket.on('triggerJoinGroup', (data) => {
          if (group.member.indexOf(currentUser.user_id ) > -1) {
            observer.next(data);
            this.socket.emit('joinGroup', data);
          }
        });
        return () => {
          this.socket.disconnect();
        };
      })
    return observable;
  }

  triggerSendInvitation(invitation) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let observable = new Observable(
      observer => {
        this.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
        this.socket.on('triggerSendInvitation', (data) => {
          console.log('group sent to trgSendInvitation : ', data)
          if (data.members.indexOf(currentUser.user_id ) > -1) {
            if(data.isPublic === false) {
              observer.next(data);
              console.log('isPublic false')
              this.socket.emit('invitationToUser', { group : data, initiator: currentUser.user_id, targets: data.members});
            }
            if(data.isPublic === true) {
              observer.next(data);
            }
          }
        });
        return () => {
          this.socket.disconnect();
        };
      })
    return observable;
  }

  // invitationSent(invitation) {
  //   let currentUser = JSON.parse(localStorage.getItem('currentUser'))
  //   let observable = new Observable(
  //     observer => {
  //       this.socket = io(this.baseURL + '/groupSocket');
  //       this.socket.on('triggerSendInvitation', (data) => {
  //         if (data.members.indexOf(currentUser.user_id ) > -1) {
  //           observer.next(data);
  //           this.socket.emit('invitationToUser', { group : data, initiator: currentUser.user_id, targets: data.members});
  //         }
  //       });
  //       return () => {
  //         this.socket.disconnect();
  //       };
  //     })
  //   return observable;
  // }

  invitationReceived(invitation) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
      let observable = new Observable(
        observer => {
          this.socket = io(this.appConfig.getUrlAPI() + 'groupSocket');
          this.socket.on('invitationReceived', (data) => {
            if (data.members.indexOf(currentUser.user_id ) > -1) {
              observer.next(data);
            }
          });
          return () => {
            this.socket.disconnect();
          };
        })
      return observable;
  }

}
