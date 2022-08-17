import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../responseModel';
import { UserLogged } from '../model/userLogged';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root',
})

export class AuthenticateService {

  private currentUserSubject: BehaviorSubject<UserLogged>;
  public currentUser: Observable<UserLogged>;
  private currentLoginSubject: BehaviorSubject<LoginResponse>;
  public currentLogin: Observable<LoginResponse>;
  public auth = false;
  usertoken:any;
  user:any;
  
  constructor(private http: HttpClient) {

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserSubject = new BehaviorSubject<UserLogged>(currentUser ? currentUser : '{}');

    this.currentUser = this.currentUserSubject.asObservable();
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    this.currentLoginSubject = new BehaviorSubject<LoginResponse>( token ? token : '{}');
    this.currentLogin = this.currentLoginSubject.asObservable();
  }

  public get currentUserValue(): UserLogged {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(user: UserLogged) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public get currentLoginValue(): LoginResponse {
    return this.currentLoginSubject.value;
  }

  public get isAuth(): boolean {
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    this.currentLoginSubject = new BehaviorSubject<LoginResponse>(
      token === JSON.parse('null') ? null : token
    );
    return this.currentLoginSubject.value !== null;
  }

  login(credential: Login) {
    return this.http
      .post<LoginResponse>(`${environment.API}login`, credential)
      .pipe(
        map(
          (data) => {
            if (data.status) {
              this.auth = true;
              console.log(data);
              
              localStorage.setItem('token', JSON.stringify(data.data[1]));
              localStorage.setItem('currentUser', JSON.stringify(data.data[0]));

              this.currentLoginSubject.next(data);
            }
            return data;
          },
          (error: any) => {
            console.log('error al realizar el login', error);
            return false;
          }
        )
      );
  }

  get() {
    return this.http
      .get<any>(`${environment.API}auth/get-info`)
      .pipe(map((data) => data));
  }

  //funcion que controla la creacion del usuario
  newUser(user:any){
    return this.http
      .post<LoginResponse>(`${environment.API}register`, user)
      .pipe(
        map(
          (data) => {
            if (data.status) {
              this.auth = true;
              //localStorage.setItem('token', JSON.stringify(data.data[1]));
              //this.currentLoginSubject.next(data);
            }
            return data;
          },
          (error: any) => {
            console.log('error al realizar la creacion del usuario', error);
            return false;
          }
        )
      );
  }

  gettoken(){

    if(localStorage.getItem('token')){
      this.usertoken = localStorage.getItem('token')
    }else{
      this.usertoken = '';
    }
    return this.usertoken;
  }

  getcurrent(){

    if(localStorage.getItem('currentUser')){
      this.user = localStorage.getItem('currentUser')
    }else{
      this.user = '';
    }
    return this.user;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    // this.currentUserSubject.next(new Pymes());
    // this.currentLoginSubject.next();
  }
}
