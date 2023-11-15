import { Component, Inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-creaedita-tiposervicio',
  templateUrl: './creaedita-tiposervicio.component.html',
  styleUrls: ['./creaedita-tiposervicio.component.css']
})
export class CreaeditaTiposervicioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tiposervicio: TipoServicio= new TipoServicio;
  mensaje: string= '';
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private tsS: TiposervicioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<CreaeditaTiposervicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number,edicion:boolean }
  ) {}
  ngOnInit(): void {
    if (this.data && this.data.id&&this.data.edicion) {
      this.edicion=this.data.edicion
      this.tsS.listId(this.data.id).subscribe((data) => {
        this.form.patchValue(data);
      });
    }
    this.form = this.formBuilder.group({
      idTipoServicio: [''],
      nombreTipoServicio: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tiposervicio.idTipoServicio=this.form.value.idTipoServicio;
      this.tiposervicio.nombreTipoServicio=this.form.value.nombreTipoServicio;

      if (this.data && this.data.id&&this.data.edicion) {
        this.tsS.update(this.tiposervicio).subscribe(() => {
          this.tsS.list().subscribe((data) => {
            this.tsS.setList(data);
            this.dialogRef.close();
          });
        });
      } else {
        this.tsS.insert(this.tiposervicio).subscribe(() => {
          this.tsS.list().subscribe((data) => {
            this.tsS.setList(data);
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
    if (this.edicion) {
      this.tsS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idTipoServicio: new FormControl(data.idTipoServicio),
          nombreTipoServicio: new FormControl(data.nombreTipoServicio),
        });
      });
    }
  }
  
}
