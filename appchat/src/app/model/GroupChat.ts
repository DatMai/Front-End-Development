import { UserModel } from "./userModel";

export class GroupChat{
  name?:string;
  userList?:UserModel[];
  messages?:{
    message: string,
    userName: string,
    mine: boolean
  }[];
  isGroup?:boolean;
}
