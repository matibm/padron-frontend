import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
 // =====Modulos=====
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe, CommonModule, registerLocaleData } from '@angular/common';

//=====Componentes=======
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { CrearContratoComponent } from './components/crear-contrato/crear-contrato.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { PricePipe } from './pipes/price.pipe';
import {DpDatePickerModule} from 'ng2-date-picker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import localePy from '@angular/common/locales/es-PY';
registerLocaleData(localePy, 'es-PY');
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';

// import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { HeaderComponent } from './shared/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // RegisterComponent,
    NopagefoundComponent,
    CrearContratoComponent,
    PricePipe,

    // BreadcrumbsComponent,
    // SidebarComponent,
    // HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    AutocompleteLibModule,
    AuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    NgSelectModule,
    SweetAlert2Module.forRoot()
    // NgbModule
  ],
  providers: [CurrencyPipe, { provide: LOCALE_ID, useValue: 'es-PY' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
