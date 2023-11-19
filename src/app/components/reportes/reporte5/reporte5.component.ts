import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Reporte3DTO } from 'src/app/models/Reporte3DTO';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte5',
  templateUrl: './reporte5.component.html',
  styleUrls: ['./reporte5.component.css']
})
export class Reporte5Component implements OnInit{
  dataSource: MatTableDataSource<Reporte3DTO> = new MatTableDataSource();
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
    this.uS.getReport3(this.lS.showUsername()).subscribe((data) => {
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
