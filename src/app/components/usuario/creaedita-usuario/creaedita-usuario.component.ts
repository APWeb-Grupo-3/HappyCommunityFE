import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idUsuario: [''],
      nombreUsuario: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', Validators.required],
      edad: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
      rolUsuario: ['', Validators.required],
    });
    this.rS.list().subscribe((data)=>{
      this.listaRolUsuarios=data;
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.idUsuario;
      this.usuario.nombreUsuario = this.form.value.nombreUsuario;
      this.usuario.nombres = this.form.value.nombres;
      this.usuario.apellidos = this.form.value.apellidos;
      this.usuario.correo = this.form.value.correo;
      this.usuario.clave = this.form.value.clave;
      this.usuario.edad = this.form.value.edad;
      this.usuario.telefono = this.form.value.telefono;
      this.usuario.genero = this.form.value.genero;
      this.usuario.rolUsuario.idRolUsuario = this.form.value.rolUsuario;

      if (this.edicion) {
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['Usuario']);
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
  
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUsuario: new FormControl(data.idUsuario),
          nombreUsuario: new FormControl(data.nombreUsuario),
          nombres: new FormControl(data.nombres),
          apellidos: new FormControl(data.apellidos),
          correo: new FormControl(data.correo),
          clave: new FormControl(data.clave),
          edad: new FormControl(data.edad),
          telefono: new FormControl(data.telefono),
          genero: new FormControl(data.genero),
          rolUsuario: new FormControl(data.rolUsuario.idRolUsuario),
        });
      });
    }
  }
}