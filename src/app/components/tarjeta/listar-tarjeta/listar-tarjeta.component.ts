import { CreaeditaTarjetaComponent } from './../creaedita-tarjeta/creaedita-tarjeta.component';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tarjeta } from 'src/app/models/tarjeta';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent {
  dataSource: MatTableDataSource<Tarjeta> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'tipoTarjeta',
    'numeroTarjeta',
    'fechaVencimiento',
    'codigoSeguridad',
    'usuario',
    'accion01',
    'accion02',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private tS: TarjetaService,private matDialog:MatDialog) {}
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.tS.delete(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
  }
  openDialog(){
    this.matDialog.open(CreaeditaTarjetaComponent)
  }





}
