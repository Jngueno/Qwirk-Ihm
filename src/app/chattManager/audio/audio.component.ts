/**
 * Created by Housseini  Maiga on 5/10/2017.
 */
import {Component, OnInit, ViewEncapsulation, AfterViewInit,ViewChild} from '@angular/core';
import { WebRtcService } from '../../shared/services/webrtc.service';
import { Observable } from 'rxjs/Observable';
import  * as SimpleWebRTC from 'simplewebrtc';

@Component({
  selector: 'qaudio',
  templateUrl: 'audio.component.html',
  styleUrls: ['./audio.component.css'],
  providers: [
    WebRtcService
  ],
  encapsulation: ViewEncapsulation.None
})
export class AudioComponent implements OnInit, AfterViewInit {
  webrtc : any;
  peer : any;
  isRequestMedia = false;
  @ViewChild('local') local;
  @ViewChild('remote') remote;
  localVideoEl = document.getElementById('local');
  remoteVideoEl = document.getElementById('remote');
  nav = <any>navigator;

  ngAfterViewInit(): void {
    console.log('AudioComponent local => ', this.local);
    console.log('AudioComponent remote => ', this.remote);
    if(this.local || this.remote) {
      console.log('AudioComponent local passed ');
      let localVideoEl: HTMLVideoElement  = this.local.nativeElement;
      let remoteVideoEl: HTMLVideoElement  = this.local.nativeElement;
      // console.log("VideoComponent: Qwirk local video passed :", localVideoEl);
      // console.log("VideoComponent : Qwirk remote video passed :", remoteVideoEl);
    }
    else {
      console.log("AudioComponent Qwirk local and remote are undefined");
    }
}
test(){
    //navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

  initRTC() {
    console.log("WebRTC initRTC 1 : ", this.webrtc);
    this.webrtc = new SimpleWebRTC({
      url: 'http://localhost:8888',
      socketio: {},
      connection: null,
      debug: true,
      localVideoEl: this.localVideoEl,
      remoteVideosEl: this.remoteVideoEl,
      autoRequestMedia: this.isRequestMedia,
      adjustPeerVolume: true,
      media: {
        video: true, audio: true
      }
    });

    this.webrtc.on('connectionReady', function (sessionId) {
      console.log("Qwirk room seesionId : ", sessionId);
    });

    this.webrtc.on('videoAdded', function (video, peer) {
      console.log('video added', peer);
      let local = document.getElementById('local');
      let remote = document.getElementById('remote');
      if (remote) {
        let container = document.createElement('div');
        container.className = 'videoContainer';
        container.id = 'container_' + this.webrtc.getDomId(peer);
        container.appendChild(video);
        // suppress contextmenu
        video.oncontextmenu = function () { return false; };
        remote.appendChild(container);
      }
    });
    console.log("WebRTC  initRTC ready : ", this.webrtc);
  }

  constructor( ) {
  }

  call(){
    this.isRequestMedia = true;
    this.initRTC();
  }

  handUp(){

  }

  hideVideo() {

  }

  stop() {
    this.isRequestMedia = true;
  }

  ngOnInit() {
  }

}
