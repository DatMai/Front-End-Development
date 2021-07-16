import { UserModel } from "./userModel";

export class ChatContent{
  usernameTo?:string;
  messages?:{
    message: string,
    userName: string,
    mine: boolean
  }[];
}
