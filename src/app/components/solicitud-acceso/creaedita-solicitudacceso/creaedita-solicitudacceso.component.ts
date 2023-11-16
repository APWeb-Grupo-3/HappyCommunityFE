import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Condominio } from 'src/app/models/condominio';
import { SolicitudAcceso } from 'src/app/models/solicitudacceso';
import { Usuario } from 'src/app/models/usuario';
import { CondominioService } from 'src/app/services/condominio.service';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudaccesoService } from 'src/app/services/solicitudacceso.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-creaedita-solicitudacceso',
  templateUrl: './creaedita-solicitudacceso.component.html',
  styleUrls: ['./creaedita-solicitudacceso.component.css']
})
export class CreaeditaSolicitudaccesoComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  solicitudacceso: SolicitudAcceso = new SolicitudAcceso();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listarcondominios: Condominio[] = [];
  listausuario: Usuario[] =[];
  estados: { value: string; viewValue: string }[] = [
    { value: 'Aprobado', viewValue: 'Aprobado' },
    { value: 'Rechazado', viewValue: 'Rechazado' },
  ];

  constructor(
    private loginService: LoginService,
    private cS: CondominioService,
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sS: SolicitudaccesoService,
    private matDialog: MatDialog,

  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idSolicitudAcceso: [''],
      estado: [''],
      usuario: ['', Validators.required],
      condominio: ['', Validators.required],
    });
    this.cS.list().subscribe((data) => {
      this.listarcondominios = data;
    });
    this.uS.list().subscribe((data) => {
      this.listausuario = data;
    });

    
  }

  aceptar(): void {
    if (this.form.valid) {
      this.solicitudacceso.idSolicitudAcceso = this.form.value.idSolicitudAcceso;
      this.solicitudacceso.estado = this.form.value.estado;
      this.solicitudacceso.usuario.idUsuario = this.form.value.usuario;
      this.solicitudacceso.condominio.idCondominio = this.form.value.condominio;

      if (this.edicion) {
        this.sS.update(this.solicitudacceso).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      } else {
        this.sS.insert(this.solicitudacceso).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }
      //this.dialogRef.close(); 
      this.router.navigate(['components/solicitudacceso']);
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
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idSolicitudAcceso: new FormControl(data.idSolicitudAcceso),
          estado: new FormControl(data.estado),
          usuario: new FormControl(data.usuario.idUsuario),
          condominio: new FormControl(data.condominio.idCondominio),

        });
      });
    }
  }
  
  cancelar() {
    

    // Verifica si estás en la página principal o en la ruta de edición
    if (this.router.url === '/components/solicitudacceso/nuevo' || this.router.url.startsWith('/components/solicitudacceso/edicion/')) {
      // Redirige a la página de edición
    this.router.navigate(['/components/solicitudacceso']); // Reemplaza 'ruta_de_edicion' con la ruta correcta
  } else {

   this.matDialog.closeAll(); // Cierra el diálogo
  }
  }

  role: string = '';

  

  vecino() {
    this.role = this.loginService.showRole();
    if (this.role === 'VECINO') {
      return true;
    } else {
      return false;
    }
  }
  
}
