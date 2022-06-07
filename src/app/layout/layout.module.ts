import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import { TicketsComponent } from '../tickets/tickets.component';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { RegisterComponent } from '../register/register.component';
import { LayoutRoutes } from './layout.routing';
import { FilterPipe } from '../pipes/filter.pipe';
import { TicketComponent } from '../ticket/ticket.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    FormsModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(LayoutRoutes),
    NgxPaginationModule,
    MatToolbarModule,
    
    
    
   
  ],
  declarations: [
    TicketsComponent,
    FilterPipe,
    RegisterComponent,
    NewTicketComponent,
    TicketComponent,
  ],
})
export class LayoutModule {}
