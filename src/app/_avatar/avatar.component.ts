/**
 * Created by jngueno on 19/03/2017.
 */
import {
  Component,
  OnInit, Input
} from '@angular/core';

@Component({
  selector: 'avatar',
  styleUrls: ['./avatar.component.css'],
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  @Input('urlImage')
  urlImage: string;
  constructor(
  ) {}

  public ngOnInit() {
  }

}
