/**
 * Created by Housseini  Maiga on 5/18/2017.
 */
import {Injectable} from "@angular/core";

@Injectable()
export class PeerConnection {
  peer : any;
  nav  = <any>navigator;
  initiatorPeerId;
  joinerPeerId;
  constructor() {
  }

  requestUserMedia(peer : any){
    this.nav.getUserMedia = ( this.nav.getUserMedia ||
    this.nav.webkitGetUserMedia ||
    this.nav.mozGetUserMedia ||
    this.nav.msGetUserMedia);
    this.nav.getUserMedia({video: true, audio: true}, function(stream) {
      let call = peer.call('another-peers-id', stream);
      call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
      });
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });
  }
  onConnectPeer() {
      let conn = this.peer.connect(this.joinerPeerId);
      conn.on('open', function(){
        conn.send('Message from that id');
      });
  }

  onPeer(peer : any) {
    peer.on('call', function(call) {
      console.log('My peer id 3: ', peer.id);
      // Answer automatically for demo
      console.log('call: ', call);
      call.answer("");

    });
  }



}
