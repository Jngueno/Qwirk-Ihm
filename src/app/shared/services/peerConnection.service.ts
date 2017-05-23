/**
 * Created by Housseini  Maiga on 5/18/2017.
 */
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Router} from "@angular/router";

//Internal import
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import {APPCONFIG} from "../../config/param";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {SET_INCOMING_STREAM, SET_OUTCOMING_STREAM, SET_VIDEO_COMP} from "../reducers/video.reducer";
import {SET_CALL_ONGOING  } from "../reducers/peer.reducer";
let Buzz = require('buzz');
let Peer = require('peerjs');
declare let window : any;

@Injectable()
export class PeerConnectionService {
  private url: string;
  private socket;
  public peer : any;
  public peerId;
  private appConfig: APPCONFIG;
  // private store : Store<any>)
  constructor(private http: Http,
              private route: Router,
              private  store: Store<any>) {
    this.appConfig = new APPCONFIG();
    this.url = this.appConfig.urlAPI;
  }
  initPeer(){
    console.error('Video service > ngOnChanges method fired : :)');
    let peerId = JSON.parse(localStorage.getItem('currentUser')).user_id;
    let config : any = {'iceServers': [{
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'turn:numb.viagenie.ca'],
      username:"fouss.maiga@hotmail.fr",
      credential:"Qwirk2017!"
    }]
    };

    this.peer = new Peer(peerId, {
      host: location.host.split(':')[0],
      port: 8000,
      path: '/peerjs',
      debug: 1,
      config : config
    });

