/**
 * Created by Housseini  Maiga on 5/18/2017.
 */
import {Component, OnInit, ViewChild, Input, OnChanges, ChangeDetectorRef} from '@angular/core';
import {Alert} from "selenium-webdriver";
import {PeerConnectionService} from "../../shared/services/peerConnection.service";
import {APPCONFIG} from "../../config/param";
import * as io from 'socket.io-client';
import {Store} from "@ngrx/store";
import {
  INIT_VIDEO_CONTENT_STORE, SET_OUTCOMING_STREAM, SET_INCOMING_STREAM,
  IVideoContent, SET_VIDEO_COMP
} from "../../shared/reducers/video.reducer";
import {SET_IS_AUDIO_CALL, SET_MUTE} from "../../shared/reducers/video.settings.reducer";
import {SET_CALL_RING, SET_CALL, IPeer} from "../../shared/reducers/peer.reducer";
import {forEach} from "@angular/router/src/utils/collection";
let Buzz = require('buzz');
declare let window : any;
@Component({
  selector: 'qvideo',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [PeerConnectionService]
})
export class VideoComponent implements OnInit, OnChanges {
  @ViewChild('localvideo') localvideo: any;
  @ViewChild('remotevideo') remotevideo: any;
  // @Input() isVideo = false;
  @Input() contact : any;
  @Input()  peer : any;
  @Input()  media : any;
  @Input() isOnGoingCall : boolean;
  // private apiUrl = 'http://localhost:8000';
  initiatorPeerId;
  joinerPeerId;
  isVideocam = true;
  isMuted = false;
  isCallAccepted : boolean = false;
  profileImg = "../assets/img/avatar.png";

  constructor(private peerConnectionSercice: PeerConnectionService,
              private store : Store<any>,
              private  cdr: ChangeDetectorRef) {
    console.log('VideoComponent > constructor method fired : :)');
  }

  ngOnChanges(...args : any[]){
    console.log('VideoComponent > ngOnChanges method fired : :)');
    this.initiatorPeerId = JSON.parse(localStorage.getItem('currentUser')).user_id;
    if(this.contact) {
      this.joinerPeerId = this.contact._id;
      this.startCall();
    }
  }

  ngOnInit() {
    console.log('ngOnInit > ');
    let lvideo: HTMLVideoElement = this.localvideo.nativeElement;
    let rvideo: HTMLVideoElement = this.remotevideo.nativeElement;
    this.store.select<IVideoContent>('videoState').subscribe( (videosStream : IVideoContent) => {
      if(videosStream.incomingStream) {
        lvideo.src = URL.createObjectURL( videosStream.incomingStream);
        lvideo.play();
        window.lvideo = lvideo;
        this.cdr.markForCheck();
      }
      if(videosStream.outcomingStream) {
        rvideo.src = URL.createObjectURL( videosStream.outcomingStream);
        rvideo.play();
        window.rvideo = rvideo;
        this.cdr.markForCheck();
      }
    });

    this.store.select<IPeer>('peerObject').subscribe((callstate : IPeer) => {
      if(!callstate.isCallOngoing){
        rvideo.pause();
        lvideo.pause();
        rvideo.src = "";
        lvideo.src = "";
        this.cdr.markForCheck();
      }
    })
  }

  startCall(){
    var localvar = this.peer;
    var fname = this.joinerPeerId;
    var self = this;

      console.info("startcall inner >>>>>>>> ", this.peer, this.initiatorPeerId, this.joinerPeerId);
    //var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    let nav = <any>navigator;
    nav.getUserMedia = (
    nav.getUserMedia ||
    nav.webkitGetUserMedia ||
    nav.mozGetUserMedia ||
    nav.msGetUserMedia);

    nav.getUserMedia({video: true, audio: false}, function(stream) {
      window.peerCall = localvar.call(fname, stream);
      // let callRing = self.callRinging();
      window.callRing = self.callRinging();
      window.localStream = stream;
      setTimeout(() => {
        window.callRing.play()
          .fadeIn();
        console.log('start callRinging');
      }, 1000);
      console.log('end callRinging');
      self.store.dispatch({
        type : SET_INCOMING_STREAM,
        payload : stream,
      });
      window.peerCall.on('stream', function(remotestream) {
        console.log('remote on stream fired test 1 : ', remotestream);
        self.store.dispatch({
          type : SET_OUTCOMING_STREAM,
          payload : remotestream
        });
        window.remoteStream = remotestream;
        // window.existingCall = call;
        self.store.dispatch({
          type : SET_CALL,
          payload : window.peerCall
        });
      })
    }, function(err){
      console.log('Failed to get stream', err);
    })
  }

  callRinging() {
    var callRing;
    if (!Buzz.isMP3Supported()) {
      alert("Your browser doesn't support MP3 Format.");
    }
    else {
      callRing = new Buzz.sound("../../assets/sound/mystic_call",{
        formats: [ "mp3", "aac", "wav" ],
        preload: true,
        autoplay: false,
        loop: true
      });
    }
    return callRing;
  }

