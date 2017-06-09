/**
 * Created by TBS on 08/06/2017.
 */

import {Component, Input, ViewEncapsulation, Output, EventEmitter, OnInit} from '@angular/core'
import {GroupService} from '../shared/services/group.service';

@Component({
  selector: 'createChannel',
  templateUrl: './createChannel.component.html',
  styleUrls: ['./createChannel.component.css']
})

export class CreateChannelComponent {

  @Input() modalActions1;
  @Output() onCloseModal = new EventEmitter<boolean>();
  groups;
  contacts;
  transitionCss = "";
  ulTransitionCss = "ulListTransitionHidden";
  group = {
    name: "",
    description: "",
    members: [{"_id" : "593094f2ee38b936d4035fef"}, {"_id": "5928acfe62bbba268493a52f"}],
    isPublic: true,
    moderators: [],
    kickBanUsers: []
  }

  constructor(private groupService : GroupService) {
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe( groups => {
      this.groups = groups
    });
  }

  ngOnChanges() {
    console.log(this.modalActions1)
    console.log("CRECHANNELS ", this.groups)
  }

  createChannel() {
    this.groupService.addGroup(this.group)
  }

  closeModal() {
    this.modalActions1.emit({action:"modal",params:['close']})
  }

  displayMembers() {
    this.ulTransitionCss = "ulListTransitionDisplay"
    this.transitionCss = "transitionList"
    console.log(this.transitionCss)
  }

}

