import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators, } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticateService } from '../services/authenticate.service';
//import { log } from 'console';
/* import { HttpClient, HttpHeaders } from '@angular/common/http'; */
//import {fireToast, loadingFireToast}  from 'src/assets'; 

import * as moment from "moment";
import { DomSanitizer } from '@angular/platform-browser';
//import { log } from 'console';



@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  user:any = JSON.parse( this.authService.getcurrent());
  idrol: any= this.user.idrol;
  client:any; 
  public archivos:any = [];
  data = [];
  type_sup = ["Incidencia", "Solicitud Base de Datos","Hacer una pregunta"];
  priority_list = ["Critica", "Alta", "Media", "baja"]
  platform_list = ["Portal Clientes", "Portal BO", "Compra en linea"];
  tipificacion_list = ["Solicitud Cliente", "Solicitud Operaciones", "Error reportado por Analista", 
  "Error reportado Por cliente", "Error desarrollos en Produccion", "Error identificado por Operaciones"]
  public previsualizacion:string | undefined;
  insertid:any;
  actually_date:any = moment().format('YYYY/MM/DD HH:mm:ss ');

  ticketsForm = new FormGroup({
    type_support: new FormControl(''),
    name: new FormControl(''),
    date: new FormControl(this.actually_date),
    description: new FormControl(''),
    client: new FormControl(''),
    idrol: new FormControl(this.idrol),
    title: new FormControl(''),
    cliente: new FormControl(''),
    url: new FormControl(''),
    vigilancia: new FormControl(''),
    plataforma: new FormControl(''),
    priority: new FormControl(''),
    tipificacion: new FormControl(''),
    solucion_esperada: new FormControl(''),
    cupo: new FormControl(''),
    topologia: new FormControl(''),
  })
  constructor(
    private apiService:ApiService,
    private authService: AuthenticateService,
    private router: Router,
    public formBuilder: FormBuilder,
    private sanitizer:DomSanitizer  
    ){
     
    }
  token: any
  public datos:Array<any>= []

  ngOnInit(): void {
   
    this.ticketsForm = this.formBuilder.group({
      
      type_support: new FormControl({value: '', disabled: this.type_sup.length == 0 ? true : false }, [Validators.required] ,   ),
      name: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
      date: new FormControl(this.actually_date, Validators.compose([Validators.required])),
      description: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
      client: new FormControl(this.client),
      idrol: new FormControl(this.idrol ),
      title: new FormControl('',[ Validators.required, Validators.minLength(5)] ),
      cliente: new FormControl('', Validators.compose([Validators.required])),
      url: new FormControl(''),
      vigilancia: new FormControl('', Validators.compose([Validators.required])),
      plataforma: new FormControl('', Validators.compose([Validators.required])),
      priority: new FormControl('', Validators.compose([Validators.required])),
      tipificacion: new FormControl('', Validators.compose([Validators.required])),
      solucion_esperada: new FormControl('',[ Validators.required] ),
      cupo: new FormControl('',[ Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)] ),
      topologia: new FormControl('',[ Validators.required] ),
      
    });
    
    this.client = this.user.idclients;
    
    
  }

  get nombreNovalido(){
    return this.ticketsForm.get('name')?.invalid && this.ticketsForm.get('name')?.touched
  }
  get descripcionNovalido(){
    return this.ticketsForm.get('description')?.invalid && this.ticketsForm.get('description')?.touched
  }
  get tituloNovalido(){
    return this.ticketsForm.get('title')?.invalid && this.ticketsForm.get('title')?.touched
  }

  get urlNovalido(){
    return this.ticketsForm.get('url')?.invalid && this.ticketsForm.get('url')?.touched
  }
  get solucion_esperada(){
    return this.ticketsForm.get('solucion_esperada')?.invalid && this.ticketsForm.get('solucion_esperada')?.touched
  }

  get cupoNovalido(){
    return this.ticketsForm.get('cupo')?.invalid && this.ticketsForm.get('cupo')?.touched
  }


  create(){

    let bandera = true;
    console.log(this.client);

    if(this.client == 1){

      console.log("Validacion 1");

      if( !this.ticketsForm.get('name')?.value || !this.ticketsForm.get('title')?.value 
       || !this.ticketsForm.get('description')?.value
       || !this.ticketsForm.get('solucion_esperada')?.value || !this.ticketsForm.get('cupo')?.value
       || !this.ticketsForm.get('topologia')?.value || !this.ticketsForm.get('date')?.value
       || !this.ticketsForm.get('priority')?.value ){

        Swal.fire({
          title: 'El formulario es incorrecto',
          icon: 'info',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
        })

        bandera = false;
       }

    }

    else if(this.client == 2){

      console.log("cliente 2");
      
      if( !this.ticketsForm.get('name')?.value || !this.ticketsForm.get('title')?.value 
      || !this.ticketsForm.get('description')?.value || !this.ticketsForm.get('type_support')?.value
      || !this.ticketsForm.get('cliente')?.value 
      || !this.ticketsForm.get('date')?.value || !this.ticketsForm.get('vigilancia')?.value ){
        console.log("cliente Validacion 2");
       Swal.fire({
         title: 'El formulario es incorrecto',
         icon: 'info',
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'OK',
       })

       bandera = false;
      }


    }
      

    if(bandera == true){
      const body = {
        type_support: this.client == 2 ? this.ticketsForm.get('type_support')?.value : "",
        name: this.ticketsForm.get('name')?.value,
        date: this.ticketsForm.get('date')?.value,
        description: this.ticketsForm.get('description')?.value,
        client: this.client,
        idrol: this.idrol,
        title: this.ticketsForm.get('title')?.value,
        cliente: this.client == 2 ? this.ticketsForm.get('cliente')?.value : "",
        url: this.client == 2 ? this.ticketsForm.get('url')?.value : "",
        vigilancia: this.client == 2 ? this.ticketsForm.get('vigilancia')?.value : null,
        plataforma: this.client == 2 ? this.ticketsForm.get('plataforma')?.value : "",
        priority: this.ticketsForm.get('priority')?.value,
        tipificacion: this.client == 2 ? this.ticketsForm.get('tipificacion')?.value : "",
        solucion_esperada: this.client == 1 ? this.ticketsForm.get('solucion_esperada')?.value : null,
        cupo: this.client == 1 ? this.ticketsForm.get('cupo')?.value : null,
        topologia: this.client == 1 ? this.ticketsForm.get('topologia')?.value : null,
      }
      console.log(body);
      const loading: any = this.loadingFireToast('Cargando, por favor espere...'); 
      this.apiService
              .post(`newTicket`,body)
              .subscribe(
                async (res: any) => {
                  //console.log(res);
                  this.insertid = res.insertId;
                  console.log(this.insertid);
                  
                  console.log("imagenes cargadas ",this.archivos);
                  if(this.archivos.length >= 1){
                    this.sendFile();
                  }
                  
                  loading.close();
                  Swal.fire({
                    title: 'Creacion exitosa',
                    icon: 'info',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK',
                  })
                  this.router.navigate(['/tickets'])
                  
                },
                (error: any) => {
                  loading.close();
                  console.log('error enviando informacion', error);
                }
              );

    }  
    

      


    
    
    
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

  sendFile(){   
    console.log("archivos cargados", this.archivos);
    console.log("id enviado al servicio ",this.insertid);
    
    if(this.archivos.length >= 1){
      const body = new FormData();
      this.archivos.forEach((archivo: any) => {
      body.append( "file",archivo)
      //console.log("id insertado ",this.insertid);
      });
      body.append( "insertid", String(this.insertid))
      
      this.apiService.postfiles('upload',body).subscribe(
        async (res: any) => {
          console.log(res); 
        },
        (error: any) => {
          console.log(error);
          this.toastFireError(error);
        }
      );

    }
    
    
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      reject(e);
      console.log(e);
      
    }
  })

  getFile(event:any){
    
    let claves = Object.values(event.target.files)
    for(let i = 0; i < claves.length; i++){
        let file = claves[i];
        this.archivos.push(file)
         this.extraerBase64(file).then((imagen:any) =>{
          this.previsualizacion=imagen.base;
          
        }) 
          
    }
  }

  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
  }

  toastFireError(res :any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: res,
      timer: 6000,
    }).then(() => {
      //if (redirect)
     //   window.location.href = window.location.href = "/home/dashboard";
    })
  }
  

}
