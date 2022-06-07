import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { TicketsComponent } from './tickets/tickets.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
 

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layout/layout.module').then(
            (m) => m.LayoutModule
          ),

      },
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
  
  

];

@NgModule({
  imports: [CommonModule, BrowserModule,BrowserAnimationsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
