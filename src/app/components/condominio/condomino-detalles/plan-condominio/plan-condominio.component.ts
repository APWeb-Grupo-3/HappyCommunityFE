import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlanConvivencia } from 'src/app/models/planconvivencia';
import { LoginService } from 'src/app/services/login.service';
import { PlanconvivenciaService } from 'src/app/services/planconvivencia.service';

@Component({
  selector: 'app-plan-condominio',
  templateUrl: './plan-condominio.component.html',
  styleUrls: ['./plan-condominio.component.css']
})
export class PlanCondominioComponent implements OnInit{

  planconvivencia: PlanConvivencia[]=[];
  id:number=0
  constructor(private pS: PlanconvivenciaService,
    private route:ActivatedRoute,
    private lS:LoginService
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.pS.listPC(this.id).subscribe((data) => {
        this.planconvivencia = data;
      });
    });
    
    this.pS.getList().subscribe((data) => {
      this.planconvivencia = data;
    });
    
  }
}
