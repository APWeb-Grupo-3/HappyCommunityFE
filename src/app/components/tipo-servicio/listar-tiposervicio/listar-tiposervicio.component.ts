import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoServicio } from 'src/app/models/tiposervicio';
import { TiposervicioService } from 'src/app/services/tiposervicio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreaeditaTiposervicioComponent } from '../creaedita-tiposervicio/creaedita-tiposervicio.component';
import { RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-listar-tiposervicio',
  templateUrl: './listar-tiposervicio.component.html',
  styleUrls: ['./listar-tiposervicio.component.css']
})
export class ListarTiposervicioComponent implements OnInit{
  dataSource: MatTableDataSource<TipoServicio> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: TiposervicioService,private matDialog:MatDialog,
    private lS:LoginService) {}
  ngOnInit(): void {
    this.cS.listTSA(this.lS.showUsername()).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  nuevobtn() {
    //refresca la página
    location.reload();
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
        this.nuevobtn();

      });
    });
  }
  openDialog(){
    this.matDialog.open(CreaeditaTiposervicioComponent)
  }
  editar(id: number,edicion:boolean){
    this.matDialog.open(CreaeditaTiposervicioComponent, {
      data: { id: id, 
      edicion:edicion},
    });
  }
}
