import {Injectable} from "@angular/core";
import {APPCONFIG} from "../../config/param";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
/**
 * Created by jngue on 21/03/2017.
 */

@Injectable()
export class ResetPassService {
  public appConfig = new APPCONFIG();
  response : any;
  reset : any;
  constructor(private http: Http) {}
  sendReqResetPass(userIdentifier : string) : Observable<any>{
    console.log(userIdentifier);
    return this.http.post(this.appConfig.getUrlAPI() + 'forgot/', {userIdentifier : userIdentifier})
      .map((response : Response) => {
        this.response = response.json();
        return !!this.response._id;
      })
  }

  changeUserPassword(token : string, password : string) : Observable<any>{
    return this.http.post(this.appConfig.getUrlAPI() + 'reset/', {password : password, resetPasswordToken : token})
      .map((response : Response) => {
        console.log(response.json());
        return !!response.json();
      })
  }
}
