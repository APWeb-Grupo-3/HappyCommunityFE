import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoDocPago } from 'src/app/models/tipodocpago';
import { TipodocpagoService } from 'src/app/services/tipodocpago.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreaditaTDPComponent } from '../creadita-tdp/creadita-tdp.component';

@Component({
  selector: 'app-listar-tdp',
  templateUrl: './listar-tdp.component.html',
  styleUrls: ['./listar-tdp.component.css']
})
export class ListarTDPComponent implements OnInit{
  dataSource: MatTableDataSource<TipoDocPago> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: TipodocpagoService,private matDialog:MatDialog) {}
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
  openDialog(){
    this.matDialog.open(CreaditaTDPComponent)
  }
  editar(id: number,edicion:boolean){
    this.matDialog.open(CreaditaTDPComponent, {
      data: { id: id, 
      edicion:edicion},
    });
  }
}
