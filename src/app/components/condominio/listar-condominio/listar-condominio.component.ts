import { Component, OnInit } from '@angular/core';
import { Condominio } from 'src/app/models/condominio';
import { CondominioService } from 'src/app/services/condominio.service';
import { MatDialog } from '@angular/material/dialog';
import { CreaeditaComponent } from '../creaedita/creaedita.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-condominio',
  templateUrl: './listar-condominio.component.html',
  styleUrls: ['./listar-condominio.component.css'],
})
export class ListarCondominioComponent implements OnInit {
  condominios: Condominio[] = [];

  constructor(
    private cS: CondominioService,
    private matDialog: MatDialog,
    private lS: LoginService
  ) {}

  ngOnInit(): void {
    if (this.lS.showRole() == 'ADMINISTRADOR') {
      this.cS.listCAR(this.lS.showUsername()).subscribe((data) => {
        this.condominios = data;
      });
    } else if (this.lS.showRole() == 'VECINO') {
      this.cS.listCVA(this.lS.showUsername()).subscribe((data)=>{
        this.condominios=data;
      })
    }
  }
  nuevobtn() {
    //refresca la página
    location.reload();
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
        this.nuevobtn();
      });
    });
  }

  openDialog() {
    this.matDialog.open(CreaeditaComponent);
  }
  editar(id: number, edicion: boolean) {
    this.matDialog.open(CreaeditaComponent, {
      data: { id: id, edicion: edicion },
    });
  }
}
