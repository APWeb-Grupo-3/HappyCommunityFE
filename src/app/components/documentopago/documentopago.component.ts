import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-documentopago',
  templateUrl: './documentopago.component.html',
  styleUrls: ['./documentopago.component.css']
})
export class DocumentopagoComponent {
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {}
}
