/**
 * Created by Housseini  Maiga on 5/18/2017.
 */
import {Component, OnInit, ViewChild, Input, OnChanges} from '@angular/core';
import {Alert} from "selenium-webdriver";
import {PeerConnectionService} from "../../shared/services/peerConnection.service";
import {APPCONFIG} from "../../config/param";
import * as io from 'socket.io-client';
let Buzz = require('buzz');
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
  private apiUrl = 'http://localhost:8000';
  initiatorPeerId;
  joinerPeerId;

  constructor(private peerConnectionSercice: PeerConnectionService) {
    console.log('VideoComponent > constructor method fired : :)');
  }

  ngOnChanges(...args : any[]){
    console.log('VideoComponent > ngOnChanges method fired : :)');
    this.initiatorPeerId = JSON.parse(localStorage.getItem('currentUser')).user_id;
    if(this.media) {
      console.log('Stream condition > ', this.media);
      let lvideo: HTMLVideoElement = this.localvideo.nativeElement;
      let rvideo: HTMLVideoElement = this.remotevideo.nativeElement;
      lvideo.src = URL.createObjectURL( this.media[0]);
      rvideo.src = URL.createObjectURL(this.media[1]);
      lvideo.play();
      rvideo.play();
    }
    if(this.contact) {
      console.log('the clicked contact > ', this.contact);
      console.log('the new peer > ', this.peer);
      this.joinerPeerId = this.contact._id;
      // if(this.isVideo) {
        // console.log('test ngOnChanges joiner Id => ', this.joinerPeerId);
        // console.log('test ngOnChanges initiator id 1 => ', this.initiatorPeerId);
        this.startCall();
        // this.peerConnectionSercice.onCallStart(this.initiatorPeerId, this.joinerPeerId);
        // this.remotePeerOffer = this.peerConnectionSercice.onCallReceive().subscribe(peerInfo => {
        //   console.log("onCallReceive info : ", peerInfo);
        //   return peerInfo;
        // })
      // }
    }
  }

  // initPeer(peerId : string){
  //   console.log('VideoComponent > initPeer method fired : :)');
  //   let config : any = {'iceServers': [{
  //     urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'turn:numb.viagenie.ca'],
  //     username:"lisa@learnfromlisa.com",
  //     credential:"22paris22"
  //   }]
  //   };
    // this.peer = new Peer(peerId, {
    //   host: location.host.split(':')[0],
    //   port: 8000,
    //   path: '/peerjs',
    //   debug: 1,
    //   config : config
    // });

    //i08geat3wrrdaemi
    // this.peer = new Peer(peerId, {
    //   key: 'i08geat3wrrdaemi'
    // });
    // console.log('Peer : ', this.peer);
    // setTimeout(() => {
    //   this.initiatorPeerId = this.peer.id;
    //   console.log('Peer Id : ', this.peer.id);
    //   //this.peerConnectionSercice.updateUserPerId(this.initiatorPeerId);
    // },1000);

    //console.log('New cloud peer id : ', this.peer.id)y
  // }

  ngOnInit() {
    console.log('ngOnInit > ');
    // if(this.peer){
    //   console.log('ngOnInit > ', this.peer);
    //   this.onCallRecaive();
    // }
  }

  startCall(){
    let lvideo: HTMLVideoElement = this.localvideo.nativeElement;
    let rvideo: HTMLVideoElement = this.remotevideo.nativeElement;
    let localvar = this.peer;
    let fname = this.joinerPeerId;

    //var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    let nav = <any>navigator;
    nav.getUserMedia = (
    nav.getUserMedia ||
    nav.webkitGetUserMedia ||
    nav.mozGetUserMedia ||
    nav.msGetUserMedia);

    nav.getUserMedia({video: true, audio: true}, function(stream) {
      console.log('Stream > ', stream);
      console.log('Local var > ', localvar);
      console.log('fname > ', fname);
      let call = localvar.call(fname, stream);
      let callRing;
      if (!Buzz.isMP3Supported()) {
        alert("Your browser doesn't support MP3 Format.");
      }
      else {
        callRing = new Buzz.sound("../../assets/sound/shape_of_you",{
          formats: [ "mp3", "aac", "wav" ],
          preload: true,
          autoplay: false,
          loop: true
        });
      }
        console.log('this.peer.on call : ', call);
        console.log('incomingSound', callRing);
        callRing.play();
      console.log('Call > ', call);
      lvideo.src = URL.createObjectURL( stream);
      lvideo.play();
      call.on('stream', function(remotestream) {
        console.log('remote on stream fired test 1 : ', remotestream);
        rvideo.src = URL.createObjectURL(remotestream);
        rvideo.play();
      })
    }, function(err){
      console.log('Failed to get stream', err);
    })
  }

  onCallRecaive() {
    let lvideo: HTMLVideoElement = this.localvideo.nativeElement;
    let rvideo: HTMLVideoElement = this.remotevideo.nativeElement;
    // this.peer.destroy();
    //this.peer = new Peer(test, { key: 'i08geat3wrrdaemi'});


    console.log('onCallReceive peer >  ', this.peer);
    // setTimeout(() => {
    //   this.initiatorPeerId = this.peer.id;
    //   console.log('Peer Id : ', this.peer.id);
    //   //this.peerConnectionSercice.updateUserPerId(this.initiatorPeerId);
    // },1000);

    this.peer.on('connection', function(conn) {
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log('ngOnInit > ',data);
      });
    });

    let nav = <any>navigator;
    nav.getUserMedia = ( nav.getUserMedia ||
    nav.webkitGetUserMedia ||
    nav.mozGetUserMedia ||
    nav.msGetUserMedia);

    this.peer.on('call', function(call) {
      let callRing;
      let timer;
      console.log('call > ', call);
      if (!Buzz.isMP3Supported()) {
        alert("Your browser doesn't support MP3 Format.");
      }
      else {
        callRing = new Buzz.sound("../../assets/sound/games_of_thrones",{
          formats: [ "mp3", "aac", "wav" ],
          preload: true,
          autoplay: false,
          loop: true
        });
        console.log('this.peer.on call : ', call);
        console.log('incomingSound', callRing);
        callRing.play();
      }
      nav.getUserMedia({video: true, audio: false}, function(stream) {
        console.log('Stream 2',  stream);
        lvideo.src = URL.createObjectURL( stream);
        lvideo.play();
        call.answer(stream);
        call.on('stream', function(remotestream){
          console.log('remote on stream fired test 2: ',  remotestream);
          rvideo.src = URL.createObjectURL(remotestream);
          rvideo.play();
          timer = Buzz.toTimer(callRing.getDuration());
          console.log('Ringing duration : ', timer);
        })
      }, function(err) {
        console.log('Failed to get stream', err);
      })
    });
    //console.log('listAllPeers > Connected users list : ', this.peer.listAllPeers)
  }

  callEvent(call: any) {

  }




  connect(){
    let conn = this.peer.connect(this.joinerPeerId);
    conn.on('open', function(){
      conn.send('Message from that id', this.joinerPeerId);
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
      let call = localvar.call(fname,  stream);
      lvideo.src = URL.createObjectURL( stream);
      lvideo.play();
      call.on('stream', function(remotestream) {
        console.log('remote on stream fired 1 : ',  remotestream);
        rvideo.src = URL.createObjectURL(remotestream);
        rvideo.play();
      })
    }, function(err){
      console.log('Failed to get stream', err);
    })
  }

}
