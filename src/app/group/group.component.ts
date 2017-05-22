/**
 * Created by TBS on 26/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {GroupService} from '../shared/services/group.service';
import {UserService} from '../shared/services/user.service';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups;
  channels;
  //private data: Observable<Array<number>>;

  constructor(private groupService : GroupService, private userService : UserService) {
  }

  ngOnInit() {
    this.userService.getUser({}).subscribe(
      data => {
        this.groups = data
        console.log('data success Todo', this.groups);
      })

  }

  addGroupOrChannel() {

  }
}
