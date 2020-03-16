import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedComponent } from './protected/protected.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './akitaAuth/auth.guard';
import { TestComponent } from './test/test.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { ApplicationContentComponent } from './application-content/application-content.component';


const routes: Routes = [
  {
    path: '',
    component: AppMenuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'appContent',
    component: ApplicationContentComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
