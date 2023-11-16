import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Condominio } from 'src/app/models/condominio';
import { CondominioService } from 'src/app/services/condominio.service';

@Component({
  selector: 'app-condomino-detalles',
  templateUrl: './condomino-detalles.component.html',
  styleUrls: ['./condomino-detalles.component.css']
})
export class CondominoDetallesComponent implements  OnInit{
  constructor(public route: ActivatedRoute,
    private cS: CondominioService,
    private formBuilder: FormBuilder,

    ) {
    
  }

  //navegacion por taps

  public selectedContent: string | null = null;
 
  showContent(content: string): void {
    this.selectedContent = content;
  }
////

form: FormGroup = new FormGroup({});
condominio: Condominio = new Condominio();
id: number = 0;
seleccion: boolean = false;

ngOnInit(): void {
  this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.seleccion = data['id'] != null;
    this.init();
  });

  this.form = this.formBuilder.group({
    idCondominio: [''],
    nombre: [''],
    departamento: [''],
    distrito: [''],
    direccion: [''],
  });
}

init() {
  if (this.seleccion) {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        idCondominio: data.idCondominio,
        nombre: data.nombre,
        departamento: data.departamento,
        distrito: data.distrito,
        direccion: data.direccion,
      });
    });
  }
}
}


