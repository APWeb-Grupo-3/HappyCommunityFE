import { MensajeService } from './../../../services/mensaje.service';
import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Mensaje } from 'src/app/models/mensaje';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-creaedita-mensaje',
  templateUrl: './creaedita-mensaje.component.html',
  styleUrls: ['./creaedita-mensaje.component.css']
})
export class CreaeditaMensajeComponent  implements OnInit{
  form: FormGroup = new FormGroup({});
  mensajes: Mensaje = new Mensaje();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listarUsuarios1: Usuario[]=[]; 
  listarUsuarios2: Usuario[]=[]; 

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private mS: MensajeService,
    private matDialog: MatDialog,
    private lS:LoginService,


    private dialogRef: MatDialogRef<CreaeditaMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number,edicion:boolean }
  ) {}

  ngOnInit(): void {
    if(this.data&&this.data.id&&this.data.edicion){
      this.edicion=this.data.edicion
      this.id=this.data.id
      this.init()
    }


    this.form = this.formBuilder.group({
      idMensaje: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      usuario: ['', Validators.required],
      receptor: ['', Validators.required],
  
    });
    this.uS.listUser(this.lS.showUsername()).subscribe((data)=>{
      this.listarUsuarios1=data;
    })
    this.uS.list().subscribe((data)=>{
      this.listarUsuarios2=data;
    })
    
  }
  nuevobtn() {
    //refresca la página
    location.reload();
  }
  aceptar(): void {
    if (this.form.valid) {
      this.mensajes.idMensaje = this.form.value.idMensaje;
      this.mensajes.titulo = this.form.value.titulo;
      this.mensajes.descripcion = this.form.value.descripcion;
      this.mensajes.usuario.idUsuario = this.form.value.usuario;
      this.mensajes.receptor.idUsuario = this.form.value.receptor;


      if (this.edicion) {
        this.mS.update(this.mensajes).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
            this.dialogRef.close();
            this.nuevobtn();
          });
        });        
      } else {
        this.mS.insert(this.mensajes).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
            this.dialogRef.close();
            this.nuevobtn();
          });
        });
      }
      this.router.navigate(['mensajes']);
    } else {
      this.mensaje = 'Por favor complete los campos obligatorios';
    }
  }
  cancelar(): void {
    this.dialogRef.close();
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.data.edicion) {
      this.mS.listId(this.data.id).subscribe((data) => {
        this.form.patchValue({
          idMensaje: data.idMensaje,
          titulo: data.titulo,
          descripcion: data.descripcion,
          usuario: data.usuario.idUsuario,
          receptor: data.receptor.idUsuario,
        });
      });
    }
  }
  











}
