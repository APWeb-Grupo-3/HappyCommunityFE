import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RolUsuario } from 'src/app/models/rolusuario';
import { RolusuarioService } from 'src/app/services/rolusuario.service';
import { CreaeditaRolusuarioComponent } from '../creaedita-rolusuario/creaedita-rolusuario.component';

@Component({
  selector: 'app-listar-rolusuario',
  templateUrl: './listar-rolusuario.component.html',
  styleUrls: ['./listar-rolusuario.component.css']
})
export class ListarRolusuarioComponent implements OnInit{
  dataSource: MatTableDataSource<RolUsuario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'rol',
    'descripcion',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private rS: RolusuarioService, private matDialog:MatDialog) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
  openDialog(){
    this.matDialog.open(CreaeditaRolusuarioComponent)
  }

}
