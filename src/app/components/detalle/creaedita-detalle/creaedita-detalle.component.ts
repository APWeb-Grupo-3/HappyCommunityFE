import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Detalle } from 'src/app/models/detalle';
import { DocumentoPago } from 'src/app/models/documentopago';
import { Servicio } from 'src/app/models/servicio';
import { DetalleService } from 'src/app/services/detalle.service';
import { DocumentopagoService } from 'src/app/services/documentopago.service';
import { LoginService } from 'src/app/services/login.service';
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
    private lS:LoginService,


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
      subtotalDetalle: ['', [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      documentoPago: ['', Validators.required],
      servicio: ['', Validators.required],
    });
    this.seS.listSA(this.lS.showUsername()).subscribe((data)=>{
      this.listaServicios=data;
    })
    this.dpS.listDARD(this.lS.showUsername()).subscribe((data)=>{
      this.listaDocumentoPagos=data;
    })
  }
  nuevobtn() {
    //refresca la página
    location.reload();
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
            this.nuevobtn();

          });
        });
      } else {
        this.dS.insert(this.detalle).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
            this.dialogRef.close();
            this.nuevobtn();

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
      this.dS.listId(this.data.id).subscribe((data) => {
        this.form.patchValue({
          idDetalle: data.idDetalle,
          subtotalDetalle: data.subtotalDetalle,
          documentoPago: data.documentoPago.idDocumentoPago,
          servicio: data.servicio.idServicio,
        });
      });
    }
  }
  
}
