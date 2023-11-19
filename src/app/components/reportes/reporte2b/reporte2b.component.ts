import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Condominio } from 'src/app/models/condominio';
import { AvisoService } from 'src/app/services/aviso.service';
import { CondominioService } from 'src/app/services/condominio.service';
import { LoginService } from 'src/app/services/login.service';

import { ExportService } from 'src/app/services/export.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-reporte2b',
  templateUrl: './reporte2b.component.html',
  styleUrls: ['./reporte2b.component.css']
})
export class Reporte2bComponent {
  listacondominios: Condominio[] = [];
  formm: FormGroup = new FormGroup({});

  condomino: number = 0;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  
;
anioActual: number = new Date().getFullYear();

constructor(
  private aS: AvisoService,
  private cS: CondominioService,
  private lS: LoginService,
  private formBuilder: FormBuilder,
  private exportService: ExportService

) {}

ngOnInit(): void {
  this.formm = this.formBuilder.group({
    condominio: [''],
  });

  this.cS.listCAR(this.lS.showUsername()).subscribe((data) => {
    this.listacondominios = data;
  });
  
}



mostrar() {
  if(this.formm.valid){
    this.condomino=this.formm.value.condominio;
    this.aS.getReport2(this.condomino).subscribe((data) => {
      this.barChartLabels = data.map((item) => item.mes);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_de_avisos),
          label: 'Cantidad de avisos de este año',
          backgroundColor: [
            'rgba(140, 174, 182)',
            'rgba(20, 62, 75)',
            'rgba(10, 70, 56)',
          ]
        }
      ];
    });

  }
}

fileName="ExcelSheet.xlsx";
exportarExcel(){
  let data=document.getElementById("table-data");
  const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(data)

  const wb:XLSX.WorkBook=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,'Sheet1')

  XLSX.writeFile(wb,this.fileName)
}

exportToExcel(): void {
  if (this.barChartLabels.length > 0 && this.barChartData.length > 0) {
    const excelData = this.barChartLabels.map((label, index) => ({
      'ID del Condominio': this.condomino,
      Mes: label,
      'Cantidad de avisos': this.barChartData[0].data[index],
    }));

    this.exportService.exportToExcel(excelData, 'reporte2');
  }
}

}
