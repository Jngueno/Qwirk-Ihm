/**
 * Created by Housseini  Maiga on 3/13/2017.
 */
import {Component, OnInit, EventEmitter, ViewEncapsulation} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import {UserService} from "../services/user.service";

@Component({
  selector: 'workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkbenchComponent implements OnInit {
  isCollapse: boolean = false;
  onChanged: string = 'slide-out';
  contacts: Object[] = [
    {"userId" : 0, "firstName": "Housseini", "lastName" : "Maiga", "description" : "Mess with the best.. Die with the rest.", "profilePicture" : "http://bit.ly/2n4OzaM", "username" : "fouss maiga"},
    {"userId" : 1, "firstName": "Jennyfer", "lastName" : "Ngueno", "description" : "Never give up settle", "profilePicture" : "http://bit.ly/2nJ25ln", "username" : "jngueno"},
    {"userId" : 2, "firstName": "Ervin", "lastName" : "Larry", "description" : "Autre est en Nous ..!", "profilePicture" : "http://bit.ly/2onErh0", "username" : "TBS"}
  ];
  chips : string[] = [];
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
  params: string[] = [];
  modalActions1 = new EventEmitter<string|MaterializeAction>();
  constructor(private userService: UserService) {
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
    this.modalActions1.emit({action:"modal",params:['open']});
  }

  closeContactopIn() {
    this.modalActions1.emit({action:"modal",params:['close']});
    console.log();
  }

  onModalActionChanged(data : any){
    console.log("test ", data);
  }

  onToggle() {
    this.onChanged = this.isCollapse ? "slide-out" : "slide-in";
    this.isCollapse = !this.isCollapse;
  }

  add(chip) {
    console.log("Chip added: " + chip.tag + " And chips list length is " + this.chips.length);
    this.chips.push(chip.tag);
    console.log("Chip added: " + chip.tag + " And chips list length is " + this.chips.length);

  }

  delete(chip) {
    let index = this.chips.indexOf(chip.tag);
    if(index > -1) {
      this.chips.splice(index, 1);
      console.log("Chips list ", this.chips.length);
    }
    //console.log("Test Chip deleted: " + chip.tag + " And chips list length is " + this.chips.length);
  }

  select(chip) {
    console.log("Chip selected: " + chip.tag);
  }

  bindModalToOpen() {
    console.log('Workbench status');
  }
}
