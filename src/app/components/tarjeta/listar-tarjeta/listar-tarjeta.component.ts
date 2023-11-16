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
  tarjeta: Tarjeta[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private tS: TarjetaService,private matDialog:MatDialog) {}
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.tarjeta=data;
    });
    this.tS.getList().subscribe((data) => {
      this.tarjeta=data;
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

  editar(id: number,edicion:boolean){
    this.matDialog.open(CreaeditaTarjetaComponent, {
      data: { id: id, 
      edicion:edicion},
    });
  }



}
