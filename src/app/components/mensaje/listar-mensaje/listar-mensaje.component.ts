import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Mensaje } from 'src/app/models/mensaje';
import { MensajeService } from 'src/app/services/mensaje.service';
import { CreaeditaMensajeComponent } from '../creaedita-mensaje/creaedita-mensaje.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-mensaje',
  templateUrl: './listar-mensaje.component.html',
  styleUrls: ['./listar-mensaje.component.css']
})
export class ListarMensajeComponent {
  mensajes: Mensaje[]=[];

  constructor(private mS: MensajeService,private matDialog:MatDialog,
    private lS:LoginService) {}

  ngOnInit(): void {
    this.mS.listME(this.lS.showUsername()).subscribe((data) => {      
      this.mensajes=data;
    });

  }
  nuevobtn() {
    //refresca la página
    location.reload();
  }
  eliminar(id: number) {
    this.mS.delete(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
        this.nuevobtn();
      });
    });
  }
  openDialog(){
    this.matDialog.open(CreaeditaMensajeComponent)
  }
  editar(id: number,edicion:boolean){
    this.matDialog.open(CreaeditaMensajeComponent, {
      data: { id: id, 
      edicion:edicion},
    });
  }
  
}
