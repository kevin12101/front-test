import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthenticateService,
              private router: Router){}

  canActivate(): boolean {
  
    if(this.auth.isAuth){
      return true
    }else{
      this.router.navigate(['login']);
      return false
    }
   
  }
}
