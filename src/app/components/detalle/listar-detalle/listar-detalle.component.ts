import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Detalle } from 'src/app/models/detalle';
import { DetalleService } from 'src/app/services/detalle.service';
import { CreaeditaDetalleComponent } from '../creaedita-detalle/creaedita-detalle.component';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-detalle',
  templateUrl: './listar-detalle.component.html',
  styleUrls: ['./listar-detalle.component.css']
})
export class ListarDetalleComponent implements OnInit{
  dataSource: MatTableDataSource<Detalle> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'subtotal',
    'documentopago',
    'servicio',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dS: DetalleService, private matDialog:MatDialog,private route:ActivatedRoute,
    private lS:LoginService) {}
  ngOnInit(): void {

    this.dS.listDAR(this.lS.showUsername()).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    
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
  openDialog(){
    this.matDialog.open(CreaeditaDetalleComponent)
  }
  editar(id: number,edicion:boolean){
    this.matDialog.open(CreaeditaDetalleComponent, {
      data: { id: id, 
      edicion:edicion},
    });
  }
  
}
