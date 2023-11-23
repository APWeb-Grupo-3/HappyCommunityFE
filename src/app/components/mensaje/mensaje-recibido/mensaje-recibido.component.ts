import { MatPaginator } from '@angular/material/paginator';
import { Component, ViewChild } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-mensaje-recibido',
  templateUrl: './mensaje-recibido.component.html',
  styleUrls: ['./mensaje-recibido.component.css']
})
export class MensajeRecibidoComponent {
  mensajes: Mensaje[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS: MensajeService,
    private lS:LoginService) {}

  ngOnInit(): void {
    this.mS.listMR(this.lS.showUsername()).subscribe((data) => {      
      this.mensajes=data;
      
    });
    
  }
  nuevobtn() {
    //refresca la página
    location.reload();
  }
}
