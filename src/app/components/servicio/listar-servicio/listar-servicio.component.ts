import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { CreaeditaServicioComponent } from '../creaedita-servicio/creaedita-servicio.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-servicio',
  templateUrl: './listar-servicio.component.html',
  styleUrls: ['./listar-servicio.component.css']
})
export class ListarServicioComponent  implements OnInit{
  servcicios: Servicio[] = [];


  constructor(private S: ServicioService, private matDialog: MatDialog,
    private uS:UsuarioService,
    private lS:LoginService) {}

  ngOnInit(): void {
    this.S.listSA(this.lS.showUsername()).subscribe((data) => {
      this.servcicios = data;
    });
    
  }
  nuevobtn() {
    //refresca la página
    location.reload();
  }
  eliminar(id: number) {
    this.S.delete(id).subscribe((data) => {
      this.S.list().subscribe((data) => {
        this.S.setList(data);
        this.nuevobtn();
      });
    });
  }

  openDialog() {
    this.matDialog.open(CreaeditaServicioComponent);
  }

  editar(id: number,edicion:boolean){
    this.matDialog.open(CreaeditaServicioComponent, {
      data: { id: id, 
      edicion:edicion},
    });
  }



}
