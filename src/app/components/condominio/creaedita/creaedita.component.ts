import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Condominio } from 'src/app/models/condominio';
import { CondominioService } from 'src/app/services/condominio.service';

@Component({
  selector: 'app-creaedita',
  templateUrl: './creaedita.component.html',
  styleUrls: ['./creaedita.component.css']
})
export class CreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  condominio: Condominio= new Condominio;
  mensaje: string= '';
  id: number = 0;
  edicion: boolean = false;

  distritos: { value: string; viewValue: string }[] = [
    { value: 'Ancón', viewValue: 'Ancón' },
    { value: 'Ate', viewValue: 'Ate' },
    { value: 'Barranco', viewValue: 'Barranco' },
    { value: 'Breña', viewValue: 'Breña' },
    { value: 'Carabayllo', viewValue: 'Carabayllo' },
    { value: 'Chaclacayo', viewValue: 'Chaclacayo' },
    { value: 'Chorrillos', viewValue: 'Chorrillos' },
    { value: 'Cieneguilla', viewValue: 'Cieneguilla' },
    { value: 'Comas', viewValue: 'Comas' },
    { value: 'El Agustino', viewValue: 'El Agustino' },
    { value: 'Independencia', viewValue: 'Independencia' },
    { value: 'Jesús María', viewValue: 'Jesús María' },
    { value: 'La Molina', viewValue: 'La Molina' },
    { value: 'La Victoria', viewValue: 'La Victoria' },
    { value: 'Lince', viewValue: 'Lince' },
    { value: 'Los Olivos', viewValue: 'Los Olivos' },
    { value: 'Lurigancho-Chosica', viewValue: 'Lurigancho-Chosica' },
    { value: 'Lurín', viewValue: 'Lurín' },
    { value: 'Magdalena del Mar', viewValue: 'Magdalena del Mar' },
    { value: 'Pueblo Libre', viewValue: 'Pueblo Libre' },
    { value: 'Miraflores', viewValue: 'Miraflores' },
    { value: 'Pachacamac', viewValue: 'Pachacamac' },
    { value: 'Pucusana', viewValue: 'Pucusana' },
    { value: 'Puente Piedra', viewValue: 'Puente Piedra' },
    { value: 'Punta Hermosa', viewValue: 'Punta Hermosa' },
    { value: 'Punta Negra', viewValue: 'Punta Negra' },
    { value: 'Rímac', viewValue: 'Rímac' },
    { value: 'San Bartolo', viewValue: 'San Bartolo' },
    { value: 'San Borja', viewValue: 'San Borja' },
    { value: 'San Isidro', viewValue: 'San Isidro' },
    { value: 'San Juan de Lurigancho', viewValue: 'San Juan de Lurigancho' },
    { value: 'San Juan de Miraflores', viewValue: 'San Juan de Miraflores' },
    { value: 'San Luis', viewValue: 'San Luis' },
    { value: 'San Martín de Porres', viewValue: 'San Martín de Porres' },
    { value: 'San Miguel', viewValue: 'San Miguel' },
    { value: 'Santa Anita', viewValue: 'Santa Anita' },
    { value: 'Santa María del Mar', viewValue: 'Santa María del Mar' },
    { value: 'Santa Rosa', viewValue: 'Santa Rosa' },
    { value: 'Santiago de Surco', viewValue: 'Santiago de Surco' },
    { value: 'Surquillo', viewValue: 'Surquillo' },
    { value: 'Villa El Salvador', viewValue: 'Villa El Salvador' },
    { value: 'Villa María del Triunfo', viewValue: 'Villa María del Triunfo' },
  ];
  
  constructor(
    private cS: CondominioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private matDialog: MatDialog,

  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idCondominio: [''],
      nombre: ['', (Validators.required, Validators.maxLength(20))],
      departamento: ['',  (Validators.required, Validators.maxLength(20))],
      distrito: ['',  (Validators.required, Validators.maxLength(20))],
      direccion: ['',  (Validators.required, Validators.maxLength(100))],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.condominio.idCondominio = this.form.value.idCondominio;
      this.condominio.nombre = this.form.value.nombre;
      this.condominio.departamento = this.form.value.departamento;
      this.condominio.distrito = this.form.value.distrito;
      this.condominio.direccion = this.form.value.direccion;
      if (this.edicion) {
        this.cS.update(this.condominio).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.condominio).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/condominios']);
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
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idCondominio: new FormControl(data.idCondominio),
          nombre: new FormControl(data.nombre),
          departamento: new FormControl(data.departamento),
          distrito: new FormControl(data.distrito),
          direccion: new FormControl(data.direccion),
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
