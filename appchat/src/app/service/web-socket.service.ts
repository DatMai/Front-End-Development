import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WriteFileOptions } from 'fs';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { __await } from 'tslib';
import { DataService } from './data.service';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { UserModel } from '../model/userModel';
import { AudioService } from './audio.service';
import { O_WRONLY } from 'constants';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  message: any;
  data$ = new BehaviorSubject<any>({});
  dataFromServer: any;
  ws!: WebSocket;
  constructor(
    private dataService: DataService,
    private userService: UserService,
    private audioService: AudioService,
    private router: Router
  ) {}
  public createWebsocket(url: string) {
    this.ws = new WebSocket(url);
  }
  public openWebsocket() {
    this.createWebsocket(environment.WESOCKET_URL);
    this.ws.onopen = (e) => {
      if (sessionStorage.length > 1) {
        let u = JSON.parse(sessionStorage.USERLOGIN);
        let RE_LOGIN_CODE = sessionStorage.RELOGINCODE;
        this.reLogin(u.username, RE_LOGIN_CODE);
      } else {
        console.log(e);
      }
    };
    this.ws.onmessage = (e) => {
      let data = JSON.parse(e.data);
      this.getResponse(data);
    };
    this.ws.onclose = (e) => {
      alert('Websocket đã ngắt kết nối');
      console.log(e);
    };
    this.ws.onerror = (e) => {
      console.log(e);
    };
  }
  // public receiveMessage(){
  //   this.ws.onmessage=(e=>{
  //     let data = JSON.parse(e.data);
  //     this.getResponse(data);
  //   });
  //   return new Promise(resolve=>{
  //     setTimeout(()=>{
  //       resolve(this.ws.readyState)
  //     },1000);
  //   });
  // }
  public closeWebsocket() {
    this.ws.close();
  }

  public sendMesToGroup(nameRoom: string, message: string) {
    this.ws.send(
      JSON.stringify({
        action: 'onchat',
        data: {
          event: 'SEND_CHAT',
          data: {
            type: 'room',
            to: nameRoom,
            mes: message,
          },
        },
      })
    );
  }
  public sendChatToPeople(nameto: string, message: string) {
    this.ws.send(
      JSON.stringify({
        action: 'onchat',
        data: {
          event: 'SEND_CHAT',
          data: {
            type: 'people',
            to: nameto,
            mes: message,
          },
        },
      })
    );
  }
  public joinRoomChat(nameRoom: string) {
    this.ws.send(
      JSON.stringify({
        action: 'onchat',
        data: {
          event: 'JOIN_ROOM',
          data: {
            name: nameRoom,
          },
        },
      })
    );
  }
  public createRoomChat(nameRoom: string) {
    this.ws.send(
      JSON.stringify({
        action: 'onchat',
        data: {
          event: 'CREATE_ROOM',
          data: {
            name: nameRoom,
          },
        },
      })
    );
  }
  public register(user: string, pass: string) {
    this.ws.send(
      JSON.stringify({
        action: 'onchat',
        data: {
          event: 'REGISTER',
          data: {
            user: user,
            pass: pass,
          },
        },
      })
    );
  }
  public login(user: string, pass: string) {
    this.ws.send(
      JSON.stringify({
        action: 'onchat',
        data: {
          event: 'LOGIN',
          data: {
            user: user,
            pass: pass,
          },
        },
      })
    );
    this.dataService.USERLOGIN = this.userService.findByUsernameAndPass(
      user,
      pass
    );
    setTimeout(() => this.loadUserLoginData(), 1000);
  }
  public getRoomChat(nameRoom: string, page: number) {
    this.ws.send(
      JSON.stringify({
        action: 'onchat',
        data: {
          event: 'GET_ROOM_CHAT_MES',
          data: {
            name: nameRoom,
            page: page,
          },
        },
      })
    );
  }
  public checkUser(user: UserModel) {
    this.ws.send(
      JSON.stringify({
        action: 'onchat',
        data: {
          event: 'CHECK_USER',
          data: {
            user: user.username,
          },
        },
      })
    );
    this.dataService.userIsChecking = user;
  }
  public reLogin(user: string, code: string) {
    this.ws.send(
      JSON.stringify({
        action: 'onchat',
        data: {
          event: 'RE_LOGIN',
          data: {
            user: user,
            code: code,
          },
        },
      })
    );
  }
  public logout() {
    this.ws.send(
      JSON.stringify({
        action: 'onchat',
        data: {
          event: 'LOGOUT',
        },
      })
    );
  }
  public getPeopleChat(username: string, page: number) {
    this.ws.send(
      JSON.stringify({
        action: 'onchat',
        data: {
          event: 'GET_PEOPLE_CHAT_MES',
          data: {
            name: username,
            page: page,
          },
        },
      })
    );
  }
  public sendGetListChatBox(){
    this.ws.send(JSON.stringify({
      "action": "onchat",
      "data": {
        "event": "GET_USER_LIST"
      }
    }));
  }
  //load dữ liệu chat
  public loadListChatBox() {
    console.log(this.dataService.getChatContentExample());
    this.dataService.getChatContentExample().forEach((element) => {
      if (element.isGroup)
        this.getRoomChat(element.name || '', element.totalPage || 1);
      else this.getPeopleChat(element.userList || '', element.totalPage || 1);
    });
    this.dataService.USERLOGIN.chatContents = this.dataService.chatContentExample;
    this.dataService.chatContent$.next(this.dataService.chatContentExample);
  }
  public loadListFriend() {
    let rs = this.dataService.getListUser();
    let i = 0;
    // this.createWebsocket(environment.WESOCKET_URL);
    setInterval(() => {
      if (i < rs.length && this.dataService.USERLOGIN.username != undefined) {
        this.checkUser(rs[i]);
        i++;
        if (i == rs.length) i = 0;
      }
    }, 500);
    // sessionStorage.setItem("FRIENDS",JSON.stringify(this.userList));
  }
  public loadUserLoginData() {
    let user = this.dataService.USERLOGIN;
    this.sendGetListChatBox();

    user.status = 'Đang hoạt động';
    this.loadListFriend();
    setTimeout(() =>this.loadListChatBox(),1000);
  }

  //xử lý dữ liệu nhận từ server
  public getResponse(data: any) {
    this.getCheckUserResponse(data);
    this.getCreateRoomResponse(data);
    this.getJoinRoomResponse(data);
    this.getPeopleChatMessageResponse(data);
    this.getRoomChatMessageResponse(data);
    this.getLoginResponse(data);
    this.getReLoginResponse(data);
    this.getLogoutResponse(data);
    this.getRegisterResponse(data);
    this.getSendChatResponse(data);
    this.getListUserResponse(data);
  }
  public getCheckUserResponse(data: any) {
    if (data.event == 'CHECK_USER') {
      if (data.status == 'success') {
        let newU = this.dataService.userIsChecking || {};
        if (data.data.status) {
          newU.status = 'Đang hoạt động';
        } else {
          newU.status = 'Chưa đăng nhập';
        }
        let u =
          this.dataService.USERLOGIN.friends?.find(
            (element) => element.username == newU.username
          ) || {};
        u = newU;
        // this.dataService.checkUserList$.next(this.checkUserList||false);
      } else {
        console.log('Lỗi websocket');
      }
    }
  }
  public getLoginResponse(data: any) {
    if (data.event == 'LOGIN') {
      if (data.status == 'success') {
        sessionStorage.setItem(
          'USERLOGIN',
          JSON.stringify(this.dataService.USERLOGIN)
        );
        sessionStorage.setItem('RELOGINCODE', data.data.RE_LOGIN_CODE);
        this.router.navigateByUrl('home');
      } else {
        if (data.mes == 'You are already logged in') {
          this.dataService.alert$.next('warning');
          this.dataService.message$.next('Bạn đang đăng nhập');
        } else {
          this.dataService.USERLOGIN = {};
          this.dataService.alert$.next('warning');
          this.dataService.message$.next(
            'Bạn nhập sai tên đăng nhập hoặc mật khẩu'
          );
        }
      }
    }
  }
  public getRegisterResponse(data: any) {
    if (data.event == 'REGISTER') {
      if (data.status == 'success') {
        this.dataService.alert$.next('success');
        this.dataService.message$.next('Bạn đã đăng ký thành công');
      } else {
        this.dataService.alert$.next('warning');
        this.dataService.message$.next('Tên đăng nhập đã tồn tại');
      }
    }

  }
  public getLogoutResponse(data: any) {
    if (data.event == 'LOGOUT') {
      if (data.status == 'success') {
        this.dataService.clear();
        sessionStorage.clear();
        this.router.navigateByUrl('login');
        this.dataService.alert$.next('success');
        this.dataService.message$.next(
          "Bạn đã đăng xuất. \n Vui lòng refresh lại trang để đăng nhập tiếp"
        );
      } else {
        console.log( "Lỗi logout " + data);

      }
    }
  }
  public getReLoginResponse(data: any) {
    if (data.event == 'RE_LOGIN') {
      if (data.status == 'success') {
        sessionStorage.removeItem('RELOGINCODE');
        sessionStorage.setItem('RELOGINCODE', data.data.RE_LOGIN_CODE);
        this.dataService.USERLOGIN = JSON.parse(sessionStorage.USERLOGIN);
        this.loadUserLoginData();
      } else {
        console.log('Lỗi RELOGIN :');
        console.log(data);
        sessionStorage.clear();
        this.dataService.clear();
        this.router.navigateByUrl('login');
        alert('Đã có người đăng nhập tài khoản này');
      }
    }
  }
  public getCreateRoomResponse(data: any) {
    if (data.event == 'CREATE_ROOM') {
      if (data.status == 'success') {
        this.dataService.chatContentExample.push({
          name: data.data.name,
          userList: data.data.userList,
          messages: [
            {
              message: 'Bạn đã tạo nhóm ' + data.data.name,
              userName: 'Hệ thống',
              mine: false,
              createAt: data.data.createAt,
              description: 'NOTIFICATION',
            },
          ],
          isGroup: true,
          isSeen: false,
        });
        this.dataService.chatContent$.next(this.dataService.chatContentExample);
        this.dataService.alert$.next('success');
        this.dataService.message$.next('Bạn đã tạo phòng thành công');
      }else {
        this.dataService.alert$.next('warning');
        this.dataService.message$.next('Phòng đã tồn tại');
      }
    }
  }
  public getJoinRoomResponse(data: any) {
    if (data.event == 'JOIN_ROOM') {
      if (data.status == 'success') {
        let name = data.data.name;
        let messages1: {
          message: string;
          userName: string;
          mine: boolean;
          createAt: string;
          description: string;
        }[] = [];
        let chatData = data.data.chatData;
        chatData.sort((a, b) => a.id - b.id);
        chatData.forEach((e: any) => {
          let mine = false;
          let USERLOGIN = JSON.parse(sessionStorage.USERLOGIN);
          if (e.name == USERLOGIN.username) {
            mine = true;
          }
          messages1.push({
            message: e.mes,
            userName: e.name,
            mine: mine,
            createAt: e.createAt,
            description: 'mes',
          });
        });
        let groupChatContain =
          this.dataService.chatContentExample.find(
            (element) => (element.name == name)&&(element.isGroup)
          ) || {};
        if (groupChatContain.name == undefined) {
          this.dataService.chatContentExample = [
            {
              name: name,
              userList: data.data.userList,
              messages: messages1,
              isGroup: true,
              isSeen: false,
            },
            ...this.dataService.chatContentExample,
          ];
        } else {
          groupChatContain.userList = data.data.userList;
          groupChatContain.messages = messages1;
        }
        this.dataService.chatContent$.next(this.dataService.chatContentExample);
        let page = groupChatContain.totalPage || 1;
        if (messages1.length == 50) {
          page++;
          this.getRoomChat(name, page);
          groupChatContain.totalPage = page;
        }
      } else {
        this.dataService.alert$.next('warning');
        this.dataService.message$.next('Phòng không tồn tại');
      }

    }
  }
  public getPeopleChatMessageResponse(data: any) {
    if (data.event == 'GET_PEOPLE_CHAT_MES' && data.status == 'success') {
      let chatData = data.data;
      if (chatData.length > 0) {
        let user =
          chatData[0].to == this.dataService.USERLOGIN.username
            ? chatData[0].name
            : chatData[0].to;
        let chatContent =
          this.dataService.chatContentExample.find(
            (value) => value.userList == user
          ) || {};
        let messages1: {
          message: string;
          userName: string;
          mine: boolean;
          createAt: string;
          description: string;
        }[] = [];
        chatData.sort((a, b) => a.id - b.id);
        chatData.forEach((e: any) => {
          let mine = false;
          let USERLOGIN = JSON.parse(sessionStorage.USERLOGIN);
          let createAt = e.createAt;
          if (e.name == USERLOGIN.username) {
            mine = true;
          }
          messages1.push({
            message: e.mes,
            userName: e.name,
            mine: mine,
            createAt: createAt,
            description: 'mes',
          });
        });
        chatContent.messages = messages1.concat(chatContent.messages || []);
        this.dataService.chatContent$.next(this.dataService.chatContentExample);
        let page = chatContent.totalPage || 1;
        page++;
        this.getPeopleChat(user, page);
        chatContent.totalPage = page;
      }
    }
  }
  public getRoomChatMessageResponse(data: any) {
    if (data.event == 'GET_ROOM_CHAT_MES' && data.status == 'success') {
      let name = data.data.name;
      let groupChatContain =
        this.dataService.chatContentExample.find(
          (element) => element.name == name
        ) || {};
      let messages1: {
        message: string;
        userName: string;
        mine: boolean;
        createAt: string;
        description: string;
      }[] = [];
      let chatData = data.data.chatData;
      chatData.sort((a, b) => a.id - b.id);
      chatData.forEach((e: any) => {
        let mine = false;
        let USERLOGIN = JSON.parse(sessionStorage.USERLOGIN);
        let createAt = e.createAt;
        if (e.name == USERLOGIN.username) {
          mine = true;
        }
        messages1.push({
          message: e.mes,
          userName: e.name,
          mine: mine,
          createAt: createAt,
          description: 'mes',
        });
      });
      groupChatContain.messages = messages1.concat(
        groupChatContain.messages || []
      );
      groupChatContain.userList =data.data.userList;
      this.dataService.chatContent$.next(this.dataService.chatContentExample);
      let page = groupChatContain.totalPage || 1;
      if (messages1.length == 50) {
        page++;
        this.getRoomChat(name, page);
        groupChatContain.totalPage = page;
      }
    }
  }
  public getSendChatResponse(data: any) {
    if (data.event == 'SEND_CHAT') {
      if (data.status == 'success') {
        let createAt = new Date().toLocaleString();
        let mes = {
          message: data.data.mes,
          userName: data.data.name,
          mine: false,
          createAt: createAt,
          description: 'mes',
        };
        if (data.data.type == '1') {
          let groupChatContentWithNameroom =
            this.dataService.chatContentExample.filter(
              (element) => element.name == data.data.to
            );
          groupChatContentWithNameroom[0].messages?.push(mes);
          groupChatContentWithNameroom[0].isSeen = false;
          this.dataService.chatContent$.next(
            this.dataService.chatContentExample
          );
        } else {
          let chatContentWithThisUsermodel =
            this.dataService.chatContentExample.find(
              (element) =>(element.userList == data.data.name)&&(!element.isGroup)
            )|| {};
          if (chatContentWithThisUsermodel.name == undefined) {
            let u= this.userService.findByUserName(data.data.name);
            this.dataService.chatContentExample.push({
              name: u.fullname,
              userList: data.data.name,
              messages: [mes],
              isGroup: false,
              isSeen: false,
            });
          } else {
            chatContentWithThisUsermodel.messages?.push(mes);
            chatContentWithThisUsermodel.isSeen = false;
          }
          this.dataService.chatContent$.next(
            this.dataService.chatContentExample
          );
        }
        this.audioService.playAudio();
      } else {
        console.log('Lỗi send_chat_to_people '+data.mes);

      }
    }

  }
  public getListUserResponse(data: any){
    if (data.event== "GET_USER_LIST") {
      if(data.status == 'success'){
        let listChatContent = data.data;
        listChatContent.forEach(element => {
          this.dataService.chatContentExample.push({
            name: element.name,
            userList: element.name,
            messages: [],
            isGroup: element.type==0?false:true,
            isSeen: false,
          });
        });
        this.dataService.chatContent$.next(this.dataService.chatContentExample)
      }else{
        console.log('lỗi get list user :');
        console.log(data);
      }
    }
  }

}
