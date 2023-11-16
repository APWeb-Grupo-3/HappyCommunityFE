import { Component, OnInit } from '@angular/core';
import { Condominio } from 'src/app/models/condominio';
import { CondominioService } from 'src/app/services/condominio.service';
import { MatDialog } from '@angular/material/dialog';
import { CreaeditaComponent } from '../creaedita/creaedita.component';

@Component({
  selector: 'app-listar-condominio',
  templateUrl: './listar-condominio.component.html',
  styleUrls: ['./listar-condominio.component.css'],
})
export class ListarCondominioComponent implements OnInit {
  condominios: Condominio[] = [];

  constructor(private cS: CondominioService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.condominios = data;
    });
    this.cS.getList().subscribe((data) => {
      this.condominios = data;
    });
    
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }

  openDialog() {
    this.matDialog.open(CreaeditaComponent);
  }
  editar(id: number,edicion:boolean){
    this.matDialog.open(CreaeditaComponent, {
      data: { id: id, 
      edicion:edicion},
    });
  }
}
