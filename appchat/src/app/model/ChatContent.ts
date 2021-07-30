import { UserModel } from "./userModel";

export class ChatContent{
  name?:string;
  userList?:any;
  messages?:{
    message: string,
    userName: string,
    mine: boolean
  }[];
  isGroup?:boolean;
}
