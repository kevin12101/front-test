import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { FormBuilder,FormControl,FormGroup,Validators, } from '@angular/forms';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  id = "";
  data = [];
  descripcion = "";
  tickets = { description: ""}
  data_log:any;
  bandera:boolean = false;
  info: any;
 

  constructor(private activatedRoute: ActivatedRoute,private apiService:ApiService,public formBuilder: FormBuilder,
    private router: Router,) 
  {
    this.activatedRoute.params.subscribe(params =>{
      this.id = params['id']
      //console.log(params['id'])
    })
    let tickets = {
      id:this.id,
      description: ""
    }
  }
  

  ngOnInit(): void {
    this.getticket(this.id)
    this.getinfobyid(this.id)
    
  }

  updatedes(){
    let tickets_new = {
      id: this.id,
      description: this.tickets.description
    }
    if( tickets_new.id === '' || tickets_new.description === '' ){
      Swal.fire({
        title: 'El formulario no puede tener campos  vacios',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      })
  }
  else{
    this.apiService.post('updatedes',  tickets_new ).subscribe(
      async (res: any) => {
         Swal.fire({
            title: 'Actualizacion del ticktet exitosa',
            icon: 'info',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
          })
          this.router.navigate(['/tickets'])
      },
      (error: any) => {
        console.log('error consultando el ticket', error);
        this.toastFireError(error);
      }
    );
    }
  }
    
 
  getticket(id:any){
    id = {id: id}
    this.apiService.post('ticketbyid',id).subscribe(
      async (res: any) => {
        this.data = res;
        this.descripcion = this.data[0]['description']
        console.log(this.descripcion);
        
      },
      (error: any) => {
        console.log('error consultando el ticket', error);
        this.toastFireError(error);
      }
    );
  }

  getinfobyid(id:any){
    id = {id: id}
    this.apiService.post('logsid',id).subscribe(
      async (res: any) => {
        this.data_log = res;
        this.data_log.find((object: any) =>{
          this.info = object
        });
        if(this.info){

          if(Object.keys(this.info).length === 0){
            this.bandera = false
          }
          else{
            this.bandera = true
          }

        }    
      },
      (error: any) => {
        console.log('error consultando el ticket', error);
        this.toastFireError(error);
      }
    );
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
    });
  }
}
