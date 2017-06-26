/**
 * Created by Housseini  Maiga on 4/1/2017.
 */
import {Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input, OnChanges} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import {IUser} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";
import {APPCONFIG} from "../config/param";
import {isUndefined} from "util";
//import {ContactService} from "../shared/services/contact.service";



@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [UserService]
})
export class ContactComponent implements OnInit, OnChanges {
  contactModalActions = new EventEmitter<string|MaterializeAction>();
  openContactClass: string;

  @Input("user")
  userConnected: any;

  @Input("userContacts")
  userContacts: Object[];
  ngOnChanges(changes: any): void {
    console.log("Contacts get changes", changes);
    if(changes.userContacts) {
      let userContactChange:any = changes.userContacts.currentValue;
      if (userContactChange) {
        console.log("Contacts get changes", changes.userContacts.currentValue);
        this.userContacts = userContactChange
        console.log('Contacts test 2 >>> ', userContactChange);
      }
    }
  }

  autocompleteInit = {
    data: {},
    limit: Infinity,
    minLength: 1
  };

  data: any;
  users: any;
  usersAssociation: any;
  addedUsers: any;
  addedContact: any
  private appConfig: APPCONFIG;
  private url: string;

  constructor(private userService: UserService,
              //private contactService : ContactService
  ) {
    this.data = {};
    this.usersAssociation = {};
    this.addedUsers = [];
    this.addedContact = [];
    this.appConfig = new APPCONFIG();
    this.url = this.appConfig.urlAPI;
  }

  ngOnInit(): void {
    console.log("Contacts add all this",this.userContacts.length);
    this.getAllUsersApp();
  }


  openContactModal() {
    this.contactModalActions.emit({action: "modal", params: ['open']});
    this.openContactClass = 'open';
  }

  closeContactModal() {
    this.contactModalActions.emit({action: "modal", params: ['close']});
    this.openContactClass = 'close';
  }

  getAllUsersApp() {
    let self = this;
    this.userService.getAllUsers().subscribe(
      res => {
        console.log("Contacts all users", self.userContacts);
        self.users = res.json();
        let data = {};
        for (let u of self.users) {
          if (u.username !== self.userConnected.username) {
            self.usersAssociation[u.username] = u;
            data[u.username] = self.url + 'user/' + u.username;
            data[u.email] = self.url + 'user/' + u.username;
          }
        }
        self.data = data;
      }
    );
  }

  addToAddedUsers(params: any) {
    let intermediate = this.addedUsers;

    if(this.usersAssociation[params.value.trim()]) {
      intermediate.push(this.usersAssociation[params.value.trim()]);
    }
    else {
      if(this.validateEmail(params.value.trim())) {
        intermediate.push({email : params.value.trim(), firstName : "Unknown", lastName : "Unknown"});
      }
    }

    params.value = "";

    this.addedUsers = Array.from(new Set(intermediate.map((u) => u)));
  }

  removeToAddedUsers(u: any) {
    let index = this.addedUsers.indexOf(u);
    if (index > -1) {
      this.addedUsers.splice(index, 1);
    }
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  addAllUsersToContacts() {
    let self = this;

    for (let user of self.addedUsers) {
      this.userService.addUserToContact(user).subscribe(
        contact => {
          self.addedContact.push(contact);
        }
      )
    }
  }
}