  // onCallRecaive() {
  //   let lvideo: HTMLVideoElement = this.localvideo.nativeElement;
  //   let rvideo: HTMLVideoElement = this.remotevideo.nativeElement;
  //   // this.peer.destroy();
  //   //this.peer = new Peer(test, { key: 'i08geat3wrrdaemi'});
  //
  //
  //   console.log('onCallReceive peer >  ', this.peer);
  //   // setTimeout(() => {
  //   //   this.initiatorPeerId = this.peer.id;
  //   //   console.log('Peer Id : ', this.peer.id);
  //   //   //this.peerConnectionSercice.updateUserPerId(this.initiatorPeerId);
  //   // },1000);
  //
  //   this.peer.on('connection', function(conn) {
  //     conn.on('data', function(data){
  //       // Will print 'hi!'
  //       console.log('ngOnInit > ',data);
  //     });
  //   });
  //
  //   let nav = <any>navigator;
  //   nav.getUserMedia = ( nav.getUserMedia ||
  //   nav.webkitGetUserMedia ||
  //   nav.mozGetUserMedia ||
  //   nav.msGetUserMedia);
  //
  //   this.peer.on('call', function(call) {
  //     let callRing;
  //     let timer;
  //     console.log('call > ', call);
  //     if (!Buzz.isMP3Supported()) {
  //       alert("Your browser doesn't support MP3 Format.");
  //     }
  //     else {
  //       callRing = new Buzz.sound("../../assets/sound/games_of_thrones",{
  //         formats: [ "mp3", "aac", "wav" ],
  //         preload: true,
  //         autoplay: false,
  //         loop: true
  //       });
  //       console.log('this.peer.on call : ', call);
  //       console.log('incomingSound', callRing);
  //       // callRing.play();
  //     }
  //     nav.getUserMedia({video: true, audio: false}, function(stream) {
  //       console.log('Stream 2',  stream);
  //       lvideo.src = URL.createObjectURL( stream);
  //       lvideo.play();
  //       call.answer(stream);
  //       call.on('stream', function(remotestream){
  //         console.log('remote on stream fired test 2: ',  remotestream);
  //         rvideo.src = URL.createObjectURL(remotestream);
  //         rvideo.play();
  //         timer = Buzz.toTimer(callRing.getDuration());
  //         console.log('Ringing duration : ', timer);
  //       })
  //     }, function(err) {
  //       console.log('Failed to get stream', err);
  //     })
  //   });
  //   //console.log('listAllPeers > Connected users list : ', this.peer.listAllPeers)
  // }

  setVideocam() {
    this.isVideocam = !this.isVideocam;
    this.store.dispatch({
      type : SET_IS_AUDIO_CALL,
      payload : this.isVideocam,
    });
  }

  handUp() {
    // console.error('window.call exist before handUp >>> ', window.peerCall);
    // console.error('window.call exist before handUp >>> ', !!window.peerCall);
    // console.error('window.callRing exist before handUp >>> ', window.callRing);
    // console.error('window.callRing exist before handUp >>> ', !!window.callRing);
    // console.error('window.localStream >>> ', window.localStream);
    // console.error('window.localStream >>> ', !!window.localStream);
    // console.error('window.remoteStream >>> ', window.remoteStream);
    // console.error('window.remoteStream >>> ', !!window.remoteStream);
    if(window.peerCall){
      if(window.localStream  || window.remoteStream){
        console.error('tracks  1 : ', window.localStream.getVideoTracks());
        console.error('tracks  2 : ', window.remoteStream.getVideoTracks());
        // .bind("timeupdate", function () {
        //   //document.querySelector("#timer").innerHTML = Buzz.toTimer(this.getTime());
        // });
        this.stopStreaming();
      }
      this.store.dispatch({
        type : SET_VIDEO_COMP,
        payload : false
      });
      this.connect(this.joinerPeerId, 'callEnd');
    }
  }

  stopStreaming() {
    for (var i = 0; i < window.localStream.getVideoTracks().length; i++) {
      console.error('test track > ', window.localStream.getVideoTracks()[i]);
      window.localStream.getVideoTracks()[i].stop();
    }
    for (var i = 0; i < window.remoteStream.getVideoTracks().length; i++) {
      console.error('test track > ', window.remoteStream.getVideoTracks()[i]);
      window.remoteStream.getVideoTracks()[i].stop();
    }

    window.rvideo.pause();
    window.lvideo.pause();
    window.rvideo.src = "";
    window.lvideo.src = "";
    window.callRing.stop();
    this.cdr.markForCheck();
  }

  setMuted() {
    this.isMuted = !this.isMuted;
    this.store.dispatch({
      type : SET_MUTE,
      payload : this.isMuted,
    });
  }

  connect(joinerId, message = null){
    console.log('Connect joinerPeerId > ', joinerId);
    var conn = this.peer.connect(joinerId);
    var self = this;
    var msg = message != null ? message :  this.contact;
    window.connection = conn;
    conn.on('open', function(){
      console.log('Connect to  > ', self.contact);
      conn.send(msg);
    });
  }

  audioConnect() {
    let lvideo: HTMLVideoElement = this.localvideo.nativeElement;
    let rvideo: HTMLVideoElement = this.remotevideo.nativeElement;
    let localvar = this.peer;
    let fname = this.joinerPeerId;

    let nav = <any>navigator;
    nav.getUserMedia = (
    nav.getUserMedia ||
    nav.webkitGetUserMedia ||
    nav.mozGetUserMedia ||
    nav.msGetUserMedia);

    nav.getUserMedia({video: true, audio: true}, function(stream) {
      console.log('Stream 1',  stream);
      window.localStream = stream;
      let call = localvar.call(fname,  stream);
      lvideo.src = URL.createObjectURL( stream);
      lvideo.play();
      window.lvideo = lvideo;
      call.on('stream', function(remotestream) {
        console.log('remote on stream fired 1 : ',  remotestream);
        window.remoteStream = remotestream;
        // window.remoteStream = remotestream;
        rvideo.src = URL.createObjectURL(remotestream);
        rvideo.play();
        window.rvideo = rvideo;
      })
    }, function(err){
      console.log('Failed to get stream', err);
    })
  }

}
