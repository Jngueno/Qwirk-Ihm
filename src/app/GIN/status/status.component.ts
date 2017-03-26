/**
 * Created by jngue on 25/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {IStatus} from "../../shared/models/status";
import {StatusService} from "../../shared/services/status.service";

@Component({
  selector: 'status',
  template: '<avatar></avatar>' +
  '  <div class="fixed-action-btn horizontal">\n\
  <a class="btn-floating btn-large">\n\
  <i class="large material-icons">mode_edit</i>\n\
  </a>\n\
  <ul>\n\
    <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>\n\
  <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>\n\
  <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>\n\
  <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>\n\
    </ul>\n\
    </div>',
})
export class StatusComponent implements OnInit {
  constructor(status : IStatus, statusService : StatusService) {
  }

  ngOnInit() {
  }
}
