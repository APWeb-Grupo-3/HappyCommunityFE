import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Mensaje } from 'src/app/models/mensaje';
import { MensajeService } from 'src/app/services/mensaje.service';
import { CreaeditaMensajeComponent } from '../creaedita-mensaje/creaedita-mensaje.component';

@Component({
  selector: 'app-listar-mensaje',
  templateUrl: './listar-mensaje.component.html',
  styleUrls: ['./listar-mensaje.component.css']
})
export class ListarMensajeComponent {
  mensajes: Mensaje[]=[];

  constructor(private mS: MensajeService,private matDialog:MatDialog) {}

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {      
      this.mensajes=data;
    });
    this.mS.getList().subscribe((data) => {
      this.mensajes=data;
    });
  }
  eliminar(id: number) {
    this.mS.delete(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
      });
    });
  }
  openDialog(){
    this.matDialog.open(CreaeditaMensajeComponent)
  }

}
