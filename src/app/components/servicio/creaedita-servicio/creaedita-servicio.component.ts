import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio';
import { TipoServicio } from 'src/app/models/tiposervicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { TiposervicioService } from 'src/app/services/tiposervicio.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-creaedita-servicio',
  templateUrl: './creaedita-servicio.component.html',
  styleUrls: ['./creaedita-servicio.component.css']
})
export class CreaeditaServicioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  servicio: Servicio= new Servicio;
  mensaje: string= '';
  id: number = 0;
  edicion: boolean = false;
  listaTipoServicios:TipoServicio[]=[]

  constructor(

    private tS: TiposervicioService,
    private sS: ServicioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private matDialog: MatDialog,

    private dialogRef: MatDialogRef<CreaeditaServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number,edicion:boolean }

  ) {}
  ngOnInit(): void {
    if(this.data&&this.data.id&&this.data.edicion){
      this.edicion=this.data.edicion
      this.id=this.data.id
      this.init()
    }

    this.form = this.formBuilder.group({
      idServicio: [''],
      descripcionServicio: ['', Validators.required],
      tipoServicio: ['', Validators.required],
    });
    this.tS.list().subscribe((data)=>{
      this.listaTipoServicios=data;
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.servicio.idServicio = this.form.value.idServicio;
      this.servicio.descripcionServicio = this.form.value.descripcionServicio;
      this.servicio.tipoServicio.idTipoServicio = this.form.value.tipoServicio;

      if (this.edicion) {
        this.sS.update(this.servicio).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
            this.dialogRef.close();

          });
        });
      } else {
        this.sS.insert(this.servicio).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
            this.dialogRef.close();

          });
        });
      }
      this.router.navigate(['Servicio']);
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
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idServicio: new FormControl(data.idServicio),
          descripcionServicio: new FormControl(data.descripcionServicio),
          tipoServicio: new FormControl(data.tipoServicio.idTipoServicio),
        });
      });
    }
  }

}
