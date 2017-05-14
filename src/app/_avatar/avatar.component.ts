/**
 * Created by jngueno on 19/03/2017.
 */
import {
  Component,
  OnInit, Input
} from '@angular/core';
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'avatar',
  styleUrls: ['./avatar.component.css'],
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  @Input('urlImage')
  urlImage: string;

  @Input('size')
  size: string;

  constructor(
    private userService : UserService
  ) {}

  public ngOnInit() {
    this.getUserProfile(JSON.parse(localStorage.getItem('currentUser')).userIdentifier);
  }

  getUserProfile(userIdentifier) {
    let self = this;
    this.userService.getUserProfile(userIdentifier).subscribe(
      result => {
        if (!result) {
          self.urlImage = "../../assets/img/avatar.png";
          return;
        }
        else {
          self.urlImage = result;
          return result;
        }
      },
      err => {
        self.urlImage = "../../assets/img/avatar.png";
        return;
      }
    )
  }

}
