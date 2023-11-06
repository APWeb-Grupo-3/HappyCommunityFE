import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RolUsuario } from 'src/app/models/rolusuario';
import { RolusuarioService } from 'src/app/services/rolusuario.service';

@Component({
  selector: 'app-creaedita-rolusuario',
  templateUrl: './creaedita-rolusuario.component.html',
  styleUrls: ['./creaedita-rolusuario.component.css']
})
export class CreaeditaRolusuarioComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  rolusuario: RolUsuario= new RolUsuario;
  mensaje: string= '';
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: RolusuarioService,
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
      idRolUsuario: [''],
      nombreTipo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.rolusuario.idRolUsuario = this.form.value.idRolUsuario;
      this.rolusuario.nombreTipo = this.form.value.nombreTipo;
      this.rolusuario.descripcion = this.form.value.descripcion;
      if (this.edicion) {
        this.rS.update(this.rolusuario).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rolusuario).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['RolUsuario']);
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
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idRolUsuario: new FormControl(data.idRolUsuario),
          nombreTipo: new FormControl(data.nombreTipo),
          descripcion: new FormControl(data.descripcion),
        });
      });
    }
  }
}
