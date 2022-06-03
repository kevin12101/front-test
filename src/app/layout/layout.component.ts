import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  constructor(public location: Location, private router: Router) { }

  ngOnInit(): void {
    this.isMap('maps')
  }
  isMap (path: any) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    } else {
      return true;
    }
  }

}
