import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-documento-pago',
  templateUrl: './tipo-documento-pago.component.html',
  styleUrls: ['./tipo-documento-pago.component.css']
})
export class TipoDocumentoPagoComponent {
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {}
}
