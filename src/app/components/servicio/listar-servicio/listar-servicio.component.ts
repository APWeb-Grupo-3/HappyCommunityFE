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
  dataSource: MatTableDataSource<Servicio> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'descripcion',
    'tipo',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private seS: ServicioService, private matDialog:MatDialog) {}
  ngOnInit(): void {
    this.seS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.seS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.seS.delete(id).subscribe((data) => {
      this.seS.list().subscribe((data) => {
        this.seS.setList(data);
      });
    });
  }
  openDialog(){
    this.matDialog.open(CreaeditaServicioComponent)
  }
}
