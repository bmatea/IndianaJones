import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { TestComponent } from './test/test.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ApplicationComponent } from './application/application.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { ApplicationContentComponent } from './application-content/application-content.component';
import { Test1Component } from './stranice/test1/test1.component';
import { Test2Component } from './stranice/test2/test2.component';
import { NoviZahtjevComponent } from './Aplikacije/TkSuglasnost/novi-zahtjev/novi-zahtjev.component';
import { PregledZahtjevaComponent } from './Aplikacije/TkSuglasnost/pregled-zahtjeva/pregled-zahtjeva.component';
import { SimpComponent } from './Aplikacije/SIMP/simp/simp.component';
import { AdminComponent } from './Aplikacije/Admin/admin/admin.component';

export const components = {
  'Test1Component': Test1Component,
  'Test2Component': Test2Component,
  'NoviZahtjev': NoviZahtjevComponent,
  'PregledZahtjeva': PregledZahtjevaComponent,
  'sinp': SimpComponent,
  'Admin': AdminComponent
};
