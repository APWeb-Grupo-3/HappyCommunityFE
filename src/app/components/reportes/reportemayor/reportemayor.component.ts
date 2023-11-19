
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Condominio } from 'src/app/models/condominio';
import { CondominioService } from 'src/app/services/condominio.service';
import { DocumentopagoService } from 'src/app/services/documentopago.service';
import { LoginService } from 'src/app/services/login.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reportemayor',
  templateUrl: './reportemayor.component.html',
  styleUrls: ['./reportemayor.component.css']
})
export class ReportemayorComponent implements OnInit {
  listacondominios: Condominio[] = [];
  formm: FormGroup = new FormGroup({});

  condomino: number = 0;

  barChartOptions: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: 4,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  barChartColors: any[] = [
    { backgroundColor: 'rgba(255, 0, 0, 0.3)' },
    { backgroundColor: 'rgba(0, 255, 0, 0.3)' },
    { backgroundColor: 'rgba(0, 0, 255, 0.3)' },
  ];

  constructor(
    private dS: DocumentopagoService,
    private cS: CondominioService,
    private lS: LoginService,
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit(): void {
    this.formm = this.formBuilder.group({
      condominio: [''],
    });

    this.cS.listCAR(this.lS.showUsername()).subscribe((data) => {
      this.listacondominios = data;
    });
    console.log('lista de condominios', this.listacondominios);
    
  }

  mostrar() {
    if(this.formm.valid){
      this.condomino=this.formm.value.condominio;
      console.log('lista de condominiossdfsfsdfsdfsdfsdfs', this.condomino);
      this.dS.MayorDeudaMes(this.condomino).subscribe((data) => {
        this.barChartLabels = data.map((item) => item.mes);
        this.barChartData = [
          {
            data: data.map((item) => item.total),
            label: 'Cantidad de total de deuda en soles',
          }
        ];
      });

    }
  }

}