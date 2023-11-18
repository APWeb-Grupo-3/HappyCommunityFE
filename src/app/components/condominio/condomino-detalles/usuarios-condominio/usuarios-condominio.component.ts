import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RolUsuario } from 'src/app/models/rolusuario';
import { RolusuarioService } from 'src/app/services/rolusuario.service';

@Component({
  selector: 'app-usuarios-condominio',
  templateUrl: './usuarios-condominio.component.html',
  styleUrls: ['./usuarios-condominio.component.css']
})
export class UsuariosCondominioComponent implements OnInit{
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  id:number=0
  displayedColumns: string[] = [
    'codigo',
    'username',
    'rol',
    'nombres',
    'apellidos',
    'correo',
    'genero',
    'edad',
    'telefono'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private uS: UsuarioService,
    private lS:LoginService,
    private route:ActivatedRoute,
    ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.uS.listUserC(this.id).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      });
    });

    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

  }
}
