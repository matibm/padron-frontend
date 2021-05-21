import { PersonasComponent } from './components/personas/personas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';



import { NopagefoundComponent } from './nopagefound/nopagefound.component';







const routes: Routes = [
  
  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  
  
  {path: 'personas', component: PersonasComponent },
  
  {path: '', redirectTo:'/admin', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent},
  

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
  
})
export class AppRoutingModule { }
