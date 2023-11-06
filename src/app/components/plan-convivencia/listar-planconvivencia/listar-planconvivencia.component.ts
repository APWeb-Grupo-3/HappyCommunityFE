import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PlanConvivencia } from 'src/app/models/planconvivencia';
import { PlanconvivenciaService } from 'src/app/services/planconvivencia.service';
import { CreaeditaPlanconvivenciaComponent } from '../creaedita-planconvivencia/creaedita-planconvivencia.component';

@Component({
  selector: 'app-listar-planconvivencia',
  templateUrl: './listar-planconvivencia.component.html',
  styleUrls: ['./listar-planconvivencia.component.css']
})
export class ListarPlanconvivenciaComponent  {
  dataSource: MatTableDataSource<PlanConvivencia> = new MatTableDataSource();

  displayedColumns: string[] = [
    'codigo',
    'titulo',
    'descripcion',
    'condominio',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private pS: PlanconvivenciaService,private matDialog:MatDialog) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
  openDialog(){
    this.matDialog.open(CreaeditaPlanconvivenciaComponent)
  }

  
  
}
