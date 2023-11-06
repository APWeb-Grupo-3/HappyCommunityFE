import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Condominio } from 'src/app/models/condominio';
import { PlanConvivencia } from 'src/app/models/planconvivencia';
import { CondominioService } from 'src/app/services/condominio.service';
import { PlanconvivenciaService } from 'src/app/services/planconvivencia.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-creaedita-planconvivencia',
  templateUrl: './creaedita-planconvivencia.component.html',
  styleUrls: ['./creaedita-planconvivencia.component.css'],
})
export class CreaeditaPlanconvivenciaComponent implements OnInit  {
  form: FormGroup = new FormGroup({});

  planconvivencia: PlanConvivencia = new PlanConvivencia();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listarcondominios: Condominio[] = [];


  constructor(
    private cS: CondominioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pS: PlanconvivenciaService,
    private matDialog: MatDialog,

  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idPlanConvivencia: [''],
      condominio: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.cS.list().subscribe((data) => {
      this.listarcondominios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.planconvivencia.idPlanConvivencia = this.form.value.idPlanConvivencia;
      this.planconvivencia.titulo = this.form.value.titulo;
      this.planconvivencia.descripcion = this.form.value.descripcion;
      this.planconvivencia.condominio.idCondominio = this.form.value.condominio;

      if (this.edicion) {
        this.pS.update(this.planconvivencia).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.planconvivencia).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      //this.dialogRef.close(); 
      this.router.navigate(['planconvivencia']);
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
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idPlanConvivencia: new FormControl(data.idPlanConvivencia),
          titulo: new FormControl(data.titulo),
          descripcion: new FormControl(data.descripcion),
          condominio: new FormControl(data.condominio.idCondominio),

        });
      });
    }
  }
  cancelar() {
    

    // Verifica si estás en la página principal o en la ruta de edición
    if (this.router.url === '/planconvivencia/nuevo' || this.router.url.startsWith('/planconvivencia/edicion/')) {
      // Redirige a la página de edición
    this.router.navigate(['/planconvivencia']); // Reemplaza 'ruta_de_edicion' con la ruta correcta
  } else {

   this.matDialog.closeAll(); // Cierra el diálogo
  }
  }
  
}
