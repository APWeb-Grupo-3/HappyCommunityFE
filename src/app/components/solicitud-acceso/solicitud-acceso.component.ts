import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solicitud-acceso',
  templateUrl: './solicitud-acceso.component.html',
  styleUrls: ['./solicitud-acceso.component.css']
})
export class SolicitudAccesoComponent {
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {}
}
