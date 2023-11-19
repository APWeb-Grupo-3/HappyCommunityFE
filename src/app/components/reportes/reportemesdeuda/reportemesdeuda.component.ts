import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DocumentopagoService } from 'src/app/services/documentopago.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-reportemesdeuda',
  templateUrl: './reportemesdeuda.component.html',
  styleUrls: ['./reportemesdeuda.component.css']
})
export class ReportemesdeudaComponent {
  barChartOptions: ChartOptions = {
    responsive: true,


  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private dS: DocumentopagoService,
    private lS: LoginService,
    ) {}
  ngOnInit(): void {
    this.dS.Deudames(this.lS.showUsername()).subscribe((data) => {
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

}
