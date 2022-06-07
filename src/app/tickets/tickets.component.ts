import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder,FormControl,FormGroup,Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { AuthenticateService } from '../services/authenticate.service';
import * as moment from "moment";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  //encapsulation: ViewEncapsulation.None,  
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  data: any;
  user:any = JSON.parse(this.authService.getcurrent());
  idrol: any= this.user.idrol; // roles del usuario
  cliente:any = this.user.idclients;//tipo de cliente
  client ={ client : this.cliente};
  actually_date:any = moment().format('YYYY/MM/DD HH:mm:ss ');
  filter = "";
  pageActual:number = 1;
  public datos:Array<any>= [];
  databyid:any[]=[];
  urls = [];
  notas:string [] =[];
  bandera:boolean= false;
  

  form = new FormGroup({
    nota: new FormControl(''),
  });

  actualizar_case = new FormGroup({
    comentario_dev: new FormControl(''),
  })

  filtro = {
    estado_caso: ""
  }

  constructor(
            private authService: AuthenticateService,
            private apiService:ApiService,
            private router: Router,
            public formBuilder: FormBuilder,
            private modalService: NgbModal

    ) {}

    

  ngOnInit(): void {

    this.form = this.formBuilder.group({
    
    notas: this.formBuilder.array([]),
    
    })

    this.actualizar_case = this.formBuilder.group({
      comentario_dev: new FormControl('', [ Validators.required] ),
    })

    if(this.cliente==1){
      this.getinfo();
    }
    if(this.cliente==2){  
      this.getinfo();
    }
    //console.log(this.form.value);
    
        
  }

  get getnotas(){
      
    return this.form.get('notas') as FormArray;
  }

  agregarNota(){
    this.bandera=true;
    this.getnotas.push(this.formBuilder.control(''));
    
  }

  borrarNota(indice: number){
    this.getnotas.removeAt(indice);
    
  }

  cerrarmodal(){
    this.notas = []
    this.modalService.dismissAll();
    // this.router.navigate(['/login']);
  }

  //abrir modal de informacion
  async open(id?:any,content?:any){

    this.notas = [];
    id = {id: id}
    await this.apiService.post('ticketbyid',id).subscribe(
     async (res: any) => {
      this.databyid = res;
      console.log(this.databyid);
      
      },
      (error: any) => {
      console.log('error consultando el ticket', error);
      this.toastFireError(error);
      }
    );

    await this.apiService.post('getima',id).subscribe(
      async (res: any) => {
        console.log(res);
        this.urls = res;
        
       },
       (error: any) => {
       console.log('error consultando imagenes', error);
       this.toastFireError(error);
       
       }
    );
    await this.apiService.post('getnote',id).subscribe(
      async (res: any) => {
        //console.log(res);
        res.forEach( ( element : any )=> {
          let nota = element.nota;
          let newarray = this.notas.push(nota)
          
        });

        
        
  
       },
       (error: any) => {
       console.log('error consultando notas', error);
       this.toastFireError(error);
       }
    );

    this.modalService.open(content, { centered: true, size: 'lg' });
    

  }

  //guardar notas
  guardar(idcase:number){
    console.log("Caso enviado al end point ",idcase);
    this.form.addControl( 'idcase',new FormControl(idcase) )
    console.log(this.form.value);

    this.apiService.post('createnote',this.form.value).subscribe(
      async (res: any) => {
        console.log(res);
        
        Swal.fire({
          text: 'Se agrego Exitosamente la nota',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
          timer:4000,
        }).then((results =>{
          window.location.reload();
          this.modalService.dismissAll();

        }))
        
        
      },
      (error: any) => {
        console.log('error al agregar nota', error);
        this.toastFireError(error);
      }
    );

  }

//actualizar descripcion
  updatedesc(){
    this.router.navigate(['/newTicket']);
  }

  //abrir modal de solucionado
  updatestate(id : any, solution: any){
    this.modalService.open(solution, { centered: true, size: 'lg', keyboard: true });
    id = {id: id}
    this.apiService.post('ticketbyid',id).subscribe(
      async (res: any) => {
       this.databyid = res;  
       },
       (error: any) => {
       console.log('error consultando el ticket', error);
       this.toastFireError(error);
       }
     );
  }

   //pasar el caso a solucionado
  cerrarCaso(id:number, solution: any){
    let updateticket = {id: id, solution_date :  this.actually_date, comentario_dev: this.actualizar_case.get('comentario_dev')?.value};
    console.log(updateticket);
    this.apiService.post('updateticket',updateticket).subscribe(
      async (res: any) => {
        //console.log(res);
        Swal.fire({
          text: 'Actualizacion exitosa',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
          timer:4000,
        }).then((results =>{
          window.location.reload();
          this.modalService.dismissAll();

        }))
        
      },
      (error: any) => {
        console.log('error al actualizar el ticket', error);
        this.toastFireError(error);
      }
    );

  }
  
  // obtener todos los tickets
  getinfo(filter?:any){
  this.apiService.post('tickets',this.client).subscribe(
    async (res: any) => {
      this.data = res;
      console.log(this.data);
      
      if(filter != undefined){
        const estado = this.filtro.estado_caso  == "Pendiente"  ?  1 : 2;
        this.data = this.data.filter( (item:any) => item.status ==  estado );
      }else{
        this.filtro.estado_caso = "";
      }

    },
    (error: any) => {
      console.log('error consultando los tickets', error);
      this.toastFireError(error);
    }
  );
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

  openfiles(){
    for (let index = 0; index < this.urls.length; index++) {
      let element = this.urls[index];
      let url = element['url'];
      window.open(url, "_blank");  
    } 

  }

  async filtrardatos(){
    
    this.getinfo()
    
    
    
    
  }

}
