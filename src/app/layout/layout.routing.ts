import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { RegisterComponent } from '../register/register.component';
import { TicketsComponent } from '../tickets/tickets.component';
import { TicketComponent } from '../ticket/ticket.component';
import { HeaderComponent } from '../header/header.component';


export const LayoutRoutes: Routes = [
    {
        path: 'header',
        component: HeaderComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'newTicket',
        component: NewTicketComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'tickets',
        component: TicketsComponent,
        canActivate:[AuthGuard]
    },
      
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'ticket',
        component: TicketComponent,
        canActivate:[AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'tickets',
        pathMatch: 'full',
        canActivate:[AuthGuard]
    },
      
    
];
