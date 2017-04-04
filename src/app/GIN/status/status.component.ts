/**
 * Created by jngue on 25/03/2017.
 */
import {Component, OnInit, Input} from '@angular/core';
import {IStatus} from "../../shared/models/status";
import {StatusService} from "../../shared/services/status.service";
import {Http} from "@angular/http";

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  providers: [StatusService]
})
export class StatusComponent implements OnInit {
  @Input('dropdownId')
  dropdownId = "statusDropdown";

  @Input('size')
  avSize = "small";

  private status : IStatus;
  private statuses : IStatus [];
  @Input('profileImg')
  profileImg = "";
  constructor(private http : Http, private statusService : StatusService) {
    this.status = new IStatus();
    this.statuses = [];
  }

  ngOnInit() {
    this.getCurrentStatuses();
    this.getAllStatuses();
    if(window.screen.width < 749) {
      this.avSize = "small";
    }
  }

  getCurrentStatuses() {
    this.statusService.getCurrentStatus().subscribe(result => {
      this.status.name = result.name;
      this.status.color = result.color;
      return result;
    })
  }

  getAllStatuses() {
    this.statusService.getAllStatuses().subscribe(result => {

      this.statuses = [];
      for(let s of result) {
        let status = new IStatus();
        status.name = s.name;
        status.color = s.color;
        console.log((s.name === this.status.name));
        if(s.name === this.status.name) {
          this.statuses.unshift(s);
        } else {
          this.statuses.push(status);
        }
        console.log(this.statuses);
      }
      return result;
    })
  }

  updateUserStatus(status: IStatus) {
    let self = this;
    this.statusService.updateStatusCurrentUser(status).subscribe(result => {
      self.status = status;
      self.getAllStatuses();
    });
  }
}
