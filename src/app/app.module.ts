import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// =====Modulos=====
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

//=====Componentes=======
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
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
    // BreadcrumbsComponent,
    // SidebarComponent,
    // HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
