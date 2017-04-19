/**
 * Created by Housseini  Maiga on 4/1/2017.
 */
import {Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import {IUser} from "../shared/models/user";

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements OnInit {
  params: string[] = [];
  @Output() modalActions1 = new EventEmitter<string|MaterializeAction>();
  contacts: Object[] = [
    {"userId" : 0, "firstName": "Housseini", "lastName" : "Maiga", "description" : "Mess with the best.. Die with the rest.", "profilePicture" : "http://bit.ly/2n4OzaM", "username" : "fouss maiga"},
    {"userId" : 1, "firstName": "Jennyfer", "lastName" : "Ngueno", "description" : "Never give up settle", "profilePicture" : "http://bit.ly/2nJ25ln", "username" : "jngueno"},
    {"userId" : 2, "firstName": "Ervin", "lastName" : "Larry", "description" : "Autre est en Nous ..!", "profilePicture" : "http://bit.ly/2onErh0", "username" : "TBS"}
  ];
  chipsInit = {
    data: [{
      tag: 'Apple',
    }, {
      tag: 'Microsoft',
    }, {
      tag: 'Google',
    }],
  };
  chipsPlaceholder = {
    placeholder: '+Username/Email',
    secondaryPlaceholder: 'Enter username or email',
  };
  chipsAutoComplete = {
    'data': {
      'Jennyfer Ngueno': null,
      'Ervin Larry': null,
      'Ario Maiga': null,
      'Fouss Maiga': null
    },
    limit: Infinity,
    minLength: 2
  };
  constructor() {
  }

  ngOnInit() {
  }

  addContact(){
    if(this.contacts.length > 0)
    //this.userService.addContact(this.contacts);
      console.log("test");
    else
      console.log("Aucun contact n'a été ajouté");
  }
  openContactPopin() {
    console.log("openContactPopin - test");
    this.modalActions1.emit({action:"modal",params:['open']});
  }
  closeContactopIn() {
    this.modalActions1.emit({action:"modal",params:['close']});
  }
  add(chip) {
    console.log("Chip added: " + chip.tag + " And contacts list length is " + this.contacts.length);
    this.contacts.push(chip.tag);
    console.log("Chip added: " + chip.tag);
    console.log("Chip added: " + chip.tag + " And contacts list length is " + this.contacts.length);
  }
  delete(chip) {
    console.log("(1) cChip deleted: " + chip.tag + " And contacts list length is " + this.contacts.length);
    console.log("Chip deleted: " + chip.tag);
    let index = this.contacts.indexOf(chip.tag);
    if(index > -1)
      this.contacts.splice(index, chip.tag);
    console.log("(2) Chip deleted: " + chip.tag + " And contacts list length is " + this.contacts.length);
  }
  select(chip) {
    console.log("Chip selected: " + chip.tag);
  }

}
