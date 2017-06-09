/**
 * Created by TBS on 27/05/2017.
 */
import {Component, Input} from '@angular/core'

@Component({
  selector: 'searchGroup',
  templateUrl: './searchGroup.component.html'
})

export class SearchGroupComponent {
  
  @Input() modalAction1;
  
  constructor () {
    
  }
}
