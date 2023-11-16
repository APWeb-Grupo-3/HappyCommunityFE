import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CreaeditaUsuarioComponent } from '../creaedita-usuario/creaedita-usuario.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'username',
    'rol',
    'correo',
    'genero',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private lS:LoginService,private uS:UsuarioService,private matDialog:MatDialog){}
  ngOnInit(): void {
    this.uS.listUser(this.lS.showUsername()).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    
  }
  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
  editar(id: number,edicion:boolean){
    this.matDialog.open(CreaeditaUsuarioComponent, {
      data: { id: id, 
      edicion:edicion},
    });
  }
}
