import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './main-screen2/left-container/header/header.component';
// import { SearchComponent } from './main-screen2/left-container/search/search.component';
// import { ChatboxComponent } from './main-screen2/left-container/chatbox/chatbox.component';
// import { LeftContainerComponent } from './main-screen2/left-container/left-container.component';
// import { RightContainerComponent } from './main-screen2/right-container/right-container.component';
// import { RightHeaderComponent } from './main-screen2/right-container/right-header/right-header.component';
// import { TypingComponent } from './main-screen2/right-container/typing/typing.component';
// import { ChatContentComponent } from './main-screen2/right-container/chat-content/chat-content.component';
import { LoginComponent } from './login/login.component';
// import { MainScreenComponent } from './main-screen2/main-screen.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentComponent } from './main-screen/left-container/content/content.component';
import { RightContentComponent } from './main-screen/right-container/right-content/right-content.component';
import { RightContainerComponent } from './main-screen/right-container/right-container.component';
import { LeftContainerComponent } from './main-screen/left-container/left-container.component';
import { HeaderComponent } from './main-screen/left-container/header/header.component';
import { RightTypingComponent } from './main-screen/right-container/right-typing/right-typing.component';
import { RightHeaderComponent } from './main-screen/right-container/right-header/right-header.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { RightManagerComponent } from './main-screen/right-container/right-manager/right-manager.component';
import { RoomModalComponent } from './main-screen/room-modal/room-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    // SearchComponent,
    // ChatboxComponent,
    LeftContainerComponent,
    RightContainerComponent,
    RightHeaderComponent,
    // TypingComponent,
    // ChatContentComponent,
    MainScreenComponent,
    RightHeaderComponent,
    ContentComponent,
    RightContentComponent,
    RightTypingComponent,
    RightManagerComponent,
    RoomModalComponent,

  ],
  imports: [BrowserModule, AppRoutingModule,FormsModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
