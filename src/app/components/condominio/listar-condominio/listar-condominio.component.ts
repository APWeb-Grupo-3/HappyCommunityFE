import { Component, OnInit, ViewChild } from '@angular/core';
import { Condominio } from 'src/app/models/condominio';
import { CondominioService } from 'src/app/services/condominio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-condominio',
  templateUrl: './listar-condominio.component.html',
  styleUrls: ['./listar-condominio.component.css']
})
export class ListarCondominioComponent implements OnInit{
  dataSource: MatTableDataSource<Condominio> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'departamento',
    'distrito',
    'direccion',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: CondominioService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
  

}
