/**
 * Created by Housseini  Maiga on 3/9/2017.
 */
export interface IUser {
   userId: number;
   firstName : string;
   lastName : string;
   email : string;
   username : string;
   password : string;
   profilePicture : string;
   confirmPassword : string;
   isModerator? : boolean;
}