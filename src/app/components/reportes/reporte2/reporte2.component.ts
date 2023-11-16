import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartType, ChartDataset } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { AvisoService } from 'src/app/services/aviso.service';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css'],
})
export class Reporte2Component implements OnInit {
  fechaForm: FormGroup = new FormGroup({});
  anio:number=0

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private aS: AvisoService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fechaForm = this.formBuilder.group({
      anio: [null, Validators.required],
    });
  }
  buscar() {
    if (this.fechaForm.valid) {
      this.anio=this.fechaForm.value.anio;

      this.aS.getReport2(this.anio).subscribe((data) => {
        this.barChartLabels = data.map((item) => item.mes);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad_de_avisos),
            label: 'Cantidad de avisos',
            backgroundColor: ['rgba(255,0,0,0.7'],
          },
        ];
      });
    }
  }
}
