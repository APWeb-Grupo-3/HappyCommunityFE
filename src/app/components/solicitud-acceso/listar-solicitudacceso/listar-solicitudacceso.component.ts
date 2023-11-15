import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudAcceso } from 'src/app/models/solicitudacceso';
import { SolicitudaccesoService } from 'src/app/services/solicitudacceso.service';
import { CreaeditaSolicitudaccesoComponent } from '../creaedita-solicitudacceso/creaedita-solicitudacceso.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-solicitudacceso',
  templateUrl: './listar-solicitudacceso.component.html',
  styleUrls: ['./listar-solicitudacceso.component.css'],
})
export class ListarSolicitudaccesoComponent {
  dataSource: MatTableDataSource<SolicitudAcceso> = new MatTableDataSource();

  displayedColumns: string[] = [
    'codigo',
    'estado',
    'usuario',
    'condominio',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private loginService: LoginService,
    private sS: SolicitudaccesoService,
    private matDialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
  openDialog() {
    const dialogRef = this.matDialog.open(CreaeditaSolicitudaccesoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      // Lógica a realizar después de cerrar el diálogo
      console.log('Dialog result:', result);
    });
  }
  role: string = '';

  

  vecino() {
    this.role = this.loginService.showRole();
    if (this.role === 'VECINO') {
      return true;
    } else {
      return false;
    }
  }
  
}
