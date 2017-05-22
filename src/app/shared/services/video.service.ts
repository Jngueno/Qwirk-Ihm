/**
 * Created by Housseini  Maiga on 5/17/2017.
 */
import {Injectable} from "@angular/core";

@Injectable()
export class VideoService {
  public videoElement: any;
  public currentPasth: string;
  public currentTitle: string;
  public currentTime: number;
  public totalTime: number;

  constructor() {

  }
}
