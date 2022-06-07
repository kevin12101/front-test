import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticateService,
               private router: Router) 
  {}

  ngOnInit(): void {
  }
  newTicket(){
    this.router.navigate(['/newTicket']);
  }

  salir(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  home(){
    this.router.navigate(['/tickets']);
  }

}
