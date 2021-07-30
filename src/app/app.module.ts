import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main-screen/left-container/header/header.component';
import { SearchComponent } from './main-screen/left-container/search/search.component';
import { ChatboxComponent } from './main-screen/left-container/chatbox/chatbox.component';
import { LeftContainerComponent } from './main-screen/left-container/left-container.component';
import { RightContainerComponent } from './main-screen/right-container/right-container.component';
import { RightHeaderComponent } from './main-screen/right-container/right-header/right-header.component';
import { TypingComponent } from './main-screen/right-container/typing/typing.component';
import { ChatContentComponent } from './main-screen/right-container/chat-content/chat-content.component';
import { LoginComponent } from './login/login.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SearchComponent,
    ChatboxComponent,
    LeftContainerComponent,
    RightContainerComponent,
    RightHeaderComponent,
    TypingComponent,
    ChatContentComponent,
    MainScreenComponent,

  ],
  imports: [BrowserModule, AppRoutingModule,FormsModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
