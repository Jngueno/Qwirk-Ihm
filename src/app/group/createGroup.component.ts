/**
 * Created by TBS on 27/05/2017.
 */
import {Component, Input, ViewEncapsulation, Output, EventEmitter, OnInit} from '@angular/core'
import {GroupService} from '../shared/services/group.service';
import {MaterializeAction} from "angular2-materialize";
import {UserService} from "../shared/services/user.service";
import {APPCONFIG} from "../config/param";

@Component({
  selector: 'createGroup',
  templateUrl: './createGroup.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./createGroup.component.css']
})

export class CreateGroupComponent {

  @Input() modalActions1 = new EventEmitter<string|MaterializeAction>();;
  @Input() openModalClass;
  //@Output() onCloseModal = new EventEmitter<boolean>();
  @Input() groups;
  @Input() contacts;
  transitionCss = "";
  ulTransitionCss = "ulListTransitionHidden";
  group = {name: '', description: '', members: [], isPublic: false, moderators: [], kickBanUsers: []};
  users: any;
  @Input("user") userConnected: any;
  usersAssociation: any;
  private appConfig: APPCONFIG;
  private url: string;
  private openGroupClass : string;
  data: {};

  constructor(private groupService : GroupService, private userService : UserService) {
    this.users = [];
    this.appConfig = new APPCONFIG();
    this.url = this.appConfig.urlAPI;
    this.usersAssociation = {};
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe( groups => {
      this.groups = groups;
      this.getAllContactsApp();
    });
  }

  ngOnChanges() {
    console.log(this.modalActions1)
    console.log("CREGOUPRES ", this.groups)
  }

  createNewGroup(form : any) {
    //console.log(value.name.value)
    let self = this;
    console.log(self.group)
    self.group.moderators.push(self.userConnected);
    this.groupService.addGroup(self.group).subscribe(
      res => {
        self.groups.push(res.json());
        console.log(res);
      }
    );
  }

  openGroupModal() {
    this.modalActions1.emit({action:"modal",params:['open']});
    this.openGroupClass = 'open';
  }

  closeModal() {
    this.modalActions1.emit({action:"modal",params:['close']})
    this.openGroupClass = 'close';
  }

  displayMembers() {
    this.ulTransitionCss = "ulListTransitionDisplay"
    this.transitionCss = "transitionList"
    console.log(this.transitionCss)
  }

  getAllContactsApp() {
    let self = this;
    this.userService.getAllContacts(self.userConnected).subscribe(
      res => {
        self.contacts = res;
        let data = {};
        for (let c of self.contacts) {
          if (c.userObject.username !== self.userConnected.username) {
            console.log(c.userObject);

            self.usersAssociation[c.userObject.username] = c.userObject;
            data[c.userObject.username] = self.url + 'user/' + c.userObject.username;
            data[c.userObject.email] = self.url + 'user/' + c.userObject.username;

            /*
            self.usersAssociation[c.userObject.username] = c.userObject;*/
          }
        }
        self.data = data;
      }
    );
  }

  addToAddedUsers(params: any) {
    let intermediate = this.group.members;

    intermediate.push(this.usersAssociation[params.value.trim()]._id);

    params.value = "";

    this.group.members = Array.from(new Set(intermediate.map((u) => u)));
  }

  removeToAddedUsers(u: any) {
    let index = this.group.members.indexOf(u);
    if (index > -1) {
      this.group.members.splice(index, 1);
    }
  }

}
