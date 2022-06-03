import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators, } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { AuthenticateService } from '../services/authenticate.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    pass: new FormControl(''),
    user: new FormControl(''),
    cliente: new FormControl(''),
  })
  constructor(
    private authService: AuthenticateService,
    private apiService:ApiService,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }
  register = {
    name: '',
    email: '',
    pass:'',
    user:'',
    cliente:''
  };
  userdata = "";
  validar: boolean = false;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      pass: new FormControl('', Validators.compose([Validators.required])),
      user: new FormControl('', Validators.compose([Validators.required])),
      cliente: new FormControl('', Validators.compose([Validators.required]))
    });
  }
  RegisterUser(){
    if (!this.validateUser()) {
      return;
    }
    this.validar = false;
  }
  validateUser() {
    if (!this.validar) {
      this.validar = true;
      this.validate(this.validar,this.register.user,
        'El usuario es requerido.',
        'usuario');
      this.validate(
        this.validar,
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
          this.register.email
        ),
        'El correo ingresado no es válido.',
        'email'
      );
      this.validate(
        this.validar,
        this.register.pass,
        'La contraseña es requerida',
        'password'
      );
      this.validate(
        this.validar,
        this.register.cliente,
        'El cliente es requerido',
        'cliente'
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
      title: 'Error al crear usuario',
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

  create(){
    this.validateUser();
    this.authService.newUser(this.register).subscribe(
      (res:any) => {
        Swal.fire({
          text: 'Registro exitoso',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
          timer:4000,
        })
        this.router.navigate(['/login']);
      },
      (error:any) => {
        //loading.close();
        console.log('error en registro', error);
        this.fireToast(error);
      }
    );


    
    
    
  }
}
