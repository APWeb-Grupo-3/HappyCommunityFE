import { Tarjeta } from './../../../models/tarjeta';
import { Component, OnInit, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-creaedita-tarjeta',
  templateUrl: './creaedita-tarjeta.component.html',
  styleUrls: ['./creaedita-tarjeta.component.css'],
})
export class CreaeditaTarjetaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tarjeta: Tarjeta = new Tarjeta();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listarUsuarios: Usuario[]=[];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Debito', viewValue: 'Debito' },
    { value: 'Credito', viewValue: 'Credito' },
  ];

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tS: TarjetaService,
    private matDialog: MatDialog,
    private lS:LoginService,

    private dialogRef: MatDialogRef<CreaeditaTarjetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number,edicion:boolean }
  ) {}

  ngOnInit(): void {
    if(this.data&&this.data.id&&this.data.edicion){
      this.edicion=this.data.edicion
      this.id=this.data.id
      this.init()
    }

    this.form = this.formBuilder.group({
      idTarjeta: [''],
      tipoTarjeta: ['', Validators.required],
      numeroTarjeta: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      codigoSeguridad: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      usuario: ['', Validators.required],
    });
    
    this.uS.listUser(this.lS.showUsername()).subscribe((data)=>{
      this.listarUsuarios=data;
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tarjeta.idTarjeta = this.form.value.idTarjeta;
      this.tarjeta.tipoTarjeta = this.form.value.tipoTarjeta;
      this.tarjeta.numeroTarjeta = this.form.value.numeroTarjeta;
      this.tarjeta.fechaVencimiento = this.form.value.fechaVencimiento;
      this.tarjeta.codigoSeguridad = this.form.value.codigoSeguridad;
      this.tarjeta.usuario.idUsuario = this.form.value.usuario;
  
      if (this.edicion) {
        this.tS.update(this.tarjeta).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
            this.dialogRef.close();

          });
        });
      } else {
        this.tS.insert(this.tarjeta).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
            this.dialogRef.close();

          });
        });
      }
    } else {
      this.mensaje = 'Por favor complete los campos obligatorios';
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
      this.tS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idTarjeta: data.idTarjeta,
          tipoTarjeta: data.tipoTarjeta,
          numeroTarjeta: data.numeroTarjeta,
          fechaVencimiento: data.fechaVencimiento,
          codigoSeguridad: data.codigoSeguridad,
          usuario: data.usuario.idUsuario,
        });
      });
    }
  }
  


}
