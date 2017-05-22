/**
 * Created by Housseini  Maiga on 3/9/2017.
 */
export interface IUser {
   userId: string;
   firstName : string;
   lastName : string;
   email : string;
   username : string;
   password : string;
   profilePicture : string;
   confirmPassword : string;
   description : string;
   isModerator? : boolean;
   peerId : string;
}
