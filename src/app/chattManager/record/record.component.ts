/**
 * Created by Housseini  Maiga on 5/15/2017.
 */
import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
let RecordRTC = require('recordrtc/recordRTC');
let SimpleWebRTC = require('simplewebrtc');

@Component({
  selector: 'qrecord',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit, AfterViewInit {
  private stream: MediaStream;
  private recordRTC: any;
  @ViewChild('video') video;

  ngAfterViewInit(): void {
    console.log('RecordComponent video 1 => ', this.video);
    let videoEl: HTMLVideoElement = this.video.nativeElement;
    videoEl.muted = true;
    videoEl.controls = true;
    videoEl.autoplay = false;

    //console.log('RecordComponent video 2 => ', videoEl);
  }
  constructor() {
  }

  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  successCallback(stream: MediaStream) {
    var options = {
      mimeType: 'video/webm',
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
    this.toggleControls();
  }

  errorCallback() {
    console.log("Test console in errorCallback");
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    let recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
  }

  startRecording() {
    let mediaConstraints = {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }, audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));


  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  download() {
    this.recordRTC.save('video.webm');
  }
  ngOnInit() {

  }
}
