import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanConvivencia } from 'src/app/models/planconvivencia';
import { PlanconvivenciaService } from 'src/app/services/planconvivencia.service';
import { CreaeditaPlanconvivenciaComponent } from '../creaedita-planconvivencia/creaedita-planconvivencia.component';

@Component({
  selector: 'app-listar-planconvivencia',
  templateUrl: './listar-planconvivencia.component.html',
  styleUrls: ['./listar-planconvivencia.component.css']
})
export class ListarPlanconvivenciaComponent  implements OnInit{

  planconvivencia: PlanConvivencia[]=[];

  constructor(private pS: PlanconvivenciaService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.planconvivencia = data;
    });
    this.pS.getList().subscribe((data) => {
      this.planconvivencia = data;
    });
    
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }

  openDialog() {
    this.matDialog.open(CreaeditaPlanconvivenciaComponent);
  }
  editar(id: number,edicion:boolean){
    this.matDialog.open(CreaeditaPlanconvivenciaComponent, {
      data: { id: id, 
      edicion:edicion},
    });
  }
}
