import { TipodocpagoService } from './../../../services/tipodocpago.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentoPago } from 'src/app/models/documentopago';
import { TipoDocPago } from 'src/app/models/tipodocpago';
import { Usuario } from 'src/app/models/usuario';
import { DocumentopagoService } from 'src/app/services/documentopago.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  listaUsuarios:Usuario[]=[]
  fechaEmision=new FormControl(new Date());
  fechaVencimiento=new FormControl(new Date());

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Soles', viewValue: 'Soles' },
    { value: 'Dolares', viewValue: 'Dolares' },
  ];
  tipos1: { value: string; viewValue: string }[] = [
    { value: 'Pagado', viewValue: 'Pagado' },
    { value: 'Deuda', viewValue: 'Deuda' },
  ];

  constructor(

    private uS: UsuarioService,
    private tS: TipodocpagoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dS:DocumentopagoService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idDocumentoPago: [''],
      idReceptor: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      moneda: ['', Validators.required],
      total: ['', Validators.required],
      estado: ['', Validators.required],
      usuario: ['', Validators.required],
      tipoDocPago: ['', Validators.required],
    });
    this.uS.list().subscribe((data)=>{
      this.listaUsuarios=data;
    })
    this.tS.list().subscribe((data)=>{
      this.listaTipoDocumentoPagos=data;
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.documentopago.idDocumentoPago = this.form.value.idDocumentoPago;
      this.documentopago.idReceptor = this.form.value.idReceptor;
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
          });
        });
      } else {
        this.dS.insert(this.documentopago).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }
      this.router.navigate(['DocumentoPago']);
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
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idDocumentoPago: new FormControl(data.idDocumentoPago),
          idReceptor: new FormControl(data.idReceptor),
          fechaEmision: new FormControl(data.fechaEmision),
          fechaVencimiento: new FormControl(data.fechaVencimiento),
          moneda: new FormControl(data.moneda),
          total: new FormControl(data.total),
          estado: new FormControl(data.estado),
          usuario: new FormControl(data.usuario.idUsuario),
          tipoDocPago: new FormControl(data.tipoDocPago.idTipoDocPago),
        });
      });
    }
  }
}
