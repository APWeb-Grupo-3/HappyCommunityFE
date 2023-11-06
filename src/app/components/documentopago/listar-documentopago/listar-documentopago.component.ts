import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentoPago } from 'src/app/models/documentopago';
import { DocumentopagoService } from 'src/app/services/documentopago.service';
import { CreaeditaDocumentopagoComponent } from '../creaedita-documentopago/creaedita-documentopago.component';

@Component({
  selector: 'app-listar-documentopago',
  templateUrl: './listar-documentopago.component.html',
  styleUrls: ['./listar-documentopago.component.css']
})
export class ListarDocumentopagoComponent implements OnInit{
  dataSource: MatTableDataSource<DocumentoPago> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'receptor',
    'emision',
    'vencimiento',
    'moneda',
    'total',
    'estado',
    'usuario',
    'tipoDocPago',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dS: DocumentopagoService,private matDialog:MatDialog) {}
  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.dS.delete(id).subscribe((data) => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }
  openDialog(){
    this.matDialog.open(CreaeditaDocumentopagoComponent)
  }
}