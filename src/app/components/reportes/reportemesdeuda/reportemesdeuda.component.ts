import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DocumentopagoService } from 'src/app/services/documentopago.service';

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
  barChartColors: any[] = [
    { backgroundColor: 'rgba(255, 0, 0, 0.3)' }, // Rojo semi-transparente
    { backgroundColor: 'rgba(0, 255, 0, 0.3)' }, // Verde semi-transparente
    { backgroundColor: 'rgba(0, 0, 255, 0.3)' }, // Azul semi-transparente
  ];
  constructor(private dS: DocumentopagoService) {}
  ngOnInit(): void {
    this.dS.Deudames().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.mes);
      this.barChartData=[
        {
          data:data.map(item=>item.total),
          label:'Cantidad de total de deuda en soles',
        }
      ]
    });
  }

}
