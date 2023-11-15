import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { CreaeditaServicioComponent } from '../creaedita-servicio/creaedita-servicio.component';

@Component({
  selector: 'app-listar-servicio',
  templateUrl: './listar-servicio.component.html',
  styleUrls: ['./listar-servicio.component.css']
})
export class ListarServicioComponent  implements OnInit{
  servcicios: Servicio[] = [];

  constructor(private S: ServicioService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.S.list().subscribe((data) => {
      this.servcicios = data;
    });
    this.S.getList().subscribe((data) => {
      this.servcicios = data;
    });

  }

  eliminar(id: number) {
    this.S.delete(id).subscribe((data) => {
      this.S.list().subscribe((data) => {
        this.S.setList(data);
      });
    });
  }

  openDialog() {
    this.matDialog.open(CreaeditaServicioComponent);
  }





}
