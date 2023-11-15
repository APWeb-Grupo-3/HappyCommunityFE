import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio';
import { TipoServicio } from 'src/app/models/tiposervicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { TiposervicioService } from 'src/app/services/tiposervicio.service';
import { MatDialog } from '@angular/material/dialog';

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
    private matDialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
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
          });
        });
      } else {
        this.sS.insert(this.servicio).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }
      this.router.navigate(['Servicio']);
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
          idServicio: new FormControl(data.idServicio),
          descripcionServicio: new FormControl(data.descripcionServicio),
          tipoServicio: new FormControl(data.tipoServicio.idTipoServicio),
        });
      });
    }
  }


  cancelar() {


    // Verifica si estás en la página principal o en la ruta de edición
    if (this.router.url === '/components/Servicio/nuevo' || this.router.url.startsWith('/components/Servicio/edicion/')) {
      // Redirige a la página de edición
    this.router.navigate(['/components/Servicio']); // Reemplaza 'ruta_de_edicion' con la ruta correcta
  } else {

   this.matDialog.closeAll(); // Cierra el diálogo
  }
  }




}
