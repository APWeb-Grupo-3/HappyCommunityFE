import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartType, ChartDataset } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { AvisoService } from 'src/app/services/aviso.service';
import { ExportService } from 'src/app/services/export.service';
import * as XLSX from 'xlsx';


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


  constructor(private aS: AvisoService, private formBuilder: FormBuilder,private exportService: ExportService,
    ) {}

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
        Mes: label,
        'Cantidad de avisos': this.barChartData[0].data[index],
      }));
  
      this.exportService.exportToExcel(excelData, 'reporte2');
    }
  }
  
}
