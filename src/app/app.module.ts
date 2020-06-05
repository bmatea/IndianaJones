import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProtectedComponent } from './protected/protected.component';
import { AuthInterceptor } from './auth-interceptor';
import { TestComponent } from './test/test.component';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { ApplicationComponent } from './application/application.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { UserService } from './services/user-service.service';
import { HasPermissionDirective } from './permissions/has-permission.directive';
import { ApplicationContentComponent } from './application-content/application-content.component';
import { ComponentDirective } from './component.directive';
import { Test1Component } from './stranice/test1/test1.component';
import { Test2Component } from './stranice/test2/test2.component';
import { TabContentComponent } from './tab-content/tab-content.component';
import { NoviZahtjevComponent } from './Aplikacije/TkSuglasnost/novi-zahtjev/novi-zahtjev.component';
import { PregledZahtjevaComponent } from './Aplikacije/TkSuglasnost/pregled-zahtjeva/pregled-zahtjeva.component';
import { SharedService } from './Aplikacije/TkSuglasnost/shared.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FooterComponent } from './footer/footer.component';
import { SimpComponent } from './Aplikacije/SIMP/simp/simp.component';
import { NgxSoapModule } from 'ngx-soap';
import { ModemInfoModalComponent } from './Aplikacije/SIMP/modem-info-modal/modem-info-modal.component';
import { AdminComponent } from './Aplikacije/Admin/admin/admin.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { AddAppToUserModalComponent } from './Aplikacije/Admin/add-app-to-user-modal/add-app-to-user-modal.component';
import { AddAplikacijaModalComponent } from './Aplikacije/Admin/add-aplikacija-modal/add-aplikacija-modal.component';
import { AddStrToAppModalComponent } from './Aplikacije/Admin/add-str-to-app-modal/add-str-to-app-modal.component';
import { AddRolaModalComponent } from './Aplikacije/Admin/add-rola-modal/add-rola-modal.component';
import { AddUserModalComponent } from './Aplikacije/Admin/add-user-modal/add-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProtectedComponent,
    TestComponent,
    NavigationComponent,
    ApplicationComponent,
    AppMenuComponent,
    HasPermissionDirective,
    ApplicationContentComponent,
    ComponentDirective,
    Test1Component,
    Test2Component,
    TabContentComponent,
    NoviZahtjevComponent,
    PregledZahtjevaComponent,
    FooterComponent,
    SimpComponent,
    ModemInfoModalComponent,
    AdminComponent,
    AddAppToUserModalComponent,
    AddAplikacijaModalComponent,
    AddStrToAppModalComponent,
    AddRolaModalComponent,
    AddUserModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: []
      }
    }),
    NgbModule,
    NgxSoapModule,
    NgxDatatableModule,
    TableModule,
    DialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    UserService,
    SharedService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModemInfoModalComponent,
    AddAppToUserModalComponent,
    AddAplikacijaModalComponent,
    AddStrToAppModalComponent,
    AddRolaModalComponent,
    AddUserModalComponent,


    Test1Component,
    Test2Component,
    NoviZahtjevComponent,
    PregledZahtjevaComponent,
    SimpComponent,
    AdminComponent
  ]
})
export class AppModule { }

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}
