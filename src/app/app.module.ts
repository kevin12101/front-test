import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { HeaderComponent } from './header/header.component';
import { JwtInterceptor } from './jwt.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//libs para consumir apis y caputar datos del formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';





//paginacion
import {NgxPaginationModule} from 'ngx-pagination';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    FontAwesomeModule,
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
