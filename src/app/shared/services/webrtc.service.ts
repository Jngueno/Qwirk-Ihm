/**
 * Created by Housseini  Maiga on 5/16/2017.
 */
import {Injectable, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';


declare let SimpleWebRTC: any; //this is important

@Injectable()
export class WebRtcService {
  @ViewChild('localVideo') localVideo
  webrtc: any; //declare global variable

  //construct the simplewebrtc object as service creation
  constructor() {
    this.webrtc = new SimpleWebRTC({
      socketio: {},
      url: 'http://localhost:8888/',
      connection: null,
      debug: false,
      localVideoEl: 'localVideo',
      remoteVideosEl: '',
      autoRequestMedia: true,
      adjustPeerVolume: true,
      media: {
        video: true, audio: true
      }
    });
    console.log("Simple test : ", this.webrtc);
    // a peer video has been added
    this.webrtc.on('videoAdded', function (video, peer) {
      console.log('video added', peer);
      var remotes = document.getElementById('remotes');
      if (remotes) {
        var container = document.createElement('div');
        container.className = 'videoContainer';
        container.id = 'container_' + this.webrtc.getDomId(peer);
        container.appendChild(video);

        // suppress contextmenu
        video.oncontextmenu = function () { return false; };

        remotes.appendChild(container);
      }
    });
    console.log("Simple test 2");
  }
}
