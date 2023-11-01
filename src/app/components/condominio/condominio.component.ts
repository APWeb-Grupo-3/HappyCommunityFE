import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-condominio',
  templateUrl: './condominio.component.html',
  styleUrls: ['./condominio.component.css']
})
export class CondominioComponent {
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {}

}
