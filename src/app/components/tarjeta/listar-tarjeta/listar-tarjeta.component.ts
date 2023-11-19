import { CreaeditaTarjetaComponent } from './../creaedita-tarjeta/creaedita-tarjeta.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tarjeta } from 'src/app/models/tarjeta';
import { LoginService } from 'src/app/services/login.service';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit{
  tarjeta: Tarjeta[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private tS: TarjetaService,private matDialog:MatDialog,
    private lS:LoginService) {}
  ngOnInit(): void {

    this.tS.listTR(this.lS.showUsername()).subscribe((data) => {
      this.tarjeta=data;
    });
  }
  nuevobtn() {
    //refresca la página
    location.reload();
  }
  eliminar(id: number) {
    this.tS.delete(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
        this.nuevobtn();
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
