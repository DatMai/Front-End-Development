import { Component } from '@angular/core';
import { UserModel } from './model/userModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'AppChat';
  USER :UserModel=  {};
}
