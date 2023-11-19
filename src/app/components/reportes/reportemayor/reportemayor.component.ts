
import { Component, Inject, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DocumentopagoService } from 'src/app/services/documentopago.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-reportemayor',
  templateUrl: './reportemayor.component.html',
  styleUrls: ['./reportemayor.component.css']
})
export class ReportemayorComponent  { barChartOptions: ChartOptions = {
  responsive: true,
  indexAxis: 'y',
  maintainAspectRatio: false,
  aspectRatio: 4,

};
barChartLabels: string[] = [];
barChartType: ChartType = 'bar';
barChartLegend = true;
barChartData: ChartDataset[] = [];

constructor(private dS: DocumentopagoService,
  private lS: LoginService,
  ) {}
ngOnInit(): void {
  this.dS.MayorDeudaMes(this.lS.showUsername()).subscribe((data) => {
    this.barChartLabels = data.map((item) => item.mes);
    this.barChartData=[
      {
        data:data.map(item=>item.total),
        label:'Cantidad de total de deuda en soles',
        backgroundColor: [
          'rgba(140, 174, 182)',
          'rgba(20, 62, 75)',
          'rgba(10, 70, 56)',
        ]
      }
    ]
  });
}
anioActual: number = new Date().getFullYear();

}