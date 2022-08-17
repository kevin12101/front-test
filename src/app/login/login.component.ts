import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators, } from '@angular/forms';
import Swal from 'sweetalert2'
import { ApiService } from '../services/api.service';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthenticateService,
    private apiService:ApiService,
    private router: Router,
    public formBuilder: FormBuilder
    ) {}
    validar: boolean = false;
    login = {
      user: '',
      pass: '',
    };
    

  ngOnInit(): void {
    const logger = localStorage.getItem('isUserLoggedIn');
    if (logger) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/']);
    }
}

  entrar() {
      if (!this.validateUser()) {
        return;
      }
      this.validar = false;
      const loading: any = this.loadingFireToast(
        'Validando credenciales, por favor espere...'
      );
      this.authService.login(this.login).subscribe(
        (res) => {
          loading.close();
          window.location.href = window.location.href = '/tickets';
        },
        (error) => {
          
          this.fireToast(error);
          console.log('error en el login', error);
          loading.close();
        }
      );    
  
  }

  registro(){
    this.router.navigate(['/register']);
  }

  loginUser(){
    if (!this.validateUser()) {
      return;
    }
    this.validar = false; 
  }
  validateUser() {
    if (!this.validar) {
      this.validar = true;
      this.validate(
        this.validar,
        this.login.user,
        'El usuario es requerido.',
        'usuario'
      );
      /* this.validate(
        this.validar,
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
          this.login.email
        ),
        'El correo ingresado no es válido.',
        'email'
      ); */
      this.validate(
        this.validar,
        this.login.pass,
        'La contraseña es requerida',
        'password'
      );
    }
    return this.validar;
  }
  validate(validate: any, condition: any, msg: any, id: any) {
    if (validate) {
      if (!condition) {
        this.validar = false;
        this.fireToast(msg);
        return false;
      }
    }
    return true;
  }

  fireToast(msg: any) {
    Swal.fire({
      title: 'Confirmación',
      text: msg.error ? msg.error.message : msg,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  }
 

  
  loadingFireToast(title:any) {
      return Swal.fire({
        title,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  }
}

