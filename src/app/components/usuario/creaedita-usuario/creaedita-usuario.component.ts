import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RolUsuario } from 'src/app/models/rolusuario';
import { Usuario } from 'src/app/models/usuario';
import { RolusuarioService } from 'src/app/services/rolusuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-creaedita-usuario',
  templateUrl: './creaedita-usuario.component.html',
  styleUrls: ['./creaedita-usuario.component.css']
})
export class CreaeditaUsuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario= new Usuario;
  mensaje: string= '';
  id: number = 0;
  edicion: boolean = false;
  listaRolUsuarios:RolUsuario[]=[]
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Varon', viewValue: 'Varon' },
    { value: 'Mujer', viewValue: 'Mujer' },
  ];
  constructor(

    private rS: RolusuarioService,
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,

    private dialogRef: MatDialogRef<CreaeditaUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number,edicion:boolean }

  ) {}

  ngOnInit(): void {
    if(this.data&&this.data.id&&this.data.edicion){
      this.edicion=this.data.edicion
      this.id=this.data.id
      this.init()
    }


    this.form = this.formBuilder.group({
      idUsuario: [''],
      nombreUsuario: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(30)]],
      clave: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(200)]],
      rol: ['', [Validators.required]],
      nombres: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(4),Validators.maxLength(100)]],
      apellidos: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(4),Validators.maxLength(100)]],
      correo: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      edad: ['', [Validators.required,Validators.pattern(/^[0-9]+$/), Validators.min(18), Validators.max(100)]],
      telefono: ['', [Validators.required,Validators.pattern(/^[0-9]+$/),Validators.minLength(9), Validators.maxLength(9)]],
      genero: ['', [Validators.required]],
    });
    this.rS.list().subscribe((data)=>{
      this.listaRolUsuarios=data;
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.idUsuario;
      this.usuario.nombreUsuario = this.form.value.nombreUsuario;
      this.usuario.clave = this.form.value.clave;
      this.usuario.rol.idRolUsuario = this.form.value.rol;
      this.usuario.nombres = this.form.value.nombres;
      this.usuario.apellidos = this.form.value.apellidos;
      this.usuario.correo = this.form.value.correo;
      this.usuario.edad = this.form.value.edad;
      this.usuario.telefono = this.form.value.telefono;
      this.usuario.genero = this.form.value.genero;

      if (this.edicion) {
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            this.dialogRef.close();

          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            this.dialogRef.close();

          });
        });
      }
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
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
      this.uS.listId(this.data.id).subscribe((data) => {
        this.form.patchValue({
          idUsuario: data.idUsuario,
          nombreUsuario: data.nombreUsuario,
          clave: data.clave,
          rol: data.rol.idRolUsuario,
          nombres: data.nombres,
          apellidos: data.apellidos,
          correo: data.correo,
          edad: data.edad,
          telefono: data.telefono,
          genero: data.genero,
        });
      });
    }
  }
  
}