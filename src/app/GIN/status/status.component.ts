/**
 * Created by jngue on 25/03/2017.
 */
import {Component, OnInit} from '@angular/core';
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
  private status : IStatus;
  private statuses : IStatus [];
  constructor(private http : Http, private statusService : StatusService) {
    this.status = new IStatus();
    this.statuses = [];
  }

  ngOnInit() {
    this.getCurrentStatuses();
    this.getAllStatuses();
  }

  getCurrentStatuses() {
    this.statusService.getCurrentStatus().subscribe(result => {
      console.log(result);
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
