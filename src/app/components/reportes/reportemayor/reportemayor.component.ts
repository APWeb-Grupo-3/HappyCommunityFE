import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DocumentopagoService } from 'src/app/services/documentopago.service';

@Component({
  selector: 'app-reportemayor',
  templateUrl: './reportemayor.component.html',
  styleUrls: ['./reportemayor.component.css']
})
export class ReportemayorComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
    indexAxis: 'y',  // Configura el gráfico para que sea de barras horizontales
    maintainAspectRatio: false, // Agrega esta línea para evitar la proporcionalidad
    aspectRatio: 4, // Puedes ajustar este valor según tus necesidades
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  barChartColors: any[] = [
    { backgroundColor: 'rgba(255, 0, 0, 0.3)' }, // Rojo semi-transparente
    { backgroundColor: 'rgba(0, 255, 0, 0.3)' }, // Verde semi-transparente
    { backgroundColor: 'rgba(0, 0, 255, 0.3)' }, // Azul semi-transparente
  ];
  constructor(private dS: DocumentopagoService) {}
  ngOnInit(): void {
    this.dS.MayorDeudaMes().subscribe((data) => {
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
