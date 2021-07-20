import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './components/main-screen/main-screen.component';

const routes: Routes = [
    {
      path: '',
      redirectTo:'login',
      pathMatch :'full'
    },
    {
      path:'home',
      component:MainScreenComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
