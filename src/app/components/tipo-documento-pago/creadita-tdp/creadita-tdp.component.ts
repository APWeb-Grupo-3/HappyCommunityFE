import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoDocPago } from 'src/app/models/tipodocpago';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { TipodocpagoService } from 'src/app/services/tipodocpago.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreaeditaUsuarioComponent } from '../../usuario/creaedita-usuario/creaedita-usuario.component';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-creadita-tdp',
  templateUrl: './creadita-tdp.component.html',
  styleUrls: ['./creadita-tdp.component.css']
})
export class CreaditaTDPComponent implements OnInit{

  
  form: FormGroup = new FormGroup({});
  condominio: TipoDocPago= new TipoDocPago;
  mensaje: string= '';
  id: number = 0;
  edicion: boolean = false;
  listaUsuario:Usuario[]=[]

  constructor(
    private tdpS: TipodocpagoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS:UsuarioService,
    private lS:LoginService,


    private dialogRef: MatDialogRef<CreaeditaUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number,edicion:boolean }

  ) {}
  ngOnInit(): void {
    if(this.data&&this.data.id&&this.data.edicion){
      this.edicion=this.data.edicion
      this.id=this.data.id
      this.init()
    }

    this.uS.listUser(this.lS.showUsername()).subscribe((data)=>{
      this.listaUsuario=data;
    })


    this.form = this.formBuilder.group({
      idTipoDocPago: [''],
      nombre: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(5),Validators.maxLength(100)]],
      administrador:['',[Validators.required]]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.condominio.idTipoDocPago = this.form.value.idTipoDocPago;
      this.condominio.nombre = this.form.value.nombre;
      this.condominio.administrador=this.form.value.administrador;
      if (this.edicion) {
        this.tdpS.update(this.condominio).subscribe(() => {
          this.tdpS.list().subscribe((data) => {
            this.tdpS.setList(data);
            this.dialogRef.close();

          });
        });
      } else {
        this.tdpS.insert(this.condominio).subscribe((data) => {
          this.tdpS.list().subscribe((data) => {
            this.tdpS.setList(data);
            this.dialogRef.close();

          });
        });
      }
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  cancelar(): void {
    this.dialogRef.close();
  }
  
  init() {
    if (this.edicion) {
      this.tdpS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idTipoDocPago: data.idTipoDocPago,
          nombre: data.nombre,
          administrador:data.administrador
        });
      });
    }
  }
  
}
