import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { LeftContainerComponent } from './components/main-screen/left-container/left-container.component';
import { RightContainerComponent } from './components/main-screen/right-container/right-container.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/main-screen/left-container/header/header.component';
import { ContentComponent } from './components/main-screen/left-container/content/content.component';
import { RightHeaderComponent } from './components/main-screen/right-container/right-header/right-header.component';
import { RightContentComponent } from './components/main-screen/right-container/right-content/right-content.component';
import { RightTypingComponent } from './components/main-screen/right-container/right-typing/right-typing.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    LeftContainerComponent,
    RightContainerComponent,
    LoginComponent,
    HeaderComponent,
    ContentComponent,
    RightHeaderComponent,
    RightContentComponent,
    RightTypingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
