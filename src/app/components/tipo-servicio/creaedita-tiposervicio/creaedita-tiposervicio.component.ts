import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoServicio } from 'src/app/models/tiposervicio';
import { TiposervicioService } from 'src/app/services/tiposervicio.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
@Component({
  selector: 'app-creaedita-tiposervicio',
  templateUrl: './creaedita-tiposervicio.component.html',
  styleUrls: ['./creaedita-tiposervicio.component.css']
})
export class CreaeditaTiposervicioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  condominio: TipoServicio= new TipoServicio;
  mensaje: string= '';
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private tsS: TiposervicioService,
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
      idTipoDocPago: [''],
      nombreTipoServicio: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.condominio.idTipoServicio = this.form.value.idTipoDocPago;
      this.condominio.nombreTipoServicio = this.form.value.nombreTipoServicio;
      if (this.edicion) {
        this.tsS.update(this.condominio).subscribe(() => {
          this.tsS.list().subscribe((data) => {
            this.tsS.setList(data);
          });
        });
      } else {
        this.tsS.insert(this.condominio).subscribe((data) => {
          this.tsS.list().subscribe((data) => {
            this.tsS.setList(data);
          });
        });
      }
      this.router.navigate(['TipoServicio']);
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
      this.tsS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idTipoDocPago: new FormControl(data.idTipoServicio),
          nombreTipoServicio: new FormControl(data.nombreTipoServicio),
        });
      });
    }
  }
}
