import { Component, OnInit, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Condominio } from 'src/app/models/condominio';
import { PlanConvivencia } from 'src/app/models/planconvivencia';
import { CondominioService } from 'src/app/services/condominio.service';
import { PlanconvivenciaService } from 'src/app/services/planconvivencia.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-creaedita-planconvivencia',
  templateUrl: './creaedita-planconvivencia.component.html',
  styleUrls: ['./creaedita-planconvivencia.component.css'],
})
export class CreaeditaPlanconvivenciaComponent implements OnInit {
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
    private lS: LoginService,

    private dialogRef: MatDialogRef<CreaeditaPlanconvivenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; edicion: boolean }
  ) {}
  ngOnInit(): void {
    if (this.data && this.data.id && this.data.edicion) {
      this.edicion = this.data.edicion;
      this.id = this.data.id;
      this.init();
    }

    this.form = this.formBuilder.group({
      idPlanConvivencia: [''],
      condominio: ['', Validators.required],
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
    });
    if (this.lS.showRole() == 'ADMINISTRADOR') {
      this.cS.listCAR(this.lS.showUsername()).subscribe((data) => {
        this.listarcondominios = data;
      });
    } else if (this.lS.showRole() == 'VECINO') {
      this.cS.listCVA(this.lS.showUsername()).subscribe((data) => {
        this.listarcondominios = data;
      });
    }
  }
  nuevobtn() {
    //refresca la página
    location.reload();
  }
  aceptar(): void {
    if (this.form.valid) {
      this.planconvivencia.idPlanConvivencia =
        this.form.value.idPlanConvivencia;
      this.planconvivencia.titulo = this.form.value.titulo;
      this.planconvivencia.descripcion = this.form.value.descripcion;
      this.planconvivencia.condominio.idCondominio = this.form.value.condominio;

      if (this.edicion) {
        this.pS.update(this.planconvivencia).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
            this.dialogRef.close();
            this.nuevobtn();
          });
        });
      } else {
        this.pS.insert(this.planconvivencia).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
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
      this.pS.listId(this.data.id).subscribe((data) => {
        this.form.patchValue({
          idPlanConvivencia: data.idPlanConvivencia,
          titulo: data.titulo,
          descripcion: data.descripcion,
          condominio: data.condominio.idCondominio,
        });
      });
    }
  }
}
