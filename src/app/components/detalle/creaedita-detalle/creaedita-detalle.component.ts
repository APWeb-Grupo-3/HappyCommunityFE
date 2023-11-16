import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Detalle } from 'src/app/models/detalle';
import { DocumentoPago } from 'src/app/models/documentopago';
import { Servicio } from 'src/app/models/servicio';
import { DetalleService } from 'src/app/services/detalle.service';
import { DocumentopagoService } from 'src/app/services/documentopago.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-creaedita-detalle',
  templateUrl: './creaedita-detalle.component.html',
  styleUrls: ['./creaedita-detalle.component.css']
})
export class CreaeditaDetalleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  detalle: Detalle= new Detalle;
  mensaje: string= '';
  id: number = 0;
  edicion: boolean = false;
  listaServicios:Servicio[]=[]
  listaDocumentoPagos:DocumentoPago[]=[]

  constructor(

    private dS: DetalleService,
    private seS: ServicioService,
    private dpS:DocumentopagoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,


    private dialogRef: MatDialogRef<CreaeditaDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number,edicion:boolean }

  ) {}
  ngOnInit(): void {
    if(this.data&&this.data.id&&this.data.edicion){
      this.edicion=this.data.edicion
      this.id=this.data.id
      this.init()
    }


    this.form = this.formBuilder.group({
      idDetalle: [''],
      subtotalDetalle: ['', Validators.required],
      documentoPago: ['', Validators.required],
      servicio: ['', Validators.required],
    });
    this.seS.list().subscribe((data)=>{
      this.listaServicios=data;
    })
    this.dpS.list().subscribe((data)=>{
      this.listaDocumentoPagos=data;
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.detalle.idDetalle = this.form.value.idDetalle;
      this.detalle.subtotalDetalle = this.form.value.subtotalDetalle;
      this.detalle.documentoPago.idDocumentoPago = this.form.value.documentoPago;
      this.detalle.servicio.idServicio = this.form.value.servicio;

      if (this.edicion) {
        this.dS.update(this.detalle).subscribe(() => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
            this.dialogRef.close();

          });
        });
      } else {
        this.dS.insert(this.detalle).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
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
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idDetalle: new FormControl(data.idDetalle),
          subtotalDetalle: new FormControl(data.subtotalDetalle),
          documentoPago: new FormControl(data.documentoPago.idDocumentoPago),
          servicio: new FormControl(data.servicio.idServicio),
        });
      });
    }
  }
}
