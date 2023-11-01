import { Component, OnInit } from '@angular/core';
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

  constructor(
    private tdpS: TipodocpagoService,
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
      nombre: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.condominio.idTipoDocPago = this.form.value.idTipoDocPago;
      this.condominio.nombre = this.form.value.nombre;
      if (this.edicion) {
        this.tdpS.update(this.condominio).subscribe(() => {
          this.tdpS.list().subscribe((data) => {
            this.tdpS.setList(data);
          });
        });
      } else {
        this.tdpS.insert(this.condominio).subscribe((data) => {
          this.tdpS.list().subscribe((data) => {
            this.tdpS.setList(data);
          });
        });
      }
      this.router.navigate(['TipoDocPago']);
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
      this.tdpS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idTipoDocPago: new FormControl(data.idTipoDocPago),
          nombre: new FormControl(data.nombre),
        });
      });
    }
  }
}
