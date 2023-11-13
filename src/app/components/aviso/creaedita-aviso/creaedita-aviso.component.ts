import { CondominioService } from './../../../services/condominio.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Aviso } from 'src/app/models/aviso';
import { Condominio } from 'src/app/models/condominio';
import { Usuario } from 'src/app/models/usuario';
import { AvisoService } from 'src/app/services/aviso.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-creaedita-aviso',
  templateUrl: './creaedita-aviso.component.html',
  styleUrls: ['./creaedita-aviso.component.css']
})
export class CreaeditaAvisoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  aviso: Aviso = new Aviso();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listarUsuarios: Usuario[]=[]; 
  listarcondominios: Condominio[] = [];

  constructor(
    private uS: UsuarioService,
    private cS: CondominioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private aS: AvisoService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idAviso: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaPublicacion: ['', Validators.required],
      usuario: ['', Validators.required],
      condominio: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listarUsuarios = data;
    });
    this.cS.list().subscribe((data) => {
      this.listarcondominios = data;
    });
    
  }

  aceptar(): void {
    if (this.form.valid) {
      this.aviso.idAviso = this.form.value.idAviso;
      this.aviso.titulo = this.form.value.titulo;
      this.aviso.descripcion = this.form.value.descripcion;
      this.aviso.fechaPublicacion = this.form.value.fechaPublicacion;
      this.aviso.usuario.idUsuario = this.form.value.usuario;
      this.aviso.condominio.idCondominio = this.form.value.condominio; 


      if (this.edicion) {
        this.aS.update(this.aviso).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.aviso).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      //this.dialogRef.close();
      this.router.navigate(['aviso']);
    } else {
      this.mensaje = 'Por favor complete los campos obligatorios';
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
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idAviso: new FormControl(data.idAviso),
          titulo: new FormControl(data.titulo),
          descripcion: new FormControl(data.descripcion),
          fechaPublicacion: new FormControl(data.fechaPublicacion),
          usuario: new FormControl(data.usuario.idUsuario),
          condominio: new FormControl(data.condominio.idCondominio),
        });
      });
    }
  }

  cancelar() {
    

    // Verifica si estás en la página principal o en la ruta de edición
    if (this.router.url === '/components/condominios/nuevo' || this.router.url.startsWith('/components/condominios/edicion/')) {
      // Redirige a la página de edición
    this.router.navigate(['components/condominios']); // Reemplaza 'ruta_de_edicion' con la ruta correcta
  } else {

   this.matDialog.closeAll(); // Cierra el diálogo
  }
  }








}
