import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentoPago } from 'src/app/models/documentopago';
import { DocumentopagoService } from 'src/app/services/documentopago.service';
import { CreaeditaDocumentopagoComponent } from '../creaedita-documentopago/creaedita-documentopago.component';
import { LoginService } from 'src/app/services/login.service';
import { NumberValueAccessor } from '@angular/forms';
import { DetalleComponent } from '../../detalle/detalle.component';
import { DetalleDialogComponent } from '../detalle-dialog/detalle-dialog.component';
import { ListarDetalleComponent } from '../../detalle/listar-detalle/listar-detalle.component';

@Component({
  selector: 'app-listar-documentopago',
  templateUrl: './listar-documentopago.component.html',
  styleUrls: ['./listar-documentopago.component.css'],
})
export class ListarDocumentopagoComponent implements OnInit {
  dataSource: MatTableDataSource<DocumentoPago> = new MatTableDataSource();
  role:string=""

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
    'accion03',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private dS: DocumentopagoService,
    private matDialog: MatDialog,
    private lS: LoginService
  ) {}
  ngOnInit(): void {
    if (this.lS.showRole() == 'ADMINISTRADOR') {
      this.dS.listDAR(this.lS.showUsername()).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    } else if (this.lS.showRole() == 'VECINO') {
      this.dS.listDRE(this.lS.showUsername()).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  nuevobtn() {
    //refresca la página
    location.reload();
  }
  eliminar(id: number) {
    this.dS.delete(id).subscribe((data) => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
        this.nuevobtn();
      });
    });
  }
  openDialog() {
    this.matDialog.open(CreaeditaDocumentopagoComponent);
  }
  editar(id: number, edicion: boolean) {
    this.matDialog.open(CreaeditaDocumentopagoComponent, {
      data: { id: id, edicion: edicion },
    });
  }
  openDialogDetalle(id: number) {
    this.matDialog.open(DetalleDialogComponent, {
      data: { id: id },
    });
  }
  admin() {
    this.role = this.lS.showRole();
    if (this.role === 'ADMINISTRADOR') {
      return true;
    } else {
      return false;
    }
  }
}
