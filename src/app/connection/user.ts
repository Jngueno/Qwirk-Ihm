/**
 * Created by jngue on 07/03/2017.
 */
export class User {
  constructor(
    public firstName : string,
    public lastName : string,
    public email : string,
    public username : string,
    public password : string,
    public isModerator : boolean
  ) { }
}
