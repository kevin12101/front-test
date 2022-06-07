import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] | undefined = [{path: "/tickets", title: "inicio"}, {path: "/newTicket", title: "nuevo ticket"} ,{path: "/", title: "generear Reportes"}];
  constructor() { }

  ngOnInit(): void {
    
  }
  

}
