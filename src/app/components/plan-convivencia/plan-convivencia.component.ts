import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan-convivencia',
  templateUrl: './plan-convivencia.component.html',
  styleUrls: ['./plan-convivencia.component.css']
})
export class PlanConvivenciaComponent {
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {}

}
