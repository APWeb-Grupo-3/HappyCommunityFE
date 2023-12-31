import { TipodocpagoService } from './../../../services/tipodocpago.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentoPago } from 'src/app/models/documentopago';
import { TipoDocPago } from 'src/app/models/tipodocpago';
import { Usuario } from 'src/app/models/usuario';
import { DocumentopagoService } from 'src/app/services/documentopago.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CreaeditaUsuarioComponent } from '../../usuario/creaedita-usuario/creaedita-usuario.component';
import * as moment from 'moment';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-creaedita-documentopago',
  templateUrl: './creaedita-documentopago.component.html',
  styleUrls: ['./creaedita-documentopago.component.css']
})
export class CreaeditaDocumentopagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  documentopago: DocumentoPago= new DocumentoPago;
  mensaje: string= '';
  id: number = 0;
  edicion: boolean = false;
  listaTipoDocumentoPagos:TipoDocPago[]=[]
  listaUsuarios1:Usuario[]=[]
  listaUsuarios2:Usuario[]=[]

 

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Soles', viewValue: 'Soles' },
    { value: 'Dolares', viewValue: 'Dólares' },
  ];
  tipos1: { value: string; viewValue: string }[] = [
    { value: 'Pendiente', viewValue: 'Pendiente' },
    { value: 'Pagado', viewValue: 'Pagado' },
    { value: 'Vencido', viewValue: 'Vencido' },
  ];

  constructor(

    private uS: UsuarioService,
    private tS: TipodocpagoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dS:DocumentopagoService,
    private lS:LoginService,


    private dialogRef: MatDialogRef<CreaeditaUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number,edicion:boolean },
    

  ) {}
  validarFechas(control: AbstractControl) {
    const fechaEmision = this.form?.get('fechaEmision')?.value;
    const fechaVencimiento = control.value;

    // Realiza la validación
    if (fechaEmision && fechaVencimiento && fechaVencimiento < fechaEmision) {
      return { fechaInvalida: true };
    }

    return null;
  }
  ngOnInit(): void {
    if(this.data&&this.data.id&&this.data.edicion){
      this.edicion=this.data.edicion
      this.id=this.data.id
      this.init()
    }


    this.form = this.formBuilder.group({
      idDocumentoPago: [''],
      idReceptor: ['', [Validators.required]],
      fechaEmision: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required,this.validarFechas.bind(this)]],
      moneda: ['', [Validators.required]],
      total: ['', ],
      estado: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      tipoDocPago: ['', [Validators.required]],
    });
    this.uS.listUser(this.lS.showUsername()).subscribe((data)=>{
      this.listaUsuarios1=data;
    })
    this.uS.list().subscribe((data)=>{
      this.listaUsuarios2=data;
    })
    this.tS.listTDR(this.lS.showUsername()).subscribe((data)=>{
      this.listaTipoDocumentoPagos=data;
    })

  }
  
  nuevobtn() {
    //refresca la página
    location.reload();
  }

  
  aceptar(): void {
    if (this.form.valid) {
      this.documentopago.idDocumentoPago = this.form.value.idDocumentoPago;
      this.documentopago.idReceptor.idUsuario = this.form.value.idReceptor;
      this.documentopago.fechaEmision = this.form.value.fechaEmision;
      this.documentopago.fechaVencimiento = this.form.value.fechaVencimiento;
      this.documentopago.moneda = this.form.value.moneda;
      this.documentopago.total = this.form.value.total;
      this.documentopago.estado = this.form.value.estado;
      this.documentopago.usuario.idUsuario = this.form.value.usuario;
      this.documentopago.tipoDocPago.idTipoDocPago = this.form.value.tipoDocPago;

      if (this.edicion) {
        this.dS.update(this.documentopago).subscribe(() => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
            this.dialogRef.close();
            this.nuevobtn();

          });
        });
      } else {
        this.dS.insert(this.documentopago).subscribe((data) => {
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
          idDocumentoPago: data.idDocumentoPago,
          idReceptor: data.idReceptor.idUsuario,
          fechaEmision: data.fechaEmision,
          fechaVencimiento: data.fechaVencimiento,
          moneda: data.moneda,
          total: data.total,
          estado: data.estado,
          usuario: data.usuario.idUsuario,
          tipoDocPago: data.tipoDocPago.idTipoDocPago,
        });
      });
    }
  }
  
}
