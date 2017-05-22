import {MessageStatus} from "./messageStatus";
/**
 * Created by jngue on 18/05/2017.
 */

interface IMessage {
  sender: any;
  receiverUser: any[];
  receiverGroup: any;
  messageStatus: MessageStatus;
  roomName: string;
  sendTime: Date;
  receivedTime: Date;
  seenTime : Date;
  typeMessage: string;
  media: string;
  content: string;
  contact : string;
}

export class Message implements IMessage {
  sender: any;
  receiverUser: any[];
  receiverGroup: any;
  messageStatus: MessageStatus;
  roomName: string;
  sendTime: Date;
  receivedTime: Date;
  seenTime: Date;
  typeMessage: string;
  media: string;
  content: string;
  contact: string;

  constructor() {
    this.sender = null;
    this.receiverUser = [];
    this.receiverGroup = null;
    this.messageStatus = null;
    this.roomName = null;
    this.sendTime = null;
    this.receivedTime = null;
    this.seenTime = null;
    this.typeMessage = null;
    this.media = null;
    this.content = null;
    this.contact = null;
  }
}
