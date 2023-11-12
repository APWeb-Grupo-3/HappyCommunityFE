import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Condominio } from 'src/app/models/condominio';
import { CondominioService } from 'src/app/services/condominio.service';

@Component({
  selector: 'app-creaedita',
  templateUrl: './creaedita.component.html',
  styleUrls: ['./creaedita.component.css']
})
export class CreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  condominio: Condominio= new Condominio;
  mensaje: string= '';
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cS: CondominioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private matDialog: MatDialog,

  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idCondominio: [''],
      nombre: ['', Validators.required],
      departamento: ['', Validators.required],
      distrito: ['', [Validators.required]],
      direccion: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.condominio.idCondominio = this.form.value.idCondominio;
      this.condominio.nombre = this.form.value.nombre;
      this.condominio.departamento = this.form.value.departamento;
      this.condominio.distrito = this.form.value.distrito;
      this.condominio.direccion = this.form.value.direccion;
      if (this.edicion) {
        this.cS.update(this.condominio).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.condominio).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/condominios']);
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
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idCondominio: new FormControl(data.idCondominio),
          nombre: new FormControl(data.nombre),
          departamento: new FormControl(data.departamento),
          distrito: new FormControl(data.distrito),
          direccion: new FormControl(data.direccion),
        });
      });
    }
  }


}
