/**
 * Created by jngue on 18/05/2017.
 */

interface iMessageStatus {
  _id: string;
  status: string;
  __v: number;
}

export class MessageStatus implements iMessageStatus {
  _id: string;
  status: string;
  __v: number;

  constructor(status) {
    this.status = status;
  }
}
