import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Aviso } from 'src/app/models/aviso';
import { AvisoService } from 'src/app/services/aviso.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-avisos-condominio',
  templateUrl: './avisos-condominio.component.html',
  styleUrls: ['./avisos-condominio.component.css']
})
export class AvisosCondominioComponent implements OnInit{
  avisos: Aviso[]=[];
  id:number=0

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private aS: AvisoService,private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.aS.listAvisosByCondominio(this.id).subscribe((data) => {
        this.avisos=data;
      });
    });
    
    this.aS.getList().subscribe((data) => {
      this.avisos=data;
    });
  }
}