    // this.peer = new Peer(peerId, {
    //   key: 'r7c3c8imm7gjsjor'
    // });
    console.error('Peer : ', this.peer);
    // setTimeout(() => {
    //   console.log('Peer Id > ', this.peer.id);
    //   peertest = this.peer;
    //   //this.peerConnectionSercice.updateUserPerId(this.initiatorPeerId);
    // },1000);
    return this.peer;
  }

  callReceiveEvent()  {
    console.log('callReceiveEvent method fired >  _ ');
    let self = this;
    this.peer.on('connection', function (conn) {
          conn.on('data', function(data){
            // Will print 'hi!'
            console.log('ngOnInit receive data > ',data);
            console.log('data == callEnd >>>>>>>>', data == 'callEnd');
            console.log('!window.existingCall >>>>', !window.existingCall);
            if(data == 'callEnd' && window.existingCall) {
              // console.log('window.existingCall.close(); >>>>  ', window.existingCall);
              // console.log('window.existingCall.close(); >>>>  ', !window.existingCall);
              // console.log('window.localStream.close(); >>>>  ', window.localStream);
              // console.log('window.localStream.close(); >>>>  ', !window.localStream);
              // console.log('window.remoteStream.close(); >>>>  ', window.remoteStream);
              // console.log('window.remoteStream.close(); >>>>  ', !window.remoteStream);
              if(window.localStream  || window.remoteStream){
                console.error('tracks  3: ', window.localStream.getVideoTracks());
                console.error('tracks  4 : ', window.remoteStream.getVideoTracks());
                self.stopStreaming();
                window.rvideo.pause();
                window.lvideo.pause();
                window.rvideo.src = "";
                window.lvideo.src = "";
                window.callRing.stop();
                // this.cdr
              }
              window.existingCall.close();
              self.store.dispatch({
                type : SET_VIDEO_COMP,
                payload : false
              });
              self.store.dispatch({
                type : SET_CALL_ONGOING,
                payload : false
              });
            }
          });
    });

    this.peer.on('call', function(call) {
      let callRing;
      let timer;
      console.log('call > ', call);
      if (!Buzz.isMP3Supported()) {
        alert("Your browser doesn't support MP3 Format.");
      }
      else {
        callRing = new Buzz.sound("../../assets/sound/elegant",{
          formats: [ "mp3", "aac", "wav" ],
          preload: true,
          autoplay: false,
          loop: true
        });
        console.log('this.peer.on call : ', call);
        console.log('incomingSound', callRing);
      }
      window.callRing = callRing;
      let nav = <any>navigator;
      nav.getUserMedia = ( nav.getUserMedia ||
      nav.webkitGetUserMedia ||
      nav.mozGetUserMedia ||
      nav.msGetUserMedia);

      nav.getUserMedia({video: true, audio: false}, function(stream) {
        console.log('Stream 2',  stream);
        window.localStream = stream;
        console.log('Call receive local stream > ', stream);
        self.store.dispatch({
          type : SET_INCOMING_STREAM,
          payload : stream,
        });
        setTimeout(() => {
          callRing.play()
            .fadeIn();
          console.log('start callRinging')
        }, 1000);
        call.answer(stream);
        call.on('stream', function(remotestream){
          console.log('remote on stream fired test 2: ',  remotestream);
          console.log('Call receive remote stream > ', remotestream);
          window.remoteStream = remotestream;
          timer = Buzz.toTimer(callRing.getDuration());
          console.log('Ringing duration : ', timer);
          self.store.dispatch({
            type : SET_OUTCOMING_STREAM,
            payload : remotestream
          });
          window.peerCall = call;
        })
      }, function(err) {
        console.log('Failed to get stream', err);
      })
    });
  }

  stopStreaming() {
    for(var i = 0; i <  window.localStream.getVideoTracks().length; i++) {
      console.error('test track > ', window.localStream.getVideoTracks()[i]);
      window.localStream.getVideoTracks()[i].stop();
    }
    for(var i = 0; i <  window.remoteStream.getVideoTracks().length; i++) {
      console.error('test track > ', window.remoteStream.getVideoTracks()[i]);
      window.remoteStream.getVideoTracks()[i].stop();
    }
  }

  onCallClose() {
    this.peer('close', function () {

    })
  }

  // onCallStart(initiator, joiner){
  // let connectCounter = 0;
  //   console.log('PeerConnectionService > onCallStart method fired');
  //   this.socket = io(this.url + 'callPeer');
  //   let data =[];
  //   data.push(initiator);
  //   data.push(joiner);
  //   console.log('callRemotePeer : ', JSON.parse(JSON.stringify(data)));
  //   this.socket.on('connect', function() {
  //     connectCounter++;
  //     console.log('onCallStart > Connected users : ', connectCounter);
  //   });
  //   this.socket.on('disconnect', function() {
  //     connectCounter--;
  //     console.log('onCallStart > Remaind users after disconnect: ', connectCounter);
  //   });
  //   this.socket.emit('callRemotePeer', JSON.parse(JSON.stringify(data)));
  // }
  //
  // onCallReceive() {
  //   let connectCounter = 0;
  //   // console.log('PeerConnectionService > onCallReceive method fired');
  //   // let roomName = "";
  //   let observable = new Observable(
  //     observer => {
  //       this.socket = io(this.url);
  //       this.socket.on('connect', function() {
  //         connectCounter++;
  //         // console.log('onCallReceive > Connected users : ', connectCounter);
  //       });
  //       console.log('PeerConnectionService > onCallReceive internal ', this.socket);
  //       this.socket.on('call', (data : any) => {
  //         // console.log('PeerConnectionService > onCallReceive observer : ', data.content);
  //         observer.next(data.content);
  //       });
  //       return () => {
  //         //console.log('PeerConnectionService > onCallReceive return');
  //         this.socket.disconnect();
  //         this.socket.on('disconnect', function() {
  //           connectCounter--;
  //           //console.log('onCallReceive > Remaind users after disconnect: ', connectCounter);
  //         });
  //       };
  //     });
  //   return observable;
  // }
  //
  // updateUserPerId(peer) {
  //   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   let user = {
  //     email : currentUser,
  //     peerId : peer
  //   };
  //   return this.http.put(this.url + 'update/peer/', user)
  //     .map((response: Response) => response.json());
  // }
}
