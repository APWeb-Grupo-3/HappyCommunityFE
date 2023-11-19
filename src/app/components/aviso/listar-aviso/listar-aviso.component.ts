import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Aviso } from 'src/app/models/aviso';
import { AvisoService } from 'src/app/services/aviso.service';
import { CreaeditaAvisoComponent } from '../creaedita-aviso/creaedita-aviso.component';

@Component({
  selector: 'app-listar-aviso',
  templateUrl: './listar-aviso.component.html',
  styleUrls: ['./listar-aviso.component.css']
})
export class ListarAvisoComponent {
  avisos: Aviso[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private aS: AvisoService,private matDialog:MatDialog) {}
  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.avisos=data;
    });
    
  }
  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      });
    });
  }
  openDialog(){
    this.matDialog.open(CreaeditaAvisoComponent)
  }
  editar(id: number,edicion:boolean){
    this.matDialog.open(CreaeditaAvisoComponent, {
      data: { id: id, 
      edicion:edicion},
    });
  }
}
