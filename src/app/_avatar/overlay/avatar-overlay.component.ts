/**
 * Created by jngueno on 19/03/2017.
 */
import {
  Component,
  OnInit, Input
} from '@angular/core';

@Component({
  selector: 'avatar-overlay',
  styleUrls: ['avatar-overlay.component.css'],
  templateUrl: 'avatar-overlay.component.html'
})
export class AvatarOverlayComponent implements OnInit {
  @Input('urlImage')
  urlImage: string;

  @Input('profilePic')
  profilePic: any;

  @Input('size')
  size: string;

  constructor(
  ) {}

  public ngOnInit() {
  }

  clickInputFile (fileInput : any) {
    fileInput.value = null;
  }

  fileChangeEvent(fileInput: any){
    let self = this;
    if (fileInput.target.files && fileInput.target.files[0]) {
      self.profilePic = fileInput.target.files[0];
      let reader = new FileReader();

      reader.onload = function (e : any) {
        self.urlImage = e.target.result;
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
