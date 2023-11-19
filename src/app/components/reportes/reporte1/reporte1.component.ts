import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Reporte1DTO } from 'src/app/models/Reporte1DTO';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as XLSX from 'xlsx';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.css']
})
export class Reporte1Component implements OnInit{
  dataSource: MatTableDataSource<Reporte1DTO> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'apellidos',
    'nombres',
    'nombreUsuario'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private uS: UsuarioService,
    private lS:LoginService) {}
  ngOnInit(): void {
    this.uS.getReport1(this.lS.showUsername()).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  fileName="ExcelSheet.xlsx";
  exportarExcel(){
    let data=document.getElementById("table-data");
    const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(data)

    const wb:XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1')

    XLSX.writeFile(wb,this.fileName)
  }
}
