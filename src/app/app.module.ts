import { BrowserModule } from '@angular/platform-browser';
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
  ],
  imports: [
    BrowserModule,
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
    NgxSoapModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    UserService,
    SharedService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModemInfoModalComponent,


    Test1Component,
    Test2Component,
    NoviZahtjevComponent,
    PregledZahtjevaComponent,
    SimpComponent
  ]
})
export class AppModule { }

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}
