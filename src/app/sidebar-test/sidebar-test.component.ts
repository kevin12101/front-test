import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidebar-test',
  templateUrl: './sidebar-test.component.html',
  styleUrls: ['./sidebar-test.component.css']
})
export class SidebarTestComponent {
  menuItems: any[] | undefined = [{path: "/tickets", title: "Inicio"}, {path: "/newTicket", title: "Nuevo Ticket"} ,{path: "/", title: "Generar Reportes"}];
  expandedIndex = 0;


  
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthenticateService,private router: Router) {}
    
  salir(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
