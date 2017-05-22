/**
 * Created by Housseini  Maiga on 5/18/2017.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Alert} from "selenium-webdriver";
import {PeerConnectionService} from "../../shared/services/peerConnection.service";
let Peer = require('peerjs');
let Buzz = require('buzz');
@Component({
  selector: 'qvideo',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [PeerConnectionService]
})
export class VideoComponent implements OnInit {
  @ViewChild('localvideo') localvideo: any;
  @ViewChild('remotevideo') remotevideo: any;

  peer;
  initiatorPeerId;
  joinerPeerId;

  constructor(private peerConnectionSercice: PeerConnectionService) {
  }

  ngOnInit() {
    let lvideo: HTMLVideoElement = this.localvideo.nativeElement;
    let rvideo: HTMLVideoElement = this.remotevideo.nativeElement;
    let config : any = {'iceServers': [{
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'turn:numb.viagenie.ca'],
      username:"lisa@learnfromlisa.com",
      credential:"22paris22"
      }]
    };
    this.peer = new Peer({ key: 'r7c3c8imm7gjsjor',
      debug: 3,
      config : config
    });
    console.log('Peer : ', this.peer);
    setTimeout(() => {
      this.initiatorPeerId = this.peer.id;
      this.peerConnectionSercice.updateUserPerId(this.initiatorPeerId);
    },1000);

    this.peer.on('connection', function(conn) {
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
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

        console.log('incomingSound', callRing);
        callRing.play();
      }

      nav.getUserMedia({video: true, audio: true}, function(stream) {
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
  }

  connect(){
    let conn = this.peer.connect(this.joinerPeerId);
    conn.on('open', function(){
      conn.send('Message from that id', this.joinerPeerId);
    });
  }

  videoConnect(){
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
      console.log('Stream 1', stream);
      let call = localvar.call(fname, stream);
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
